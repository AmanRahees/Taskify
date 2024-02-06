from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .models import Todos
from .serializers import TodoSerializers

# Create your views here.

class ListTods(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TodoSerializers

    def get_queryset(self):
        user = self.request.user
        return Todos.objects.filter(user=user)

class CreateTodo(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]    
    serializer_class = TodoSerializers

    def perform_create(self, serializer):
        serializer.save()

class ChangeTodoStatus(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request, id):
        try:
            todo = Todos.objects.get(id=id)
            todo.status = True
            todo.save()
            return Response({"message": "Todo status updated successfully!"}, status=status.HTTP_200_OK)
        except:
            return Response({"error": "Todo not found."}, status=404)
        
    def delete(self, request, id):
        try:
            todo = Todos.objects.get(id=id)
            todo.delete()
            return Response({"message": "Todo status updated successfully!"}, status=status.HTTP_200_OK)
        except:
            return Response({"error": "Todo not found."}, status=404)