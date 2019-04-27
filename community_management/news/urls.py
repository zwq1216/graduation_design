from django.urls import path

from .views import NewsCreateView, NewsUpdateView, NewsRetrieveView, NewsListView, NewsDestroyView


urlpatterns = [
    path('', NewsListView.as_view(), name='list-news'),
    path('create/', NewsCreateView.as_view(), name='create-news'),
    path('update/<int:pk>/', NewsUpdateView.as_view(), name='update-news'),
    path('detail/<int:pk>/', NewsRetrieveView.as_view(), name='detail-news'),
    path('delete/<int:pk>/', NewsDestroyView.as_view(), name='del-news'),
]



