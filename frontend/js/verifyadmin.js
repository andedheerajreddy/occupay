function snackbar(mssg) {
    var x = document.getElementById("snackbar");
    x.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ${mssg}`
    x.className = "show";
    setTimeout(function() { x.className = x.className.replace("show", ""); }, 2000);
}

function verifymail() {

    //Email verification
    function IsEmail(email) {
        var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!regex.test(email)) return false;
        else return true;
    }

    var email = String(document.getElementsByClassName("login")[0].value);
    var passkey = String(document.getElementsByClassName("login")[1].value);

    var c = 2;
    if (email == "") {
        snackbar("Enter email");
        c--;
    } else if (passkey == "") {
        snackbar("Enter passkey");
        c--;
    } else if (!IsEmail(email)) {
        snackbar("Enter valid email Address");
        c--;
    }
    if (c == 2) {
        $.ajax({
            type: "PATCH",
            url: "/api/admin/verifyEmail",
            data: {
                email: email,
                verificationKey: passkey,
            },
            success: function(resultData) {
                // alert(JSON.stringify(resultData))
                if (resultData.message == "User verified") {
                    var x = document.getElementById("snackbar");
                    x.style.backgroundColor = 'green'
                    x.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i> VERIFIED`
                    x.className = "show";
                    setTimeout(function() {
                        x.className = x.className.replace("show", "");
                        window.location.href = "/login/organiser";
                    }, 2000);
                } else if (resultData.message == "already verified") {
                    var x = document.getElementById("snackbar");
                    x.style.backgroundColor = 'green'
                    x.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ALREADY VERIFIED`
                    x.className = "show";
                    setTimeout(function() {
                        x.className = x.className.replace("show", "");
                        window.location.href = "/login/organiser";
                    }, 2000);
                } else {

                }
            }, //sucess
            error: function(resultData) {
                snackbar("INVALID CREDENTIALS!!")
            }
        });
    }
} //End of signup function