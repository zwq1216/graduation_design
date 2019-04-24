from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from utils.filter_backends import CustomDjangoFilterBackend

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
    filter_backends = (CustomDjangoFilterBackend,)
    filterset_fields = ('name',)

    def get_queryset(self):
        request = self.request
        top5 = request.GET.get('top5', None)

        if top5:
            return self.queryset.all().order_by('-add_time')[:5]

        return self.queryset.all().order_by('-add_time')




