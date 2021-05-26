# from django.http import HttpResponse
# def index(request):
#     return HttpResponse("Hello, world. You're at the polls index.")

from django.views.generic import ListView
from .models import Todo


class TodoListView(ListView):
    model = Todo
    template_name = 'todo/home.html'
    context_object_name = 'todos'
    ordering = ['-created_date']
