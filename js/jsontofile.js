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

var jasonArr;
var cL = 0;
var cDownload = 0;
var cSkip = 0;

function convertLoop(){
    setTimeout(function(){
        var fileName = jsonArr[cL].fileName;
        delete jsonArr[cL].fileName;

        if (fileName != ""){
            var jsonTemp = JSON.stringify(jsonArr[cL], null, 2);
            cDownload++;
            download(fileName + ".txt", jsonTemp);
        } else {
            cSkip++;
        }

        cL++;
        if (cL < jsonArr.length){
            convertLoop();
        } else {
            var message = "Done : Total - " + jsonArr.length + " : Downloaded - " + cDownload + " : Skipped - " + cSkip;
            alert(message);

            // disable button
            $('#convert').prop('disabled', false);
        }

    }, 1000);
}

function convert() {
    // disable button
    $('#convert').prop('disabled', true);

    jsonArr = JSON.parse(dataInput);

    cL = 0;
    cDownload = 0;
    cSkip = 0;

    convertLoop();
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