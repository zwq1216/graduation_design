from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from utils.filter_backends import CustomDjangoFilterBackend

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

    def destroy(self, request, *args, **kwargs):
        user = request.user
        instance = self.get_object()
        if user.role != 3 and user.role != 4 and instance.user != user:

            return Response(data={'error': ['无权删除']}, status=status.HTTP_400_BAD_REQUEST)

        return super().destroy(request, *args, **kwargs)


class DataListView(generics.ListAPIView):
    """资料列表"""
    queryset = Data.objects.all()
    serializer_class = DataDetailSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (CustomDjangoFilterBackend,)
    filterset_fields = ('status', 'disclosure', 'type__name', 'name', 'user')

    def get_queryset(self):
        top5 = self.request.GET.get('top5', None)
        manage = self.request.GET.get('manage', None)
        user = self.request.user
        queryset = self.queryset.all().order_by('-add_time')
        if top5:
            return self.queryset.filter(disclosure=0, status=3).order_by('-add_time')[:5]
        if manage:
            if user.role != 3 and user.role != 4:
                queryset = queryset.filter(user=user)
        if user.role == 3 or user.role == 4:
            queryset = queryset.filter(disclosure=0).order_by('-add_time')

        return queryset



