from django.db import models
from common import BaseModel


class Product(BaseModel):
    article_no = models.CharField(max_length=30, blank=True)
    name = models.CharField(max_length=50)
    in_price = models.DecimalField(max_digits=10, decimal_places=2)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    in_stock = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    unit = models.CharField(max_length=50, blank=True)

    description = models.TextField(blank=True)
