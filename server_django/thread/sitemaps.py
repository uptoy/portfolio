
from django.contrib.sitemaps import Sitemap
from django.shortcuts import resolve_url

from . models import Topic, Category


class TopicSitemap(Sitemap):
    priority = 0.5
    changefreq = 'always'

    def items(self):
        return Topic.objects.all()

    def location(self, obj):
        return resolve_url('thread:topic', pk=obj.id)


class CategorySitemap(Sitemap):
    priority = 0.5
    changefreq = 'never'

    def items(self):
        return Category.objects.all()

    def location(self, obj):
        return resolve_url('thread:category', url_code=obj.url_code)
