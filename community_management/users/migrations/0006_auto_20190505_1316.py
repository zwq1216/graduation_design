# Generated by Django 2.0 on 2019-05-05 05:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_remove_applyrecord_users'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='applyrecord',
            name='obj_id',
        ),
        migrations.AlterField(
            model_name='applyrecord',
            name='type',
            field=models.IntegerField(choices=[(0, '申请发布资料'), (1, '申请发布项目'), (2, '申请创建社团')], default=0, verbose_name='申请类型'),
        ),
    ]