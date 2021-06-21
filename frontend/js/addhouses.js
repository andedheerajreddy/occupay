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
    var houseName = String(document.getElementsByClassName("register")[0].value);
    var houseDescription = String(document.getElementsByClassName("register")[1].value);
    var Street = String(document.getElementsByClassName("register")[2].value);
    var state = String(document.getElementsByClassName("register")[3].value);
    var pincode = String(document.getElementsByClassName("register")[4].value);
    var City = String(document.getElementsByClassName("register")[5].value);
    var country = String(document.getElementsByClassName("register")[6].value);
    var rentPerMonth = String(document.getElementsByClassName("register")[7].value);
    var maintenance = String(document.getElementsByClassName("register")[8].value);
    var advance = String(document.getElementsByClassName("register")[9].value);
    var preferred_tenant = String(document.getElementsByClassName("register")[10].value);
    var propertyAge = String(document.getElementsByClassName("register")[11].value);
    var property_type = String(document.getElementsByClassName("register")[12].value);
    var house_type = String(document.getElementsByClassName("register")[13].value);
    var parking = String(document.getElementsByClassName("register")[14].value);
    var balcony = String(document.getElementsByClassName("register")[15].value);
    var facing = String(document.getElementsByClassName("register")[16].value);
    var furnishing = String(document.getElementsByClassName("register")[17].value);
    var c = 18;
    if (houseName == "") {
        c--;
        snackbar("Please Enter House Name !");
    } else if (houseDescription == "") {
        snackbar("Please Enter House Description !");
        c--;
    } else if (Street == "") {
        c--;
        snackbar("Please Enter Street !");
    } else if (City == "") {
        c--;
        snackbar("Please Select City !");
    } else if (pincode == "") {
        c--;
        snackbar("Please Enter Pincode")
    } else if (state == "") {
        c--;
        snackbar("Please Select your State")
    } else if (country == "") {
        c--;
        snackbar("Please Select your country")
    } else if (rentPerMonth == "") {
        c--;
        snackbar("Please enter rent per month !")
    } else if (maintenance == "") {
        c--;
        snackbar("Please enter maintainence !")
    } else if (advance == "") {
        c--;
        snackbar("Please enter advance !")
    } else if (preferred_tenant == "") {
        c--;
        snackbar("Please enter preffered tenant !")
    } else if (propertyAge == "") {
        c--;
        snackbar("Please enter propertyAge !")
    } else if (property_type == "") {
        c--;
        snackbar("Please enter property type !")
    } else if (house_type == "") {
        c--;
        snackbar("Please enter house type !")
    } else if (parking == "") {
        c--;
        snackbar("Please Select Parking !")
    } else if (balcony == "") {
        c--;
        snackbar("Please Enter Balcony !")
    } else if (facing == "") {
        c--;
        snackbar("Please Select Your House Facing!")
    } else if (furnishing == "") {
        c--;
        snackbar("Please Select Your House furnishing!")
    }
    console.log(c);

    if (c == 18) {
        var file = document.getElementById("images").files;
        console.log(file);
        if (file.length < 1)
            snackbar("Please Upload Atleast 1 Images of Your House !")
        else {
            var formData = new FormData();
            for (let i = 0; i < file.length; i++)
                formData.append("file", file[i]);
            data = {
                houseName: houseName,
                houseDescription: houseDescription,
                address: {
                    Street: Street,
                    City: City,
                    pincode: pincode,
                    state: state,
                    country: country,
                },
                houseType: house_type,
                cost: {
                    rentPerMonth: rentPerMonth,
                    maintenance: maintenance,
                    advance: advance
                },
                propertyAge: propertyAge,
                preferred_tenant: preferred_tenant,
                property_type: property_type,

                parking: parking,
                balcony: balcony,
                facing: facing,
                furnishing: furnishing,
            }
            $.ajax({
                url: "/api/house/addpics",
                method: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function(result) {
                    console.log("success");
                    console.log(result);
                    data.pics = result.data;
                    console.log(data)
                    $.ajax({
                        method: "POST",
                        url: "/api/house/add",
                        data: data,
                        success: function(resultData) {
                            if (resultData.message == "created") {
                                var x = document.getElementById("snackbar");
                                x.style.backgroundColor = 'green'
                                x.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i> Your House is Added Successfully`
                                x.className = "show";
                                setTimeout(function() {
                                    x.className = x.className.replace("show", "");
                                    window.location.href = '/dashboard';

                                }, 2000);
                            }
                        },
                        error: function(resultData) {
                            if (resultData.message == "error") {
                                var x = document.getElementById("snackbar");
                                x.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i>Error Occured ${resultData.err}`;
                                x.className = "show";
                                setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
                            } else {
                                snackbar("error");
                            }
                        }
                    });

                },
                error: function(err) {
                    alert("Error Occured: " + err);
                }
            });
        }
    }
}