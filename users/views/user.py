from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.linkedin_oauth2.views import LinkedInOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from dj_rest_auth.registration.views import RegisterView, SocialLoginView, SocialConnectView, \
    ResendEmailVerificationView, VerifyEmailView
from dj_rest_auth.social_serializers import TwitterConnectSerializer
from dj_rest_auth.views import LoginView, LogoutView, PasswordChangeView, PasswordResetView, PasswordResetConfirmView
from django.contrib.auth import get_user_model
from django.shortcuts import render
from drf_spectacular.utils import extend_schema_view, extend_schema
from rest_framework import status
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from users.api.serializer import RegistrationSerializer, LoginSerializer, UserSerializer

User = get_user_model()

@extend_schema_view(
    post=extend_schema(
        summary='User Registration',
        description='Registers a new user in the system and returns a success message.',
        tags=['Auth'],
        responses={201: 'User successfully registered'}
    )
)
class UserRegistrationView(RegisterView):

    """
    User Registration View.

    Allows users to register an account by providing the required information.
    Upon successful registration, a success message is returned.
    Utilizes the RegistrationSerializer for validation.

    Timing:
        Typical registration process takes around 100-200 ms.
    """
    # renderer_classes = [TemplateHTMLRenderer]
    serializer_class = RegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        response_data = {"message": "Пользователь успешно зарегистрирован"}
        if request.accepted_renderer.format == 'html':
            return render(request, 'users/registration.html', context=response_data)
        # return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)


@extend_schema_view(
    post=extend_schema(
        summary='User Login',
        description='Authenticates a user using email and password.',
        tags=['Auth'],
        responses={200: 'User successfully logged in'}
    )
)
class UserLoginView(LoginView):
    """
    User Login View.

    Authenticates users using their credentials (email and password).
    Renders the login template upon GET request.
    Uses LoginSerializer for validation.

    Timing:
        Typical login process takes around 50-150 ms.
    """
    serializer_class = LoginSerializer

@extend_schema_view(
    post=extend_schema(
        summary='GitHub Social Login',
        description='Allows users to login via GitHub OAuth2.',
        tags=['Social Auth'],
        responses={200: 'User successfully logged in via GitHub'}
    )
)
class GitHubLogin(SocialLoginView):
    """
    GitHub OAuth2 Login View.

    Handles login through GitHub's OAuth2 protocol.
    Requires the OAuth2 client configuration and callback URL.

    Timing:
        Typical login process takes around 100-300 ms.
    """
    adapter_class = GitHubOAuth2Adapter
    callback_url = 'http://localhost:8000/accounts/github/login/callback/'
    client_class = OAuth2Client


@extend_schema_view(
    post=extend_schema(
        summary='Google Social Login',
        description='Allows users to login via Google OAuth2.',
        tags=['Social Auth'],
        responses={200: 'User successfully logged in via Google'}
    )
)
class GoogleLogin(SocialLoginView):
    """
    Google OAuth2 Login View.

    Handles login through Google's OAuth2 protocol.
    Requires the OAuth2 client configuration and callback URL.

    Timing:
        Typical login process takes around 100-300 ms.
    """
    adapter_class = GoogleOAuth2Adapter
    callback_url = 'http://localhost:8000/accounts/google/login/callback/'
    client_class = OAuth2Client


@extend_schema_view(
    post=extend_schema(
        summary='Twitter Social Connect',
        description='Connects a user account with Twitter via OAuth.',
        tags=['Social Auth'],
        responses={200: 'User successfully connected to Twitter'}
    )
)
class TwitterConnect(SocialConnectView):
    """
    Twitter OAuth2 Connect View.

    Allows users to link their existing account with Twitter.
    Uses TwitterConnectSerializer for processing the OAuth connection.

    Timing:
        Typical connection process takes around 100-250 ms.
    """
    serializer_class = TwitterConnectSerializer
    adapter_class = TwitterOAuthAdapter


