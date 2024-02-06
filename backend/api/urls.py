from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *
from accounts.views import *
from todo.views import *

urlpatterns = [
    path("users/register/", RegisterAPI.as_view(), name="user-register"),
    path("token/", MyTokenObtainPairView.as_view(), name="token-obtain"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refersh-token"),

    path("todos/", ListTods.as_view(), name="list-todos"),
    path("todos/create/", CreateTodo.as_view(), name="create-todo"),
    path("todos/status/<int:id>/", ChangeTodoStatus.as_view(), name="todo-status"),
]