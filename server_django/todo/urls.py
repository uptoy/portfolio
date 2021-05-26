from django.urls import path
from .views import TodoListView

urlpatterns = [
    # path('', views.index, name='index'),
    path('', TodoListView.as_view(), name='todo-home')
]
