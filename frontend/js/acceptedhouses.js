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
    

    var data = ``;
    $.ajax({
        url: "/api/user/getacceptedusers",
        method: "GET",
        success: function(result1) {
            // result = result.result;
            console.log(result1);
            result1 = result1.result[0].housesInterested;
            
            for (let i = 0; i < result1.length; i++) {
                let result=result1[i].houseId;
                if(result==undefined) continue;
                if(result1[i].status!="Accepted") continue;
                data += ` <div class="row mt-2">
                  <div class="col-6 m-0 p-0">
                    <div class="card m-0 p-0" style="width: 32rem ;margin: 0%;">
                        <div class="row no-gutters">
                            <div class="col-5">
            
                                <img class="card-img-top" style="height: 230px;"src=/uploads/${result.pics[0].filename}
                                
                                alt="Card image cap">
                                </div>
                                <div class="col-7">
                
                                    <div class="card-body pt-1">
                                        <h5 class="card-title">${result.houseName}</h5>
                                        <div class="row" style="font-size: smaller;">
                                            <div class="col-6 pr-0">
                                                <p class='mb-1'>Preferred Tenants:<br> ${result.preferred_tenant}</p>
                                                <hr class="m-0">
                                                <p class='mb-1'>Rent :<br>${result.cost.rentPerMonth}</p>
                                                <hr class="m-0">
                
                                                <p>Property Age :<br> ${result.propertyAge}</p>
                                                <button class="btn btn-outline-info" id="Details-${result._id}" onclick="join(this,'${result._id}')" ">Join</button>

                                            </div>
                                            <div class="col-6  pr-0">
                                                <p class="mb-1">House Type: <br>${result.houseType}</p>
                                                <hr class="m-0">
                
                                                <p class="mb-1">Advance : <br>${result.cost.advance}</p>
                                                <hr class="m-0">
                
                                                <p>Parking available :<br>${result.isParkingAvailable}</p>
                                                <button class="btn btn-outline-info" id="Intrested-${result._id}" onclick="reject('${result._id}')" ">Reject</button>
                
                                            </div>
                                        </div>
                
                                        <!-- </div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                
                    </div> <div class="col-xl-6 m-0 p-0 col-lg-12">`
                i++;
                if(i<result1.length){
                result=result1[i].houseId;
             while(result==undefined || result1[i].status!="Accepted") {i++;
                result=result1[i].houseId;
            };
        
        }


                if (i < result1.length) {
                    data += ` <div class="card m-0 p-0" style="width: 32rem ;margin: 0%;">
<div class="row no-gutters">
    <div class="col-5">

        <img class="card-img-top" style="height: 220px;"src=/uploads/${result.pics[0].filename}
        alt="Card image cap">
        </div>
        <div class="col-7">

            <div class="card-body pt-1">
                <h5 class="card-title">${result.houseName}</h5>
                <div class="row" style="font-size: smaller;">
                    <div class="col-6 pr-0">
                        <p class='mb-1'>Preferred Tenants:<br> ${result.preferred_tenant}</p>
                        <hr class="m-0">
                        <p class='mb-1'>Rent :<br>${result.cost.rentPerMonth}</p>
                        <hr class="m-0">

                        <p>Property Age :<br> ${result.propertyAge}</p>
                        <button class="btn btn-outline-info" id="Details-${result._id}" onclick="join(this,'${result._id}')" ">Join</button>

                    </div>
                    <div class="col-6  pr-0">
                        <p class="mb-1">House Type: <br>${result.houseType}</p>
                        <hr class="m-0">

                        <p class="mb-1">Advance : <br>${result.cost.advance}</p>
                        <hr class="m-0">

                        <p>Parking available :<br>${result.isParkingAvailable}</p>
                        <button class="btn btn-outline-info" id="Intrested-${result._id}" onclick="reject('${result._id}')" ">Reject</button>

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
var User=JSON.parse(localStorage.getItem('userDetails'));
function reject(homeid){    
   let userid=User.userId
    alert(homeid);
    $.ajax({
        url: "/api/admin/rejecthouse/" + userid,
        method: "PATCH",
        data:{
            houseId:homeid
        },
        success: function(result) {
alert(JSON.stringify(result));        },
error: function(err) {
    if (err.responseJSON.message == "Unauthorized access") {
        location.href = "/"
    }
}
    });
}
