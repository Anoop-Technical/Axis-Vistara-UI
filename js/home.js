$(document).ready(function () {
    // $("#otpModal").modal('show');
    // Form Inputs
    $('.form-control').not('.fakeinput').on('keyup blur', function (e) {
        $(this).closest('.form-group').removeClass('has-error');
        $(this).removeClass("invalid");
    });
    $('input[type="checkbox"],input[type="radio"]').on('click', function () {
        $(this).removeClass("error ,invalid");
        $(this).closest('.form-group').removeClass('has-error');
    });
    $.validator.addMethod("GreaterThanZero", function (value, element) {
        return this.optional(element) || value.match(/^[1-9][0-9,]*$/);
    }, "* should not start with Zero");
    // validaton
    $("#creditCardgeneric").validate({
        ignore: [],
        errorClass: 'invalid',
        errorPlacement: function (error, element) {
            var errorText = error.text();
            if (element.closest('.form-group').find('.help-block').length < 1) {
                element.closest('.form-group').append('<span class="help-block">');
            }
            element.closest('.form-group').addClass('has-error');
            element.closest('.form-group').find('.help-block').html(errorText);
        },
        highlight: function (element, errorClass) {
            $(element).addClass(errorClass).parent().prev().children("select").addClass(errorClass);
            if ($(element).attr('type') == 'radio' || $(element).attr('type') == 'checkbox') {
                $(element).parent().parent().addClass(errorClass);
            }
        },
        rules: {
            customize_name: {
                required: true,
            },
            qualification: {
                required: true,
            },
            marital_status: {
                required: true,
            },
            mother_name: {
                required: true,
            },
            resi_address: {
                required: true,
            },
            resi_city: {
                required: true,
            },
            resi_pincode: {
                required: true,
            },
            company_name: {
                required: true,
            },
            company_type: {
                required: true,
            },
            industry_type: {
                required: true,
            },
            annual_income: {
                required: true,
            },
            Work_exp: {
                required: true,
            },
            office_address: {
                required: true
            },
            office_city: {
                required: true,
            },
            office_pincode: {
                required: true,
            },
        },
        messages: {
            customize_name: {
                required: "Customize Name is Required!",
            },
            qualification: {
                required: "Qualification is Required!",
            },
            marital_status: {
                required: "Marital Status is Required!",
            },
            mother_name: {
                required: "Mother Name is Required!",
            },
            resi_address: {
                required: "Residence Address is Required!",
            },
            resi_city: {
                required: "Residence City is Required!",
            },
            resi_pincode: {
                required: "Residence Pincode is Required!",
            },
            company_name: {
                required: "Company Name is Required!",
            },
            company_type: {
                required: "Company Type is Required!",
            },
            industry_type: {
                required: "Industry Type is Required!",
            },
            annual_income: {
                required: "Annual Income is Required!",
            },
            Work_exp: {
                required: "Work Experience is Required!",
            },
            office_address: {
                required: "Office Addres is Required!"
            },
            office_city: {
                required: "Office City is Required!",
            },
            office_pincode: {
                required: "Office Pincode is Required!",
            },
        },
        submitHandler: function (form) {
            $("#otpModal").modal('show');
            // form.submit();
        }
    });
    
    $(".emp_details").hide();
    $( "#resi_pincode" ).click(function() {
        $(".emp_details").show();
    });

    // OTP Verification Form
    $("#otp-verification-form").validate({
        ignore: [],
        errorClass: 'invalid',
        errorPlacement: function (error, element) {
            var errorText = error.text();
            if (element.closest('.form-group').find('.help-block').length < 1) {
                element.closest('.form-group').append('<span class="help-block">');
            }
            element.closest('.form-group').addClass('has-error');
            element.closest('.form-group').find('.help-block').html(errorText);
        },
        highlight: function (element, errorClass) {
            $(element).addClass(errorClass).parent().prev().children("select").addClass(errorClass);
            if ($(element).attr('type') == 'radio' || $(element).attr('type') == 'checkbox') {
                $(element).parent().parent().addClass(errorClass);
            }
        },
        rules: {
            otp: {
                required: true,
                minlength: 4,
                maxlength: 4
            }
        },
        messages: {
            otp: {
                required: "OTP is required",
                minlength: "Minimum 4 digits",
                maxlength: "Maximum 4 digits"
            }
        },
        submitHandler: function (form) {
            // form.submit();
        }
    });
    // City Autocomplete
    var availableTags = [
        "Noida",
        "Dehradun",
      ];
      $( "#office_city" ).autocomplete({
        source: availableTags,
        minLength: 2,
        select: function(e) { 
            console.log(e);
            console.log(e.currentTarget.textContent);
            console.log(e.target.value);
        }
      });
});

// Character Input Only
function CharsetKeyOnly(evt) {
    var k;
    document.all ? k = evt.keyCode : k = evt.which;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || k == 0 || k == 9);
}

// numeric Input Only
function numOnly(evt) {
    var k;
    document.all ? k = evt.keyCode : k = evt.which;
    return (k == 0 || k == 9 || k == 8 || k == 32 || (k >= 48 && k <= 57));
}

function alpha(event) {
    var value = String.fromCharCode(event.which);
    var pattern = new RegExp(/^[a-zA-Z0-9 .,-]+$/i);
    return pattern.test(value);
}

// OTP Digit Values 
$('.digit-group').find('.digit').each(function () {
    $(this).attr('maxlength', 1);
    var otpTypedVal = '';

    $(this).on('keyup', function (e) {
        if ($(this).val().length < 1) {
            return false;
        }
        if ($('#digit-1').val().length > 0 && $('#digit-2').val().length > 0 && $('#digit-3').val().length > 0 && $('#digit-4').val().length > 0) {
            $('.digit-group .form-group').removeClass('has-error');
        }
        otpTypedVal = $('#digit-1').val() + $('#digit-2').val() + $('#digit-3').val() + $('#digit-4').val();

        $('#otp').val(otpTypedVal);
        var parent = $($(this).parent());

        if (e.keyCode === 8 || e.keyCode === 37) {
            var prev = parent.find('input#' + $(this).data('previous'));
            if (prev.length) {
                $(prev).select();
            }
        } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
            var next = parent.find('input#' + $(this).data('next'));
            if (next.length) {
                $(next).select();
            }
        }
    });
});

// OTP Forword & Backward
$(".digit").keyup(function() {
    if (this.value.length == this.maxLength) {
        $(this).next(".digit").focus();
    } else {
        $(this).prev(".digit").focus();
    }
});



