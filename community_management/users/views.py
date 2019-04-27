from django.contrib.auth import login, logout
from django.http import HttpResponse
from django.db.models import Q
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import random

from community_management.settings import INDEXHTML
from .models import User, ApplyRecord
from .local_model import College
from .serializers import UserCreateSerializer, UserUpdateSerializer, UserAvastarSerializer, \
    UserRetrieveDestroySerializer, ApplyRecordCreateSerializer, ApplyRecordUpdateSerializer, \
    ApplyRecordRetrieveDestroySerializer, CollegeListCreateSerializer, CollegeUpdateSerializer, LoginSerializer


class HomeView(APIView):
    """系统入口"""
    def get(self, request):
        try:
            with open(INDEXHTML, encoding='utf-8') as f:
                return HttpResponse(f.read())

        except IOError:
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run `yarn run build` to test the production version.
                """,
                status=501,
            )


class Captcha(APIView):
    """生成验证码"""
    def get(self, request):
        chars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q',
                 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L',
                 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        code = ''
        for i in range(4):
            char = chars[random.randint(0, 57)]
            code += str(char)
        request.session["valid_code"] = code
        return Response(data={'code': code}, status=status.HTTP_200_OK)


class LoginView(generics.GenericAPIView):
    """用户登录"""
    serializer_class = LoginSerializer

    def post(self, request):
        agree = request.scheme
        host = request.META['HTTP_HOST']
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=request.data, context={'request': request})

        if serializer.is_valid():
            user = User.objects.get(Q(username=request.data['username']) | Q(sno=request.data['username']))
            login(request, user)
            image = agree + '://' + host + request.user.image.url
            data = {"id": request.user.id, "username": request.user.username,
                    'role': request.user.role, 'image': image}
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


