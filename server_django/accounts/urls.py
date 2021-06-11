
from django.urls import path
from django.contrib.auth import views as av
from . import views


app_name = 'accounts'

urlpatterns = [
    path('login/', views.CustomLoginView.as_view(), name='login'),
    path('logout/', av.LogoutView.as_view(), name='logout'),

    path('password_change/', av.PasswordChangeView.as_view(), name='password_change'),
    path('password_change/done/', av.PasswordChangeDoneView.as_view(), name='password_change_done'),

    path('password_reset/', av.PasswordResetView.as_view(), name='password_reset'),
    path('password_reset/done/', av.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset///', av.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset/done/', av.PasswordResetCompleteView.as_view(), name='password_reset_complete'),

    path('create/', views.UserCreateView.as_view(), name="create"),
    path('profile/', views.UserProfileView.as_view(), name="profile"),
    path('change/', views.UserChangeView.as_view(), name="change"),
]
