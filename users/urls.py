from django.urls import path, re_path
from django.views.generic import TemplateView
from users.views.user import (
    UserRegistrationView,
    CustomPasswordChangeView,
    CustomPasswordResetView,
    CustomPasswordResetConfirmView,
    CustomLogoutView,
    UserLoginView,
    GoogleLogin,
    GitHubLogin,
    UserAPIView,
    CustomResendEmailVerificationView,
    CustomVerifyEmailView,
    PublicUserProfileView
)

urlpatterns = [
    path('auth/login-github/', GitHubLogin.as_view(), name='github_login'),
    path('auth/login-google/', GoogleLogin.as_view(), name='google_login'),
    path('auth/login/', UserLoginView.as_view(), name='login'),

    path('auth/logout/', CustomLogoutView.as_view(), name='logout'),
    path('auth/registration/', UserRegistrationView.as_view(), name='register'),
    path('auth/change-password', CustomPasswordChangeView.as_view(), name='change_password'),

    path('auth/reset-password/', CustomPasswordResetView.as_view(), name='password_reset'),
    path('auth/confirm-reset-password/<uidb64>/<token>/', CustomPasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path("auth/resend-email/", CustomResendEmailVerificationView.as_view(), name="resend_email"),
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
    path('auth/user/', UserAPIView.as_view(), name='users'),
    path('auth/user/<int:pk>', PublicUserProfileView.as_view(), name='public-user-profile')

]


