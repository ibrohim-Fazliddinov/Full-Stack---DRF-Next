from django.db.models import Count
from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny, IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from blog.models import Post
from blog.serializer import PostSerializer


@extend_schema_view(
    list=extend_schema(
        summary="Получить список постов",
        description="Возвращает все посты в системе. Доступно для всех пользователей.",
        tags=["Posts"],
    ),
    retrieve=extend_schema(
        summary="Получить конкретный пост",
        description="Возвращает пост по его ID. Доступно для всех пользователей.",
        tags=["Posts"],
    ),
    create=extend_schema(
        summary="Создать новый пост",
        description="Создаёт новый пост. Доступно только для аутентифицированных пользователей.",
        request=PostSerializer,
        responses={201: PostSerializer},
        tags=["Posts"],
    ),
    update=extend_schema(
        summary="Обновить пост",
        description="Полное обновление поста. Доступно только для автора.",
        request=PostSerializer,
        responses={200: PostSerializer},
        tags=["Posts"],
    ),
    partial_update=extend_schema(
        summary="Частичное обновление поста",
        description="Частичное обновление поста (PATCH). Доступно только для автора.",
        request=PostSerializer,
        responses={200: PostSerializer},
        tags=["Posts"],
    ),
    destroy=extend_schema(
        summary="Удалить пост",
        description="Удаляет пост по его ID. Доступно только для автора.",
        responses={204: None},
        tags=["Posts"],
    ),
)
class PostViewSet(ModelViewSet):
    """
    Представление для управления постами в блоге.

    Методы:
        - list: Получить список всех постов.
        - retrieve: Получить конкретный пост по ID.
        - create: Создать новый пост.
        - update: Полное обновление существующего поста.
        - partial_update: Частичное обновление поста.
        - destroy: Удалить пост.
    """
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        return (
            Post.objects.
            select_related('author').all()
            .annotate(num_views=Count('viewers'))
        )

    # def get_permissions(self):
    #     if self.action in ['list', 'retrieve']:  # ← Разрешаем всем только просмотр
    #         return [AllowAny()]
    #     return [IsAuthenticated()]  # ← А остальное только авторизованным

    def retrieve(self, request, *args, **kwargs):
        post = self.get_object()
        if self.request.user.is_authenticated and not post.viewers.filter(pk=request.user.pk).exists():
            post.viewers.add(request.user)
            post.save()

        return super().retrieve(request, *args, **kwargs)

    def perform_create(self, serializer):
        """
        Создаёт новый пост с автором, указанным как текущий пользователь.
        """
        serializer.save(author=self.request.user)

@extend_schema(
        summary="Получить ленту постов от подписанных пользователей",
        description=(
            "Возвращает список постов от пользователей, на которых подписан текущий пользователь. "
            "Пользователь должен быть аутентифицирован для использования данного эндпоинта."
        ),
        responses={
            200: PostSerializer(many=True),
            401: {"detail": "Учетные данные не были предоставлены."}
        },
        tags=['Posts'],
    )
class UserFeedView(generics.ListAPIView):
    """
       Представление для получения пользовательской ленты постов.
    """
    serializer_class = PostSerializer

    def get_queryset(self):
        """
         Возвращает список постов от пользователей, на которых подписан текущий пользователь.
         """
        profile = self.request.user.profile
        following_users = profile.following.all()
        queryset = Post.objects.all().filter(author__in=following_users)
        return queryset

