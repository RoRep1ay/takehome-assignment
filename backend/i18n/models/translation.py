from django.db import models

class Translation(models.Model):
    key = models.CharField(max_length=100)
    language = models.CharField(max_length=2)  # 'en', 'sv'
    value = models.TextField()

    class Meta:
        unique_together = ('key', 'language')
