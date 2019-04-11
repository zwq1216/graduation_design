from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from .local_model import Register, Grade
from .models import User, ApplyRecord
from utils.constant import ROLE, APPLY_TYPE, APPLY_STATUS


class UserCreateSerializer(serializers.ModelSerializer):
    sno = serializers.CharField(required=True, max_length=20, label='学号/工号')
    username = serializers.CharField(required=True, label='昵称')
    password = serializers.CharField(required=True, min_length=8, write_only=True, label='密码')

    class Meta:
        model = User
        fields = ('id', 'sno', 'username', 'password')

    def validate_password(self, password):

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





