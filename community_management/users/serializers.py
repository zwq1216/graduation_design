from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from django.db.models import Q

from .local_model import Register, Grade, College
from .models import User, ApplyRecord
from utils.constant import ROLE, APPLY_TYPE, APPLY_STATUS, PACKAGE_SCOPE, PACKAGE_SIZE, IMAGE_SCOPE, IMAGE_SIZE
from utils.validation import is_valid_password, is_phone


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, label='用户名')
    password = serializers.CharField(required=True, label='密码')
    code = serializers.CharField(required=True, label='验证码')

    # 对输入数据的字段进行合法性验证
    def validate(self, attrs):

        username = attrs['username']
        password = attrs['password']
        code = attrs['code'].upper()
        generate_code = self.context['request'].session.get("valid_code", "").upper()

        if code == generate_code:

            user = User.objects.filter(Q(username=username) | Q(sno=username)).first()
            if user:
                if not user.check_password(password):
                    raise serializers.ValidationError({"username": ["用户名或密码错误"]})
            else:
                raise serializers.ValidationError({"username": ["用户名或密码错误"]})
        else:
            raise serializers.ValidationError({'code': ['验证码错误']})

        return attrs


class UserCreateSerializer(serializers.ModelSerializer):
    sno = serializers.CharField(required=True, max_length=20, label='学号/工号')
    username = serializers.CharField(required=True, label='昵称')
    password = serializers.CharField(required=True, min_length=8, write_only=True, label='密码')

    class Meta:
        model = User
        fields = ('id', 'sno', 'username', 'password')

    # 对学号的合法向进行验证
    def validate_sno(self, sno):
        obj = User.objects.filter(sno=sno).first()
        if obj:
            raise serializers.ValidationError('该账号已经注册。')

        return sno

    # 对用户名的合法性进行验证
    def validate_username(self, username):
        if username and len(username) > 20:
            raise serializers.ValidationError('用户名最多20个字符。')

        obj = User.objects.filter(username=username).first()

        if obj:
            raise serializers.ValidationError('用户名已经存在。')

        return username

    # 对密码的合法性进行验证
    def validate_password(self, password):
        # 正则验证
        if not is_valid_password(password):
            raise serializers.ValidationError('请输入字母（区分大小写）、数字、符号中的至少两种8-64个字符')
        return make_password(password)

    def create(self, validated_data):
        # 获取可以注册的对象信息
        register = Register.objects.get(sno=validated_data['sno'])
        no = register.no
        grade_obj = Grade.objects.filter(no=no).first()
        grade = None
        if grade_obj:
            grade = grade_obj

        validated_data.update({'grade': grade, 'realname': register.name})
        # 存储数据
        instance = User.objects.create(**validated_data)

        return instance


class UserUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'phone', 'role')

    # 对用户名的合法性进行验证
    def validate_username(self, username):
        if username and len(username) > 20:
            raise serializers.ValidationError('用户名最多20个字符。')

        obj = User.objects.filter(username=username).first()

        if obj:
            raise serializers.ValidationError('用户名已经存在。')

        return username

    # 对密码的合法性进行验证
    def validate_password(self, password):
        # 正则验证
        if not is_valid_password(password):
            raise serializers.ValidationError('请输入字母（区分大小写）、数字、符号中的至少两种8-64个字符')
        return make_password(password)

    # 验证手机号
    def validate_phone(self, phone):

        if phone and not is_phone(phone):
            raise serializers.ValidationError('手机号不合法')

        return phone

    def update(self, instance, validated_data):
        validated_data = {k: v for k, v in validated_data.items() if v}

        return super().update(instance, validated_data)


class UserAvastarSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'image')

    def validate_image(self, image):
        if image:
            if image.content_type not in IMAGE_SCOPE:
                raise serializers.ValidationError({"images": "仅支持png、jpg、jpeg格式"})

            if image.size > IMAGE_SIZE:
                raise serializers.ValidationError({"images": "上传文件不要超过10MB"})

        return image


class UserRetrieveDestroySerializer(serializers.ModelSerializer):
    grade = serializers.CharField(source='grade.name', read_only=True)
    date_joined = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", label='添加时间')
    college = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'sno', 'username', 'realname', 'grade', 'phone', 'role', 'image', 'date_joined', 'college')

    def get_college(self, obj):
        if obj.grade:
            return obj.grade.college.name
        else:
            return None

    def to_representation(self, instance):
        ret = super().to_representation(instance)

        for k, v in ROLE:
            if ret['role'] == k:
                ret['role'] = v
                break

        return ret


