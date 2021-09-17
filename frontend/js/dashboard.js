$.ajaxSetup({
    headers: { 'token': localStorage.token }
});

if (!localStorage.token)
    location.href = '/'

function snackbar(mssg,success) {
    var x = document.getElementById("snackbar");
    if(success)
    x.style.backgroundColor = 'green';
    x.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ${mssg}`
    x.className = "show";
    setTimeout(function() { x.className = x.className.replace("show", ""); }, 2000);
}
$(() => {
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
        url: "/api/house/available",
        method: "GET",
        success: function(result) {
            // result = result.result;
            result = result.result;
            //console.log(result);
            for (let i = 0; i < result.length; i++) {
                data += ` <div class="row mt-2">
                  <div class="col-6 m-0 p-0">
                    <div class="card m-0 p-0" style="width: 32rem ;margin: 0%;">
                        <div class="row no-gutters">
                            <div class="col-5">
            
                                <img class="card-img-top" style="height: 230px;"src=/uploads/${result[i].pics[0].filename}
                                
                                alt="Card image cap">
                                </div>
                                <div class="col-7">
                
                                    <div class="card-body pt-1">
                                        <h5 class="card-title">${result[i].houseName}</h5>
                                        <div class="row" style="font-size: smaller;">
                                            <div class="col-6 pr-0">
                                                <p class='mb-1'>Preferred Tenants:<br> ${result[i].preferred_tenant}</p>
                                                <hr class="m-0">
                                                <p class='mb-1'>Rent :<br>${result[i].cost.rentPerMonth}</p>
                                                <hr class="m-0">
                
                                                <p>Property Age :<br> ${result[i].propertyAge}</p>
                                                <a href="/home/${result[i]._id}" class="btn btn-outline-info " id="Details-${result[i]._id}">View details</a>
                
                                            </div>
                                            <div class="col-6  pr-0">
                                                <p class="mb-1">House Type: <br>${result[i].houseType}</p>
                                                <hr class="m-0">
                
                                                <p class="mb-1">Advance : <br>${result[i].cost.advance}</p>
                                                <hr class="m-0">
                
                                                <p>Parking available :<br>${result[i].isParkingAvailable}</p>
                                                <button class="btn btn-outline-info" id="Intrested-${result[i]._id}" onclick="add('${result[i]._id}')" ">Add to Wishlist</button>
                
                                            </div>
                                        </div>
                
                                        <!-- </div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                
                    </div> <div class="col-xl-6 m-0 p-0 col-lg-12">`
                i++;
                if (i < result.length) {
                    data += ` <div class="card m-0 p-0" style="width: 32rem ;margin: 0%;">
<div class="row no-gutters">
    <div class="col-5">

        <img class="card-img-top" style="height: 220px;"src=/uploads/${result[i].pics[0].filename}
        alt="Card image cap">
        </div>
        <div class="col-7">

            <div class="card-body pt-1">
                <h5 class="card-title">${result[i].houseName}</h5>
                <div class="row" style="font-size: smaller;">
                    <div class="col-6 pr-0">
                        <p class='mb-1'>Preferred Tenants:<br> ${result[i].preferred_tenant}</p>
                        <hr class="m-0">
                        <p class='mb-1'>Rent :<br>${result[i].cost.rentPerMonth}</p>
                        <hr class="m-0">

                        <p>Property Age :<br> ${result[i].propertyAge}</p>
                        <a href="/home/${result[i]._id}" class="btn btn-outline-info " id="Details-${result[i]._id}">View details</a>

                    </div>
                    <div class="col-6  pr-0">
                        <p class="mb-1">House Type: <br>${result[i].houseType}</p>
                        <hr class="m-0">

                        <p class="mb-1">Advance : <br>${result[i].cost.advance}</p>
                        <hr class="m-0">

                        <p>Parking available :<br>${result[i].isParkingAvailable}</p>
                        <button  class="btn btn-outline-info " id="Intrested-${result[i]._id}" onclick="add('${result[i]._id}')">Add to Wishlist</button>

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



function filter() {
    let state = String(document.getElementsByClassName("filters")[0].value);
    let City = String(document.getElementsByClassName("filters")[1].value);
    let rentPerMonth = String(document.getElementsByClassName("filters")[2].value);
    let houseType = String(document.getElementsByClassName("filters")[3].value);
    let furnishing = String(document.getElementsByClassName("filters")[4].value);
    let data = {}
    if (state != "") {
        data["address.state"] = state
    }
    if (City != "") {
        data["address.City"] = City;
    }
    if (houseType != "") {
        data.houseType = houseType;
    }
    if (furnishing != "") {
        data.furnishing = furnishing;
    }
    if (rentPerMonth != "") {
        if (rentPerMonth == "0") {
            data["cost.rentPerMonth"] = { $lte: 5000 }

        } else if (rentPerMonth == "1") {
            data["cost.rentPerMonth"] = { $gte: 5000, $lte: 10000 }


        } else if (rentPerMonth == "2") {
            data["cost.rentPerMonth"] = { $gte: 10000, $lte: 20000 }



        } else if (rentPerMonth == "3") {
            data["cost.rentPerMonth"] = { $gte: 20000 }


        }
    }
    $.ajax({
        url: "/api/house/filter",
        method: "POST",
        data: data,
        success: function(result) {
            result = result.result
            data = ``;
            for (let i = 0; i < result.length; i++) {
                data += ` <div class="row mt-2">
                  <div class="col-6 m-0 p-0">
                    <div class="card m-0 p-0" style="width: 32rem ;margin: 0%;">
                        <div class="row no-gutters">
                            <div class="col-5">
            
                                <img class="card-img-top" style="height: 220px;"src=/uploads/${result[i].pics[0].filename}
                                
                                alt="Card image cap">
                                </div>
                                <div class="col-7">
                
                                    <div class="card-body pt-1">
                                        <h5 class="card-title">${result[i].houseName}</h5>
                                        <div class="row" style="font-size: smaller;">
                                            <div class="col-6 pr-0">
                                                <p class='mb-1'>Preferred Tenants:<br> ${result[i].preferred_tenant}</p>
                                                <hr class="m-0">
                                                <p class='mb-1'>Rent :<br>${result[i].cost.rentPerMonth}</p>
                                                <hr class="m-0">
                
                                                <p>Property Age :<br> ${result[i].propertyAge}</p>
                                                <a href="#" class="btn btn-outline-info " id="Details-${result[i]._id}">View details</a>
                
                                            </div>
                                            <div class="col-6  pr-0">
                                                <p class="mb-1">House Type: <br>${result[i].houseType}</p>
                                                <hr class="m-0">
                
                                                <p class="mb-1">Advance : <br>${result[i].cost.advance}</p>
                                                <hr class="m-0">
                
                                                <p>Parking available :<br>${result[i].isParkingAvailable}</p>
                                                <button class="btn btn-outline-info " id="Intrested-${result[i]._id}"onclick="add('${result[i]._id}')" >Add to Wishlist</button>
                
                                            </div>
                                        </div>
                
                                        <!-- </div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                
                    </div> <div class="col-xl-6 m-0 p-0 col-lg-12">`
                i++;
                if (i < result.length) {
                    data += ` <div class="card m-0 p-0" style="width: 30rem ;margin: 0%;">
<div class="row no-gutters">
    <div class="col-5">

        <img class="card-img-top" style="height: 220px;"src=/uploads/${result[i].pics[0].filename}
        alt="Card image cap">
        </div>
        <div class="col-7">

            <div class="card-body pt-1">
                <h5 class="card-title">${result[i].houseName}</h5>
                <div class="row" style="font-size: smaller;">
                    <div class="col-6 pr-0">
                        <p class='mb-1'>Preferred Tenants:<br> ${result[i].preferred_tenant}</p>
                        <hr class="m-0">
                        <p class='mb-1'>Rent :<br>${result[i].cost.rentPerMonth}</p>
                        <hr class="m-0">

                        <p>Property Age :<br> ${result[i].propertyAge}</p>
                        <a href="#" class="btn btn-outline-info " id="Details-${result[i]._id}">View details</a>

                    </div>
                    <div class="col-6  pr-0">
                        <p class="mb-1">House Type: <br>${result[i].houseType}</p>
                        <hr class="m-0">

                        <p class="mb-1">Advance : <br>${result[i].cost.advance}</p>
                        <hr class="m-0">

                        <p>Parking available :<br>${result[i].isParkingAvailable}</p>
                        <button class="btn btn-outline-info pr-4" id="Intrested-${result[i]._id}" onclick="add('${result[i]._id}')">Add to Wishlist</button>

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
}
function add(id)
{
    $.ajax({
        url: "/api/house/addtowishlist/"+id,
        method: "PATCH",
        success: function(result) {
            console.log(result);
            if(result.message=="some error")
            snackbar("Error Occured!",false);
            else if(result.message=="Already existed")
            snackbar("Already Wishlisted!",false);
            else
            snackbar("Succesfuly Added to Wishlist !",true);
        },
        error: function(err) {
            if (err.responseJSON.message == "Unauthorized access") {
                location.href = "/"
            }
        }
    });
}