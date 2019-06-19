from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from datetime import datetime
from utils.filter_backends import CustomDjangoFilterBackend

from .models import Community, RecentPlan
from users.models import ScoreRecord, User
from .serializers import CommunityCreateSerializer, CommunityRetrieveSerializer, CommunityUpdateSerializer, \
    ScoreRecordSerializer, RecentPlanCreateUpdateSerializer, RecentPlanRetrieveDestroySerializer


class CommunityCreateView(generics.CreateAPIView):
    """创建社团"""
    serializer_class = CommunityCreateSerializer
    permission_classes = (IsAuthenticated,)


class CommunityRetrieveView(generics.RetrieveAPIView):
    """社团详情"""
    queryset = Community.objects.all()
    serializer_class = CommunityRetrieveSerializer
    permission_classes = (IsAuthenticated,)


class CommunityDestroyView(generics.DestroyAPIView):
    """删除社团"""
    queryset = Community.objects.all()
    serializer_class = CommunityRetrieveSerializer
    permission_classes = (IsAuthenticated,)

    def destroy(self, request, *args, **kwargs):
        user = request.user
        if user.role != 4:
            return Response(data={'error': ['删除失败']}, status=status.HTTP_400_BAD_REQUEST)
        instance = self.get_object()
        objs = User.objects.filter(community=instance)
        for obj in objs:
            obj.role = 0
            obj.save()
        self.perform_destroy(instance)
        return Response(data={}, status=status.HTTP_200_OK)


class CommunityUpdateView(generics.UpdateAPIView):
    """更新社团"""
    queryset = Community.objects.all()
    serializer_class = CommunityUpdateSerializer
    permission_classes = (IsAuthenticated,)


class CommunityListView(generics.ListAPIView):
    """社团列表"""
    queryset = Community.objects.all()
    serializer_class = CommunityRetrieveSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (CustomDjangoFilterBackend,)
    filterset_fields = ('name',)

    def get_queryset(self):
        top5 = self.request.GET.get('top5', None)
        if top5:
            return self.queryset.all().order_by('-score')[:5]

        return self.queryset.all().order_by('-score')

# class ScoreListCreateView(generics.ListCreateAPIView):
#     """社团积分创建、社团积分列表"""
#     queryset = Score.objects.all()
#     serializer_class = ScoreSerializer
#     permission_classes = (IsAuthenticated,)


# class ScoreRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
#     """社团详情、删除社团、更新社团信息"""
#     queryset = Score.objects.all()
#     serializer_class = ScoreSerializer
#     permission_classes = (IsAuthenticated,)


class ScoreRecordListCreateView(generics.ListCreateAPIView):
    """积分记录创建、积分记录列表"""
    queryset = ScoreRecord.objects.all()
    serializer_class = ScoreRecordSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        queryset = self.queryset.all()
        id = request.GET.get('id', None)
        data = {
            "deducts": [],
            "date": []
        }
        try:
            community = Community.objects.get(id=id)
            queryset = queryset.filter(community=community).order_by('-add_time')[:30]
            deducts = [obj.deduct for obj in queryset]
            date = [datetime.strftime(obj.add_time, '%Y-%m-%d') for obj in queryset]
            data = {
                "deducts": deducts,
                "date": date
            }
            return Response(data=data, status=status.HTTP_200_OK)
        except Exception as e:
            del e
            return Response(data=data, status=status.HTTP_200_OK)


class ScoreRecordRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """积分记录详情、删除积分记录、更新积分记录"""
    queryset = ScoreRecord.objects.all()
    serializer_class = ScoreRecordSerializer
    permission_classes = (IsAuthenticated,)


class RecentPlanCreateView(generics.CreateAPIView):
    """创建近期计划"""
    serializer_class = RecentPlanCreateUpdateSerializer
    permission_classes = (IsAuthenticated,)


class RecentPlanUpdateView(generics.UpdateAPIView):
    """修改近期计划"""
    queryset = RecentPlan.objects.all()
    serializer_class = RecentPlanCreateUpdateSerializer
    permission_classes = (IsAuthenticated,)


class RecentPlayRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    """删除近期计划、修改近期详情"""
    queryset = RecentPlan.objects.all()
    serializer_class = RecentPlanRetrieveDestroySerializer
    permission_classes = (IsAuthenticated,)


class RecentPlayListView(generics.ListCreateAPIView):
    """修改近期列表"""
    queryset = RecentPlan.objects.all()
    serializer_class = RecentPlanRetrieveDestroySerializer
    permission_classes = (IsAuthenticated,)

