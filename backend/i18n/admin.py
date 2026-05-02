from django.contrib import admin

from .models import Translation

@admin.register(Translation)
class TranslationAdmin(admin.ModelAdmin):
    pass
