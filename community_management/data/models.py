from django.db import models

from users.models import User
from users.local_model import DataPackage
from utils.constant import DATA_STATUS, DISCLOSURE


class DataCategory(models.Model):
    """资料分类"""

    name = models.CharField(max_length=50, unique=True, verbose_name='分类名称')
    add_time = models.DateTimeField(auto_now_add=True, verbose_name='添加时间')

    class Meta:
        verbose_name = '资料分类'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class Data(models.Model):
    """上传资料"""

    name = models.CharField(max_length=50, verbose_name='资料名称')
    desc = models.TextField(max_length=500, blank=True, null=True, default='这个人太懒什么都不介绍', verbose_name='描述')
    status = models.IntegerField(default=0, choices=DATA_STATUS, verbose_name='资料状态')
    type = models.ForeignKey(DataCategory, blank=True, null=True, on_delete=models.SET_NULL, verbose_name='所属分类')
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='所属用户')
    data = models.OneToOneField(DataPackage, on_delete=models.CASCADE, verbose_name='资料包')
    disclosure = models.IntegerField(default=0, choices=DISCLOSURE, verbose_name='公开度')
    add_time = models.DateTimeField(auto_now_add=True, verbose_name='添加时间')

    class Meta:
        verbose_name = '资料'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name



