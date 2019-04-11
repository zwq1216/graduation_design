from django.db import models

from users.models import User
from utils.constant import PROJECT_STATUS


class Project(models.Model):
    """项目"""

    name = models.CharField(max_length=50, verbose_name='项目名称')
    desc = models.TextField(max_length=500, blank=True, null=True, verbose_name='项目描述')
    file = models.FileField(upload_to='project/%Y_%m', verbose_name='项目需求文件路径')
    pub_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pubuser', verbose_name='发布者')
    status = models.IntegerField(default=0, choices=PROJECT_STATUS, verbose_name='项目状态')
    remuneration = models.IntegerField(default=0, blank=True, null=True, verbose_name='酬金')
    apply_user = models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL,
                                   related_name='papplyuser', verbose_name='申请人')
    add_time = models.DateTimeField(auto_now_add=True, verbose_name='添加时间')

    class Meta:
        verbose_name = '项目'
        verbose_name_plural = verbose_name


