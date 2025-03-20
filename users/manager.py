from rest_framework.exceptions import ParseError
from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(
            self,
            username,
            first_name,
            last_name,
            phone_number,
            email,
            password,
            **extra_fields,
    ):
        if not email:
            raise ParseError('Введите email или номер телефона')

        if email and phone_number:
            email = self.normalize_email(email)

        user = self.model(
            username=username,
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number,
            email=email,
            **extra_fields
        )
        if user.is_superuser:
            user.role = user.Role.ADMIN
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(
            self,
            username,
            first_name,
            last_name,
            phone_number,
            email,
            password,
            **extra_fields,
    ):
        extra_fields.setdefault('is_superuser', False)
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_active', True)

        return self._create_user(
            username,
            first_name,
            last_name,
            phone_number,
            email,
            password,
            **extra_fields,
        )

    def create_superuser(
            self,
            username,
            first_name,
            last_name,
            phone_number,
            email,
            password,
            **extra_fields,
    ):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)


        return self._create_user(
            username,
            first_name,
            last_name,
            phone_number,
            email,
            password,
            **extra_fields,
        )
