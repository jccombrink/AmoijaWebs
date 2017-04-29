var eventInfo;
var raceInfo;
$(document).ready(function(){
    $.post("events.php", {}, function(data) {
        eventInfo = data;
        if (raceInfo){
            popEventsNav();
            popCalendar();
        }
    }, "json");
    $.post("races.php", {}, function(data) {
        raceInfo = data;
        if (eventInfo){
            popEventsNav();
            popCalendar();
        }
    }, "json");

    //Pre-loading activities

    //Loading bar setup
    path = $("#path").get(0);
    var length = path.getTotalLength();
    var loaded = 0;
    var imageCount = 3; //This should be total amount of images that imagesLoading is waiting for
    $('#path').attr({"stroke-dasharray": "350","stroke-dashoffset": length});

    $("#land-logo").removeClass("loading");

    //Images loaded plugin
    $('.waitforme').imagesLoaded( { background: true }, function() {

        //When done loading, wait for the loading bar to finish animation
        $(path).on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
                   function() {
            $("#wrap-enter").removeClass("loading",3000);
            $("#wallpaper").removeClass("waiting-wall");
            $("#wallpaper").addClass("zoom");
            $(path).hide();   
        });

    }).progress( function( instance, image ) {
        loaded++;

        $(path).css({"stroke-dashoffset": (length-(length/imageCount)*loaded)});//
    });

    //Get handles on a few frequently used elements
    infoBox = $("#eventInfo");
    fullImage = $("#imgFull");
    navbar = $("#navBar");

    //Load the arrays containing navbar items required for various "pages"
    popGalleryNav();
    popAboutNav();

    //Enter Site clicked on landing page
    $("#btnEnterSite").click(function(){

        paintMenuItem("HOME");
        $("#header").show();

    });

    //Home header icon (top left) clicked should return to home
    $("#header a").click(function(){
        paintMenuItem("HOME");
    });
});

//Metohds

//Loads the navabar with the given items (navItems) of type (page)
function buildNav(page, navItems){

    //Reset navbar
    navbar.empty();
    navbar.removeClass("onlyBack");

    //Creating a back button to be added to navbar every time
    itmBack = $("<a id='itmBack' class='navItem'>back</a>");

    //Assume there is only a back button, if not, it will be overwritten in the for loop below
    navbar.addClass("onlyBack");

    //Adding items from the given array to the navbar
    for (i=0;i<navItems.length;i++){

        //Entering this loop implies that there is not just a back button on the navBar 
        navbar.removeClass("onlyBack");
        if(page == "ABOUT"){
            item = '<a id="" href="'+socialLinks[navItems[i]]+'" target="_blank" class=""><i class="fa fa-'+navItems[i]+'" fa-fw fa-3x"></i></a>';
        }
        else{
            item = $("<a class='navItem' data-item='"+navItems[i]+"' data-type='"+page+"'>"+navItems[i]+"</a>");
        }
        divider = $("<span>/</span>");

        navbar.append(item);
        navbar.append(divider);
        // Asigning the necessary click events to navItems
        $(item).click(function(){
            //paintUI($(this).attr("id"));
            navClick($(this).data("type"), $(this).data("item"));
        });

    }
    //For anything else than the main menu, a back button should be added
    if (page !== "menu"){
        // Adding back button and assigning back click event
        navbar.prepend(itmBack, divider);
        itmBack.click(function(){
            paintMenuItem("HOME");
        });
    }
    navbar.removeClass("hide");
}
//PaintS DOM for each of the "pages"

