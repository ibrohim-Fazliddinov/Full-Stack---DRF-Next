from dj_rest_auth.registration.serializers import RegisterSerializer
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password
from django.db import transaction
from django.utils.translation import gettext as _
from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers
from rest_framework.exceptions import ParseError
from rest_framework.validators import UniqueValidator
from users.api.nested.profile import ProfileSerializer, ProfileUpdateSerializer
from users.models import Profile


User = get_user_model()


class RegistrationSerializer(RegisterSerializer):
    username = None
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    phone_number = PhoneNumberField(
        required=True,
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),  # Используй User вместо PhoneNumber
                message=_("A user is already registered with this phone number."),
            )
        ],
    )
    email = serializers.EmailField(
        validators=[UniqueValidator(
            queryset=User.objects.all(),
            message=_("Пользователь с таким email уже существует.")
        )]
    )

    password1 = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        phone_number = attrs.get('phone_number')
        first_name = attrs.get('first_name')
        last_name = attrs.get('last_name')
        email = attrs.get('email')
        password1 = attrs.get('password1')
        password2 = attrs.get('password2')

        if password1 != password2:
            raise ParseError(_("Пароли не совпадают."))

        validate_password(password1)
        return attrs

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
            raise ParseError(_('Invalid credentials.'))


        data['user'] = user
        return data

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    class Meta:
        model = User
        fields = (
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'date_joined',
            'last_activity',
            'role',
            'profile',
        )

class UserUpdateSerializer(serializers.ModelSerializer):
    profile = ProfileUpdateSerializer()
    role = serializers.CharField(read_only=True)
    date_joined = serializers.DateTimeField(read_only=True)
    last_activity = serializers.DateTimeField(read_only=True)
    class Meta:
        model = User
        fields = (
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'date_joined',
            'last_activity',
            'role',
            'profile',
        )

    @staticmethod
    def _update_profile(profile: Profile, data) -> None:
        """Обновление профиля."""

        profile_serializer = ProfileUpdateSerializer(
            instance=profile, data=data, partial=True
        )
        profile_serializer.is_valid(raise_exception=True)
        profile_serializer.save()

    def update(self, instance: User, validated_data: dict[str, str]) -> User:
        """Обновление в модели пользователя."""
        # Проверка на наличия профиля
        profile_data = validated_data.pop(
            'profile') if 'profile' in validated_data else None

        # Если произойдет какая-то ошибка изменения не применятся
        with transaction.atomic():
            instance = super().update(
                instance=instance, validated_data=validated_data
            )
            # Обновление профиля
            if profile_data:
                self._update_profile(instance.profile, profile_data)

        return instance
