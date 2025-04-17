from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.db import models



class Tag(models.Model):
    """
    Модель тега для постов.

    Атрибуты:
        tag_name (str): Название тега.
    """
    tag_name = models.CharField(max_length=79, unique=True)

    def save(self, *args, **kwargs):
        """
        Добавляет символ '#' перед названием тега, если его нет.
        """
        if not self.tag_name.startswith('#'):
            self.tag_name = f"#{self.tag_name}"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.tag_name


class Comment(models.Model):
    """
    Модель комментария к посту.

    Атрибуты:
        to_post (Post): Пост, к которому относится комментарий.
        user (User): Пользователь, оставивший комментарий.
        content (str): Текст комментария.
        parent (Comment): Родительский комментарий (для вложенности).
        created_at (datetime): Дата создания комментария.
        updated_at (datetime): Дата обновления комментария.
    """
    post = models.ForeignKey(
        to='blog.Post',
        on_delete=models.CASCADE,
    )
    author = models.ForeignKey(
        to='users.User',
        on_delete=models.CASCADE,
    )
    content = models.TextField(max_length=4000)
    parent = models.ForeignKey(
        to='self',
        on_delete=models.CASCADE,
        related_name='replies',
        blank=True,
        null=True
    )
    likes = GenericRelation('Like')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Комментарий от {self.author} к посту {self.post}'


class Like(models.Model):
    author = models.ForeignKey(
        to='users.User',
        on_delete=models.CASCADE,
    )
    content_type = models.ForeignKey(
        to=ContentType,
        on_delete=models.CASCADE,
    )
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('author', 'content_type', 'object_id')

    def __str__(self):
        return f'Like by {self.author} on {self.content_object}'