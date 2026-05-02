from rest_framework.routers import DefaultRouter
from .api import TranslationViewSet

router = DefaultRouter()
router.register(r'translation', TranslationViewSet, basename='translation')

urlpatterns = router.urls
