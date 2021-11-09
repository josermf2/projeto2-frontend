from django.urls import path

from . import views

urlpatterns = [
    path('api/user/<str:user_name>/', views.api_get_user),
    path('api/user', views.api_post_user),
    path('api/favorite/<str:user_name>/', views.api_get_favorite),
    path('api/favorite', views.api_post_favorite),    
    path('api/favorite/delete', views.api_delete_favorite),    
]