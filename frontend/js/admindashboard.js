var UserData;
function snackbar(mssg,success) {
    var x = document.getElementById("snackbar");
    if(success)
    x.style.backgroundColor = 'green';
    x.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ${mssg}`
    x.className = "show";
    setTimeout(function() { x.className = x.className.replace("show", ""); }, 2000);
}
$(() => {
    $.ajaxSetup({
        headers: { 'token': localStorage.token }
    });
    
    if (!localStorage.token)
        location.href = '/'
    
    let s = `<option value="" >Select state</option>`
    for (let i = 0; i < states.length; i++) {
        s += `   <option value="${states[i]}">${states[i]}</option>`
    }
    $("#fills").html(s)
    $('#fills').on('change', function() {
        s = `<option value="" >Select City</option>`;

        for (let i = 0; i < cities[this.value].length; i++) {
            s += `   <option value="${cities[this.value][i]["city"]}">${cities[this.value][i]["city"]}</option>`
        }
        $("#fillc").html(s)

    });
    var data = ``;
    $.ajax({
        url: "/api/admin",
        method: "GET",
        success: function(result) {
            UserData=result.result[0];
            fillUserData();
            result = result.result[0].houses;
            // result = result
            console.log(result);
            for (let i = 0; i < result.length; i++) {
                data += ` <div class="row">
                  <div class="col-7 m-0 p-0">
                    <div class="card m-0 p-0" style="width: 32rem ;margin: 0%;">
                        <div class="row no-gutters">
                            <div class="col-5">
            
                                <img class="card-img-top" style="height: 230px;"src=/uploads/${result[i]["houseId"].pics[0].filename}
                                
                                alt="Card image cap">
                                </div>
                                <div class="col-7">
                
                                    <div class="card-body pt-1">
                                        <h5 class="card-title">${result[i]["houseId"].houseName}</h5>
                                        <div class="row" style="font-size: smaller;">
                                            <div class="col-6 pr-0">
                                                <p class='mb-1'>Preferred Tenants:<br> ${result[i]["houseId"].preferred_tenant}</p>
                                                <hr class="m-0">
                                                <p class='mb-1'>Rent :<br>${result[i]["houseId"].cost.rentPerMonth}</p>
                                                <hr class="m-0">
                
                                                <p>Property Age :<br> ${result[i]["houseId"].propertyAge}</p>
                                                <a href="/adminhome/${result[i]["houseId"]._id}" class="btn btn-outline-info " id="Details-${result[i]["houseId"]._id}">View details</a>
                
                                            </div>
                                            <div class="col-6  pr-0">
                                                <p class="mb-1">House Type: <br>${result[i]["houseId"].houseType}</p>
                                                <hr class="m-0">
                
                                                <p class="mb-1">Advance : <br>${result[i]["houseId"].cost.advance}</p>
                                                <hr class="m-0">
                
                                                <p>Parking available :<br>${result[i]["houseId"].isParkingAvailable}</p>
                                                <a href="/updatehome/${result[i]["houseId"]._id}" class="btn btn-outline-info " id="Details-${result[i]["houseId"]._id}">Update details</a>
                
                                            </div>
                                        </div>
                
                                        <!-- </div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                
                    </div> <div class="col-xl-5 m-0 p-0 col-lg-12">`
                i++;
                if (i < result.length) {
                    data += ` <div class="card m-0 p-0" style="width: 32rem ;margin: 0%;">
<div class="row no-gutters">
    <div class="col-5">

        <img class="card-img-top" style="height: 220px;"src=/uploads/${result[i]["houseId"].pics[0].filename}
        alt="Card image cap">
        </div>
        <div class="col-7">

            <div class="card-body pt-1">
                <h5 class="card-title">${result[i]["houseId"].houseName}</h5>
                <div class="row" style="font-size: smaller;">
                    <div class="col-6 pr-0">
                        <p class='mb-1'>Preferred Tenants:<br> ${result[i]["houseId"].preferred_tenant}</p>
                        <hr class="m-0">
                        <p class='mb-1'>Rent :<br>${result[i]["houseId"].cost.rentPerMonth}</p>
                        <hr class="m-0">

                        <p>Property Age :<br> ${result[i]["houseId"].propertyAge}</p>
                        <a href="/adminhome/${result[i]["houseId"]._id}" class="btn btn-outline-info " id="Details-${result[i]["houseId"]._id}">View details</a>

                    </div>
                    <div class="col-6  pr-0">
                        <p class="mb-1">House Type: <br>${result[i]["houseId"].houseType}</p>
                        <hr class="m-0">

                        <p class="mb-1">Advance : <br>${result[i]["houseId"].cost.advance}</p>
                        <hr class="m-0">

                        <p>Parking available :<br>${result[i]["houseId"].isParkingAvailable}</p>
                        <a href="/updatehome/${result[i]["houseId"]._id}" class="btn btn-outline-info " id="Details-${result[i]["houseId"]._id}">Update details</a>

                    </div>
                </div>

                <!-- </div> -->
            </div>
        </div>
    </div>
`
                }
                data += `</div> </div>  </div>`

            }
            $("#cards").html(data)
        },
        error: function(err) {
            if (err.responseJSON.message == "Unauthorized access") {
                location.href = "/"
            }
        }

    })
})
function openPage(pageName, elmnt, id) {
    var i, tabcontent, tablinks;
    if (id == 1) {
        document.getElementById("0").style.borderBottomColor = "white";
    } else 
        document.getElementById("1").style.borderBottomColor = "white";
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tabs");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.borderBottom = "3px solid #2980b9";
}
element = document.getElementById("0");
element.click();
function fillUserData() {

     let userdata = `
     <div class="row"><h4><label> Name </label> : ${UserData.name} </h4></div>
     <div class="row"><h4><label>Email</label> : ${UserData.email}</h4></div>
    <div class="row"><h4><label>Phone Number</label> :${UserData.mobileNumber}</h4></div>
    <div class="row"><h4><label> Street </label> : ${UserData.address.Street} </h4></div>
    <div class="row"><h4><label> Pincode </label> : ${UserData.address.pincode} </h4></div>
    <div class="row"><h4><label> State </label> : ${UserData.address.state} </h4></div>
    <div class="row"><h4><label> No of Houses </label> : ${UserData.houses.length} </h4></div>
   `
    $("#userdata").append(userdata);
    console.log(UserData);
}
