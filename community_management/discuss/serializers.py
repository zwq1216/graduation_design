from rest_framework import serializers

from .models import DiscussTheme, ReplayTheme


class DiscussCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = DiscussTheme
        fields = ('id', 'title', 'content')

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data.update({'user': user})

        return super().create(validated_data)


class DiscussDetailSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username')

    class Meta:
        model = DiscussTheme
        fields = '__all__'


class ReplayCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = ReplayTheme
        fields = ('id', 'title', 'content', 'theme')

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data.update({'user': user})

        return super().create(validated_data)


class ReplayDetailSerializer(serializers.ModelSerializer):
    theme = serializers.CharField(source='theme.title')
    user = serializers.CharField(source='user.username')

    class Meta:
        model = ReplayTheme
        fields = ('id', 'title', 'content', 'theme', 'user', 'add_time')



