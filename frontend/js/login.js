function login() {
    console.log("Hello");
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
    var City = String(document.getElementsByClassName("register")[5].value);
    var pincode = String(document.getElementsByClassName("register")[6].value);
    var state = String(document.getElementsByClassName("register")[7].value);
    var country = String(document.getElementsByClassName("register")[8].value);
    //var mobileNumber = String(document.getElementsByClassName("register")[9].value);

    var c = 9;
    if (email == "") {
    //     document.getElementById("alertmsg").innerHTML = ` <div class="alert alert-danger alert-dismissible">
    //     <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
    //     <strong>Sorry!</strong>Enter the Email
    //   </div>`;
        c--;
    }
    if(name==""){c--;}
    if(dateOfBirth==""){c--;}
    if(Street==""){c--;}
    if(City==""){c--;}
    if(pincode==""){c--;}
    if(state==""){c--;}
    if(country==""){c--;}
    //if(mobileNumber==""){c--;}





   else if (password == "") {
    //     document.getElementById("alertmsg").innerHTML = ` <div class="alert alert-danger alert-dismissible">
    //     <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
    //     <strong>Sorry!</strong>Enter the password
    //   </div>`;
        c--;
    } 
    //else document.getElementById("alertmsg").innerHTML = ``;

    if (c == 10) {
        if (!IsEmail(emailid)) {
        //     document.getElementById("alertmsg").innerHTML = ` <div class="alert alert-danger alert-dismissible">
        //     <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        //     <strong>Sorry!</strong>invalid Email
        //   </div>`;
            c--;
        }
    }

    console.log(c);
    //ajax call to create an instance to the user in database
    //alert("sidfoisd");
    if (c == 9) {
        //alert("Ajax");
        $.ajax({
            type: "POST",
            url: "/api/user/signup",
            data: {
                email: email,
                password: password,
                name:name,
                dateOfBirth:dateOfBirth,
                address: {
                    Street: Street,
                    City: City,
                    pincode: pincode,
                    state: state,
                    country: country,
                },
                mobileNumber:"9849123123"

            },
            success: function(resultData) {
                console.log(resultData)
                if (resultData.message == "Email already exists")
                //     document.getElementById("alert").innerHTML = `<div class="alert alert-danger alert-dismissible">
                //     <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                //     <strong>Sorry!</strong>Enter the Email
                //   </div>`;
                if (resultData.message == "user created") {
                    //window.location.href = '/verify';
                }
            }, //sucess
            error: function(resultData) {
                    if (resultData.responseJSON.message == "Unauthorized access") {
                        location.href = "/"
                    } else {
                    //     var x = document.getElementById("alert");

                    //     x.innerHTML = `<div class="alert alert-danger alert-dismissible">
                    //     <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    //     <strong>Sorry!</strong>Enter the Email
                    //    ${resultData.responseJSON.message}</div>`
                    //     x.className = "show";
                    //     setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
                    }
                } //error
        });
    }
} //End of signup function