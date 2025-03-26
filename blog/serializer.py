from blog.models import Post
from rest_framework import serializers
from comments.serializer import TagSerializer


class PostSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    reading_duration = serializers.IntegerField(read_only=True)
    tag = TagSerializer

    class Meta:
        model = Post
        fields = (
            'title',
            'content',
            'tag',
            'author',
            'viewers',
            'reading_duration',
            'pub_date',
            'updated_at',
            'status',
        )