from django.urls import path

from .views import NewsCreateView, NewsUpdateView, NewsRetrieveDestroyView, NewsListView


urlpatterns = [
    path('', NewsListView.as_view(), name='list-news'),
    path('create/', NewsCreateView.as_view(), name='create-news'),
    path('update/<int:pk>/', NewsUpdateView.as_view(), name='update-news'),
    path('ret_del/<int:pk>/', NewsRetrieveDestroyView.as_view(), name='ret-del-news'),
]



