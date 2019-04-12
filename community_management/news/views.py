from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import News, NewsImages
from .serializers import NewsCreateSerializer, NewsUpdateSerializer, NewsRetrieveDestroySerializer


class NewsCreateView(generics.CreateAPIView):
    """创建新闻活动"""
    serializer_class = NewsCreateSerializer
    permission_classes = (IsAuthenticated,)


class NewsUpdateView(generics.UpdateAPIView):
    """更新新闻活动"""
    queryset = News.objects.all()
    serializer_class = NewsUpdateSerializer
    permission_classes = (IsAuthenticated,)


class NewsRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    """新闻活动详情、删除新闻活动"""
    queryset = News.objects.all()
    serializer_class = NewsRetrieveDestroySerializer
    permission_classes = (IsAuthenticated,)


class NewsListView(generics.ListAPIView):
    """新闻活动列表"""
    queryset = News.objects.all()
    serializer_class = NewsRetrieveDestroySerializer
    permission_classes = (IsAuthenticated,)
