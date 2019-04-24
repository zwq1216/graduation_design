from django.db import models
from datetime import datetime

from users.models import User


class News(models.Model):
    """新闻活动"""

    name = models.CharField(max_length=50, verbose_name='名称')
    desc = models.TextField(max_length=1000, verbose_name='描述')
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='发布者')
    count = models.IntegerField(default=0, verbose_name='浏览量')
    add_time = models.DateTimeField(default=datetime.now(), verbose_name='发布时间')

    class Meta:
        verbose_name = '新闻活动'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class NewsImages(models.Model):
    """活动图片"""

    name = models.CharField(max_length=100, verbose_name='图片名称')
    file = models.FileField(upload_to='mews/%Y_%m', verbose_name='图片路径')
    news = models.ForeignKey(News, on_delete=models.CASCADE, verbose_name='所属新闻活动')
    add_time = models.DateTimeField(auto_now_add=True, verbose_name='添加时间')

    class Meta:
        verbose_name = '活动图片'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class Praise(models.Model):
    """点赞"""

    news = models.ForeignKey(News, on_delete=models.CASCADE, verbose_name='所属活动')
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='用户')
    add_time = models.DateTimeField(auto_now_add=True, verbose_name='点赞时间')

    class Meta:
        verbose_name = '点赞'
        verbose_name_plural = verbose_name



