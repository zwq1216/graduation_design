from django.contrib.auth import login, logout, update_session_auth_hash
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import User, ApplyRecord
from .local_model import College, Grade
from .serializers import UserCreateSerializer, UserUpdateSerializer, UserAvastarSerializer, \
    UserRetrieveDestroySerializer, ApplyRecordCreateSerializer, ApplyRecordUpdateSerializer, \
    ApplyRecordRetrieveDestroySerializer, CollegeListCreateSerializer, CollegeUpdateSerializer, LoginSerializer


class LoginView(generics.GenericAPIView):
    """用户登录"""
    serializer_class = LoginSerializer

    def post(self, request):
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = User.objects.get(username=request.data['username'])
            login(request, user)
            data = {"id": request.user.id, "username": request.user.username}
            return Response(data=data, status=status.HTTP_200_OK)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    """用户登出"""
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        logout(request)

        return Response(data={}, status=status.HTTP_200_OK)


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


