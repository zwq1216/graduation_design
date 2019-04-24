from django.db import models

from users.local_model import College
from utils.constant import COMMUNITY_TYPE, COMMUNITY_FILE_TYPE


class Community(models.Model):
    """社团信息"""

    no = models.CharField(max_length=30, blank=False, null=False, unique=True, verbose_name='社团编号')
    name = models.CharField(max_length=50, blank=False, null=False, unique=True, verbose_name='社团名称')
    objective = models.CharField(max_length=200, blank=False, null=False, verbose_name='社团宗旨')
    image = models.FileField(upload_to='community/%Y_%m', default="default/community.png")
    desc = models.TextField(max_length=500, default='这个社团的人很懒，什么都没留下', verbose_name='社团描述')
    college = models.ForeignKey(College, blank=True, null=True, on_delete=models.SET_NULL, verbose_name='所属学院')
    community_type = models.IntegerField(default=6, choices=COMMUNITY_TYPE, verbose_name='社团类型')
    plan_count = models.IntegerField(default=0, verbose_name='计划人数')
    real_count = models.IntegerField(default=0, verbose_name='实际人数')
    is_dalete = models.BooleanField(default=False, verbose_name='删除')
    score = models.IntegerField(default=100, verbose_name='社团积分')
    create_date = models.DateTimeField(auto_now_add=True, verbose_name='创建社团日期')
    dis_date = models.DateTimeField(blank=True, null=True, verbose_name='解散社团日期')

    class Meta:
        verbose_name = '社团信息'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class RecentPlan(models.Model):
    """社团近期计划"""

    title = models.CharField(max_length=50, blank=False, null=False, verbose_name='主题')
    file = models.FileField(upload_to='community_recent_plan/%Y_%m', default='', verbose_name='近期规划文件')
    community = models.ForeignKey(Community, on_delete=models.CASCADE, verbose_name='所属社团')
    add_time = models.DateTimeField(auto_now=True, verbose_name='添加时间')

    class Meta:
        verbose_name = '社团近期规划'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title


class CommunityFile(models.Model):
    """社团相关文件"""

    name = models.CharField(max_length=50, blank=False, null=False, verbose_name='文件名称')
    file = models.FileField(upload_to='community_fille/%Y_%m', default='', verbose_name='文件路径')
    community_file_type = models.IntegerField(default=3, choices=COMMUNITY_FILE_TYPE, verbose_name='文件类型')
    community = models.ForeignKey(Community, on_delete=models.CASCADE, verbose_name='所属社团')
    add_time = models.DateTimeField(auto_now_add=True, verbose_name='添加时间')

    class Meta:
        verbose_name = '社团相关文件'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class Announcement(models.Model):
    """社团公告"""
    title = models.CharField(max_length=20, verbose_name='公告标题')
    desc = models.CharField(max_length=200, verbose_name='公告内容')
    community = models.ForeignKey(Community, on_delete=models.CASCADE, verbose_name='所属社团')
    add_time = models.DateTimeField(auto_now_add=True, verbose_name='添加时间')

    class Meta:
        verbose_name = '社团公告'
        verbose_name_plural = verbose_name


class Honor(models.Model):
    """社团荣誉"""
    name = models.CharField(max_length=30, verbose_name='荣誉名称')
    date = models.DateTimeField(verbose_name='荣誉获取时间')
    community = models.ForeignKey(Community, on_delete=models.CASCADE, verbose_name='所属社团')

    class Meta:
        verbose_name = '社团荣誉'
        verbose_name_plural = verbose_name


