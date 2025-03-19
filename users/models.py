from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class User(AbstractUser):
    username = models.CharField(blank=True, max_length=300, null=True)
    first_name = models.CharField(max_length=12)
    last_name = models.CharField(max_length=12)
    phone_number = PhoneNumberField()
    email = models.EmailField(unique=True)
    is_host = models.BooleanField(default=False)

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

    photo = models.ImageField(upload_to='users/profile/photo', blank=True, null=True)

    bio = models.TextField(blank=True, null=True)

    date_of_birth = models.DateField(blank=True, null=True)
