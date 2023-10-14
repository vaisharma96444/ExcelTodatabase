
function showUploadButton(input) {
    const uploadButton = document.getElementById('uploadButton');
    const selectedFileName = document.getElementById('selectedFileName');
    const uploadInstruction = document.querySelector('p[style="margin-left: 480px;"]');
    
    if (input.files.length > 0) {
        const fileName = input.files[0].name;
        selectedFileName.textContent = "Selected file: " + fileName;
        selectedFileName.style.display = 'block';
        uploadButton.style.display = 'block';
        uploadInstruction.style.display = 'none';
    } else {
        selectedFileName.style.display = 'none';
        uploadButton.style.display = 'none';
        uploadInstruction.style.display = 'block';
    }
}

document.getElementById('uploadButton').addEventListener('click', function (event) {
    event.preventDefault();
    

    fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: new FormData(document.querySelector('form')),
    })
    .then(response => response.json())
    .then(data => {
        const uploadButton = document.getElementById('uploadButton');
        const selectedFileName = document.getElementById('selectedFileName');
        const messageContainer = document.querySelector('.message');
        const happycheck = document.querySelector(".happy");

        happycheck.style.display = 'none';
        uploadButton.style.display = 'none';
        selectedFileName.style.display = 'none';

        
        if (data.message === 'Excel processed successfully') {
            
            messageContainer.innerHTML = '<div style="margin-left: 550px;  font-weight: bold;"> <p style="color:green; font-size: 20px;">Thanks You! <p/> <br> <p style="margin-left: -30px; margin-top: -30px;">  File Successfully Uploaded </p><br><p style="margin-left: -60px; margin-top: -20px;"> Your records will be processed shortly.</p></div>';
        }
    })
    .catch(error => {
        console.log(error);
    });
});
