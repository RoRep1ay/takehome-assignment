from django.urls import include, path

urlpatterns = [
    path('', include('i18n.urls')),
]
