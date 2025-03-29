from django.urls import path, include
from rest_framework.routers import DefaultRouter
from blog.views import PostViewSet, UserFeedView

router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='posts')


urlpatterns = [
    path('posts/user/feed/', UserFeedView.as_view(), name="feed"),
    path('', include(router.urls))
]