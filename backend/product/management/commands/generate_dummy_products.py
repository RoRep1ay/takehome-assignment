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
        created_count = 0

        for index in range(1, count + 1):
            in_price = faker.pydecimal(left_digits=2, right_digits=2, positive=True)
            price = in_price * Decimal('1.50')

            _, created = Product.objects.update_or_create(
                article_no=str(1234567800 + index),
                defaults={
                    'name': faker.sentence(nb_words=4).replace('.', ''),
                    'in_price': in_price,
                    'price': price,
                    'in_stock': faker.pydecimal(left_digits=2, right_digits=2, positive=True),
                    'unit': faker.random_element(elements=('pcs', 'hours', 'kg', 'box')),
                    'description': faker.text(max_nb_chars=200),
                },
            )

            if created:
                created_count += 1
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully created or updated {count} dummy products ({created_count} created)'
            )
        )