function paintMenuItem(item){

    //Clear everything first
    clearUI();

    switch(item){

        case "EVENTS":

            buildNav("EVENTS",[]);

            //                $(".navItem:nth-child(2)").addClass("red");

            $("#section-Content").removeClass("hide");
            navbar.addClass("navDrop");

            $("#divEvents").removeClass("hide");
            $("#itmEVENTS a").addClass("selected");

            $("#wallpaper").addClass("posOne");
            $("#header").addClass("shrink");

            //$(".navItem")[1].click();

            break;

        case "HOME" :

            buildNav("menu", ["EVENTS", "CALENDAR", "GALLERY", "ABOUT", "SPONSORS"]);

            paintGalleryItem("STFBartinney2Bartinney");

            navbar.removeClass("navDrop");
            navbar.addClass("vertigo");

            $("#imgWatermark").show();
            $("#imgWatermark").addClass("dark");

            $("#wallpaper").addClass("darkenWallpaper");

            $("#imgWatermark").addClass("moving");

            break;

        case "CALENDAR" :

            buildNav("CALENDAR",[]);

            navbar.addClass("navDrop");
            $("#section-Content").removeClass("hide");

            $("#divCalendar").removeClass("hide");
            $("#itmCALENDAR a").addClass("selected");

            $("#wallpaper").addClass("posTwo");

            break;

        case "GALLERY" :

            buildNav("GALLERY",arrGalleryNavbar);

            navbar.addClass("navDrop");
            $("#section-Content").removeClass("hide");

            $("#divGallery").removeClass("hide");

            $("#wallpaper").addClass("posThree");

            $(".navItem")[1].click();

            break;

        case "ABOUT" :

            buildNav("ABOUT",arrAboutNavbar);

            $("#section-Content").removeClass("hide");
            navbar.addClass("navDrop");
            //
            $("#divAbout").removeClass("hide");
            $("#itmABOUT a").addClass("selected");

            $("#wallpaper").addClass("posFour");

            break;

        case "SPONSORS" :

            buildNav("SPONSORS",[]);

            navbar.addClass("navDrop");
            $("#section-Content").removeClass("hide");

            $("#divSponsors").removeClass("hide");

            $("#wallpaper").addClass("posThree");

            break;
    }


}


//Paints DOM for each gallery sub-page.

function paintGalleryItem(item){
    $("#galWrap").empty();

    temp = item;

    $.each(eventPhotos[item], function(key,value){

        var item = $('<div class="thumbContainer"><img src="img/photos/'+temp+'/'+value+'.jpg"></div>');
        $("#galWrap").append(item);

    });

    //Click events for gallery

    //Maximizing image when clicked
    $(".thumbContainer img").click(function(){
        $("#screenShade").addClass("shade");
        source = $(this).attr("src");
        $("#imgFull").attr("src",source);
        fullImage.show();
    });
    
    //Close button to minimize image
    $("#btnClose").click(function(){
        $("#screenShade").removeClass("shade");
        fullImage.hide();
    });
}

//Clearing UI before painting new contents

