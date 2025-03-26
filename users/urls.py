from dj_rest_auth.registration.views import ResendEmailVerificationView, VerifyEmailView
from django.urls import path, re_path
from django.views.generic import TemplateView

from users.views.user import (
    UserRegistrationView, CustomPasswordChangeView, CustomPasswordResetView,
    CustomPasswordResetConfirmView, CustomLogoutView, UserLoginView, GoogleLogin, GitHubLogin, UserAPIView,
    CustomResendEmailVerificationView, CustomVerifyEmailView
)

urlpatterns = [
    path('auth/login-github/', GitHubLogin.as_view(), name='github_login'),
    path('auth/login-google/', GoogleLogin.as_view(), name='google_login'),
    path('auth/login/', UserLoginView.as_view(), name='login'),

    path('auth/logout/', CustomLogoutView.as_view(), name='logout'),
    path('auth/registration/', UserRegistrationView.as_view(), name='register'),
    path('auth/change-password', CustomPasswordChangeView.as_view(), name='change-password'),

    path('auth/reset-password/', CustomPasswordResetView.as_view(), name='reset-password'),
    path('auht/confirm-reset-password/', CustomPasswordResetConfirmView.as_view(), name='...'),
    path("resend-email/", CustomResendEmailVerificationView.as_view(), name="rest_resend_email"),
    re_path(
        r"^account-confirm-email/(?P<key>[-:\w]+)/$",
        CustomVerifyEmailView.as_view(),
        name="account_confirm_email",
    ),
    path(
        "account-email-verification-sent/",
        TemplateView.as_view(),
        name="account_email_verification_sent",
    ),
    path('auth/user/', UserAPIView.as_view(), name='user-manage')

]


