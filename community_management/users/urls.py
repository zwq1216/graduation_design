from django.urls import path

from .views import UserCreateView, UserUpdateView, UserRetrieveDestroyView, UserListView, ApplyRecordCreateView, \
    ApplyRecordUpdateView, ApplyRecordRetrieveDestroyView, ApplyRecordListView, CollegeListCreateView, \
    CollegeRrtrieveDestoryView, CollegeUpdateView


# 用户相关
urlpatterns = [
    path('', UserListView.as_view(), name='list-user'),
    path('create/', UserCreateView.as_view(), name='create-user'),
    path('update/<int:pk>/', UserUpdateView.as_view(), name='update-user'),
    path('ret_del/<int:pk>/', UserRetrieveDestroyView.as_view(), name='ret-del-user'),
]

# 申请记录相关
urlpatterns += [
    path('records/', ApplyRecordListView.as_view(), name='list-record'),
    path('record/create/', ApplyRecordCreateView.as_view(), name='create-record'),
    path('record/update/<int:pk>/', ApplyRecordUpdateView.as_view(), name='update-record'),
    path('record/ret_del/<int:pk>/', ApplyRecordRetrieveDestroyView.as_view(), name='ret-del-record'),
]

# 学院相关
urlpatterns += [
    path('college/', CollegeListCreateView.as_view(), name='create-list-college'),
    path('college/ret_del/<int:pk>/', CollegeRrtrieveDestoryView.as_view(), name='ret-del-college'),
    path('college/update/<int:pk>/', CollegeUpdateView.as_view(), name='update-college'),
]




