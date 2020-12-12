# Generated by Django 3.1.4 on 2020-12-12 07:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('coverLetters', '0007_auto_20201211_2047'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='defaultinfo',
            options={'get_latest_by': ['-created_date', 'modified_date'], 'ordering': ['-created_date', '-modified_date', '-id']},
        ),
        migrations.AlterModelOptions(
            name='user',
            options={'ordering': ['-modified_date', '-id']},
        ),
    ]
