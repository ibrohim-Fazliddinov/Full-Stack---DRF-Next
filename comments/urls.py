from django.urls import path
from rest_framework.routers import DefaultRouter
from comments.views import CommentView, TagView, LikeView

router = DefaultRouter()
router.register(r'post/(?P<post_id>\d+)/comment/manage', CommentView, basename="manage-comma")
router.register(r'post/tags/manage', TagView, basename="tag-manage")



urlpatterns = [
    path('<str:content_type>/like/<int:object_id>', LikeView.as_view(), name='post-like'),

]
urlpatterns += router.urls