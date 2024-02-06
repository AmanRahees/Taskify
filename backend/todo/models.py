from django.db import models
from accounts.models import CustomUser

# Create your models here.

class Todos(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    body = models.TextField()
    status = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user} --> {self.body}"
    
    class Meta:
        ordering = ['-id']
    