from random import randint
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _

User = get_user_model()


class Post(models.Model):
    """
    Модель блога для публикации контента.

    Атрибуты:
        author (User): Пользователь, создавший пост.
        title (str): Заголовок поста.
        content (str): Контент поста.
        tag (Tag): Множество тегов, связанных с постом.
        slug (str): Уникальный URL-идентификатор.
        status (str): Статус публикации поста (опубликовано, черновик, на модерации).
        views (int): Количество просмотров поста.
        reading_duration (int): Продолжительность чтения (в минутах).
        pub_date (datetime): Дата публикации.
        updated_at (datetime): Дата последнего обновления.
    """

    class Status(models.TextChoices):
        PUBLISHED = "PUB", _("Опубликовано")
        DRAFT = "DRF", _("Черновик")
        MODERATION = "MOD", _("На модерации")

    author = models.ForeignKey(
        to="users.User",
        on_delete=models.CASCADE,
        related_name="posts"
    )
    title = models.CharField(max_length=500)
    content = models.TextField()
    tag = models.ManyToManyField(
        to='comments.Tag',
        blank=True
    )
    likes = GenericRelation('comments.Like')

    preview = models.ImageField(blank=True, null=True, upload_to='post/preview/')
    slug = models.SlugField(unique=True, max_length=100)
    status = models.CharField(
        max_length=3,
        choices=Status.choices,
        default=Status.DRAFT
    )
    reading_duration = models.IntegerField(default=1)
    viewers = models.ManyToManyField(
        to='users.User',
        related_name='viewed_posts',
        editable=False
    )
    pub_date = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """
        Возвращает строковое представление поста в формате:
        <автор>|<заголовок>
        """
        return f"{self.author}|{self.title}"


    def calculate_reading_duration(self):
        """
        Вычисляет продолжительность чтения на основе количества слов.
        """
        words_per_minute = 200
        word_count = len(self.content)
        duration = max(1, word_count // words_per_minute)
        return duration

    def get_likes_count(self):
        return self.likes.count()


    def save(self, *args, **kwargs):
        """
        Сохраняет объект поста с автоматической генерацией слага,
        проверкой корректности статуса и даты публикации.

        Исключения:
            ValidationError: Если черновик имеет дату публикации.
        """
        # Генерация уникального слага
        if not self.slug:
            random_slug = f"{slugify(self.title)}-{randint(1000, 9999)}"
            while Post.objects.filter(slug=random_slug).exists():
                random_slug = f"{slugify(self.title)}-{randint(1000, 9999)}"
            self.slug = random_slug

        # Валидация статуса и даты публикации
        # if self.status == self.Status.DRAFT and self.pub_date:
        #     raise ValidationError(_("Черновик не может иметь дату публикации."))
        # if self.status == self.Status.PUBLISHED and not self.pub_date:
        #     self.pub_date = datetime.datetime.now()

        self.reading_duration = self.calculate_reading_duration()

        super().save(*args, **kwargs)

    class Meta:
        verbose_name = _("Пост")
        verbose_name_plural = _("Посты")