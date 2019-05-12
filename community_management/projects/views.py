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

    def destroy(self, request, *args, **kwargs):
        user = request.user
        instance = self.get_object()
        if user.role != 3 and user.role != 4 and instance.user != user:
            return Response(data={'error': ['无权删除']}, status=status.HTTP_400_BAD_REQUEST)

        return super().destroy(request, *args, **kwargs)


class ProjectListView(generics.ListAPIView):
    """项目列表"""
    queryset = Project.objects.all()
    serializer_class = ProjectDetailSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (CustomDjangoFilterBackend,)
    filterset_fields = ('name', 'status', 'pub_user')

    def get_queryset(self):
        request = self.request
        top5 = request.GET.get('top5', None)
        manage = request.GET.get('manage', None)
        all = request.GET.get('all', None)
        user = request.user
        queryset = self.queryset.all().order_by('-add_time')
        if top5:
            queryset = queryset.filter(Q(status=0) | Q(status=1) | Q(status=2))[:5]
        if all:
            queryset = queryset.filter(Q(status=0) | Q(status=1) | Q(status=2))
        if manage:
            if user.role != 3 and user.role != 4:
                queryset = queryset.filter(pub_user=user)

        return queryset




