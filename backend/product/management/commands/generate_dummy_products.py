from decimal import Decimal
from faker import Faker
from django.core.management.base import BaseCommand
from product.models import Product

class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument(
            '--count',
            type=int,
            default=20,
            help='Number of dummy products to create'
        )


    def handle(self, *args, **options):
        count = options['count']
        faker = Faker()
        products = []
        for _ in range(count):
            in_price = faker.pydecimal(left_digits=2, right_digits=2, positive=True)
            products.append(
                Product(
                    name=faker.company(),
                    in_price=in_price,
                    price=(in_price * Decimal('1.5').quantize(Decimal('0.01'))),
                    description=faker.text(max_nb_chars=200)
                )
            )

        Product.objects.bulk_create(products)
        
        self.stdout.write(self.style.SUCCESS(f'Successfully generated {count} dummy products'))
