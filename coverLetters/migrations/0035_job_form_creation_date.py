# Generated by Django 3.1 on 2020-09-15 19:29

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coverLetters', '0034_remove_job_form_creation_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='form_creation_date',
            field=models.DateField(blank=True, default=datetime.date.today),
        ),
    ]
