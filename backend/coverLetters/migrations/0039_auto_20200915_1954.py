# Generated by Django 3.1 on 2020-09-15 19:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coverLetters', '0038_auto_20200915_1939'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='form_creation_date',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
