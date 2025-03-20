import os
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
CORS_ORIGIN_ALLOW_ALL = True  # Allow all origins
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = ['*']  # Allow all headers
CSRF_COOKIE_SECURE = False  # Disable CSRF cookie for development
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

    'allauth',
    'allauth.account',

    'rest_framework.authtoken',
    'dj_rest_auth',
    'dj_rest_auth.registration',

    'users',

    # Optional -- requires install using `django-allauth[socialaccount]`.
    'allauth.socialaccount',

    'allauth.socialaccount.providers.github',
    'allauth.socialaccount.providers.google',
    'drf_spectacular',
]

SITE_ID = 1

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    'corsheaders.middleware.CorsMiddleware',
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
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.BasicAuthentication',
    ),
    'DEFAULT_PARSER_CLASSES': (
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.FormParser',
        'rest_framework.parsers.MultiPartParser',
        'rest_framework.parsers.FileUploadParser',
    ),
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}
# endregion -------------------------------------------------------------------------
AUTH_USER_MODEL = 'users.User'


# Настройки Allauth
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_REQUIRED = True

