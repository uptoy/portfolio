from django.urls import path
from django.views.generic import TemplateView
from . import views

app_name = 'base'

urlpatterns = [
    path('', views.TopicListView.as_view(), name='top'),
    path('terms/', TemplateView.as_view(template_name='base/terms.html'), name='terms'),
]
