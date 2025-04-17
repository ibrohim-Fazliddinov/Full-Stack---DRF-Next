from blog.models import Post
from rest_framework import serializers
from comments.serializer import TagSerializer


class PostSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    reading_duration = serializers.IntegerField(read_only=True)
    tag = TagSerializer
    # get_likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = (
            'title',
            'content',
            'tag',
            'author',
            'viewers',
            'reading_duration',
            'get_likes_count',
            'pub_date',
            'updated_at',
            'status',
        )
