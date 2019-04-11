from django.db import models

from DjangoUeditor.models import UEditorField
from users.models import User


class DiscussTheme(models.Model):
    """主题帖"""

    title = models.CharField(max_length=100, verbose_name='标题')
    content = UEditorField(width=600, height=300, toolbars="full", imagePath="discuss/images/",
                           filePath="discuss/files/", upload_settings={"imageMaxSize": 1204000},
                           settings={}, verbose_name='内容')
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='所属用户')
    add_time = models.DateTimeField(auto_now_add=True, verbose_name='添加时间')

    class Meta:
        verbose_name = '主题帖'
        verbose_name_plural = verbose_name


class ReplayTheme(models.Model):
    """回帖"""

    title = models.CharField(max_length=100, verbose_name='标题')
    content = UEditorField(width=600, height=300, toolbars="full", imagePath="discuss/images/",
                           filePath="discuss/files/", upload_settings={"imageMaxSize": 1204000},
                           settings={}, verbose_name='内容')
    theme = models.ForeignKey(DiscussTheme, on_delete=models.CASCADE, verbose_name='主贴')
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='用户')
    add_time = models.DateTimeField(auto_now_add=True, verbose_name='添加时间')

    class Meta:
        verbose_name = '回帖'
        verbose_name_plural = verbose_name

