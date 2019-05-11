from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from utils.filter_backends import CustomDjangoFilterBackend
from django.db.models import Q

from .models import DataCategory, Data
from .serializers import CategorySerializer, DataCreateSerializer, DataUpdateSerializer, DataDetailSerializer


class CategoryListCreateView(generics.ListCreateAPIView):
    """创建资料分类、资料分类列表"""
    queryset = DataCategory.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (IsAuthenticated,)


class CategoryRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    """资料分类详情、更新、删除"""
    queryset = DataCategory.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (IsAuthenticated,)


class DataCreateView(generics.CreateAPIView):
    """资料创建"""
    serializer_class = DataCreateSerializer
    permission_classes = (IsAuthenticated,)


class DataUpdateView(generics.UpdateAPIView):
    """资料更新"""
    queryset = Data.objects.all()
    serializer_class = DataUpdateSerializer
    permission_classes = (IsAuthenticated,)


class DataRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    """资料详情、删除资料"""
    queryset = Data.objects.all()
    serializer_class = DataDetailSerializer
    permission_classes = (IsAuthenticated,)


class DataListView(generics.ListAPIView):
    """资料列表"""
    queryset = Data.objects.all()
    serializer_class = DataDetailSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (CustomDjangoFilterBackend,)
    filterset_fields = ('status', 'disclosure', 'type__name', 'name')

    def get_queryset(self):
        top5 = self.request.GET.get('top5', None)
        user = self.request.user
        if top5:
            return self.queryset.filter(disclosure=0, status=3).order_by('-add_time')[:5]

        if user.role == 3 or user.role == 4:
            queryset = self.queryset.filter(disclosure=0).order_by('-add_time')
        else:
            queryset = self.queryset.filter().order_by('-add_time')

        return queryset