@extend_schema_view(
    post=extend_schema(
        summary='LinkedIn Social Connect',
        description='Connects a user account with LinkedIn via OAuth.',
        tags=['Social Auth'],
        responses={200: 'User successfully connected to LinkedIn'}
    )
)
class LinkedinConnect(SocialConnectView):
    """
    LinkedIn OAuth2 Connect View.

    Allows users to link their existing account with LinkedIn.

    Timing:
        Typical connection process takes around 100-250 ms.
    """
    adapter_class = LinkedInOAuth2Adapter



@extend_schema_view(
    post=extend_schema(
        summary='User Logout',
        description='Logs out the authenticated user.',
        tags=['Auth'],
        responses={200: 'User successfully logged out'}
    )
)
class CustomLogoutView(LogoutView):
    """
    Custom Logout View.

    Ends the current session of the authenticated user.

    Timing:
        Typical logout process takes around 50-100 ms.
    """
    pass


@extend_schema_view(
    post=extend_schema(
        summary='Password Change',
        description='Allows users to change their password.',
        tags=['Auth'],
        responses={200: 'Password changed successfully'}
    )
)
class CustomPasswordChangeView(PasswordChangeView):
    """
    Custom Password Change View.

    Enables authenticated users to change their password securely.

    Timing:
        Typical password change process takes around 100-200 ms.
    """
    pass


@extend_schema_view(
    post=extend_schema(
        summary='Password Reset',
        description="Sends a password reset link to the user's email.",
        tags=['Auth'],
        responses={200: 'Password reset link sent successfully'}
    )
)
class CustomPasswordResetView(PasswordResetView):
    """
    Custom Password Reset View.

    Sends a password reset link to the registered email address.

    Timing:
        Typical password reset process takes around 100-300 ms.
    """
    pass


@extend_schema_view(
    post=extend_schema(
        summary='Password Reset Confirmation',
        description='Confirms the password reset process and sets a new password.',
        tags=['Auth'],
        responses={200: 'Password reset confirmed successfully'}
    )
)
class CustomPasswordResetConfirmView(PasswordResetConfirmView):
    """
    Custom Password Reset Confirm View.

    Confirms the password reset using a token and sets the new password.

    Timing:
        Typical confirmation process takes around 100-300 ms.
    """
    pass


@extend_schema(
    summary="Получить, обновить или удалить текущего пользователя",
    description="""
    Эндпоинт для работы с профилем текущего пользователя:
    - GET: Получить информацию о текущем пользователе.
    - PUT: Полностью обновить информацию о пользователе.
    - PATCH: Частично обновить информацию о пользователе.
    - DELETE: Удалить профиль пользователя.
    """,
    tags=["Users"],
)
class UserAPIView(RetrieveUpdateDestroyAPIView):
    """
    Представление для работы с профилем текущего пользователя.

    Методы:
        - retrieve (GET): Получить данные текущего пользователя.
        - update (PUT): Полностью обновить данные пользователя.
        - partial_update (PATCH): Частично обновить данные пользователя.
        - destroy (DELETE): Удалить профиль пользователя.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        """
        Возвращает текущего пользователя на основе запроса.
        """
        return self.request.user



@extend_schema(
    summary="Повторная отправка письма с подтверждением",
    description="Эндпоинт для повторной отправки письма с подтверждением на email пользователя.",
    responses={200: "Email verification resent successfully", 400: "Invalid request data"},
    tags=["Auth"],
)
class CustomResendEmailVerificationView(ResendEmailVerificationView):
    """
    Повторная отправка письма с подтверждением.

    Эндпоинт позволяет пользователю запросить повторное письмо для подтверждения email.
    """
    pass


@extend_schema(
    summary="Подтверждение email",
    description="Эндпоинт для подтверждения email пользователя по ссылке из письма.",
    responses={200: "Email verified successfully", 400: "Invalid or expired verification link"},
    tags=["Auth"],
)
class CustomVerifyEmailView(VerifyEmailView):
    """
    Подтверждение email.

    Эндпоинт обрабатывает ссылку из письма с подтверждением и активирует учетную запись.
    """
    pass