function clearUI(){

    //Hiding all the 
    $("#section-Land").addClass("hide");
    $("#section-Content").addClass("hide");
    $("#divEvents").addClass("hide");
    $("#divAbout").addClass("hide");
    $("#divCalendar").addClass("hide");
    $("#divGallery").addClass("hide");
    $("#divSponsors").addClass("hide");
    $("#section-Land").addClass("hide");
    navbar.addClass("hide");

    //Reset the watermark
    $("#imgWatermark").removeClass("dark");
    $("#imgWatermark").removeClass("moving");

    //Reset background
    $("#wallpaper").attr("class","zoom");
    $("#wallpaper").removeClass("darkenWallpaper");

    fullImage.hide();
}
//Handling ALL navbar clicks
function navClick(type, item){
    //Clear "selection" formatting of all items
    $(".selected").removeClass("selected");

    //Find the clicked item, and add selection formatting
    $("#navBar .navItem[data-item='"+item+"']").addClass("selected");

    //Sorting clicks by type of item
    switch(type){

        case "menu" : 
            paintMenuItem(item);
            break;
        case "EVENTS" : 
            $("#eventInfo").animate({
                height: "50%",
                opacity: "0"
            }, 100, function(){
                paintEventsItem(item);
                $("#eventInfo").animate({
                    height: "90%",
                    opacity: "1"
                }, 500 );
            });
            break;
        case "calendar" : 
            break;
        case "GALLERY" :
            paintGalleryItem(item);
            break;
        case "about" : 
            break;
    }
}
//Function responsible for populating events navbar
function popEventsNav(){
        events = $("#eventWrap");
        events.empty();
        i = 0;
        $.each(eventInfo,function(key, value){
            i++;
            logoURL =  value["LOGO"] ? value["LOGO"] : "img/logo.svg";
            //populating the events page
            item = $('<div class="evContainer"><a target="_blank" class="evEnter"><img src="img/enterTab.svg"></a><div class="evHead"><img src="'+logoURL+'" class="center-block"></div><hr><div class="row evRow"><div class="col-xs-8 evTitleLeft"><h3 class="evName">'+value["NAME"]+'</h3><h4 class="evDate">'+value["DATE"]+'</h4></div><div class="col-xs-4 evTitleRight"><img src="img/icons/'+value["TYPE"]+'.svg" class="center-block"></div></div><hr><p class="peak"></p><div class="fader"></div><a class="evDetails">More</a></div>');
            
            $.each(value, function(k,v){
                switch (k){
                    case "ABSTRACT" :
                        $("p", item).append(v + "<br><br>");
                        break;
                    case "ENTERLINK":
                        break;
                    case "LOGO":
                        break;
                    case "NAME":
                        break;
                    default:
                        $("p", item).append("<h5>"+k+"</h5><br>"+v + "<br><br>");
                        break;
                        
                }
            });
            events.append(item);
        });
    $(".evEnter").click(function () {
        $("#itmBack").click();
        $("a[data-item='CALENDAR']").click();
    });
    $(".evDetails").click(function(){
               if ($(this).text()=="More"){
                   $(this).text("Close");
               }
                else{
                    $(this).text("More");
                }
               
               $(this).siblings("p").toggleClass("peak");
               $(this).closest(".evContainer").toggleClass("smal");
               
            });
    //With an odd number of events, add a dummy to bring sexy back
    if (i % 2){
                    //populating the events page
            item = $('<div id = "evDummy" class="evContainer"></div>');
            
            events.append(item);
    }
}

//Function responsible for populating gallery navbar
function popGalleryNav(){
    arrGalleryNavbar = [];
    $.each(eventPhotos, function(key,value){
        arrGalleryNavbar.push(key);
    });
}

//Function responsible for populating about navbar
function popAboutNav(){

    arrAboutNavbar = [];

    $.each(socialLinks, function(key,value){

        //        link = '<a id="" href="'+value+'" target="_blank" class=""><i class="fa fa-'+key+'" fa-fw fa-x"></i></a>';

        //        link = '<i class="fa fa-'+key+'" fa-fw fa-x" data-url="'+value+'"></i>';

        arrAboutNavbar.push(key);

    });

}


function popCalendar(){
    var row;
    $.each(raceInfo, function(key,value){
        row = $('<tr></tr>');
        row.append($('<td>'+value['date']+'</td>'));
        row.append($('<td>'+eventInfo[value['event_id']].NAME+'</td>'));
        row.append($('<td>'+value['type']+'</td>'));
        row.append($('<td>'+value['venue']+'</td>'));
        if (value['entrylink'] !== '-') {
            row.append($('<td class="tdEnter"><a target="_blank" href="'+value['entrylink']+'" class="eventOpen">ENTER</a></td>'));
        } else {
            row.append($('<td class="tdEnter"><a target="_blank" class="eventNotOpen">ENTER</a></td>'));
        }
        
        $('#tblCalendar tbody').append(row);
    });
}
var eventPhotos ={
    STFBartinney2Bartinney:["1","2","3","4","5","6","7","8","9","10","11","12"],
    Cochoqua:["1","2","3","4","5","6","7","8","9","10","11","12"],
    "More":["1","2","3","4","5","6","7","8","9","10"]
}
var socialLinks ={
    twitter : "http://www.twitter.com/AmoijaEvents",
    facebook : "http://www.facebook.com/AmoijaEvents",
    envelope: "mailto:herman@amoija.com"
}



