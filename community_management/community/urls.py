from django.urls import path

from .views import CommunityCreateView, CommunityRetrieveDestroyView, CommunityUpdateView, CommunityListView, \
    ScoreListCreateView, ScoreRetrieveUpdateDestroyView, ScoreRecordListCreateView, ScoreRecordRetrieveUpdateDestroyView,\
    RecentPlanCreateView, RecentPlanUpdateView, RecentPlayRetrieveDestroyView, RecentPlayListView


# 社团相关
urlpatterns = [
    path('', CommunityListView.as_view(), name='list-community'),
    path('create/', CommunityCreateView.as_view(), name='create-community'),
    path('ret_del/<int:pk>/', CommunityRetrieveDestroyView.as_view(), name='ret-del-community'),
    path('update/<int:pk>/', CommunityUpdateView.as_view(), name='update-community'),
]

# 社团积分相关
urlpatterns += [
    path('score/create_list/', ScoreListCreateView.as_view(), name='create-list-score'),
    path('score/ret_update_del/<int:pk>/', ScoreRetrieveUpdateDestroyView.as_view(), name='ret-update-del-score'),
]

# 积分记录相关
urlpatterns += [
    path('record/create_list/', ScoreRecordListCreateView.as_view(), name='create-list-record'),
    path('record/ret_update_del/<int:pk>/', ScoreRecordRetrieveUpdateDestroyView.as_view(), name='ret-update-del-record'),
]

# 近期计划相关
urlpatterns += [
    path('play/', RecentPlayListView.as_view(), name='list-play'),
    path('play/create/', RecentPlanCreateView.as_view(), name='create-play'),
    path('play/update/<int:pk>/', RecentPlanUpdateView.as_view(), name='update-play'),
    path('play/ret_del/<int:pk>/', RecentPlayRetrieveDestroyView.as_view(), name='ret-del-play'),
]

