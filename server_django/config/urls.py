from django.contrib import admin
from django.urls import path, include
from django.conf import settings
import debug_toolbar
from thread.sitemaps import TopicSitemap, CategorySitemap
from django.contrib.sitemaps.views import sitemap
from base.sitemaps import BaseSitemap

sitemaps = {
    'topic': TopicSitemap,
    'category': CategorySitemap,
    'base': BaseSitemap,
}

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    path('todo/', include('todo.urls')),
    path('', include('base.urls')),
    path('thread/', include('thread.urls')),
    path('api/', include('api.urls')),
    path('search/', include('search.urls')),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}),
]

if settings.DEBUG:
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
