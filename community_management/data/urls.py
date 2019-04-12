from django.urls import path

from .views import CategoryListCreateView, CategoryRetrieveUpdateDestroy, DataCreateView, DataUpdateView, \
    DataRetrieveDestroyView, DataListView

# 资料分类相关
urlpatterns = [
    path('category/create_list/', CategoryListCreateView.as_view(), name='create-list-category'),
    path('category/ret_update_del/<int:pk>/', CategoryRetrieveUpdateDestroy.as_view(), name='ret-update-del-category'),
]

# 资料相关
urlpatterns += [
    path('', DataListView.as_view(), name='list-data'),
    path('create/', DataCreateView.as_view(), name='create-data'),
    path('update/<int:pk>/', DataUpdateView.as_view(), name='update-data'),
    path('ret_del/<int:pk>/', DataRetrieveDestroyView.as_view(), name='ret-del-data'),
]

