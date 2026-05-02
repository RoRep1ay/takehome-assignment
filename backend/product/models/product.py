from django.db import models
from common import BaseModel


class Product(BaseModel):
    name = models.CharField(max_length=255)
    in_price = models.DecimalField(max_digits=10, decimal_places=2)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    description = models.TextField(blank=True)
