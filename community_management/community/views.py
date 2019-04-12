from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Community, RecentPlan
from users.models import Score, ScoreRecord
from .serializers import CommunityCreateSerializer, CommunityRetrieveDestroySerializer, CommunityUpdateSerializer, \
    ScoreSerializer, ScoreRecordSerializer, RecentPlanCreateUpdateSerializer, RecentPlanRetrieveDestroySerializer


class CommunityCreateView(generics.CreateAPIView):
    """创建社团"""
    serializer_class = CommunityCreateSerializer
    permission_classes = (IsAuthenticated,)


class CommunityRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    """社团详情、删除社团"""
    queryset = Community.objects.all()
    serializer_class = CommunityRetrieveDestroySerializer
    permission_classes = (IsAuthenticated,)


class CommunityUpdateView(generics.UpdateAPIView):
    """更新社团"""
    queryset = Community.objects.all()
    serializer_class = CommunityUpdateSerializer
    permission_classes = (IsAuthenticated,)


class CommunityListView(generics.ListAPIView):
    """社团列表"""
    queryset = Community.objects.all()
    serializer_class = CommunityRetrieveDestroySerializer
    permission_classes = (IsAuthenticated,)


class ScoreListCreateView(generics.ListCreateAPIView):
    """社团积分创建、社团积分列表"""
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer
    permission_classes = (IsAuthenticated,)


class ScoreRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """社团详情、删除社团、更新社团信息"""
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer
    permission_classes = (IsAuthenticated,)


class ScoreRecordListCreateView(generics.ListCreateAPIView):
    """积分记录创建、积分记录列表"""
    queryset = ScoreRecord.objects.all()
    serializer_class = ScoreRecordSerializer
    permission_classes = (IsAuthenticated,)


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

