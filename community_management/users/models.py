from django.db import models
from django.contrib.auth.models import AbstractUser

from community.models import Community
from .local_model import College, Grade
from utils.constant import ROLE, APPLY_STATUS, APPLY_TYPE


class User(AbstractUser):
    """用户信息"""

    sno = models.CharField(max_length=20, blank=False, null=False, unique=True, verbose_name='用户编号')
    realname = models.CharField(max_length=40, blank=False, null=False, verbose_name="真实姓名")
    grade = models.ForeignKey(Grade, blank=True, null=True, on_delete=models.SET_NULL, verbose_name='所属班级')
    role = models.IntegerField(default=0, choices=ROLE, blank=False, null=False, verbose_name='用户角色')
    community = models.ForeignKey(Community, blank=True, null=True, on_delete=models.SET_NULL, verbose_name='所属社团')
    image = models.FileField(upload_to='avastar/%Y_%m', default="default/user.png")
    phone = models.CharField(max_length=11, verbose_name='手机号')
    leave_date = models.DateTimeField(blank=True, null=True, verbose_name='离开日期')

    class Meta:
        verbose_name = '用户信息'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.username


class ApplyRecord(models.Model):
    """申请记录"""

    title = models.CharField(max_length=30, blank=False, null=False, verbose_name='申请标题')
    apply_data = models.FileField(upload_to='apply/%Y_%m', verbose_name='申请材料路径')
    type = models.IntegerField(default=0, choices=APPLY_TYPE, verbose_name='申请类型')
    apply_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applyuser', verbose_name='申请人')
    status = models.IntegerField(default=0, choices=APPLY_STATUS, verbose_name='申请状态')
    deal_user = models.ForeignKey(User, default='', blank=True, null=True, related_name='dealuser',
                                  on_delete=models.SET_NULL, verbose_name='处理人')
    add_time = models.DateTimeField(auto_now_add=True, verbose_name='添加时间')

    class Meta:
        verbose_name = '申请记录'
        verbose_name_plural = verbose_name


class Score(models.Model):
    """社团积分"""
    score = models.IntegerField(default=0, verbose_name='积分')
    update_time = models.DateTimeField(auto_now_add=True, verbose_name='更新时间')
    community = models.OneToOneField(Community, on_delete=models.CASCADE, verbose_name='所属社团')

    class Meta:
        verbose_name = '社团积分'
        verbose_name_plural = verbose_name
        db_table = 'community_score'


class ScoreRecord(models.Model):
    """扣除积分的记录"""

    score = models.ForeignKey(Score, on_delete=models.CASCADE, verbose_name='所属积分')
    deduct = models.IntegerField(default=0, verbose_name='扣除的积分')
    desc = models.TextField(max_length=500, verbose_name='原因')
    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL, verbose_name='用户')
    add_time = models.DateTimeField(auto_now_add=True, verbose_name='添加时间')

    class Meta:
        verbose_name = '扣除积分的记录'
        verbose_name_plural = verbose_name
        db_table = 'community_score_record'
