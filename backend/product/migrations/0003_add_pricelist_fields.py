from django.db import migrations, models


def fill_product_fields(apps, schema_editor):
    product_model = apps.get_model('product', 'Product')

    for product in product_model.objects.all().iterator():
        if not product.article_no:
            product.article_no = str(1234567800 + product.id)

        if not product.unit:
            product.unit = 'pcs'

        if not product.in_stock:
            product.in_stock = product.price

        product.save(update_fields=['article_no', 'unit', 'in_stock'])


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0002_alter_product_name_max_length'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='article_no',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AddField(
            model_name='product',
            name='in_stock',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AddField(
            model_name='product',
            name='unit',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.RunPython(fill_product_fields, migrations.RunPython.noop),
    ]
