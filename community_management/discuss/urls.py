from django.urls import path


from .views import DiscussCreateView, DiscussListView, DiscussRetrieveDestroyView, ReplayCreateView, \
    ReplayRetrieveDestroyView, ReplayListView


# 主贴相关
urlpatterns = [
    path('', DiscussListView.as_view(), name='list-discuss'),
    path('create/', DiscussCreateView.as_view(), name='create-discuss'),
    path('ret_del/<int:pk>/', DiscussRetrieveDestroyView.as_view(), name='ret-del-discuss'),
]

# 回帖相关
urlpatterns += [
    path('replay/', ReplayListView.as_view(), name='list-replay'),
    path('replay/create/', ReplayCreateView.as_view(), name='create-replay'),
    path('replay/ret_del/<int:pk>/', ReplayRetrieveDestroyView.as_view(), name='ret-del-replay'),
]