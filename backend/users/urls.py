from rest_framework.routers import DefaultRouter
from .api import UserSignupView, EmailTokenObtainPairView, UserMeView
from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path

router = DefaultRouter()
# router.register(r'translation', TranslationViewSet, basename='translation')

urlpatterns = [
    path('signup/', UserSignupView.as_view(), name='user_signup'),
    path('login/', EmailTokenObtainPairView.as_view(), name='token_obtain'),
    path('me/', UserMeView.as_view(), name='user_me'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]

