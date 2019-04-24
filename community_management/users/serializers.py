from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from django.db.models import Q

from .local_model import Register, Grade, College
from .models import User, ApplyRecord
from utils.constant import ROLE, APPLY_TYPE, APPLY_STATUS
from utils.validation import is_valid_password
from community_management.settings import DEBUG


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, label='用户名')
    password = serializers.CharField(required=True, label='密码')
    code = serializers.CharField(required=True, label='验证码')

    def validate(self, attrs):

        username = attrs['username']
        password = attrs['password']
        code = attrs['code'].upper()
        generate_code = self.context['request'].session.get("valid_code", "").upper()

        # if DEBUG:
        #     valid_code = '6666'
        # else:
        #     valid_code = generate_code

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

    def validate_sno(self, sno):
        obj = User.objects.filter(sno=sno).first()
        if obj:
            raise serializers.ValidationError('该账号已经注册。')

        return sno

    def validate_username(self, username):
        if username and len(username) > 20:
            raise serializers.ValidationError('用户名最多20个字符。')

        obj = User.objects.filter(username=username).first()

        if obj:
            raise serializers.ValidationError('用户名已经存在。')

        return username

    def validate_password(self, password):
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

        instance = User.objects.create(**validated_data)

        return instance


class UserUpdateSerializer(serializers.ModelSerializer):
    sno = serializers.CharField(max_length=20, read_only=True, label='学号/工号')
    username = serializers.CharField(required=True, label='昵称')
    realname = serializers.CharField(max_length=30, read_only=True, label='真实姓名')
    password = serializers.CharField(required=True, min_length=8, write_only=True, label='密码')
    phone = serializers.CharField(required=True, max_length=11, label='电话号码')
    role = serializers.ChoiceField(required=True, choices=ROLE, label='角色')

    class Meta:
        model = User
        fields = ('id', 'sno', 'username', 'realname', 'password', 'phone', 'role')

    def validate_password(self, password):

        return make_password(password)


class UserAvastarSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'image')


class UserRetrieveDestroySerializer(serializers.ModelSerializer):
    grade = serializers.CharField(source='grade.name', read_only=True)

    class Meta:
        model = User
        fields = ('id', 'sno', 'username', 'realname', 'grade', 'phone', 'role', 'image', 'date_joined')

    def to_representation(self, instance):
        ret = super().to_representation(instance)

        for k, v in ROLE:
            if ret['role'] == k:
                ret['role'] = v
                break

        return ret


class ApplyRecordCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = ApplyRecord
        fields = ('id', 'title', 'apply_data', 'type', 'users')

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data.pop('users')
        validated_data.update({'apply_user': user})

        instance = ApplyRecord.objects.create(**validated_data)

        return instance


class ApplyRecordUpdateSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=30, allow_null=True, allow_blank=True, label='标题')
    apply_data = serializers.FileField(allow_null=True, label='申请材料')
    type = serializers.ChoiceField(allow_null=True, allow_blank=True, choices=APPLY_TYPE, label='申请类型')
    status = serializers.ChoiceField(allow_blank=True, allow_null=True, choices=APPLY_STATUS, label='申请状态')

    class Meta:
        model = ApplyRecord
        fields = ('id', 'title', 'apply_data', 'type', 'status')

    def update(self, instance, validated_data):
        validated_data = {k: v for k, v in validated_data.items() if v}

        return super().update(instance, validated_data)


class ApplyRecordRetrieveDestroySerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplyRecord
        fields = ('id', 'title', 'apply_data', 'type', 'status', 'add_time')

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

