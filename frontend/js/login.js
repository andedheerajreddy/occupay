function snackbar(mssg) {
    var x = document.getElementById("snackbar");
    x.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ${mssg}`
    x.className = "show";
    setTimeout(function() { x.className = x.className.replace("show", ""); }, 2000);
}

function login() {
    console.log("Hello");
    //Email verification
    function IsEmail(email) {
        var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!regex.test(email)) return false;
        else return true;
    }

    var email = String(document.getElementsByClassName("login")[0].value);
    var password = String(document.getElementsByClassName("login")[1].value);

    var c = 2;
    if (email == "") {
        snackbar("Enter email");
        c--;
    } else if (password == "") {
        snackbar("Enter password");
        c--;
    } else if (!IsEmail(email)) {
        snackbar("Enter valid email");
        c--;
    }
    if (c == 2) {
        //alert("Ajax");
        $.ajax({
            type: "POST",
            url: "/api/user/login",
            data: {
                email: email,
                password: password,
            },
            success: function(resultData) {
                if (resultData.message == "Auth successful") {
                    localStorage.setItem("userDetails", JSON.stringify(resultData.userDetails));
                    localStorage.setItem("token", resultData.token);
                    window.location.href = "/dashboard"
                }
            }, //sucess
            error: function(err) {
                if (err.responseJSON.message == "Unauthorized access") {
                    location.href = "/"
                }
            }
        });
    }
} //End of signup function