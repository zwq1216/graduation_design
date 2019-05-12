from rest_framework import serializers
from rest_framework.relations import PKOnlyObject
from collections import OrderedDict
from datetime import datetime
from django.db.models import F

from utils.constant import COMMUNITY_TYPE, IMAGE_SIZE, IMAGE_SCOPE
from .models import Community, CommunityFile, RecentPlan, Honor, Announcement
from users.models import ScoreRecord


class CommunityCreateSerializer(serializers.ModelSerializer):
    """创建社团序列"""
    no = serializers.CharField(required=True, max_length=30, label='社团编号')
    name = serializers.CharField(required=True, max_length=50, label='社团名称')
    objective = serializers.CharField(allow_null=True, allow_blank=True, max_length=200, label='社团宗旨')
    image = serializers.FileField(allow_null=True, label='社团头像')
    desc = serializers.CharField(allow_blank=True, max_length=500, label='社团描述')
    teacher_file = serializers.FileField(required=True, label='导师简历')
    community_file = serializers.FileField(required=True, label='社团简章')
    community_file_rule = serializers.FileField(required=True, label='社团规章制度')

    class Meta:
        model = Community
        fields = ('id', 'no', 'name', 'objective', 'image', 'desc', 'plan_count', 'college', 'community_type',
                  'teacher_file', 'community_file', 'community_file_rule')

    def validate_name(self, name):
        com = Community.objects.filter(name=name).first()
        if com:
            raise serializers.ValidationError("社团名称已经存在")
        return name

    def validate_image(self, image):
        if image:
            if image.content_type not in IMAGE_SCOPE:
                raise serializers.ValidationError("仅支持png、jpg、jpeg格式")

            if image.size > IMAGE_SIZE:
                raise serializers.ValidationError("上传文件不要超过10MB")

        return image

    def validate_teacher_file(self, file):
        if file.content_type != 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            raise serializers.ValidationError("仅支持上传docx格式的文档")
        if file.size > 20 * 1024 * 1024:
            raise serializers.ValidationError('文档大小不能超过20M')

        return file

    def validate_community_file(self, file):
        if file.content_type != 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            raise serializers.ValidationError("仅支持上传docx格式的文档")
        if file.size > 20 * 1024 * 1024:
            raise serializers.ValidationError('文档大小不能超过20M')

        return file

    def validate_community_file_rule(self, file):
        if file.content_type != 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            raise serializers.ValidationError("仅支持上传docx格式的文档")
        if file.size > 20 * 1024 * 1024:
            raise serializers.ValidationError('文档大小不能超过20M')

        return file

    def save(self, **kwargs):
        validated_data = dict(list(self.validated_data.items()) + list(kwargs.items()))
        image = validated_data['image']
        teacher_file = validated_data.pop('teacher_file', None)
        community_file = validated_data.pop('community_file', None)
        community_file_rule = validated_data.pop('community_file_rule', None)
        if not image:
            validated_data.pop('image')

        self.instance = Community.objects.create(**validated_data)
        CommunityFile.objects.create(name=teacher_file.name, file=teacher_file, community=self.instance,
                                     community_file_type=0)
        CommunityFile.objects.create(name=community_file.name, file=community_file, community=self.instance,
                                     community_file_type=1)
        CommunityFile.objects.create(name=community_file_rule.name, file=community_file_rule, community=self.instance,
                                     community_file_type=2)

        return self.instance

    def to_representation(self, instance):
        ret = OrderedDict()
        fields = self._readable_fields

        for field in fields:
            try:
                attribute = field.get_attribute(instance)
            except Exception as e:
                del e
                continue

            check_for_none = attribute.pk if isinstance(attribute, PKOnlyObject) else attribute
            if check_for_none is None:
                ret[field.field_name] = None
            else:
                ret[field.field_name] = field.to_representation(attribute)

        return ret


class CommunityFileSerializer(serializers.ModelSerializer):

    class Meta:
        model = CommunityFile
        fields = '__all__'


class HonorSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(format="%Y-%m-%d", label='添加时间')

    class Meta:
        model = Honor
        fields = '__all__'


class AnnouncementSerializer(serializers.ModelSerializer):

    class Meta:
        model = Announcement
        fields = '__all__'


