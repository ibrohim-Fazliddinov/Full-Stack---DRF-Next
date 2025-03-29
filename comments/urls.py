from django.urls import path, include
from rest_framework.routers import DefaultRouter
from comments.views import CommentViewSet, TagViewSet, LikeView

router = DefaultRouter()

router.register(r'posts/(?P<post_id>\d+)/comments', CommentViewSet, basename="post-comments")
router.register(r'tags', TagViewSet, basename="tags")



urlpatterns = [
    path('posts/<int:pk>/like/', LikeView.as_view(), name='post-like'),  # Лайк поста
    path('comments/<int:pk>/like/', LikeView.as_view(), name='comment-like'),  # Лайк комментария
    path('', include(router.urls)),

]