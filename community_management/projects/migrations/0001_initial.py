# Generated by Django 2.0 on 2019-04-24 17:10

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='项目名称')),
                ('desc', models.TextField(blank=True, max_length=500, null=True, verbose_name='项目描述')),
                ('file', models.FileField(upload_to='project/%Y_%m', verbose_name='项目需求文件路径')),
                ('status', models.IntegerField(choices=[(0, '悬赏中'), (1, '已承接'), (2, '已完成')], default=0, verbose_name='项目状态')),
                ('remuneration', models.IntegerField(blank=True, default=0, null=True, verbose_name='酬金')),
                ('add_time', models.DateTimeField(auto_now_add=True, verbose_name='添加时间')),
            ],
            options={
                'verbose_name': '项目',
                'verbose_name_plural': '项目',
            },
        ),
    ]
