$(document).ready(function () {
    $("#tabs").tabs();

});

var locaInput;
var dataInput;

function readFile(input) {
    let file = input.files[0];

    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
        dataInput = reader.result;
        $("#dataText").html(dataInput);
    };

    reader.onerror = function () {
        console.log(reader.error);
        alert("Error " + reader.error);
    };
}

function convert() {
    var jsonArr = JSON.parse(dataInput);

    for (var i = 0; i < jsonArr.length; i++) {
        var fileName = jsonArr[i].fileName;
        delete jsonArr[i].fileName;

        if (fileName != ""){
            var jsonTemp = JSON.stringify(jsonArr[i], null, 2);

            download(fileName + ".txt", jsonTemp);
        } else {
            continue;
        }
    }
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }