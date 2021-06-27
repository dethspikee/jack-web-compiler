from django.urls import path


from . import views


app_name = 'compiler'
urlpatterns = [
    path('compile/', views.compile, name='compile'),
    path('', views.file_uploads, name='file_uploads'),
]
