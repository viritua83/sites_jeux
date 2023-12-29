# monapp/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # Ajoutez des champs personnalisés au besoin

    # Résolution du conflit pour le champ 'groups'
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',  # Utilisez un nom approprié
        blank=True,
        verbose_name='groups',
        help_text='The groups this user belongs to.',
    )

    # Résolution du conflit pour le champ 'user_permissions'
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_set',  # Utilisez un nom approprié
        blank=True,
        verbose_name='user permissions',
        help_text='Specific permissions for this user.',
    )
