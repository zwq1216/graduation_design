from django.urls import path

from .views import ProjectCreateView, ProjectUpdateView, ProjectRetrieveDestroyView, ProjectListView


urlpatterns = [
    path('', ProjectListView.as_view(), name='list-project'),
    path('create/', ProjectCreateView.as_view(), name='create-project'),
    path('update/<int:pk>/', ProjectUpdateView.as_view(), name='update-project'),
    path('ret_del/<int:pk>/', ProjectRetrieveDestroyView.as_view(), name='ret-del-project'),
]

