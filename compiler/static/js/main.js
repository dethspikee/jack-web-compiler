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
    for (const file of files) {
        let span = document.createElement('span')
        span.textContent = file.name;
        form.append(span);
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
    console.log(valid_files);
    return valid_files;
};
