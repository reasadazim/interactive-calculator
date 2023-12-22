// Update the amount text box with the correct value, and call other functions to ensure all values are updated.
var CallAmountChange = function() {
    $('#calls').val(a.getValue());
};

var PercentAmountChange = function() {
    $('#percent').val(b.getValue());
};

var TicketAmountChange = function() {
    $('#ticket').val(c.getValue());
};


// Initialise the amount slider.
var a = $('#how-many-calls').slider()
    .on('change', CallAmountChange)
    .data('slider');

var b = $('#how-many-percent').slider()
    .on('change', PercentAmountChange)
    .data('slider');

var c = $('#how-many-ticket').slider()
    .on('change', TicketAmountChange)
    .data('slider');


$(function() {
    // Document ready
    initialiseVars();

    // Add a click event to the amount input to update the sliders
    $('#calls').on('change', function() {
        updateSliders(true, false);
    });
    $('#percent').on('change', function() {
        updateSliders(true, false);
    });
    $('#ticket').on('change', function() {
        updateSliders(true, false);
    });

    // Add a click event to the minus of amount to update the text box to the value in it plus 1. The Number function is used here to convert the value from a string to a number to ensure the operator can work on the value correctly.
    $('.edit-how-many-calls .slider-plus').on('click', function() {
        $('#calls').val(Number($('#calls').val()) + 1);
        updateSliders(true, false);
    });
    $('.edit-how-many-percent .slider-plus').on('click', function() {
        $('#percent').val(Number($('#percent').val()) + 1);
        updateSliders(true, false);
    });
    $('.edit-how-many-ticket .slider-plus').on('click', function() {
        $('#ticket').val(Number($('#ticket').val()) + 1);
        updateSliders(true, false);
    });

    // Add a click event to the minus of amount to update the text box to the value in it minus 1. The Number function is used here to convert the value from a string to a number to ensure the operator can work on the value correctly.
    $('.edit-how-many-calls .slider-minus').on('click', function() {
        $('#calls').val(Number($('#calls').val()) - 1);
        updateSliders(true, false);
    });
    $('.edit-how-many-percent .slider-minus').on('click', function() {
        $('#percent').val(Number($('#percent').val()) - 1);
        updateSliders(true, false);
    });
    $('.edit-how-many-ticket .slider-minus').on('click', function() {
        $('#ticket').val(Number($('#ticket').val()) - 1);
        updateSliders(true, false);
    });

});

// Update the slider positions, and ensure the other calculations are also done to update the values.
updateSliders = function(principle, percent) {
    if (principle) {
        var value1 = $('#calls').val();
        a.setValue(Number(value1), true);

        var value2 = $('#percent').val();
        b.setValue(Number(value2), true);

        var value3 = $('#ticket').val();
        c.setValue(Number(value3), true);
    }
}

// Give the variables initial values, and set the html elements to use later.
var initialiseVars = function() {
    $('#calls').val(0);
    $('#percent').val(0);
    $('#ticket').val(0);
};


function calculateResult() {
    const q1input1 = document.getElementById('calls').value;
    const q1input2 = document.getElementById('percent').value;
    const q1input3 = document.getElementById('ticket').value;

    const result = (q1input1 * (q1input2 / 100) * q1input3) / q1input1;
    // const formattedResult = `$${result.toFixed(2)}`;
    const formattedResult = result.toFixed(2);


    if(isNaN(result)||(result == 0)){
        $("#error").fadeIn();
        setTimeout(() => {
            $("#error").fadeOut();
        }, 3000);
    }else{
        $("#error").hide();
        document.getElementById('display').value = formattedResult;

        // Displaying more sophisticated results
        // const resultsParagraph = document.getElementById('resultsParagraph');
        // resultsParagraph.innerHTML = `
        //     <p style="margin-top:7px;">Our experience shows a single review can bring in at least 5 additional calls a week, if not more.</p>
        //     <p>Your average call is worth ${formattedResult}. This means getting a single review a week is worth $${(20 * result).toFixed(2)} a month!</p>`;
       
        $("#average-call-worth").text('$'+formattedResult);
        $("#monthly-call-worth").text('$'+(20 * result).toFixed(2));

        const resultsParagraphHeading = document.getElementById('resultsParagraph-heading');  
        resultsParagraphHeading.innerHTML = `Your results`;

        // document.getElementById('result-wrapper').style.display = "block";
        // document.getElementById('result-panel').style.display = "block";
        // $("#result-wrapper").fadeIn();
        // $("#result-panel").fadeIn();
    }


}

function clearDisplay() {
    document.getElementById('calls').value = '';
    document.getElementById('percent').value = '';
    document.getElementById('ticket').value = '';
    document.getElementById('display').value = '';
    // document.getElementById('resultsParagraph').innerHTML = '';
    // document.getElementById('resultsParagraph-heading').innerHTML = '';
    // document.getElementById('result-wrapper').style.display = "none";
    // document.getElementById('result-panel').style.display = "none";
    $("#average-call-worth").text('$0');
    $("#monthly-call-worth").text('$0');
    $("#error").fadeOut();
    updateSliders(true, false);
}