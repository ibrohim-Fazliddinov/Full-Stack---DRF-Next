from dj_rest_auth.registration.serializers import RegisterSerializer
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password
from django.utils.translation import gettext as _
from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers
from rest_framework.exceptions import ParseError
from rest_framework.validators import UniqueValidator

from users.api.nested.profile import ProfileSerializerShort

User = get_user_model()


class RegistrationSerializer(RegisterSerializer):
    username = None
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    phone_number = PhoneNumberField(
        required=True,
        validators=UniqueValidator(
            queryset=User.objects.all(),
            message=_("Пользователь с таким email уже существует.")
        )
    )
    email = serializers.EmailField(
        validators=UniqueValidator(
            queryset=User.objects.all(),
            message=_("Пользователь с таким email уже существует.")
        )
    )

    password1 = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password1 = attrs.get('password1')
        password2 = attrs.get('password2')

        if password1 != password2:
            raise ParseError(_("Пароли не совпадают."))

        validate_password(password1)

    def create(self, validated_data):
        # Удаляем лишние данные
        password = validated_data.pop('password1')
        validated_data.pop('password2')

        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()

        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            raise ParseError(_('Email and password are required.'))

        user = authenticate(username=email, password=password)

        if user is None:
            raise ParseError(_('nvalid credentials.'))


        data['user'] = user
        return data

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializerShort()
    class Meta:
        model = User
        fields = (
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'date_joined',
            'last_activity'
            'role',
            'profile',
        )

class UserUpdateSerializer(serializers.ModelSerializer):
    profile = ProfileSerializerShort()
    class Meta:
        model = User
        fields = (
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'date_joined',
            'last_activity'
            'role',
            'profile',
        )
