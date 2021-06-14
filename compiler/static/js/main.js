const editorContainer = document.getElementById("editor");
const uploadBtn = document.getElementById('actual-btn');


uploadBtn.addEventListener('change', function() {
    let files = this.files;
    showSelectedFiles(files);
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
