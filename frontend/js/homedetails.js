function filldata()
{
    const userid=location.href.split('/').splice(-1)[0];
    console.log(userid);
    var retrieve=['houseName','houseType','houseDescription','cost.rentPerMonth','cost.maintenance','cost.advance','address.Street', 'address.City','address.country','address.pincode','occupiedStatus','isParkingAvailable','propertyAge','preferred_tenant','property_type','parking','balcony','facing','furnishing']
    $.ajax({
        url: "/api/house/"+userid,
        method: "GET",
        success: function(result) {
            data=result.result;
            console.log(data);
            var code1=``;
            var code2=``;
            let l=[['House Name',data['houseName']],['House Type',data['houseType']],['Description',data['houseDescription']],['Rent (Per Month)',data['cost']['rentPerMonth']],['Maintenance',data['cost']['maintenance']],['Advance',data['cost']['advance']],['Street',data['address']['Street']],['City',data['address']['City']],['Country',data['address']['country']],['PinCode',data['address']['pincode']],['Occupied Status',data['occupiedStatus']],['isParkingAvailable',data['isParkingAvailable']],['propertyAge',data['propertyAge']],['preferred_tenant',data['preferred_tenant']],['property_type',data['property_type']],['parking',data['parking']],['Balcony',data['balcony']],['facing',data['facing']],['furnishing',data['furnishing']]]
            let d1=[['Name',data['adminId']['name']],['Email',data['adminId']['email']],['Street',data['adminId']['address']['Street']],['City',data['adminId']['address']['city']],['Locality',data['adminId']['address']['locality']],['PinCode',data['adminId']['address']['pincode']],['Mobile Number',data['adminId']['mobileNumber']]]
            for(let i of l){
                code1+=`<div class="items">
                <div class="name" style="width:51%;margin-left:10px"><h5 style="min-width: fit-content;">${i[0]}</h5></div>
                <div class="value" style="text-transform: capitalize;width: 50%;font-weight: 600;">${i[1]}</div>
            </div>`
            }   
            for(let i of d1){
                code2+=`<div class="items">
                <div class="name" style="width:45%;margin-left:10px"><h5 style="min-width: fit-content;">${i[0]}</h5></div>
                <div class="value" style="text-transform: capitalize;width: 50%;font-weight: 600;">${i[1]}</div>
            </div>`
            }           
        $(".details").html(code1);
        $(".detail").html(code2);
        },
        error: function(err) {
            if (err.responseJSON.message == "Unauthorized access") {
                location.href = "/dashboard"
            } else {

                console.log(err);
                location.href="/dashboard" //change this url ....
            }
        }
    });   
}
filldata();
console.log($(".slide-box"))