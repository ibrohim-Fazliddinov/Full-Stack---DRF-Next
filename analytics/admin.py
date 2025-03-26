from django.contrib import admin

from analytics.models import TotalPost, TotalLikes

admin.site.register(TotalPost)
admin.site.register(TotalLikes)