class CommunityRetrieveSerializer(serializers.ModelSerializer):
    college = serializers.CharField(source='college.name')
    files = serializers.SerializerMethodField(label='社团相关文件')
    honor = serializers.SerializerMethodField(label='社团荣誉')
    announcement = serializers.SerializerMethodField(label='社团公告')

    class Meta:
        model = Community
        fields = ('id', 'no', 'name', 'objective', 'image', 'desc', 'plan_count', 'real_count', 'college',
                  'community_type', 'files', 'score', 'honor', 'announcement')

    def get_files(self, obj):
        request = self.context['request']
        agree = request.scheme
        host = request.META['HTTP_HOST']
        teacher_file = None
        community_file = None
        community_file_rule = None
        teacher = CommunityFile.objects.filter(community=obj, community_file_type=0).first()
        community = CommunityFile.objects.filter(community=obj, community_file_type=1).first()
        rule = CommunityFile.objects.filter(community=obj, community_file_type=2).first()
        # 构建media文件路径
        if teacher:
            teacher_file = agree + '://' + host + CommunityFileSerializer(teacher).data['file']
        if community:
            community_file = CommunityFileSerializer(teacher).data['file']
        if rule:
            community_file_rule = agree + '://' + host + CommunityFileSerializer(teacher).data['file']
        data = {'teacher_file': teacher_file, 'community_file': community_file,
                'community_file_rule': community_file_rule}

        return data

    # 获取荣誉列表
    def get_honor(self, obj):
        queryset = Honor.objects.filter(community=obj)
        serializer = HonorSerializer(queryset, many=True)

        return serializer.data

    # 获取公告列表
    def get_announcement(self, obj):
        queryset = Announcement.objects.filter(community=obj).order_by('-add_time')[:5]
        serializer = AnnouncementSerializer(queryset, many=True)

        return serializer.data


class CommunityUpdateSerializer(serializers.ModelSerializer):
    objective = serializers.CharField(allow_null=True, allow_blank=True, max_length=200, label='社团宗旨')
    # image = serializers.FileField(allow_null=True, allow_empty_file=True, label='社团头像')
    desc = serializers.CharField(allow_blank=True, allow_null=True, max_length=500, label='社团描述')
    plan_count = serializers.IntegerField(allow_null=True, label='计划人数')
    score = serializers.IntegerField(allow_null=True, label='社团积分')
    community_type = serializers.IntegerField(required=False, allow_null=True, label='所属类型')

    class Meta:
        model = Community
        fields = ('id', 'objective', 'desc', 'plan_count', 'score', 'community_type')

    def update(self, instance, validated_data):
        validated_data = {k: v for k, v in validated_data.items() if v}

        return super().update(instance, validated_data)

    def to_representation(self, instance):
        ret = super().to_representation(instance)

        for k, v in COMMUNITY_TYPE:
            if ret['community_type'] == k:
                ret['community_type'] = v
                break

        return ret


# class ScoreSerializer(serializers.ModelSerializer):
#     update_time = serializers.DateTimeField(read_only=True, label='最后一次的更新时间')
#
#     class Meta:
#         model = Score
#         fields = ('id', 'score', 'update_time', 'community')
#
#     def update(self, instance, validated_data):
#         validated_data = {k: v for k, v in validated_data.items() if v}
#
#         return super().update(instance, validated_data)


class ScoreRecordSerializer(serializers.ModelSerializer):
    deduct = serializers.IntegerField(required=True, label='扣除的积分')
    desc = serializers.CharField(allow_null=True, allow_blank=True, max_length=500, label='原因')
    add_time = serializers.DateTimeField(format="%Y-%m-%d", read_only=True, label='添加时间')

    class Meta:
        model = ScoreRecord
        fields = ('id', 'deduct', 'desc', 'community', 'add_time')

    def validate_deduct(self, deduct):
        if deduct < 0:
            raise serializers.ValidationError('扣除积分不能为负')
        return deduct

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data.update({'user': user})
        instance = super().create(validated_data)
        score = instance.community
        score.score = F('score') - instance.deduct
        score.save()

        return instance

    def update(self, instance, validated_data):
        validated_data = {k: v for k, v in validated_data.items() if v}

        if 'deduct' in validated_data.keys():
            c = instance.deduct - validated_data['deduct']
            score = instance.score
            score.score = F('score') + c
            score.save()

        return super().update(instance, validated_data)


class RecentPlanCreateUpdateSerializer(serializers.ModelSerializer):
    title = serializers.CharField(allow_null=True, allow_blank=True, label='主题')
    file = serializers.FileField(allow_null=True, label='近期规划文件')

    class Meta:
        model = RecentPlan
        fields = ('id', 'title', 'file')

    def validate(self, attrs):
        user = self.context['request'].user
        if not user.community and user.role != 2:
            raise serializers.ValidationError({'error': '只有社长有权限创建计划'})

        return attrs

    def create(self, validated_data):
        community = self.context['request'].user.community
        validated_data.update({'add_time': datetime.now(), 'community': community})

        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data = {k: v for k, v in validated_data.items() if v}

        return super().update(instance, validated_data)


class RecentPlanRetrieveDestroySerializer(serializers.ModelSerializer):
    community = serializers.CharField(source='community.name', label='所属社团名称')

    class Meta:
        model = RecentPlan
        fields = ('id', 'title', 'file', 'community', 'add_time')


