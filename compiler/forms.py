from django import forms


class UploadJackFileForm(forms.Form):
    CHOICES = [
        ('parser', 'parser'),
        ('compile', 'compile')
    ]

    file = forms.FileField(
                widget=forms.FileInput(
                        attrs={'hidden': True,
                               'multiple': True}
                    ),
                label='Upload Jack File(s)'
            )
    action = forms.ChoiceField(choices=CHOICES)


    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.label_suffix = ''

