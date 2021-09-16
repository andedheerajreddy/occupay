$(document).ready(function() {
    $(document).on("scroll", onScroll);
    //smoothscroll
    $('.navbar-nav li a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        $(document).off("scroll");
        $('.navbar-nav li a').each(function() {
            $(this).removeClass('active');
        })
        $(this).addClass('active');
        var target = this.hash,
            menu = target;
        target = $(target);
        $('html, body').stop().animate({
            'scrollTop': target.offset().top + 2
        }, 1000, 'swing', function() {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});

function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $('.navbar-nav li a').each(function() {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.navbar-nav li a').removeClass("active");
            currLink.addClass("active");
        } else {
            currLink.removeClass("active");
        }
    });
}
function mylogin() {
    document.getElementsByClassName("modal")[0].innerHTML = `
    <div id="myModal" class="modal-dialog.modal-dialog-centered">
    <div id="content" class="modal-content" style="background:azure">
    <div><b class="dia">Are you a student or an organizer?
    </b><br/>
    <a href="/login"><button class="btns" type="button" style="color:#2980B9; margin-right:6%;">User</button></a>
    <a href="/login/organiser"><button class="btno" type="button" style="color:#F50057;">Admin</button></a>
    </div>
    </div>`

    var modal = document.getElementsByClassName("modal")[0];
    modal.style.display = "block";
    window.addEventListener("click",function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.backgroundColor = "#f8f9fa";
        }
    })
    document.body.style.backgroundColor = "lightgrey";

}

function mysignup() {   
    document.getElementsByClassName("modal")[0].innerHTML = `
    <div id="myModal" class="modal-dialog.modal-dialog-centered">
    <div id="content" class="modal-content" style="background:azure">
    <div><b class="dia">Are you a student or an organizer?
    </b><br/>
    <a href="/register"><button class="btns" type="button" style="color:#2980B9; margin-right:6%;">User</button></a>
    <a href="/signup/organiser"><button class="btno" type="button" style="color:#F50057;">Admin</button></a>
    </div>
    </div>`

    var modal =document.getElementsByClassName("modal")[0];
    modal.style.display = "block";
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.backgroundColor = "#f8f9fa";
        }
    }
    document.body.style.backgroundColor = "lightgrey";
}