from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models
from phonenumber_field.formfields import PhoneNumberField


class User(AbstractUser):

    first_name = models.CharField(max_length=12)
    last_name = models.CharField(max_length=12)
    phone_number = PhoneNumberField()
    email = models.EmailField(unique=True)
    is_host = models.BooleanField(default=False)



    REQUIRED_FIELDS = ['first_name', 'last_name']
    USERNAME_FIELD = 'email'

    object = UserManager()

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

