from rest_framework import serializers
from rest_framework.relations import PKOnlyObject
from collections import OrderedDict

from .models import News, NewsImages, Praise


class NewsImagesSerializer(serializers.ModelSerializer):
    pass


class NewsCreateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, max_length=50, label='名称')
    desc = serializers.CharField(required=True, max_length=1000, label='描述')
    # images = serializers.ListField(
    #     child=serializers.FileField(max_length=100000, allow_empty_file=True, allow_null=True, use_url=True),
    # )
    images = serializers.FileField(allow_null=True, allow_empty_file=True, label='活动图片')

    class Meta:
        model = News
        fields = ('id', 'name', 'desc', 'images')

    def validate(self, attrs):
        role = user = self.context['request'].user.role

        if role == 0 or role == 1:
            raise serializers.ValidationError({'error': '普通用户或普通社团成员无法创建新闻活动'})

        return attrs

    def create(self, validated_data):
        user = self.context['request'].user
        images = validated_data.pop('images', None)
        validated_data.update({'user': user})
        instance = News.objects.create(**validated_data)
        if images:
            NewsImages.objects.create(name=images.name, file=images, news=instance)

        return instance

    # def to_representation(self, instance):
    #     ret = OrderedDict()
    #     fields = self._readable_fields
    #
    #     for field in fields:
    #         try:
    #             attribute = field.get_attribute(instance)
    #         except Exception as e:
    #             del e
    #             continue
    #
    #         check_for_none = attribute.pk if isinstance(attribute, PKOnlyObject) else attribute
    #         if check_for_none is None:
    #             ret[field.field_name] = None
    #         else:
    #             ret[field.field_name] = field.to_representation(attribute)
    #
    #     return ret


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


# class NewsImageSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = NewsImages
#         fields = '__all__'


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

class NewsRetrieveDestroySerializer(serializers.ModelSerializer):

    class Meta:
        model = News
        fields = '__all__'


