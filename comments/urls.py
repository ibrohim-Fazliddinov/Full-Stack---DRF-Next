from django.urls import path, include
from rest_framework.routers import DefaultRouter
from comments.views import CommentViewSet, TagViewSet, LikeView

router = DefaultRouter()

router.register(r'posts/(?P<post_id>\d+)/comments', CommentViewSet, basename="post-comments")
router.register(r'tags', TagViewSet, basename="tags")



urlpatterns = [
    path('like/', LikeView.as_view(), name='like'),  # Лайк поста
    path('', include(router.urls)),

]