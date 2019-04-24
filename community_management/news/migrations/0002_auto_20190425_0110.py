# Generated by Django 2.0 on 2019-04-24 17:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('news', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='praise',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='用户'),
        ),
        migrations.AddField(
            model_name='newsimages',
            name='news',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='news.News', verbose_name='所属新闻活动'),
        ),
        migrations.AddField(
            model_name='news',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='发布者'),
        ),
    ]
