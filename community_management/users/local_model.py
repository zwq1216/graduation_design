from django.db import models


class College(models.Model):
    """学院信息"""

    name = models.CharField(max_length=50, blank=False, null=False, verbose_name='学院名称')
    no = models.CharField(max_length=30, blank=False, null=False, unique=True, verbose_name='学院编号')
    add_time = models.DateTimeField(auto_now_add=True, verbose_name='添加时间')

    class Meta:
        verbose_name = '学院信息'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class Grade(models.Model):
    """班级信息"""

    name = models.CharField(max_length=50, blank=False, null=False, verbose_name='班级名称')
    no = models.CharField(max_length=30, blank=False, null=False, unique=True, verbose_name='班级编号')
    college = models.ForeignKey(College, on_delete=models.CASCADE, verbose_name='所属学院')
    add_time = models.DateTimeField(auto_now_add=True, verbose_name='添加时间')

    class Meta:
        verbose_name = '班级信息'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class Register(models.Model):
    """注册信息"""

    sno = models.CharField(max_length=20, blank=False, null=False, unique=True, db_index=True, verbose_name='学号/工号')
    name = models.CharField(max_length=30, verbose_name='真实姓名')
    no = models.CharField(max_length=30, blank=False, null=False, verbose_name='所属编号')

    class Meta:
        verbose_name = '注册信息'
        verbose_name_plural = verbose_name


class DataPackage(models.Model):
    """资料包"""

    name = models.CharField(max_length=50, verbose_name='包文件名称')
    file = models.FileField(upload_to='data/%Y_%m', verbose_name='文件路径')
    add_time = models.DateTimeField(auto_now_add=True, verbose_name='添加时间')

    class Meta:
        verbose_name = '资料包'
        verbose_name_plural = verbose_name
        db_table = 'upload_file'

    def __str__(self):
        return self.name



