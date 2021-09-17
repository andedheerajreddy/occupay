$.ajaxSetup({
    headers: { 'token': localStorage.token }
});

if (!localStorage.token)
    location.href = '/'

var userId=location.href.split('/').splice(-1)[0];
function snackbar(mssg) {
    var x = document.getElementById("snackbar");
    x.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ${mssg}`
    x.className = "show";
    setTimeout(function() { x.className = x.className.replace("show", ""); }, 2000);
}
let s = `<option value="" hidden>select state</option>
`
for (let i = 0; i < states.length; i++) {
    s += `   <option value="${states[i]}">${states[i]}</option>`
}
$("#fills").html(s)
$('#fills').on('change', function() {
    s = ``;

    for (let i = 0; i < cities[this.value].length; i++) {
        s += `<option value="${cities[this.value][i]["city"]}">${cities[this.value][i]["city"]}</option>`
    }
    $("#fillc").html(s)

});
function filldata()
{
    $.ajax({
        url: "/api/user",
        method: "GET",
        success: function(result) {
            data=result.result;
            console.log(data);
            var date=new Date(data.dateOfBirth);
            document.getElementsByClassName("register")[0].value=data.name;
            document.getElementsByClassName("register")[1].value=data.mobileNumber
            document.getElementsByClassName("register")[2].value=date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
            document.getElementsByClassName("register")[3].value=data.address.Street
            s = ``;

            for (let i = 0; i < cities[data.address.state].length; i++) {
                s += `<option value="${cities[data.address.state][i]["city"]}">${cities[data.address.state][i]["city"]}</option>`
            }
            $("#fillc").html(s)
            document.getElementsByClassName("register")[4].value=data.address.state
            document.getElementsByClassName("register")[5].value=data.address.City
            document.getElementsByClassName("register")[6].value=data.address.pincode;
        },
        error: function(err) {
            if (err) {
                console.log(err);
            }
        }
    });
}
function update()
{
    var name = String(document.getElementsByClassName("register")[0].value);
    var mobileNumber = String(document.getElementsByClassName("register")[1].value);
    var  dateOfBirth= String(document.getElementsByClassName("register")[2].value);
    var Street = String(document.getElementsByClassName("register")[3].value);
    var state = String(document.getElementsByClassName("register")[4].value);
    var City = String(document.getElementsByClassName("register")[5].value);
    var pincode = String(document.getElementsByClassName("register")[6].value);
    var c = 7;
    if (name =="") {
        c--;
        snackbar("Enter name");
    }else if (mobileNumber == "") {
        c--;
        snackbar("Enter mobile number")
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
    } 
    console.log(c);
    if (c == 7) {
        $.ajax({
            type: "PATCH",
            url: "/api/user/updateprofile",
            data: {
                name: name,
                dateOfBirth: dateOfBirth,
                address: {
                    Street: Street,
                    City: City,
                    pincode: pincode,
                    state: state,
                },
                mobileNumber: mobileNumber

            },
            success: function(resultData) {
                if (resultData.message == "Updated") {
                    var x = document.getElementById("snackbar");
                    x.style.backgroundColor = 'green'
                    x.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i> Updated Your Details !`
                    x.className = "show";
                    location.href = "/dashboard"
                }
            }, 
            error: function(err) {
                        snackbar("error");
                } //error
        });
    }   
}
filldata();