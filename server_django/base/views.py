from django.shortcuts import render
from django.views.generic import TemplateView, ListView

from thread.models import Topic


def top(request):
    # template = loader.get_template('base/top.html')
    ctx = {'title': 'trade'}
    # return HttpResponse(template.render(ctx, request))
    return render(request, 'base/top.html', ctx)


class TopView(TemplateView):
    template_name = 'base/top.html'

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['title'] = 'IT学習ちゃんねる(仮)'
        return ctx


class TopicListView(ListView):
    template_name = 'base/top.html'
    queryset = Topic.objects.order_by('-created')
    context_object_name = 'topic_list'
