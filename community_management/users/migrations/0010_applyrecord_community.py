# Generated by Django 2.0 on 2019-05-09 07:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0002_auto_20190427_2017'),
        ('users', '0009_auto_20190508_2256'),
    ]

    operations = [
        migrations.AddField(
            model_name='applyrecord',
            name='community',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='community.Community', verbose_name='申请社团对象'),
        ),
    ]