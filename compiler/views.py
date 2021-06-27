import json

from django.shortcuts import render
from django.http import JsonResponse


from .forms import UploadJackFileForm


def file_uploads(request):
    if request.method == 'POST':
        print(request.FILES)
        form = UploadJackFileForm(request.POST, request.FILES)
        if form.is_valid():
            files = request.FILES.getlist('file_field')
            response_content = ''
            for file_ in files:
                decoded_file = file_.read().decode('utf-8')
                response_content += decoded_file
            response = {
                    'content': response_content
            }
        return JsonResponse(response, status=200)
    else:
        form = UploadJackFileForm()
    return render(request,
            'compiler/compiler.html', {'form': form})


def compile(request):
    request_body = json.loads(request.body)
    action = request_body.get('action')
    jack_source = request_body.get('body')
    print(jack_source)

