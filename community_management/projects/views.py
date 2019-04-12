from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Project
from .serializers import ProjectCreateSerializer, ProjectUpdateSerializer, ProjectDetailSerializer


class ProjectCreateView(generics.CreateAPIView):
    """创建项目"""
    serializer_class = ProjectCreateSerializer
    permission_classes = (IsAuthenticated,)


class ProjectUpdateView(generics.UpdateAPIView):
    """更新项目"""
    queryset = Project.objects.all()
    serializer_class = ProjectUpdateSerializer
    permission_classes = (IsAuthenticated,)


class ProjectRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    """项目详情、删除项目"""
    queryset = Project.objects.all()
    serializer_class = ProjectDetailSerializer
    permission_classes = (IsAuthenticated,)


class ProjectListView(generics.ListAPIView):
    """项目列表"""
    queryset = Project.objects.all()
    serializer_class = ProjectDetailSerializer
    permission_classes = (IsAuthenticated,)




