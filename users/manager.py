from xml.etree.ElementTree import ParseError

from django.db import models

class UserManager(models.Manager):
    use_in_migrations = True


    def _create_user(
            self,
            first_name,
            last_name,
            phone_number,
            email,
            password,
            **extra_fields,
    ):
        if not email and phone_number:
            raise ParseError('Enter email or phone number')


        user = self.model(email=email, **extra_fields)
        if email:
            user.email = email
        if phone_number:
            user.phone_number = phone_number

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self,
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

        return self.__create_user(
            first_name,
            last_name,
            phone_number,
            email,
            password,
            **extra_fields,
        )

    def create_superuser(
            self,
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

        return self.__create_user(
            first_name,
            last_name,
            phone_number,
            email,
            password,
            **extra_fields,
        )

