# Generated by Django 4.0.3 on 2022-10-12 07:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_reports'),
    ]

    operations = [
        migrations.CreateModel(
            name='Owners',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=255)),
                ('isOwner', models.BooleanField()),
            ],
        ),
    ]