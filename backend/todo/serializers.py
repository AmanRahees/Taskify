from rest_framework import serializers
from .models import Todos

class TodoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Todos
        fields = ("id", "user", "body", "status")