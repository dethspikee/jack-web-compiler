import json

from django.shortcuts import render
from django.http import JsonResponse


from .forms import UploadJackFileForm


from .compiler_source_code.JackTokenizer import JackTokenizer


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
    body = json.loads(request.body)
    jack_source = body.get('body')
    action = body.get('action')
    if action == 'Tokenize':
        tokenizer = JackTokenizer(jack_source)
        tokens = list(tokenizer.tokens)
        return JsonResponse(tokens, safe=False)

