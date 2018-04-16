/* Open the sidenav */
function openNav() {
    if ($(window).width() < 540) {
        document.getElementById("mySidenav").style.width = "100%";
    } else document.getElementById("mySidenav").style.width = "440px";
    $('#mySidenav ul').fadeIn(200, function () {
        $('#mySidenav').css("overflow", "auto");
        $('#mySidenav').css("overflow-x", "hidden");
    });
}

/* Close/hide the sidenav */
function closeNav() {
    $('#mySidenav ul').fadeOut(200);
    document.getElementById("mySidenav").style.width = "0";
}