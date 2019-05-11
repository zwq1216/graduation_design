from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from utils.filter_backends import CustomDjangoFilterBackend
from django.db.models import Q

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
    filterset_fields = ('name', 'status')

    def get_queryset(self):
        request = self.request
        top5 = request.GET.get('top5', None)
        all = request.GET.get('all', None)

        if top5:
            return self.queryset.filter(Q(status=0) | Q(status=1) | Q(status=2)).order_by('-add_time')[:5]

        if all:
            return self.queryset.filter(Q(status=0) | Q(status=1) | Q(status=2)).order_by('-add_time')

        return self.queryset.all().order_by('-add_time')




