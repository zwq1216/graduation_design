# Generated by Django 2.0 on 2019-05-08 07:49

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0009_auto_20190507_1910'),
    ]

    operations = [
        migrations.AlterField(
            model_name='news',
            name='add_time',
            field=models.DateTimeField(default=datetime.datetime(2019, 5, 8, 15, 49, 41, 202545), verbose_name='发布时间'),
        ),
    ]