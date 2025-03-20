from django.conf.urls.static import static
from django.contrib import admin
from config import settings
from users import views
from api.spectacular.urls import urlpatterns as doc_api
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView




urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path("ckeditor5/", include('django_ckeditor_5.urls')),
    path('', views.home, name='home' ),
    path('yu/', views.soms, name='login' ),
]


urlpatterns += doc_api