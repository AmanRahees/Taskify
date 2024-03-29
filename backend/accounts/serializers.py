from accounts.models import CustomUser
from rest_framework import serializers

class RegisterUserSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'role', 'password')
        extra_kwargs = {'password':{'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
class CustomUserSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"