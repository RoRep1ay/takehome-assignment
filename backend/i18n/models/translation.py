from django.db import models
from common import BaseModel


class Language(models.TextChoices):
    ENGLISH = 'en', 'English'
    SWEDISH = 'sv', 'Swedish'


class Translation(BaseModel):
    key = models.CharField(max_length=100)
    language = models.CharField(max_length=2, choices=Language.choices)
    value = models.TextField()

    class Meta:
        unique_together = ('key', 'language')
