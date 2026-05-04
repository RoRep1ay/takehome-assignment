from django.core.management.base import BaseCommand

from i18n.models import Translation


class Command(BaseCommand):

    def handle(self, *args, **options):
        translations = [
            Translation(key='login', language='en', value='Login'),
            Translation(key='email', language='en', value='Email'),
            Translation(key='password', language='en', value='Password'),
            Translation(key='home', language='en', value='Home'),
            Translation(key='products', language='en', value='Products'),
            Translation(key='aboutUs', language='en', value='About Us'),
            Translation(key='Order', language='en', value='Order'),
            Translation(key='login', language='sv', value='logga in'),
            Translation(key='email', language='sv', value='e-post'),
            Translation(key='password', language='sv', value='losenord'),
            Translation(key='home', language='sv', value='hem'),
            Translation(key='products', language='sv', value='produkter'),
            Translation(key='about us', language='sv', value='om oss'),
            Translation(key='order', language='sv', value='bestallning'),
        ]

        created_translations = Translation.objects.bulk_create(translations, ignore_conflicts=True)

        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully created {len(created_translations)} translations'
            )
        )
