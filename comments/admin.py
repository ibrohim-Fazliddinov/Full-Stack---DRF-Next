from django.contrib import admin

from comments.models import Comment, Tag, Like

admin.site.register(Tag)
admin.site.register(Comment)
admin.site.register(Like)
