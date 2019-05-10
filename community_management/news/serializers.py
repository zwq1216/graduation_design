from rest_framework import serializers
from rest_framework.relations import PKOnlyObject
from collections import OrderedDict

from .models import News, NewsImages
from utils.constant import IMAGE_SCOPE, IMAGE_SIZE


class NewsCreateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, max_length=50, label='名称')
    desc = serializers.CharField(required=True, max_length=1000, label='描述')
    images = serializers.ListField(
        child=serializers.FileField(max_length=100000, allow_empty_file=True, allow_null=True, use_url=True),
        allow_empty=True, allow_null=True, required=False
    )

    class Meta:
        model = News
        fields = ('id', 'name', 'desc', 'images')

    def validate(self, attrs):
        role = self.context['request'].user.role
        if 'images' in attrs.keys():
            images = attrs['images']
            for image in images:
                if image.content_type not in IMAGE_SCOPE:
                    raise serializers.ValidationError({"images": "仅支持png、jpg、jpeg格式"})

                if image.size > IMAGE_SIZE:
                    raise serializers.ValidationError({"images": "上传文件不要超过10MB"})

        if role == 0 or role == 1 or role == 2:
            raise serializers.ValidationError({'error': '只有超级管理员或监督人员可以创建新闻活动'})

        return attrs

    def create(self, validated_data):
        user = self.context['request'].user
        images = validated_data.pop('images', None)
        validated_data.update({'user': user})
        instance = News.objects.create(**validated_data)
        if images:
            for image in images:
                NewsImages.objects.create(name=image.name, file=image, news=instance)

        return instance

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


class NewsUpdateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(allow_null=True, allow_blank=True, max_length=50, label='名称')
    desc = serializers.CharField(allow_blank=True, allow_null=True, max_length=1000, label='描述')

    class Meta:
        model = News
        fields = ('id', 'name', 'desc')

    def validate(self, attrs):
        user = self.context['request'].user
        if user != self.instance.user:
            raise serializers.ValidationError({'error': '仅创建者可以修改'})

        return attrs

    def update(self, instance, validated_data):
        validated_data = {k: v for k, v in validated_data.items() if v}

        return super().update(instance, validated_data)


class NewsImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = NewsImages
        fields = '__all__'


# class NewsRetrieveDestroySerializer(serializers.ModelSerializer):
    # images = serializers.SerializerMethodField()

    # class Meta:
    #     model = News
    #     fields = ('id', 'name', 'desc', 'count', 'add_time')

    # def get_images(self, obj):
    #     # return NewsImageSerializer(NewsImages.objects.filter(news=obj), many=True)
    #     # return list(NewsImages.objects.filter(news=obj))
    #
    #     return {}

class NewsRetrieveSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', label='用户姓名')
    add_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", label='添加时间')
    images = serializers.SerializerMethodField()

    class Meta:
        model = News
        fields = '__all__'

    def get_images(self, obj):
        queryset = NewsImages.objects.filter(news=obj)

        serializer = NewsImageSerializer(queryset, many=True)

        return serializer.data

    def to_representation(self, instance):
        request = self.context['request']
        agree = request.scheme
        host = request.META['HTTP_HOST']
        ret = super().to_representation(instance)
        for i, images in enumerate(ret['images']):
            if images:
                ret['images'][i]['file'] = agree + '://' + host + images['file']

        return ret





