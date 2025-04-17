import os
from datetime import timedelta

import environ

# region ---------------------- BASE CONFIGURATION -----------------------------------------
root = environ.Path(__file__) - 2  # Define the project root directory
env = environ.Env()  # Initialize environment variables handler
environ.Env.read_env(env.str(root(), '.env'))  # Load the .env file
BASE_DIR = root()

# Security and Debug Configuration
SECRET_KEY = env.str('SECRET_KEY')
DEBUG = env.bool('DEBUG', default=True)

# Allowed Hosts (space-separated string converted to a list)
ALLOWED_HOSTS = env.str('ALLOWED_HOSTS', default='').split(' ')
# endregion ---------------------------------------------------------------------------------

# region ---------------------- CORS HEADERS -----------------------------------------------
# CORS_ORIGIN_ALLOW_ALL = True  # Allow all origins
# CORS_ALLOW_CREDENTIALS = True
# CORS_ALLOW_HEADERS = ['*']  # Allow all headers
# CSRF_COOKIE_SECURE = False  # Disable CSRF cookie for development

# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:3000",  # Укажи конкретный адрес фронтенда
#     "http://127.0.0.1:3000"
# ]
# CORS_ALLOW_CREDENTIALS = True  # Разрешаем передачу credentials (cookies, headers)
# CORS_ALLOW_HEADERS = ["*"]  # Разрешаем все заголовки
# CORS_ALLOW_METHODS = ["*"]  # Разрешаем все методы (GET, POST и т.д.)
#
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Your Next.js app
]

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
]

CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]
# endregion ---------------------------------------------------------------------------------

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',


    'django_ckeditor_5',
    'rest_framework',
    'django_filters',
    'corsheaders',
    'rest_framework_simplejwt',
    'django_extensions',
    
    
    'allauth',
    'allauth.account',

    'rest_framework.authtoken',
    'dj_rest_auth',
    'dj_rest_auth.registration',

    'users',
    'blog',
    'comments',
    'analytics',

    # Optional -- requires install using `django-allauth[socialaccount]`.
    'allauth.socialaccount',

    'allauth.socialaccount.providers.github',
    'allauth.socialaccount.providers.google',
    'drf_spectacular',
]

SITE_ID = 1

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # 'django.middleware.common.BrokenLinkEmailsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    "allauth.account.middleware.AccountMiddleware",
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',

                'django.template.context_processors.request',

            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# region ------------------------- DATABASE CONFIGURATION -----------------------------------
DATABASE_ROUTERS = ["config.db_router.DatabaseRouter"]

DATABASES = {
    'extra': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': env.str('PG_DATABASE', default='postgres'),
        'USER': env.str('PG_USER', default='postgres'),
        'PASSWORD': env.str('PG_PASSWORD', default='postgres'),
        'HOST': env.str('DB_HOST', default='db'),
        'PORT': env.int('DB_PORT', default=5432),
    },
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
# endregion ---------------------------------------------------------------------------------


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]
AUTHENTICATION_BACKENDS = [
    # Needed to login by username in Django admin, regardless of `allauth`
    'django.contrib.auth.backends.ModelBackend',

    # `allauth` specific authentication methods, such as login by email
    'allauth.account.auth_backends.AuthenticationBackend',
]

# region ---------------------- LOCALIZATION ------------------------------------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'

USE_I18N = True  # Enable internationalization
USE_TZ = True    # Enable timezone support
# endregion ---------------------------------------------------------------------------------

# region ---------------------- SPECTACULAR SETTINGS --------------------------------------
SPECTACULAR_SETTINGS = {
    'TITLE': '',
    'DESCRIPTION': '',
    'VERSION': '1.0.0',
    'SERVE_PERMISSIONS': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'SERVE_AUTHENTICATION': [
        'rest_framework.authentication.BasicAuthentication',
    ],
    'SWAGGER_UI_SETTINGS': {
        'DeepLinking': True,
        'DisplayOperationId': True,
    },
    'COMPONENT_SPLIT_REQUEST': True,
    'SORT_OPERATIONS': False,
}
# endregion -------------------------------------------------------------------

# region ------------------------- STATIC AND MEDIA ----------------------------------------
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')


MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media/')
# MEDIA_TEST_ROOT = os.path.join(BASE_DIR, 'media/test/')
# endregion ---------------------------------------------------------------------------------

# region ---------------------- REST FRAMEWORK ----------------------------------------------
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        # 'rest_framework.authentication.BasicAuthentication',
        'dj_rest_auth.jwt_auth.JWTCookieAuthentication',
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    'DEFAULT_PARSER_CLASSES': (
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.FormParser',
        'rest_framework.parsers.MultiPartParser',
        'rest_framework.parsers.FileUploadParser',
    ),
    'USE_JWT': True,
    'JWT_AUTH_COOKIE': 'users-auth',
    'JWT_AUTH_REFRESH_COOKIE': 'users-refresh-token',
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}
REST_USE_JWT = True


# endregion -------------------------------------------------------------------------

# region ---------------------- SIMPLE JWT & DJOSER -----------------------------------------
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True,  # Обновление refresh-токена при каждом запросе
    "BLACKLIST_AFTER_ROTATION": True,  # Аннулирование старого refresh-токена
    "AUTH_HEADER_TYPES": ("Bearer",),
}

# DJOSER = {
#     'PASSWORD_RESET_CONFIRM_URL': '#/password/reset/confirm/{uid}/{token}',
#     'USERNAME_RESET_CONFIRM_URL': '#/username/reset/confirm/{uid}/{token}',
#     'ACTIVATION_URL': '#/activate/{uid}/{token}',
#     'SEND_ACTIVATION_EMAIL': False,
#     'SERIALIZERS': {},
# }
# endregion -------------------------------------------------------------------------


AUTH_USER_MODEL = 'users.User'


# Настройки Allauth
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_REQUIRED = True

# region ---------------------- SMTP ------------------------------------------------
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
# Настройка почтового сервера по SMTP-протоколу
EMAIL_HOST = env.str('EMAIL_HOST')
EMAIL_PORT = env.int('EMAIL_PORT')
EMAIL_USE_TLS = env.bool('EMAIL_USE_TLS')
EMAIL_HOST_USER = env.str('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = env.str('EMAIL_HOST_PASSWORD')
SERVER_EMAIL = EMAIL_HOST_USER
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
# endregion ---------------------------------------------------------------------------------
# Phone number field
PHONENUMBER_DEFAULT_REGION = "UZ"

# Token length for OTP
TOKEN_LENGTH = 6

# Token expiry
TOKEN_EXPIRE_MINUTES = 3

LOGIN_REDIRECT_URL = '/'  # или другой URL, куда ты хочешь перенаправлять юзера
ACCOUNT_LOGOUT_REDIRECT_URL = '/'

# SOCIALACCOUNT_PROVIDERS = {
#     "github": {
#         "APP": {
#             "client_id": "Ov23liNdyaBrIswTFd9E",
#             "secret": "d9eaae588335bb538dc9fe197cf3b84111013ae6",
#         }
#     },
#     "google": {
#         "APP": {
#             "client_id": "1016998513874-onlo6a9k0k4ketp2t19ob18dpf3l810h.apps.googleusercontent.com",
#             "secret": "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"
#         }
#     }
# }