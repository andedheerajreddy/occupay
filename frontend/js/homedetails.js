$.ajaxSetup({
    headers: { 'token': localStorage.token }
});

if (!localStorage.token)
    location.href = '/'

var homeid = location.href.split('/').splice(-1)[0];
function snackbar(mssg,success) {
    var x = document.getElementById("snackbar");
    if(success)
    x.style.backgroundColor = 'green';
    x.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ${mssg}`
    x.className = "show";
    setTimeout(function() { x.className = x.className.replace("show", ""); }, 2000);
}
function filldata() {  
    $.ajax({
        url: "/api/house/" + homeid,
        method: "GET",
        success: function(result) {
            data = result.result;
            console.log(data);
            var code1 = ``;
            var code2 = ``;
            let l = [
                ['House Name', data['houseName']],
                ['House Type', data['houseType']],
                ['Description', data['houseDescription']],
                ['Rent (Per Month)', data['cost']['rentPerMonth']],
                ['Maintenance', data['cost']['maintenance']],
                ['Advance', data['cost']['advance']],
                ['Street', data['address']['Street']],
                ['City', data['address']['City']],
                ['Country', data['address']['country']],
                ['PinCode', data['address']['pincode']],
                ['Occupied Status', data['occupiedStatus']],
                ['isParkingAvailable', data['isParkingAvailable']],
                ['propertyAge', data['propertyAge']],
                ['preferred_tenant', data['preferred_tenant']],
                ['property_type', data['property_type']],
                ['parking', data['parking']],
                ['Balcony', data['balcony']],
                ['facing', data['facing']],
                ['furnishing', data['furnishing']]
            ]
            let d1 = [
                ['Name', data['adminId']['name']],
                ['Email', data['adminId']['email']],
                ['Street', data['adminId']['address']['Street']],
                ['City', data['adminId']['address']['city']],
                ['Locality', data['adminId']['address']['locality']],
                ['PinCode', data['adminId']['address']['pincode']],
                ['Mobile Number', data['adminId']['mobileNumber']]
            ]
            for (let i of l) {
                code1 += `<div class="items">
                
                <div class="name" style="width:51%;margin-left:10pxmin-width: fit-content;">${i[0]}</div>
                <div class="value" style="text-transform: capitalize;font-weight: 600;">${i[1]}</div>
            </div>`
            }
            for (let i of d1) {
                code2 += `<div class="items">
                  <div class="name" style="width:51%;margin-left:10pxmin-width: fit-content;">${i[0]}</div>
                <div class="value" style="text-transform: capitalize;font-weight: 600;">${i[1]}</div>
            </div>`
            }
            $(".details").html(code1);
            $(".detail").html(code2);
        },
        error: function(err) {
            if (err.responseJSON.message == "Unauthorized access") {
                location.href = "/"
            }
        }
    });
}
filldata();
function request()
{
    $.ajax({
        url: "/api/user/requesthouse/"+homeid,
        method: "PATCH",
        success: function(result) {
            if(result.message=="Updated")
            {
                snackbar("Successfully Requested !",true);
                location.href="/dashboard";
            }
            else
                snackbar("Already Requested",false);
                location.href="/dashboard";

        },
        error: function(err) {
            if (err.responseJSON.message == "Unauthorized access") {
                location.href = "/"
            }
        }
    });
}