from rest_framework import serializers

from .models import Project
from utils.constant import PROJECT_STATUS


class ProjectCreateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, max_length=50, label='项目名称')
    desc = serializers.CharField(max_length=500, allow_blank=True, allow_null=True, label='项目描述')
    file = serializers.FileField(required=True, label='项目需求文件路径')
    remuneration = serializers.IntegerField(default=0, label='酬金')

    class Meta:
        model = Project
        fields = ('id', 'name', 'desc', 'file', 'remuneration')

    def validate_remuneration(self, remuneration):
        if remuneration < 0:
            raise serializers.ValidationError("酬金不能为负")
        return remuneration

    def validate_file(self, file):
        if file.content_type != 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            raise serializers.ValidationError("仅支持上传docx格式的文档")
        if file.size > 50*1024*1024:
            raise serializers.ValidationError('文档大小不能超过50M')
        return file

    def create(self, validated_data):
        user = self.context['request'].user
        if user.role == 4 or user.role == 3:
            validated_data.update({'pub_user': user, 'status': 0})
        else:
            validated_data.update({'pub_user': user, 'status': 3})
        instance = Project.objects.create(**validated_data)

        return instance


class ProjectUpdateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(allow_null=True, allow_blank=True, max_length=50, label='项目名称')
    desc = serializers.CharField(max_length=500, allow_blank=True, allow_null=True, label='项目描述')
    file = serializers.FileField(allow_null=True, label='项目需求文件路径')
    remuneration = serializers.IntegerField(allow_null=True, label='酬金')
    status = serializers.ChoiceField(allow_null=True, allow_blank=True, choices=PROJECT_STATUS, label='项目状态')

    class Meta:
        model = Project
        fields = ('id', 'name', 'desc', 'file', 'status', 'remuneration')

    def validate(self, attrs):
        user = self.context['request'].user

        if user != self.instance.pub_user:
            raise serializers.ValidationError({'error': '仅发布者可以修改'})

        if self.instance.status != 0:
            raise serializers.ValidationError({'error': '已承接项目不可修改'})

        return attrs

    def update(self, instance, validated_data):
        validated_data = {k: v for k, v in validated_data.items() if v}

        return super().update(instance, validated_data)


class ProjectDetailSerializer(serializers.ModelSerializer):
    pub_user = serializers.CharField(source='pub_user.realname', label='发布者')
    apply_user = serializers.SerializerMethodField(label='申请人')
    add_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", label='添加时间')

    class Meta:
        model = Project
        fields = ('id', 'name', 'desc', 'file', 'status', 'remuneration', 'pub_user', 'apply_user', 'add_time')

    def get_apply_user(self, obj):
        user = obj.apply_user
        if user:
            return user.realname

        return None

    def to_representation(self, instance):
        ret = super().to_representation(instance)

        for k, v in PROJECT_STATUS:
            if ret['status'] == k:
                ret['status'] = v
                break

        return ret


