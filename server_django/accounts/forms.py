from django.contrib.auth.forms import AuthenticationForm
from django.forms import ModelForm
from django.contrib.auth.models import User


class CustomAuthenticationForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault('label_suffix', '')
        super().__init__(*args, **kwargs)


class UserChangeForm(ModelForm):
    class Meta:
        model = User
        fields = [
            'email',
            'last_name',
            'first_name',
        ]

    def __init__(self, email=None, first_name=None, last_name=None, *args, **kwargs):
        kwargs.setdefault('label_suffix', '')
        super().__init__(*args, **kwargs)
        # ユーザーの更新前情報をフォームに挿入
        if email:
            self.fields['email'].widget.attrs['value'] = email
        if first_name:
            self.fields['first_name'].widget.attrs['value'] = first_name
        if last_name:
            self.fields['last_name'].widget.attrs['value'] = last_name

    def update(self, user):
        user.email = self.cleaned_data['email']
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        user.save()
