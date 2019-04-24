from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from utils.filter_backends import CustomDjangoFilterBackend

from .models import News, NewsImages
from .serializers import NewsCreateSerializer, NewsUpdateSerializer, NewsRetrieveSerializer


class NewsCreateView(generics.CreateAPIView):
    """创建新闻活动"""
    serializer_class = NewsCreateSerializer
    permission_classes = (IsAuthenticated,)


class NewsUpdateView(generics.UpdateAPIView):
    """更新新闻活动"""
    queryset = News.objects.all()
    serializer_class = NewsUpdateSerializer
    permission_classes = (IsAuthenticated,)


class NewsRetrieveView(generics.RetrieveAPIView):
    """新闻活动详情、删除新闻活动"""
    queryset = News.objects.all()
    serializer_class = NewsRetrieveSerializer
    permission_classes = (IsAuthenticated,)

    def retrieve(self, request, *args, **kwargs):
        obj = self.get_object()
        count = obj.count + 0.5
        obj.count = count
        obj.save()

        return super().retrieve(request, *args, **kwargs)


class NewsListView(generics.ListAPIView):
    """新闻活动列表"""
    queryset = News.objects.all()
    serializer_class = NewsRetrieveSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (CustomDjangoFilterBackend,)
    filterset_fields = ('name',)

    def get_queryset(self):
        top5 = self.request.GET.get('top5', None)

        if top5:
            return self.queryset.all().order_by('-add_time')[:5]

        return self.queryset.all()


