from collections import defaultdict

from drf_spectacular.utils import extend_schema
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from ..models import Translation


class TranslationViewSet(ViewSet):

    @extend_schema(exclude=True)
    def list(self, request):
        translations = Translation.objects.all().values_list('language', 'key', 'value')
        payload = defaultdict(dict)

        for language, key, value in translations:
            payload[language][key] = value

        return Response(payload)
