function snackbar(mssg,success) {
    var x = document.getElementById("snackbar");
    if(success)
    x.style.backgroundColor = 'green';
    x.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ${mssg}`
    x.className = "show";
    setTimeout(function() { x.className = x.className.replace("show", ""); }, 2000);
}
$(() => {
    var data = ``;
    $.ajax({
        url: "/api/user/wishlist",
        method: "GET",
        success: function(result) {
            result = result.result[0].wishlist;
            console.log(result);
            for (let i = 0; i < result.length; i++) {
                data += ` <div class="row mt-2" style="margin-left:15%">
                  <div class="col-6 m-0 p-0">
                    <div class="card m-0 p-0" style="width: 32rem ;margin: 0%;">
                        <div class="row no-gutters">
                            <div class="col-5">
            
                                <img class="card-img-top" style="height: 230px;"src=/uploads/${result[i]["houseId"]["pics"][0].filename}
                                
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
                                                <a href="/home/${result[i]["houseId"]._id}" class="btn btn-outline-info " id="Details-${result[i]["houseId"]._id}">View details</a>
                                            </div>
                                            <div class="col-6  pr-0">
                                                <p class="mb-1">House Type: <br>${result[i]["houseId"].houseType}</p>
                                                <hr class="m-0">
                
                                                <p class="mb-1">Advance : <br>${result[i]["houseId"].cost.advance}</p>
                                                <hr class="m-0">
                
                                                <p>Parking available :<br>${result[i]["houseId"].isParkingAvailable}</p>
                                                <button  class="btn btn-outline-info " id="Details-${result[i]["houseId"]._id}" onclick="remove('${result[i]["houseId"]._id}')">Remove House</button>
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

        <img class="card-img-top" style="height: 220px;" src="/uploads/${result[i]["houseId"]["pics"][0].filename}"
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
                        <a href="/home/${result[i]["houseId"]._id}" class="btn btn-outline-info " id="Details-${result[i]["houseId"]._id}">View details</a>

                    </div>
                    <div class="col-6  pr-0">
                        <p class="mb-1">House Type: <br>${result[i]["houseId"].houseType}</p>
                        <hr class="m-0">

                        <p class="mb-1">Advance : <br>${result[i]["houseId"].cost.advance}</p>
                        <hr class="m-0">

                        <p>Parking available :<br>${result[i]["houseId"].isParkingAvailable}</p>
                        <button  class="btn btn-outline-info " id="Details-${result[i]["houseId"]._id}" onclick="remove('${result[i]["houseId"]._id}')">Remove House</button>
                       
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
        }
    })
})

function remove(houseid)
{
    console.log(houseid);
    $.ajax({
        url: "/api/user/removehouse/"+houseid,
        method: "PATCH",
        success: function(result) {
            console.log(result);
            location.reload();
        },
        error:function(error) {console.log(error);}
    });
}