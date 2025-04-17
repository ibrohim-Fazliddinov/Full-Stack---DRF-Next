from rest_framework import serializers
from users.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(required=False, read_only=True)
    background_image = serializers.ImageField(required=False, read_only=True)
    linkedin = serializers.URLField(required=False, read_only=True)
    twitter = serializers.URLField(required=False, read_only=True)
    website = serializers.URLField(required=False, read_only=True)
    skills = serializers.CharField(read_only=True, required=False)

    class Meta:
        model = Profile
        fields = '__all__'


class ProfileUpdateSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(required=False, allow_null=True)
    background_image = serializers.ImageField(required=False, allow_null=True)

    linkedin = serializers.URLField(required=False)
    twitter = serializers.URLField(required=False)
    website = serializers.URLField(required=False)

    bio = serializers.CharField(required=False)
    skills = serializers.CharField(required=False)

    date_of_birth = serializers.DateField(required=False)
    location = serializers.CharField(required=False)

    signature = serializers.CharField(required=False)

    class Meta:
        model = Profile
        fields = (
            'photo',
            'background_image',
            'bio',
            'location',
            'skills',
            'signature',
            'date_of_birth',
            'website',
            'linkedin',
            'twitter',
        )


class ProfileSerializerShort(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = (
            'user',
            'photo'
        )
