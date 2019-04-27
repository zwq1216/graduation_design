# Generated by Django 2.0 on 2019-04-27 12:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Data',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='资料名称')),
                ('desc', models.TextField(blank=True, default='这个人太懒什么都不介绍', max_length=500, null=True, verbose_name='描述')),
                ('status', models.IntegerField(choices=[(0, '未处理'), (1, '处理中'), (2, '未通过'), (3, '已通过')], default=0, verbose_name='资料状态')),
                ('disclosure', models.IntegerField(choices=[(0, '所有人可见'), (1, '仅所在社团人员可见')], default=0, verbose_name='公开度')),
                ('add_time', models.DateTimeField(auto_now_add=True, verbose_name='添加时间')),
            ],
            options={
                'verbose_name': '资料',
                'verbose_name_plural': '资料',
            },
        ),
        migrations.CreateModel(
            name='DataCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True, verbose_name='分类名称')),
                ('add_time', models.DateTimeField(auto_now_add=True, verbose_name='添加时间')),
            ],
            options={
                'verbose_name': '资料分类',
                'verbose_name_plural': '资料分类',
            },
        ),
    ]
