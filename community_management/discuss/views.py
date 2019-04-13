from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import DiscussTheme, ReplayTheme
from .serializers import DiscussCreateSerializer, DiscussDetailSerializer, ReplayCreateSerializer, \
    ReplayDetailSerializer


class DiscussCreateView(generics.CreateAPIView):
    """创建主贴"""
    serializer_class = DiscussCreateSerializer
    permission_classes = (IsAuthenticated,)


class DiscussRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    """删除主贴、主贴详情"""
    queryset = DiscussTheme.objects.all()
    serializer_class = DiscussDetailSerializer
    permission_classes = (IsAuthenticated,)


class DiscussListView(generics.ListAPIView):
    """主贴列表"""
    queryset = DiscussTheme.objects.all()
    serializer_class = DiscussDetailSerializer
    permission_classes = (IsAuthenticated,)


class ReplayCreateView(generics.CreateAPIView):
    """创建回帖"""
    serializer_class = ReplayCreateSerializer
    permission_classes = (IsAuthenticated,)


class ReplayRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    """删除回帖、回帖详情"""
    queryset = ReplayTheme.objects.all()
    serializer_class = ReplayDetailSerializer
    permission_classes = (IsAuthenticated,)


class ReplayListView(generics.ListAPIView):
    """回帖列表"""
    queryset = ReplayTheme.objects.all()
    serializer_class = ReplayDetailSerializer
    permission_classes = (IsAuthenticated,)




