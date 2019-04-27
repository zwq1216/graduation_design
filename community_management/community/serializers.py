from rest_framework import serializers
from rest_framework.relations import PKOnlyObject
from collections import OrderedDict
from datetime import datetime

from utils.constant import COMMUNITY_TYPE
from .models import Community, CommunityFile, RecentPlan, Honor, Announcement
from users.models import ScoreRecord


class CommunityCreateSerializer(serializers.ModelSerializer):
    """创建社团序列"""
    no = serializers.CharField(max_length=30, label='社团编号')
    name = serializers.CharField(max_length=50, label='社团名称')
    objective = serializers.CharField(allow_null=True, allow_blank=True, max_length=200, label='社团宗旨')
    image = serializers.FileField(allow_null=True, label='社团头像')
    desc = serializers.CharField(allow_blank=True, max_length=500, label='社团描述')
    plan_count = serializers.IntegerField(default=0, label='计划人数')
    real_count = serializers.IntegerField(default=0, label='实际人数')
    teacher_file = serializers.FileField(required=True, label='导师简历')
    community_file = serializers.FileField(required=True, label='社团简章')
    community_file_rule = serializers.FileField(required=True, label='社团规章制度')

    class Meta:
        model = Community
        fields = ('id', 'no', 'name', 'objective', 'image', 'desc', 'plan_count', 'real_count', 'college',
                  'community_type', 'teacher_file', 'community_file', 'community_file_rule')

    def save(self, **kwargs):
        validated_data = dict(list(self.validated_data.items()) + list(kwargs.items()))
        teacher_file = validated_data.pop('teacher_file', None)
        community_file = validated_data.pop('community_file', None)
        community_file_rule = validated_data.pop('community_file_rule', None)

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
        if teacher:
            teacher_file = agree + '://' + host + CommunityFileSerializer(teacher).data['file']
        if community:
            community_file =  CommunityFileSerializer(teacher).data['file']
        if rule:
            community_file_rule = agree + '://' + host + CommunityFileSerializer(teacher).data['file']
        data = {'teacher_file': teacher_file, 'community_file': community_file,
                'community_file_rule': community_file_rule}

        return data

    def get_honor(self, obj):
        queryset = Honor.objects.filter(community=obj)
        serializer = HonorSerializer(queryset, many=True)

        return serializer.data

    def get_announcement(self, obj):
        queryset = Announcement.objects.filter(community=obj).order_by('-add_time')[:5]
        serializer = AnnouncementSerializer(queryset, many=True)

        return serializer.data


class CommunityUpdateSerializer(serializers.ModelSerializer):
    no = serializers.CharField(allow_null=True, allow_blank=True, max_length=30, read_only=True, label='社团编号')
    name = serializers.CharField(allow_null=True, allow_blank=True, max_length=50, label='社团名称')
    objective = serializers.CharField(allow_null=True, allow_blank=True, max_length=200, label='社团宗旨')
    image = serializers.FileField(allow_null=True, label='社团头像')
    desc = serializers.CharField(allow_blank=True, max_length=500, label='社团描述')
    plan_count = serializers.IntegerField(allow_null=True, label='计划人数')
    real_count = serializers.IntegerField(allow_null=True, label='实际人数')

    class Meta:
        model = Community
        fields = ('id', 'no', 'name', 'objective', 'image', 'desc', 'plan_count', 'real_count', 'college',
                  'community_type')

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
    add_time = serializers.DateTimeField(read_only=True, label='添加时间')

    class Meta:
        model = ScoreRecord
        fields = ('id', 'score', 'deduct', 'desc', 'add_time')

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data.update({'user': user})
        instance = super().create(validated_data)
        score = instance.score
        score.score -= instance.deduct
        score.save()

        return instance

    def update(self, instance, validated_data):
        validated_data = {k: v for k, v in validated_data.items() if v}

        if 'deduct' in validated_data.keys():
            c = instance.deduct - validated_data['deduct']
            score = instance.score
            score.score += c
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


