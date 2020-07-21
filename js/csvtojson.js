$(document).ready(function () {
    $("#tabs").tabs();

});

var dataInput;
var tempInput;

function readFile(input) {
    let file = input.files[0];

    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
        if (input.id == "dataFile") {
            dataInput = reader.result;
            $("#dataText").html(dataInput);
        } else {
            tempInput = reader.result;
            $("#tempText").html(tempInput);
        }
    };

    reader.onerror = function () {
        console.log(reader.error);
        alert("Error " + reader.error);
    };
}

function convert() {
    // split newline
    var dataArrayLine = dataInput.split("\n");

    // split each column
    var dataArray = [];
    for (var i = 0; i < dataArrayLine.length; i++) {
        var row = dataArrayLine[i].split(",");
        dataArray.push(row);
    }

    var json = "[\n"
    for (var j = 0; j < dataArray.length; j++) {
        var temp = tempInput;
        for (var k = 0; k < dataArray[j].length; k++) {
            var tempInd = "[d" + (k + 1) + "]";

            temp = temp.replace(tempInd, dataArray[j][k].trim());
        }
        
        if(j == (dataArray.length - 1)){
            json += temp + "\n";
        } else {
            json += temp + "\n,\n";
        }
    }

    json += "]";

    $("#otxtText").html(json);
    
}