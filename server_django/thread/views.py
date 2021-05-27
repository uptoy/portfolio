from . models import Topic
from django.shortcuts import render, redirect
# from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import DetailView
from django.urls import reverse_lazy
from . forms import TopicCreateForm


class TopicDetailView(DetailView):
    template_name = 'thread/detail_topic.html'
    model = Topic
    context_object_name = 'topic'


# class TopicTemplateView(TemplateView):
#     template_name = 'thread/detail_topic.html'

#     def get_context_data(self, **kwargs):
#         ctx = super().get_context_data(**kwargs)
#         ctx['topic'] = get_object_or_404(Topic, id=self.kwargs.get('pk', ''))
#         return ctx


# def detail_topic(request):
#     ctx = {}
#     template_name = 'thread/detail_topic.html'
#     if request.method == 'GET':
#         ctx['topic'] = get_object_or_404(Topic, request.kwargs.get('pk', ''))
#         return render(request, template_name, ctx)

def topic_create(request):
    template_name = 'thread/create_topic.html'
    ctx = {}
    if request.method == 'GET':
        ctx['form'] = TopicCreateForm()
        return render(request, template_name, ctx)

    if request.method == 'POST':
        topic_form = TopicCreateForm(request.POST)
        if topic_form.is_valid():
            topic_form.save()
            return redirect(reverse_lazy('base:top'))
        else:
            ctx['form'] = topic_form
            return render(request, template_name, ctx)
