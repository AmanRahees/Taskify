from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .serializers import RegisterUserSerializers

# Create your views here.

class RegisterAPI(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = RegisterUserSerializers(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)