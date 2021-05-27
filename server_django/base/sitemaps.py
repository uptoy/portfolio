from django.contrib.sitemaps import Sitemap
from django.shortcuts import resolve_url


class BaseSitemap(Sitemap):

    def items(self):
        items = [
            'base:top',
            'base:policy',
            'base:terms',
        ]
        return items

    def location(self, obj):
        return resolve_url(obj)

    def changefreq(self, obj):
        if obj == 'base:top':
            return 'always'
        return 'never'

    def priority(self, obj):
        if obj == 'base:top':
            return 0.8
        return 0.1
