from django.contrib.contenttypes.models import ContentType
from drf_spectacular.utils import OpenApiResponse, extend_schema
from oauthlib.uri_validate import query
from rest_framework import generics, permissions, status, viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from blog.models import Post
from comments.models import Comment, Tag, Like
from comments.serializer import CommentSerializer, TagSerializer, LikeSerializer


@extend_schema(
    summary="Комментарии к посту",
    description="Получение списка комментариев к указанному посту.",
    responses={200: CommentSerializer(many=True)},
    tags=['Comments']
)
class CommentViewSet(viewsets.ModelViewSet):
    """
    Представление для работы с комментариями.

    Методы:
        - list: Получить список комментариев к посту.
        - create: Создать новый комментарий.
        - retrieve: Получить конкретный комментарий.
        - update: Обновить комментарий.
        - partial_update: Частично обновить комментарий.
        - destroy: Удалить комментарий.
    """
    serializer_class = CommentSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    lookup_url_kwarg = 'comment_id'

    def perform_create(self, serializer):
        """
        Создаёт комментарий к указанному посту.
        """
        post = get_object_or_404(Post, pk=self.kwargs.get('post_id'))
        serializer.save(post=post, author=self.request.user)

    def get_queryset(self):
        """
        Получает список комментариев для указанного поста.
        """
        post_id = self.kwargs.get('post_id')
        return Comment.objects.filter(post__id=post_id)


@extend_schema(
    summary="Получить список тегов",
    description="Возвращает все доступные теги.",
    responses={200: TagSerializer(many=True)},
    tags=['Tags']
)
class TagViewSet(viewsets.ModelViewSet):
    """
    Представление для работы с тегами.

    Методы:
        - list: Получить список всех тегов.
        - create: Создать новый тег.
        - retrieve: Получить конкретный тег.
        - update: Обновить тег.
        - partial_update: Частично обновить тег.
        - destroy: Удалить тег.
    """
    serializer_class = TagSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        """
        Получает все теги.
        """
        return Tag.objects.all()


@extend_schema(
    summary="Создать или удалить лайк",
    description="Позволяет пользователю поставить или убрать лайк для указанного объекта (например, поста или комментария).",
    responses={
        200: OpenApiResponse(response=LikeSerializer, description="Лайк успешно создан или удалён."),
        400: OpenApiResponse(description="Ошибка запроса."),
        404: OpenApiResponse(description="Объект не найден."),
    },
    tags=['Like']
)
class LikeView(generics.GenericAPIView):
    """
    Представление для создания и удаления лайков.

    Методы:
        - post: Создаёт лайк или удаляет его, если он уже существует.

    Параметры запроса:
        - content_type (str): Тип контента (например, "post" или "comment").
        - object_id (int): ID объекта, к которому относится лайк.

    Ответ:
        - liked (bool): Статус лайка (поставлен/удалён).
        - total_likes (int): Общее количество лайков на объекте.
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LikeSerializer

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid()

        content_type = serializer.validated_data['content_type']
        object_id = serializer.validated_data['object_id']

        user = request.user

        like, created = Like.objects.get_or_create(
            author=user, content_type=content_type, object_id=object_id
        )

        if not created:
            like.delete()
            return Response({"message": "Like removed"}, status=status.HTTP_204_NO_CONTENT)

        return Response({"message": "Like added"}, status=status.HTTP_201_CREATED)