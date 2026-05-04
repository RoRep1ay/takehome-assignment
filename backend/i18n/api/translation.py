from drf_spectacular.utils import extend_schema
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from ..models.translation import Language, Translation


class TranslationViewSet(ViewSet):

    @extend_schema(exclude=True)
    def list(self, request):
        requested_language = request.query_params.get('language', Language.ENGLISH)
        language = requested_language.split('-')[0].lower()

        if language not in Language.values:
            language = Language.ENGLISH

        translations = Translation.objects.filter(language=language).values_list('key', 'value')
        payload = {key: value for key, value in translations}

        return Response(payload)
