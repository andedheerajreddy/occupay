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
var RequestedUsers;
var homeid;
function filldata() {
    homeid = location.href.split('/').splice(-1)[0];
    $.ajax({
        url: "/api/house/" + homeid,
        method: "GET",
        success: function(result) {
            data = result.result;
            console.log(data);
            RequestedUsers=data.usersInterested;
            var code1 = ``;
            var code2 = ``;
            fillrequested();
            filldata1();
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
                snackbar("Access denied",false);
                location.href = "/"
            }
        }
    });
}
filldata();
function openPage(pageName, elmnt, id) {
    var i, tabcontent, tablinks;
    if (id == 1) 
    {
        document.getElementById("0").style.borderBottomColor = "white";
        document.getElementById("2").style.borderBottomColor = "white";
    } 
    else if(id==2)
    {
        document.getElementById("1").style.borderBottomColor = "white";
        document.getElementById("0").style.borderBottomColor = "white";
    }
    else
    {
            document.getElementById("1").style.borderBottomColor = "white";
            document.getElementById("2").style.borderBottomColor = "white";
    }
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
function fillrequested() {
    RequestedUsers;
    var code=`<div class="accordion" id="parent"  >`;
    for(let i=0;i<RequestedUsers.length;i++)
    {
        if(RequestedUsers[i]["userId"]==undefined)continue;
        let userid=RequestedUsers[i]["userId"]._id;
        code+=`
        <div class="accordion-item" style="width:100%;" >
                <h2 class="accordion-header" id="heading${i+1}">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i+1}" aria-expanded="true" aria-controls="collapse${i+1}" style="font-size:20px;max-width:100%;color:black !important"> 
                <i class="zmdi zmdi-account material-icons-name" style="margin-right:2%;"></i> Name: ${RequestedUsers[i]["userId"].name}
                </button>
              </h2>
    <div id="collapse${i+1}" class="accordion-collapse collapse" aria-labelledby="heading${i+1}" data-bs-parent="#parent">
      <div class="accordion-body">
        <div class="row">Mobile Number: ${RequestedUsers[i]["userId"].mobileNumber}</div>
        <div class="row">Email: ${RequestedUsers[i]["userId"].email}</div>
        <div class="row">Street:${RequestedUsers[i]["userId"].address.Street}</div>
        <div class="row">City:${RequestedUsers[i]["userId"].address.City}</div>
        <div class="row">State:${RequestedUsers[i]["userId"].address.state}</div>
        <div class="row">Pincode:${RequestedUsers[i]["userId"].address.pincode}</div>
        <div class="row"><div class="col-1 m-0 p-0"><button class="btn btn-success" onclick="acceptuser('${userid}')" ><i class="fas fa-check"></i></button></div>
        <div class="col-2  m-0 p-0"><button type="button" class="btn btn-danger" onclick="rejectuser('${userid}')"><i class="fas fa-times"></i></button></div>
        </div>
        </div>
        </div>
      </div>
    </div>
    </div>
    `
    code+='</div>';
    }
    $("#data").append(code);
}
function acceptuser(userid){
    
    $.ajax({
        url: "/api/admin/accepthouse/" + userid,
        method: "PATCH",
        data:{
            houseId:homeid
        },
        success: function(result) {
            snackbar("Successfully Accepted !",true);
            location.reload();
            },
        error: function(error) {
            snackbar(error,false);
        }
    });
}

function rejectuser(userid){
    $.ajax({
        url: "/api/admin/rejecthouse/" + userid,
        method: "PATCH",
        data:{
            houseId:homeid
        },
        success: function(result) {
            snackbar("Succesfully Rejected",true);
            location.reload();
        },
        error: function(error) {
            snackbar(error,false);
        }

    });
}
function filldata1()
{
 
    $.ajax({
        url: "/api/house/joineduser/" + homeid,
        method: "GET",
        success: function(result) {
            result=result.result;
            console.log(result);
            let UserData=result.currentUser;
            let userdata = `
            <div class="row"><h4><label> Name </label> : ${UserData.name} </h4></div>
            <div class="row"><h4><label>Email</label> : ${UserData.email}</h4></div>
           <div class="row"><h4><label>Phone Number</label> :${UserData.mobileNumber}</h4></div>
           <div class="row"><h4><label> Street </label> : ${UserData.address.Street} </h4></div>
           <div class="row"><h4><label> City </label> : ${UserData.address.City} </h4></div>
           <div class="row"><h4><label> Pincode </label> : ${UserData.address.pincode} </h4></div>
           <div class="row"><h4><label> State </label> : ${UserData.address.state} </h4></div>
          `
          $("#data1").html(userdata);
        

        },
        error:function(error) {
            alert(error);
        }
    })

}