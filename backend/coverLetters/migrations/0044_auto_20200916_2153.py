# Generated by Django 3.1 on 2020-09-16 21:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('coverLetters', '0043_auto_20200916_2133'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='job',
            options={'get_latest_by': ['-created_date', 'modified_date'], 'ordering': ['-created_date', '-modified_date', '-position_title']},
        ),
    ]
