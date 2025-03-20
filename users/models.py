from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from phonenumber_field.modelfields import PhoneNumberField
from django.utils.translation import gettext_lazy as _
from django_ckeditor_5.fields import CKEditor5Field

class User(AbstractUser):
    class Role(models.TextChoices):
        AUTHOR = "AUH", _( "Автор")
        MODERATOR = "MOD", _("Модератор")
        ADMIN = "ADM", _( "Администратор")
        CUSTOMER = "CUS", _( "Администратор")

    username = models.CharField(
        blank=True,
        max_length=300,
        null=True
    )
    first_name = models.CharField(max_length=12)
    last_name = models.CharField(max_length=12)
    phone_number = PhoneNumberField()
    email = models.EmailField(unique=True)
    is_banned = models.BooleanField(default=False)

    role = models.CharField(
        max_length=3,
        choices=Role,
        default=Role.CUSTOMER
    )
    date_joined = models.DateTimeField(auto_now_add=True)
    last_activity = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'phone_number', 'username']

    objects = UserManager()

    def __str__(self):
        return self.email



class Profile(models.Model):
    user = models.OneToOneField(
        to='users.User',
        on_delete=models.CASCADE,
        related_name='profile'
    )
    photo = models.ImageField(
        upload_to='users/profile/photo',
        blank=True,
        null=True
    )
    bio = CKEditor5Field()
    date_of_birth = models.DateField(blank=True, null=True)
    location = models.CharField(max_length=68, blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    signature = models.CharField(max_length=300, blank=True, null=True)
    background_image = models.ImageField(upload_to='users/profile/background', blank=True, null=True)
    article_count = models.PositiveIntegerField(default=0)
    comment_count = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

@receiver(post_save, sender=User)
def post_save_user(sender, instance: User, created, **kwargs) -> None:
    if not hasattr(instance, 'profile'):
        Profile.objects.create(user=instance)