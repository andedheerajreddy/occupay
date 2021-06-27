function snackbar(mssg) {
    var x = document.getElementById("snackbar");
    x.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ${mssg}`
    x.className = "show";
    setTimeout(function() { x.className = x.className.replace("show", ""); }, 2000);
}

function verifymail() {
    console.log("Hello");
    //Email verification
    function IsEmail(email) {
        var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!regex.test(email)) return false;
        else return true;
    }

    var email = String(document.getElementsByClassName("login")[0].value);

    var c = 1;
    if (email == "") {
        snackbar("Enter email");
        c--;
    } else if (!IsEmail(email)) {
        snackbar("Enter valid email");
        c--;
    }
    if (c == 1) {
        $.ajax({
            type: "POST",
            url: "/api/admin/resendVerificationEmail",
            data: {
                email: email,
            },
            success: function(resultData) {
                if (resultData.message == "already verified") {
                    var x = document.getElementById("snackbar");
                    x.style.backgroundColor = 'green'
                    x.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ALREADY VERIFIED`
                    x.className = "show";
                    setTimeout(function() {
                        x.className = x.className.replace("show", "");
                        window.location.href = '/login/organiser'
                    }, 2000);
                } else {
                    var x = document.getElementById("snackbar");
                    x.style.backgroundColor = 'green'
                    x.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i> Passkey sent to email`
                    x.className = "show";
                    setTimeout(function() {
                        x.className = x.className.replace("show", "");
                        window.location.href = '/verifyadmin'
                    }, 2000);
                }
            }, //sucess
            error: function(resultData) {
                snackbar("INVALID MAIL!!")
            }
        });
    }
} //End of signup function