from . models import Topic
from django.shortcuts import render, redirect, get_object_or_404
# from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import DetailView, CreateView, TemplateView
from django.urls import reverse_lazy
from . forms import TopicModelForm


class TopicCreateView(CreateView):
    template_name = 'thread/create_topic.html'
    form_class = TopicModelForm
    # form_class = TopicCreateForm
    model = Topic
    success_url = reverse_lazy('base:top')

    def form_valid(self, form):
        ctx = {'form': form}
        if self.request.POST.get('next', '') == 'confirm':
            return render(self.request, 'thread/confirm_topic.html', ctx)
        if self.request.POST.get('next', '') == 'back':
            return render(self.request, 'thread/create_topic.html', ctx)
        if self.request.POST.get('next', '') == 'create':
            return super().form_valid(form)
        else:
            # 正常動作ではここは通らない。エラーページへの遷移でも良い
            return redirect(reverse_lazy('base:top'))


# class TopicFormView(FormView):
#     template_name = 'thread/create_topic.html'
#     form_class = TopicCreateForm
#     success_url = reverse_lazy('base:top')

#     def form_valid(self, form):
#         form.save()
#         return super().form_valid(form)


# def topic_create(request):
#     template_name = 'thread/create_topic.html'
#     ctx = {}
#     if request.method == 'GET':
#         ctx['form'] = TopicCreateForm()
#         return render(request, template_name, ctx)

#     if request.method == 'POST':
#         topic_form = TopicCreateForm(request.POST)
#         if topic_form.is_valid():
#             topic_form.save()
#             return redirect(reverse_lazy('base:top'))
#         else:
#             ctx['form'] = topic_form
#             return render(request, template_name, ctx)


class TopicDetailView(DetailView):
    template_name = 'thread/detail_topic.html'
    model = Topic
    context_object_name = 'topic'


class TopicTemplateView(TemplateView):
    template_name = 'thread/detail_topic.html'

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['topic'] = get_object_or_404(Topic, id=self.kwargs.get('pk', ''))
        return ctx


# def detail_topic(request):
#     ctx = {}
#     template_name = 'thread/detail_topic.html'
#     if request.method == 'GET':
#         ctx['topic'] = get_object_or_404(Topic, request.kwargs.get('pk', ''))
#         return render(request, template_name, ctx)

# def topic_create(request):
#     template_name = 'thread/create_topic.html'
#     ctx = {}
#     if request.method == 'GET':
#         form = TopicForm()
#         ctx['form'] = form
#         # ctx['form'] = TopicCreateForm()
#         return render(request, template_name, ctx)

#     if request.method == 'POST':
#         topic_form = TopicForm(request.POST)
#         # topic_form = TopicCreateForm(request.POST)
#         if topic_form.is_valid():
#             # topic_form.save()
#             topic = Topic()
#             cleaned_data = topic_form.cleaned_data
#             topic.title = cleaned_data['title']
#             topic.message = cleaned_data['message']
#             topic.user_name = cleaned_data['user_name']
#             topic.category = cleaned_data['category']
#             topic.save()
#             return redirect(reverse_lazy('base:top'))
#         else:
#             ctx['form'] = topic_form
#             return render(request, template_name, ctx)
