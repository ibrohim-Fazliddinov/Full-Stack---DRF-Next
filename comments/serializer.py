from django.contrib.contenttypes.models import ContentType
from rest_framework import serializers

from users.api.nested.profile import ProfileSerializerShort
from .models import Comment, Tag, Like


class TagSerializer(serializers.ModelSerializer):
    """
    Сериализатор для тега.
    """

    class Meta:
        model = Tag
        fields = ('id', 'tag_name')

class CommentSerializer(serializers.ModelSerializer):
    """
    Сериализатор для комментария.
    """
    author = serializers.StringRelatedField(read_only=True)
    replies = serializers.SerializerMethodField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Comment
        fields = (
            'id', 'post', 'author', 'content', 'parent',
            'created_at', 'updated_at', 'replies'
        )
    @classmethod
    def get_replies(cls, obj):
        """
        Получает вложенные комментарии (ответы).
        """
        replies = obj.replies.all()
        return CommentSerializer(replies, many=True).data

class LikeSerializer(serializers.ModelSerializer):
    author = ProfileSerializerShort(source='user')
    class Meta:
        model = Like
        fields = (
            'author',
            'content_type',
            'object_id',
            'created_at'
        )
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        content_type = ContentType.objects.get_for_id(instance.content_type_id)
        representation['content_type'] = content_type.model
        return representation