class ResetPasswordSerializer(serializers.Serializer):
    original_password = serializers.CharField(max_length=50, required=True)
    new_password = serializers.CharField(max_length=50, required=True)
    repeat_password = serializers.CharField(max_length=50, required=True)

    def validate(self, attrs):
        request = self.context['request']
        user = request.user
        original_password = attrs['original_password']
        new_password = attrs['new_password']
        repeat_password = attrs['repeat_password']

        if not user.check_password(original_password):
            raise serializers.ValidationError({"original_password": ["原始密码不正确"]})

        if not is_valid_password(new_password):
            raise serializers.ValidationError({'new_password': ['请输入字母（区分大小写）、数字、符号中的至少两种8-64个字符']})

        if new_password != repeat_password:
            raise serializers.ValidationError({"repeat_password": ["两次密码不一致"]})

        return attrs


class ApplyRecordCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = ApplyRecord
        fields = ('id', 'content', 'apply_data', 'type', 'community')

    # 验证资料的合法性
    def validate_apply_data(self, data):
        if data:
            if data.content_type not in PACKAGE_SCOPE:
                raise serializers.ValidationError("仅支持tar,zip格式")

            if data.size > PACKAGE_SIZE:
                raise serializers.ValidationError("上传文件不要超过50MB")
        return data

    def validate(self, attrs):
        # (0, '申请加入社团'),
        # (1, '申请创建社团')
        # (2, '申请退出社团')
        type = attrs['type']
        user = self.context['request'].user
        if type == 0:
            if user.community:
                raise serializers.ValidationError({'content': ['已加入社团']})
            record = ApplyRecord.objects.filter(type=0, status=0, apply_user=user).first()
            if record:
                raise serializers.ValidationError({'content': ['已申请，不可重复申请']})
            if user.role != 0:
                raise serializers.ValidationError({'content': ['仅普通用户可以申请']})

        if type == 1:
            if 'apply_data' not in attrs.keys() or ('apply_data' in attrs.keys() and not attrs['apply_data']):
                raise serializers.ValidationError({'apply_data': ['申请创建社团必须上传申请文件']})
        if type == 2:
            if not user.community:
                raise serializers.ValidationError({'content': ['未加入社团']})
            attrs['community'] = user.community

        return attrs

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data.update({'apply_user': user})
        # 创建申请记录
        instance = ApplyRecord.objects.create(**validated_data)

        return instance


class ApplyRecordUpdateSerializer(serializers.ModelSerializer):
    status = serializers.ChoiceField(allow_blank=True, allow_null=True, choices=APPLY_STATUS, label='申请状态')

    class Meta:
        model = ApplyRecord
        fields = ('id', 'status')

    def validate(self, attrs):
        user = self.context['request'].user
        if self.instance.type == 1 and (user.role == 0 or user.role == 1 or user.role == 2):
            raise serializers.ValidationError({'error': '无权修改'})

        if (self.instance.type == 0 or self.instance.type == 2) and user.role != 2:
            raise serializers.ValidationError({'error': '仅社长可以修改'})

        return attrs

    def update(self, instance, validated_data):
        user = self.context['request'].user
        status = validated_data['status']
        apply_user = self.instance.apply_user
        if self.instance.status == 0:
            validated_data.update({'deal_user': user})
        if self.instance.type == 0 and status == 3:
            apply_user.community = user.community
            apply_user.save()
        if self.instance.type == 2 and status == 3:
            apply_user.community = None
            apply_user.save()

        validated_data = {k: v for k, v in validated_data.items() if v}

        return super().update(instance, validated_data)


class ApplyRecordRetrieveDestroySerializer(serializers.ModelSerializer):
    apply_user = serializers.CharField(source='apply_user.realname')
    add_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", label='添加时间')

    class Meta:
        model = ApplyRecord
        fields = ('id', 'content', 'apply_data', 'type', 'status', 'apply_user', 'add_time', 'community')

    def to_representation(self, instance):
        ret = super().to_representation(instance)

        for k, v in APPLY_TYPE:
            if ret['type'] == k:
                ret['type'] = v
                break

        for k, v in APPLY_STATUS:
            if ret['status'] == k:
                ret['status'] = v
                break

        if instance.community:
            ret['community'] = instance.community.name

        return ret


class CollegeListCreateSerializer(serializers.ModelSerializer):
    add_time = serializers.DateTimeField(read_only=True, label='添加时间')

    class Meta:
        model = College
        fields = ('id', 'name', 'no', 'add_time')


class CollegeUpdateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(allow_null=True, allow_blank=True, label='学院名称')
    no = serializers.CharField(allow_blank=True, allow_null=True, label='学院编号')
    add_time = serializers.DateTimeField(read_only=True, label='添加时间')

    class Meta:
        model = College
        fields = ('id', 'name', 'no', 'add_time')

    def update(self, instance, validated_data):
        validated_data = {k: v for k, v in validated_data.items() if v}

        return super().update(instance, validated_data)

