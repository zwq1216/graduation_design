# Generated by Django 2.0 on 2019-05-03 10:36

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0002_auto_20190427_2017'),
    ]

    operations = [
        migrations.AlterField(
            model_name='news',
            name='add_time',
            field=models.DateTimeField(default=datetime.datetime(2019, 5, 3, 18, 36, 29, 531982), verbose_name='发布时间'),
        ),
    ]