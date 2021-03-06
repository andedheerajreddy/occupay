function snackbar(mssg) {
    var x = document.getElementById("snackbar");
    x.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ${mssg}`
    x.className = "show";
    setTimeout(function() { x.className = x.className.replace("show", ""); }, 2000);
}
let s = `                            <option value="" hidden>select state</option>
`
for (let i = 0; i < states.length; i++) {
    s += `   <option value="${states[i]}">${states[i]}</option>`
}
$("#fills").html(s)
$('#fills').on('change', function() {
    s = ``;

    for (let i = 0; i < cities[this.value].length; i++) {
        s += `   <option value="${cities[this.value][i]["city"]}">${cities[this.value][i]["city"]}</option>`
    }
    $("#fillc").html(s)

});

function signup() {
    // console.log("Hello");
    //Email verification
    function IsEmail(email) {
        var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!regex.test(email)) return false;
        else return true;
    }
    var name = String(document.getElementsByClassName("register")[0].value);
    var email = String(document.getElementsByClassName("register")[1].value);
    var password = String(document.getElementsByClassName("register")[2].value);
    var dateOfBirth = String(document.getElementsByClassName("register")[3].value);
    var Street = String(document.getElementsByClassName("register")[4].value);
    var state = String(document.getElementsByClassName("register")[5].value);
    var City = String(document.getElementsByClassName("register")[6].value);
    var pincode = String(document.getElementsByClassName("register")[7].value);
    var country = String(document.getElementsByClassName("register")[8].value);
    var mobileNumber = String(document.getElementsByClassName("number")[0].value);
    var c = 10;
    if (name == "") {
        c--;
        snackbar("Enter name");
    } else if (email == "") {
        snackbar("Enter email");
        c--;
    } else if (mobileNumber == "") {
        c--;
        snackbar("Enter mobile number")
    } else if (password == "") {
        //     document.getElementById("alertmsg").innerHTML = ` <div class="alert alert-danger alert-dismissible">
        //     <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        //     <strong>Sorry!</strong>Enter the password
        //   </div>`;
        snackbar("Enter password")
        c--;
    } else if (dateOfBirth == "") {
        c--;
        snackbar("Enter DOB");
    } else if (Street == "") {
        c--;
        snackbar("Enter Street");
    } else if (City == "") {
        c--;
        snackbar("Select your City");
    } else if (pincode == "") {
        c--;
        snackbar("Enter Pincode")
    } else if (state == "") {
        c--;
        snackbar("Select your State")
    } else if (country == "") {
        c--;
        snackbar("Select your country")
    }
    //else document.getElementById("alertmsg").innerHTML = ``;
    else if (!IsEmail(email)) {
        //     document.getElementById("alertmsg").innerHTML = ` <div class="alert alert-danger alert-dismissible">
        //     <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        //     <strong>Sorry!</strong>invalid Email
        //   </div>`;
        snackbar("Enter valid email")
        c--;
    }

    console.log(c);
    //ajax call to create an instance to the user in database
    //alert("sidfoisd");
    if (c == 10) {
        //alert("Ajax");
        $.ajax({
            type: "POST",
            url: "/api/user/signup",
            data: {
                email: email,
                password: password,
                name: name,
                dateOfBirth: dateOfBirth,
                address: {
                    Street: Street,
                    City: City,
                    pincode: pincode,
                    state: state,
                    country: country,
                },
                mobileNumber: mobileNumber

            },
            success: function(resultData) {
                if (resultData.message == "user created") {
                    var x = document.getElementById("snackbar");
                    x.style.backgroundColor = 'green'
                    x.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i> Verify Your Mail`
                    x.className = "show";
                    setTimeout(function() {
                        x.className = x.className.replace("show", "");
                        window.location.href = '/verify';

                    }, 2000);
                }
            }, //sucess
            error: function(resultData) {

                    if (resultData.responseJSON.message == "Email already exists") {
                        var x = document.getElementById("snackbar");
                        x.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i>Email already exists`
                        x.className = "show";
                        setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
                    } else {
                        snackbar("error");
                    }
                } //error
        });
    }
} //End of signup function