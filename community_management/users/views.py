from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated

from .models import User, ApplyRecord
from .local_model import College, Grade
from .serializers import UserCreateSerializer, UserUpdateSerializer, UserAvastarSerializer, \
    UserRetrieveDestroySerializer, ApplyRecordCreateSerializer, ApplyRecordUpdateSerializer, \
    ApplyRecordRetrieveDestroySerializer, CollegeListCreateSerializer, CollegeUpdateSerializer


class UserCreateView(generics.CreateAPIView):
    """创建用户"""
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer


class UserUpdateView(generics.UpdateAPIView):
    """编辑用户"""
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer


class UserAvastarView(generics.UpdateAPIView):
    """修改用户头像"""
    queryset = User.objects.all()
    serializer_class = UserAvastarSerializer


class UserRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    """用户删除、用户详情"""
    queryset = User.objects.all()
    serializer_class = UserRetrieveDestroySerializer


class UserListView(generics.ListAPIView):
    """用户列表"""
    queryset = User.objects.all()
    serializer_class = UserRetrieveDestroySerializer


class ApplyRecordCreateView(generics.CreateAPIView):
    """创建申请记录"""
    serializer_class = ApplyRecordCreateSerializer
    permission_classes = (IsAuthenticated,)


class ApplyRecordUpdateView(generics.UpdateAPIView):
    """更新申请记录"""
    queryset = ApplyRecord.objects.all()
    serializer_class = ApplyRecordUpdateSerializer
    permission_classes = (IsAuthenticated,)


class ApplyRecordRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    """记录详情、删除记录"""
    queryset = ApplyRecord.objects.all()
    serializer_class = ApplyRecordRetrieveDestroySerializer
    permission_classes = (IsAuthenticated,)


class ApplyRecordListView(generics.ListAPIView):
    """记录列表"""
    queryset = ApplyRecord.objects.all()
    serializer_class = ApplyRecordRetrieveDestroySerializer
    permission_classes = (IsAuthenticated,)


class CollegeListCreateView(generics.ListCreateAPIView):
    """添加学院，学院列表"""
    queryset = College.objects.all()
    serializer_class = CollegeListCreateSerializer
    permission_classes = (IsAuthenticated,)


class CollegeRrtrieveDestoryView(generics.RetrieveDestroyAPIView):
    """删除学院，学院详情"""
    queryset = College.objects.all()
    serializer_class = CollegeListCreateSerializer
    permission_classes = (IsAuthenticated,)


class CollegeUpdateView(generics.UpdateAPIView):
    """更新学院信息"""
    queryset = College.objects.all()
    serializer_class = CollegeUpdateSerializer
    permission_classes = (IsAuthenticated,)


