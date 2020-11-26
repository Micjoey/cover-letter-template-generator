from django.contrib import admin
from django.urls import path, include
from django.views.decorators.cache import cache_page
import coverLetters.views


urlpatterns = [
    path('admin/', admin.site.urls, name='Admin-site'),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('coverLetters.api.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls'))
]
