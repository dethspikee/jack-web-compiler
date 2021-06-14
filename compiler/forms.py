from django import forms


class UploadJackFileForm(forms.Form):
    file = forms.FileField(
                widget=forms.FileInput(
                        attrs={'hidden': True,
                               'multiple': True}
                    ),
                label='Choose File(s)'
            )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.label_suffix = ''

