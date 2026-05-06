from django.db import migrations


def load_default_translations(apps, schema_editor):
    translation_model = apps.get_model('i18n', 'Translation')

    translations = [
        {'key': 'login', 'language': 'en', 'value': 'login'},
        {'key': 'login_failed', 'language': 'en', 'value': 'Login failed'},
        {'key': 'logging_in', 'language': 'en', 'value': 'Logging in...'},
        {'key': 'email', 'language': 'en', 'value': 'Email'},
        {'key': 'email_address', 'language': 'en', 'value': 'Email address'},
        {'key': 'enter_email_address', 'language': 'en', 'value': 'Enter your email address'},
        {'key': 'password', 'language': 'en', 'value': 'Password'},
        {'key': 'enter_password', 'language': 'en', 'value': 'Enter your password'},
        {'key': 'home', 'language': 'en', 'value': 'Home'},
        {'key': 'products', 'language': 'en', 'value': 'Products'},
        {'key': 'about_us', 'language': 'en', 'value': 'About Us'},
        {'key': 'order', 'language': 'en', 'value': 'Order'},
        {'key': 'our_customers', 'language': 'en', 'value': 'Our Customers'},
        {'key': 'contact_us', 'language': 'en', 'value': 'Contact us'},
        {'key': 'name', 'language': 'en', 'value': 'Name'},
        {'key': 'article_no', 'language': 'en', 'value': 'Article No.'},
        {'key': 'product_service', 'language': 'en', 'value': 'Product/Service'},
        {'key': 'in_price', 'language': 'en', 'value': 'In Price'},
        {'key': 'price', 'language': 'en', 'value': 'Price'},
        {'key': 'in_stock', 'language': 'en', 'value': 'In Stock'},
        {'key': 'unit', 'language': 'en', 'value': 'Unit'},
        {'key': 'logout', 'language': 'en', 'value': 'Logout'},
        {'key': 'register', 'language': 'en', 'value': 'Register'},
        {'key': 'forgotten_password', 'language': 'en', 'value': 'Forgotten password?'},
        {'key': 'search_article_no', 'language': 'en', 'value': 'Search Article No ...'},
        {'key': 'search_product', 'language': 'en', 'value': 'Search Product ...'},
        {'key': 'loading', 'language': 'en', 'value': 'Loading'},
        {'key': 'login', 'language': 'sv', 'value': 'logga in'},
        {'key': 'login_failed', 'language': 'sv', 'value': 'Inloggning misslyckades'},
        {'key': 'logging_in', 'language': 'sv', 'value': 'Loggar in...'},
        {'key': 'email', 'language': 'sv', 'value': 'e-post'},
        {'key': 'email_address', 'language': 'sv', 'value': 'E-postadress'},
        {'key': 'enter_email_address', 'language': 'sv', 'value': 'Ange din e-postadress'},
        {'key': 'password', 'language': 'sv', 'value': 'losenord'},
        {'key': 'enter_password', 'language': 'sv', 'value': 'Ange ditt lösenord'},
        {'key': 'home', 'language': 'sv', 'value': 'hem'},
        {'key': 'products', 'language': 'sv', 'value': 'produkter'},
        {'key': 'about_us', 'language': 'sv', 'value': 'om oss'},
        {'key': 'order', 'language': 'sv', 'value': 'bestallning'},
        {'key': 'our_customers', 'language': 'sv', 'value': 'Våra kunder'},
        {'key': 'contact_us', 'language': 'sv', 'value': 'Kontakta oss'},
        {'key': 'name', 'language': 'sv', 'value': 'namn'},
        {'key': 'article_no', 'language': 'sv', 'value': 'Artikelnummer'},
        {'key': 'product_service', 'language': 'sv', 'value': 'Produkt/Tjänst'},
        {'key': 'in_price', 'language': 'sv', 'value': 'inkopspris'},
        {'key': 'price', 'language': 'sv', 'value': 'pris'},
        {'key': 'in_stock', 'language': 'sv', 'value': 'I lager'},
        {'key': 'unit', 'language': 'sv', 'value': 'Enhet'},
        {'key': 'logout', 'language': 'sv', 'value': 'logga ut'},
        {'key': 'register', 'language': 'sv', 'value': 'Registrera'},
        {'key': 'forgotten_password', 'language': 'sv', 'value': 'Glömt lösenord?'},
        {'key': 'search_article_no', 'language': 'sv', 'value': 'Sök artikelnummer ...'},
        {'key': 'search_product', 'language': 'sv', 'value': 'Sök produkt ...'},
        {'key': 'loading', 'language': 'sv', 'value': 'Laddar'},
    ]

    for translation in translations:
        translation_model.objects.update_or_create(
            key=translation['key'],
            language=translation['language'],
            defaults={'value': translation['value']},
        )


def unload_default_translations(apps, schema_editor):
    translation_model = apps.get_model('i18n', 'Translation')
    translation_model.objects.filter(
        key__in=['login', 'login_failed', 'logging_in', 'email', 'email_address', 'enter_email_address', 'password', 'enter_password', 'home', 'products', 'about_us', 'order', 'our_customers', 'contact_us', 'name', 'article_no', 'product_service', 'in_price', 'price', 'in_stock', 'unit', 'logout', 'register', 'forgotten_password', 'search_article_no', 'search_product', 'loading'],
        language__in=['en', 'sv'],
    ).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('i18n', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(load_default_translations, unload_default_translations),
    ]
