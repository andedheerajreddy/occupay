$(() => {
    var data = ``;
    $.ajax({
        url: "/api/house/available",
        method: "GET",
        success: function(result) {
            // result = result.result;
            result = result.result;
            //console.log(result);
            for (let i = 0; i < result.length; i++) {
                data += ` <div class="row">
                  <div class="col-6 m-0 p-0">
                    <div class="card m-0 p-0" style="width: 30rem ;margin: 0%;">
                        <div class="row no-gutters">
                            <div class="col-5">
            
                                <img class="card-img-top" style="height: 220px;"src=${result[i].pics[0]}
                                
                                alt="Card image cap">
                                </div>
                                <div class="col-7">
                
                                    <div class="card-body pt-1">
                                        <h5 class="card-title">${result[i].houseName}</h5>
                                        <div class="row" style="font-size: smaller;">
                                            <div class="col-6 pr-0">
                                                <p class='mb-1'>Preferred Tenants:<br> ${result[i].availableFor}</p>
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
                                                <a href="#" class="btn btn-outline-info pr-4" id="Intrested-${result[i]._id}">Intrested</a>
                
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

        <img class="card-img-top" style="height: 220px;"src=${result[i].pics[0]}
        
        alt="Card image cap">
        </div>
        <div class="col-7">

            <div class="card-body pt-1">
                <h5 class="card-title">${result[i].houseName}</h5>
                <div class="row" style="font-size: smaller;">
                    <div class="col-6 pr-0">
                        <p class='mb-1'>Preferred Tenants:<br> ${result[i].availableFor}</p>
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
                        <a href="#" class="btn btn-outline-info pr-4" id="Intrested-${result[i]._id}">Intrested</a>

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