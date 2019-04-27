from rest_framework import serializers

from .models import DiscussTheme, ReplayTheme, DiscussCatagroy
from users.models import User


class CatagorySerializer(serializers.ModelSerializer):

    class Meta:
        model = DiscussCatagroy
        fields = ('id', 'name')


class DiscussCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = DiscussTheme
        fields = ('id', 'title', 'catagory', 'content')

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data.update({'user': user})

        return super().create(validated_data)


class UserDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'image')


class DiscussDetailSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()
    catagory = serializers.CharField(source='catagory.name', label='所属分类')
    add_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", label='添加时间')

    class Meta:
        model = DiscussTheme
        fields = '__all__'


class ReplayCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = ReplayTheme
        fields = ('id', 'content', 'theme')

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data.update({'user': user})

        return super().create(validated_data)


class ReplayDetailSerializer(serializers.ModelSerializer):
    theme = serializers.CharField(source='theme.title')
    user = UserDetailSerializer()
    add_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", label='添加时间')

    class Meta:
        model = ReplayTheme
        fields = ('id', 'content', 'theme', 'user', 'add_time')






