from rest_framework.viewsets import ModelViewSet
from rest_framework.serializers import ModelSerializer

from ..models import Product


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
