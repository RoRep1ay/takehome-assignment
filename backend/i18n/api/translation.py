from collections import defaultdict

from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from ..models import Translation


class TranslationViewSet(ViewSet):
    def list(self, request):
        translations = Translation.objects.all().values_list('language', 'key', 'value')
        payload = defaultdict(dict)

        for language, key, value in translations:
            payload[language][key] = value

        return Response(payload)
