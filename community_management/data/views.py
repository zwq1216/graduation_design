from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

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



