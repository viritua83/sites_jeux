from django.urls import path, include
from django.contrib import admin 
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('monapp.urls')),  # Assurez-vous que le chemin est correct
]
