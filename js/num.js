var ran4 = function() {
    /*derive non-repeated digit*/
    var arr = [];
    while (arr.length < 4) {
        var randomnumber = Math.ceil(Math.random() * 10) % 10
        var found = false;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == randomnumber) {
                found = true;
                break
            }
        }
        if (!found) arr[arr.length] = randomnumber;
    }
    return arr
}

var judge = function(input) {
    /*confirm game result*/
    var rarray = [];
    rarray[0] = 0;
    rarray[1] = 0;
    rarray[2] = 0;

    for (var i = 0; i < input.length; i++) {
        for (var j = 0; j < arr.length; j++) {
            if ((input[i] == arr[j]) && i == j) {
                rarray[0] += 1;
            } else if (input[i] == arr[j]) {
                rarray[1] += 1;
            }
        }
    }
    if (rarray[0] === 4) {
        rarray[2] = 1;
    } else {
        rarray[2] = 0;
    }
    return rarray
}

var inputcheck = function(input) {
    var check4d = /^\d{4}$/;

    if (check4d.test(input) === false) {
        return false

    }

    var found = false;
    for (var i = 0; i < input.length; i++) {
        for (var j = 0; j < input.length; j++) {
            if (input[i] == input[j] && i !== j) {
                found = true;
            }
        }
    }

    return !found
}

var arr = [];
var input;
var vin;

var ac = 0;
var bc = 0;
var state = 0;
var rarray = [];

var count = 1;

arr = ran4();
console.log(arr);




var numgame = function(input) {
    input = document.getElementById('input123').value;
    console.log(input);
    document.getElementById('input123').value = "";
    document.getElementById('input123').placeholder = input;

    var table = document.getElementById("myTable");
    var row;
    var cell1;
    var cell2;
    var cell3;

    vin = inputcheck(input);

    if (vin === false && state !== 1) {

        $(document).trigger("add-alerts", [{
            'message': "<strong>Pls Input 4 Non-Repeated Digit</strong>",
            'priority': 'error'
        }]);

        console.log("pls input 4 digit");
    }

    if (state === 0 && vin === true) {


        rarray = judge(input);
        state = rarray[2];
        ac = rarray[0];
        bc = rarray[1];
        console.log(rarray);

        $(document).trigger("add-alerts", [{
            'message': "<strong>" + ac + "A" + bc + "B" + "</strong>",
            'priority': 'info'
        }]);

        if (count <= 7) {
            document.getElementById("t" + count + "i").innerHTML = input;
            document.getElementById("t" + count + "r").innerHTML = ac + "A" + bc + "B";
            count += 1;
            console.log("count= " + count);

        } else {
            row = table.insertRow(count);
            cell1 = row.insertCell(0).outerHTML = "<th>" + count + "</th>";
            cell2 = row.insertCell(1).innerHTML = input;
            cell2 = row.insertCell(2).innerHTML = ac + "A" + bc + "B";
            count += 1;
            console.log("count= " + count);
        }

        if (state == 1) {

            $(document).trigger("add-alerts", [{
                'message': "<strong>Mission Completed!!!</strong>",
                'priority': 'success'
            }]);
            document.getElementById('input123').value = "";
            document.getElementById('input123').placeholder = "Dare to chalenge?";
            document.getElementById("btn123").innerHTML = "Again?";

        }

    } else if (state == 1) {
        /*confirm game state reset*/
        console.log("state= " + state);
        console.log("count before= " + count);
        arr = ran4();
        console.log(arr);
        state = 0;
        ac = 0;
        bc = 0;
        console.log(count >= 8);
        if (count >= 8) {
            for (var i = 8; i <= count - 1; i++) {

                table.deleteRow(8);
            }
        }

        for (var i = 1; i < 8; i++) {
            document.getElementById("t" + i + "i").innerHTML = "";
            document.getElementById("t" + i + "r").innerHTML = "";
        }

        count = 1;
        document.getElementById('input123').value = "";
        document.getElementById('input123').placeholder = "1234";
        document.getElementById("btn123").innerHTML = "Submit";
    }
}
