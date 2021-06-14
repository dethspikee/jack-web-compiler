from django.shortcuts import render


from .forms import UploadJackFileForm


def index(request):
    if request.method == 'POST':
        print(request.FILES)
        return
    else:
        form = UploadJackFileForm()
    return render(request,
            'compiler/compiler.html', {'form': form})
