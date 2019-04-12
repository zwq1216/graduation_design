from rest_framework import serializers
from rest_framework.relations import PKOnlyObject
from collections import OrderedDict
from datetime import datetime

from .models import DataCategory, Data
from users.local_model import DataPackage
from utils.constant import DATA_STATUS, DISCLOSURE


class CategorySerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, max_length=50, label='分类名称')
    add_time = serializers.DateTimeField(read_only=True, label='添加时间')

    class Meta:
        model = DataCategory
        fields = ('id', 'name', 'add_time')

    def validate(self, attrs):
        user = self.context['request'].user
        name = attrs['name']
        if user.role != 4:
            raise serializers.ValidationError({'error': '仅超级管理员可以创建'})

        obj = DataCategory.objects.filter(name=name).first()
        if obj:
            raise serializers.ValidationError({'error': '该分类已经存在'})

        return attrs


class DataCreateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, max_length=50, label='资料名称')
    desc = serializers.CharField(max_length=500, allow_blank=True, allow_null=True, label='描述')
    disclosure = serializers.ChoiceField(default=0, choices=DISCLOSURE, label='公开度')
    package = serializers.FileField(label='资料包')

    class Meta:
        model = Data
        fields = ('id', 'name', 'desc', 'type', 'package', 'disclosure')

    def save(self, **kwargs):
        user = self.context['request'].user
        validated_data = dict(list(self.validated_data.items()) + list(kwargs.items()))
        package = validated_data.pop('package', None)
        package = DataPackage.objects.create(name=package.name, file=package)
        validated_data.update({'user': user, 'status': 0, 'data': package})
        self.instance = Data.objects.create(**validated_data)

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


class DataUpdateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(allow_blank=True, allow_null=True, max_length=50, label='资料名称')
    desc = serializers.CharField(max_length=500, allow_blank=True, allow_null=True, label='描述')
    status = serializers.ChoiceField(allow_null=True, allow_blank=True, choices=DATA_STATUS, label='资料状态')
    disclosure = serializers.ChoiceField(allow_null=True, allow_blank=True, choices=DISCLOSURE, label='公开度')
    package = serializers.FileField(allow_null=True, label='资料包')
    add_time = serializers.DateTimeField(read_only=True, label='添加时间')

    class Meta:
        model = Data
        fields = ('id', 'name', 'desc', 'type', 'package', 'status', 'disclosure', 'add_time')

    def validate(self, attrs):
        role = self.context['request'].user.role

        if role == 0 or role == 1:
            raise serializers.ValidationError({'error': '普通用户和社团普通成员不可修改资料状态'})

        if self.instance.status != 0:
            raise serializers.ValidationError({'error': '已处理的资料不可再修改'})

        return attrs

    def save(self, **kwargs):
        validated_data = dict(list(self.validated_data.items()) + list(kwargs.items()))
        package = validated_data.pop('package', None)
        if package and self.instance:
            data = self.instance.data
            data.name = package.name
            data.file = package
            data.add_time = datetime.now()
            data.save()
        validated_data = {k: v for k, v in validated_data.items() if v}
        validated_data.update({'add_time': datetime.now()})
        self.instance = self.update(self.instance, validated_data)

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


class DataPackageSerializer(serializers.ModelSerializer):

    class Meta:
        model = DataPackage
        fields = '__all__'


class DataDetailSerializer(serializers.ModelSerializer):
    data = serializers.SerializerMethodField()

    class Meta:
        model = Data
        fields = ('id', 'name', 'desc', 'type', 'data', 'status', 'disclosure', 'add_time')

    def get_data(self, obj):
        request = self.context['request']
        agree = request.scheme
        host = request.META['HTTP_HOST']
        data = obj.data
        if data:
            return agree + '://' + host + DataPackageSerializer(data).data['file']

        return None

