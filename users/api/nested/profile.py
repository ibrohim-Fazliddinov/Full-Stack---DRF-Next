from rest_framework import serializers
from users.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class ProfileUpdateSerializer(serializers.ModelSerializer):
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