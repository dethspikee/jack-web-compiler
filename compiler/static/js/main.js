const editor1 = document.getElementById("editor-1");
const editor2 = document.getElementById("editor-2");
const uploadBtn = document.getElementById('id_file_field');
const selectTag = document.getElementById('action-list');
const submitActionBtn = document.getElementById('submit-action');
const fileUploadForm = document.getElementById('file-upload');
const actionForm = document.getElementById('action-form');
const csrftoken = Cookies.get('csrftoken');


// SET MAX SIZE LIMIT FOR EACH FILE
const MAX_SIZE = 5000000;


const leftCodeMirror = CodeMirror(editor1, {
    mode: 'text/plain',
    viewportMargin: Infinity,
    lineNumbers: true,
    lineWrapping: true,
    theme: 'default',
});

const rightCodeMirror = CodeMirror(editor2, {
    mode: 'xml',
    readOnly: 'nocursor',
    viewportMargin: Infinity,
    lineNumbers: true,
    lineWrapping: true,
    theme: 'default',
});


actionForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    action = submitActionBtn.value;
    body = leftCodeMirror.getValue();
    if (!body) {
        console.log('empty body: error');
        editor1.style.border = '1.5px solid #ff000070';
        setTimeout(() => {
            editor1.style.border = '1px solid lightgrey';
        }, 1000);
    } else {
        compile(action, body);
    }
    //request_parse_or_compile(action);
});


const compile = async (action, body) => {
    const response = await fetch('/compile/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'action': action,
            'body': body,
        }),
        mode: 'same-origin',
    });

    if (response.ok) {
        const responseJson = await response.json();
        let tokens = '';
        for (const token of responseJson) {
            tokens += `<token> ${token} </token>` + '\n';
        }
        rightCodeMirror.setValue(tokens);
    }
};


/*
 * Handle file(s) form submit event. Prevent default and
 * prepare all files to be uploaded. Once the response
 * is received and parsed append it to the codemirror instance
 */
fileUploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    let formData = new FormData();
    const fileField = document.getElementById('id_file_field');
    let files = validateFiles(fileField.files);
    for (let i = 0; i < files.length; i++) {
        formData.append('file_field', files[i]);
    }
    const response = await fetch('/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken,
        },
        body: formData,
        mode: 'same-origin',
    });
    if (response.ok) {
        const responseJson = await response.json();
        leftCodeMirror.setValue(responseJson.content);
        leftCodeMirror.focus();
        leftCodeMirror.setCursor(leftCodeMirror.lineCount(), 0);
        
        // clean up input and filenames - change to function later!
        let uploadBtn = document.querySelector('.uploadButton');
        clearPreviousFiles();
        uploadBtn.value = 'Done!';
        setTimeout(() => {
            uploadBtn.classList.add('fade-out');
            uploadBtn.addEventListener('animationend', (event) => {
                uploadBtn.remove();
            });
        }, 1000);
    }
});


/*
 * Listen for a change on the select tag
 */
selectTag.addEventListener('change', (event) => {
    const select = event.target;
    const index = select.selectedIndex;
    const value = select.options[index].value;

    submitActionBtn.value = value;
});


/*
 * Listen for a change on the file input
 */
uploadBtn.addEventListener('change', function() {
    clearPreviousFiles();
    let files = validateFiles(this.files);
    if (files.length > 0) {
        showSelectedFiles(files);
    } else {
        // 0 files passed file type check. Display error.
    }
});


/*
 * Find all file 'ready to be uploaded'
 * and remove them from the page
 */
const clearPreviousFiles = () => {
    const files = document.querySelectorAll('.filename');
    for (const file of files) {
        file.classList.add('disappear');
        file.addEventListener('animationend', (event) => {
            file.remove();
        });
    }
};


/*
 * Once the file(s) are validated;
 * show them on the page
 */
const showSelectedFiles = (files) => {
    const form = document.querySelector('#upload-form-container form');
    let submitFormButton = document.querySelector('.uploadButton');

    for (const file of files) {
        let span = document.createElement('span')
        span.setAttribute('class', 'filename');
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


/*
 * Validate files to see if they're
 * valid .jack files and their size
 * is smaller than MAX_SIZE
 */
const validateFiles = (files) => {
    let valid_files = [];
    for (const file of files) {
        if (valid_files.includes(file)) {
            continue;
        }
        let extension = file.name.split('.').pop();
        if (extension !== 'jack') {
            // incorrect file extension was chosen show error
            continue;
        }
        if (file.size > MAX_SIZE) {
            // file size too big
            continue;
        }
        valid_files.push(file);
    }
    return valid_files;
};
