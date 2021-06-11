from django.contrib import admin
from django.urls import path, include
from django.conf import settings
import debug_toolbar
from thread.sitemaps import TopicSitemap, CategorySitemap
from django.contrib.sitemaps.views import sitemap
from base.sitemaps import BaseSitemap
from django.conf.urls.static import static


sitemaps = {
    'topic': TopicSitemap,
    'category': CategorySitemap,
    'base': BaseSitemap,
}

urlpatterns = [
    path('', include('base.urls')),
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('todo/', include('todo.urls')),
    path('thread/', include('thread.urls')),
    path('api/', include('api.urls')),
    path('search/', include('search.urls')),
    path('test/', include('test_practice.urls')),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


if settings.DEBUG:
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
