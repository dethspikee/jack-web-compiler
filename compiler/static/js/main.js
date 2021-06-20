const editorContainer1 = document.getElementById("editor-1");
const uploadBtn = document.getElementById('id_file');
const selectTag = document.getElementById('action-list');
const submitActionBtn = document.getElementById('submit-action');


// 5000000 bytes = 5MB
const MAX_SIZE = 5000000;


selectTag.addEventListener('change', (event) => {
    const select = event.target;
    const index = select.selectedIndex;
    const value = select.options[index].value;
});


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


const validateFiles = (files) => {
    let valid_files = [];
    for (const file of files) {
        if (!(file.size > MAX_SIZE)) {
          valid_files.push(file);
        }
    }
    return valid_files;
};


const myCodeMirror = CodeMirror(editorContainer1, {
    mode: 'xml',
    viewportMargin: Infinity,
    lineNumbers: true,
    lineWrapping: true,
    theme: 'default',
});

editorContainer1.addEventListener('paste', (event) => {
    let cursor = document.querySelector('.CodeMirror-cursors');
    cursor.style.transform = `scale(${1/1.04})`;
    cursor.style.transformOrigin = '0 0';
});
