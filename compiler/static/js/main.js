const editorContainer = document.getElementById("editor");
const uploadBtn = document.getElementById('id_file');


// 5000000 bytes = 5MB
const MAX_SIZE = 5000000;


uploadBtn.addEventListener('change', function() {
    let files = validateFiles(this.files);
    if (files.length > 0) {
        showSelectedFiles(files);
    } else {
        // 0 files passed file type check. Display error.
    }
});


const showSelectedFiles = (files) => {
    const form = document.querySelector('#upload-form-container form');
    let submitFormButton = document.querySelector('.uploadButton');

    for (const file of files) {
        let span = document.createElement('span')
        span.textContent = file.name;
        if (submitFormButton) {
            form.insertBefore(span, submitFormButton);
        } else {
            form.append(span);
        }
    }
    if (!submitFormButton) {
        let submitForm = document.createElement('input');
        submitForm.type = 'submit';
        submitForm.value = 'Upload';
        submitForm.classList.add('uploadButton');
        form.append(submitForm);
    }
};


const myCodeMirror = CodeMirror(editorContainer, {
    mode: 'xml',
    viewportMargin: Infinity,
    lineNumbers: true,
});


const validateFiles = (files) => {
    let valid_files = [];
    for (const file of files) {
        if (!(file.size > MAX_SIZE)) {
          valid_files.push(file);
        }
    }
    return valid_files;
};
