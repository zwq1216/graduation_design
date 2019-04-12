"""community_management URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from django.views.static import serve
from community_management.settings import MEDIA_ROOT

urlpatterns = [
    path('admin/', admin.site.urls),

    # 用户相关
    path('api/users/', include(('users.urls', 'users'), namespace='users')),

    # 社团相关
    path('api/community/', include(('community.urls', 'community'), namespace='community')),

    # 资料相关
    path('api/data/', include(('data.urls', 'data'), namespace='data')),

    # 项目相关
    path('api/projects/', include(('projects.urls', 'projects'), namespace='projects')),

    # 富文本配置
    path('ueditor/', include('DjangoUeditor.urls')),

    # 上传文件设置
    url(r'^media/(?P<path>.*)$', serve, {'document_root': MEDIA_ROOT}),

    # REST自带认证登录
    path('auth-api', include('rest_framework.urls', namespace='rest_framework')),

]
