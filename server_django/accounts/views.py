
from django.shortcuts import render, redirect
from django.views.generic import TemplateView, FormView
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.contrib.auth import login, authenticate

# Create your views here.


class UserCreateView(FormView):
    form_class = UserCreationForm
    template_name = 'registration/create.html'
    success_url = reverse_lazy('accounts:profile')

    def form_valid(self, form):
        print(self.request.POST['next'])
        if self.request.POST['next'] == 'back':
            return render(self.request, 'registration/create.html', {'form': form})
        elif self.request.POST['next'] == 'confirm':
            return render(self.request, 'registration/create_confirm.html', {'form': form})
        elif self.request.POST['next'] == 'regist':
            form.save()
            # 認証
            user = authenticate(
                username=form.cleaned_data['username'],
                password=form.cleaned_data['password1'],
            )
            # ログイン
            login(self.request, user)
            return super().form_valid(form)
        else:
            # 通常このルートは通らない
            return redirect(reverse_lazy('base:top'))


class UserProfileView(LoginRequiredMixin, TemplateView):
    template_name = 'registration/profile.html'

    def get_queryset(self):
        return User.objects.get(id=self.request.user.id)
