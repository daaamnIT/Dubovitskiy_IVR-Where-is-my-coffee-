# Generated by Django 4.0.3 on 2022-11-07 12:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0012_favourite_shop_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='coffeeshop',
            name='hasOwner',
            field=models.CharField(default='False', max_length=255),
        ),
    ]