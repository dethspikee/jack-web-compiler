from django import forms


class UploadJackFileForm(forms.Form):
    file_field = forms.FileField(
                widget=forms.FileInput(
                        attrs={'hidden': True,
                               'multiple': True}
                    ),
                label='Upload Jack File(s)'
            )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.label_suffix = ''

