from rest_framework import serializers

from users.models import Profile


class ProfileSerializerShort(serializers.ModelSerializer):
    class Meta:
        models = Profile
        fields = '__all__'

class ProfileUpdateSerializerShort(serializers.ModelSerializer):
    class Meta:
        models = Profile
        fields = (
            'photo',
            'background_image',
            'bio',
            'location',
            'signature',
            'date_of_birth',
            'website',
            'linkedin',
            'twitter',
        )