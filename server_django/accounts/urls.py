
from django.urls import path
# from django.contrib.auth import views as av
from . import views


app_name = 'accounts'

urlpatterns = [
    # path('', include('django.contrib.auth.urls')),
    # copy from django.contrib.auth.urls.py
    # path('login/', av.LoginView.as_view(form_class=CustomAuthenticationForm
    #                                     ), name='login'),
    path('login/', views.CustomLoginView.as_view(), name='login'),
    path('logout/', views.CustomLogoutView.as_view(), name='logout'),
    # path('logout/', av.LogoutView.as_view(
    #     template_name='regstration/logged_out.html',
    #     next_page='/'
    # ), name='logout'),

    # path('password_change/', av.PasswordChangeView.as_view(
    #     form_class=CustomPasswordChangeForm,
    #     template_name='registration/password_change_form.html',
    #     success_url='accounts/password_change/done/'
    # ), name='password_change'),
    # path('password_change/done/', av.PasswordChangeDoneView.as_view(
    #     template_name = 'registration/password_change_done.html',
    # ), name='password_change_done'),

    path('password_change/', views.CustomPasswordChangeView.as_view(), name='password_change'),
    path('password_change/done/', views.CustomPasswordChangeDoneView.as_view(), name='password_change_done'),


    # path('password_reset/', av.PasswordResetView.as_view(), name='password_reset'),
    # path('password_reset/done/', av.PasswordResetDoneView.as_view(), name='password_reset_done'),
    # path('reset///', av.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    # path('reset/done/', av.PasswordResetCompleteView.as_view(), name='password_reset_complete'),

    path('password_reset/', views.CustomPasswordResetView.as_view(), name='password_reset'),
    path('password_reset/done/', views.CustomPasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset///', views.CustomPasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset/done/', views.CustomPasswordResetCompleteView.as_view(), name='password_reset_complete'),


    path('create/', views.UserCreateView.as_view(), name="create"),
    path('profile/', views.UserProfileView.as_view(), name="profile"),
    path('change/', views.EmailChangeView.as_view(), name="change"),
]
