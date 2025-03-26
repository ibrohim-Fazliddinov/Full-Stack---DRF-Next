from django.urls import path
from rest_framework.routers import DefaultRouter
from blog.views import PostViewSet, UserFeedView

router = DefaultRouter()
router.register(r'post', PostViewSet, basename='post-manage')


urlpatterns = [
    path('post/user/feed/', UserFeedView.as_view(), name="feed")
]

urlpatterns += router.urls