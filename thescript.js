var eventInfo;
var raceInfo;
$(document).ready(function(){
    $.post("events.php", {}, function(data) {
        eventInfo = data;
        popEventsNav();
    }, "json");
    $.post("races.php", {}, function(data) {
        raceInfo = data;
        popCalendar();
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

//Paints DOM for each event sub-page. I.e. If the user clicks on a specific event

function paintEventsItem(item){

    //Adding the event icon
    //                $("#eventIcon").attr("src","../img/"+item+".svg" );
    $("#eventIcon").attr("src","img/logo.svg" );


    //Adding the event info
    infoBox.html(""); //First empty container
    $.each(eventInfo[item],function(key,value){
        if (key == "ENTERHERE"){
            infoBox.append("<btn><a target='_blank' href='"+value+"'>ENTER</a></btn>")
            return;
        }

        //                        var is_last_item = (key == (arr.length - 1));


        infoBox.append("<h3>"+key+"</h3><hr><p>"+value+"</p><br>"); //Add new content

    });

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
            logoURL = value["LOGO"] ? value["LOGO"] : "img/logo.svg";
            //populating the events page
            item = $('<div class="evContainer"><a class="evEnter" href="'+value["ENTERHERE"]+'"><img src="img/enterTab.svg"></a><div class="evHead"><img src="'+logoURL+'" class="center-block"></div><hr><div class="row evRow"><div class="col-xs-8 evTitleLeft"><h3 class="evName">'+key+'</h3><h4 class="evDate">'+value["DATE"]+'</h4></div><div class="col-xs-4 evTitleRight"><img src="img/icons/'+value["TYPE"]+'.svg" class="center-block"></div></div><hr><p>'+value["ABSTRACT"]+'<br></p><a class="evDetails">Details</a></div>');
            events.append(item);
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
        row.append($('<td>'+value['event']+'</td>'));
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
//function scanCalendar(){
//    $(".tdEnter a").each(function(){
//        
//    })
//}
//Temporary arrays holding databse information for now

var eventPhotos ={
    STFBartinney2Bartinney:["1","2","3","4","5","6","7","8","9","10","11","12"],
    Cochoqua:["1","2","3","4","5","6","7","8","9","10","11","12"],
    "More":["1","2","3","4","5","6","7","8","9","10"]
}
//var eventInfo = {
//    Bartinney2Bartinney:{
//     ABSTRACT:"With over 500 participants and the event selling out in year one, this is an epic experience not to be missed. The fact that this race is presented by The Stellenbosch Trail Fund should be the first tip to the quality of trail which athletes can expect from this race.",
//     DATE:"14 May 2017",
//     VENUE:"Stellenbosch",
//     ROUTE:"With The Stellenbosch Trail Fund putting in masses of work on Botmaskop, the route promises to reveal some brand new, world-class trails in 2017.",
//     DISTANCES:"Bartinney Extreme: 25km&lt;br&gt;&lt;br&gt; Bartinney Dash: 12km",
//     CATEGORIES:"Open",
//     ENTRIES:"Bartinney Extreme: R290 (Only 100 Early bird entries)&lt;br&gt;&lt;br&gt; Bartinney Dash: R190 (Only 150 Early bird entries)&lt;br&gt;&lt;br&gt; SAS timing chip compulsory for this event @ R50 same chip as all the Amoija / Warrior / Impi / Entry ninja timed events. Chips can also be rented for R10 on the day.",
//     REGISTRATION:"Registration will take place at Bartinney Wine Bar on 12 May from 17:30 until 20:00.&lt;br&gt;&lt;br&gt; There will be no late entries for this race. Particapants coming from far, the second Registration will take place on the morning of the event at Bartinney Wine Bar from 06:00.",
//     STARTING:"25km – 07:15&lt;br&gt;&lt;br&gt; 12km – 07:30 &lt;br&gt;&lt;br&gt;Cut off time: no cut off time Prize Giving and Lucky draw at 10:00 Stick around for lots of lucky draw prizes and cash prizes for the winners.",
//     MORE:"General information: Live Music, coffee, wine, food and drinks available afterwards. Free glass of Bubbly to all the mothers who participate. EPT recovery zone There will be a shuttle service from the finish area back to Bartinney Wine Bar, leaving Bartinney farm every 30/45 mins from 09:45. Part of the proceeds will go to Stellenbosch Trail Fund.",
//     ENTERHERE:"https://www.entryninja.com/events/event/11881-stf-bartinney2bartinney"
//          },
//    Cochoqua:{
//     ABSTRACT:"The mighty Cochoqua were the richest and strongest of the Khoi tribes in area of the Berg River and Drakenstein Valleys. Lead by their fierce leader Gonnama, they grew nearly 18 000 strong in the late 1600's. &lt;br&gt;&lt;br&gt;The challenge set before you is to immitate this mighty people in conquering the Drakenstein Valleys, and calling this relentless terain your playground.",
//     DATE:"22-24 SEPT 2017",
//     VENUE:"Boschendal Wine Estate",
//     ROUTE:"A telling 10km Prologue late on Friday afternoon will set the mood, and starting positions for the ture racing that begins on Saturday.&lt;br&gt;&lt;br&gt;Day two will be the jumping board used by the strongest runners to rip the field wide open. At nearly 30km, it will be a true test of who can crack their rivals, whilst still keeping something for the final day.The route will see runners pioneering never before seen trails, the old Elpephant's Pass to Stellenbosch.Named Gonnema's Revenge, athletes will face the wrath of the undulating terain once a footstool to the great chief.&lt;br&gt;&lt;br&gt; The third and final day is a friendlier 20km run through the Boschendal singletrack. However, for those smelling the scent of victory, it will undoubtedly be time to empty whatever fortitude they still have left in a last ditch effort to drench themselves in glory.",
//     CATEGORIES: "Solo Entires &lt;br&gt;&lt;br&gt;Team Entries:&lt;br&gt; Cat 1: Male &amp; Female (open)&lt;br&gt;&lt;br&gt;Cat 2: Male &amp; Female (Vets 40+)&lt;br&gt;&lt;br&gt;Cat 3: Mixed",
//     DISTANCES: "Day 1: ±8 - 10km Boschendal (prologue)&lt;br&gt;&lt;br&gt; Day 2: ±25 - 30km Banghoek Valley &lt;br&gt;&lt;br&gt;Day 3: ±18- 20km Boschendal &lt;br&gt;&lt;br&gt;Total: +-60km",
//     ENTRIES:"Solo Entries:&lt;br&gt;&lt;br&gt;&lt;br&gt;R990 - Solo Entry - No accommodation, no meals (25 entries)&lt;br&gt;&lt;br&gt;R2 500 - Solo Entry - Tented accommodation – one man tent, Breakfast, lunch &amp; dinner (10 entries)&lt;br&gt;&lt;br&gt;R4 500 - Solo Entry - Cottage Accommodation, Breakfast, Lunch &amp; Dinner - 4 p/cottage (16 entries)&lt;br&gt;&lt;br&gt;Teams (2p/team):&lt;br&gt;R990 - p/person - no accommodation, no meals (25 Teams)&lt;br&gt;&lt;br&gt;R2 500 -p/person - Tented accommodation – one man tent, Breakfast, lunch &amp; dinner (20 Teams)&lt;br&gt;&lt;br&gt;R3 500.00 p/person - Luxury accommodation at race village - breakfast, Lunch &amp; dinner (4 per cottage, 22 Teams) &lt;br&gt;&lt;br&gt;R4 000 -p/person - Luxury accommodation at race village - breakfast, Lunch &amp; dinner (2 per cottage, 6 teams)",
//     REGISTRATION:"At Boschendal",
//     STARTING:"TBA",
//     MORE:"Move quickly, the battle for entries will be your first obstacle en route to Boschendal.",
//     ENTERHERE:"https://www.entryninja.com/events/event/10281-cochoqua-trail"
//     },
//    OlyfbergSummitChallenge:{
//     ABSTRACT:"This year the Olyfberg Summit Challenge will be even bigger &amp; better. This pedigree event was featured in Trail Mag for it's breathtaking views and magnificent trails.&lt;br&gt;&lt;br&gt;The Olyfberg Summit Challenge forms part of the Wacky Wine Weekend so all are welcome  Product tastings and cellar tours will provide even more entertainment for the day.",
//     VENUE:"Olyfberg, Breede River Valley",
//     ROUTE:"Runners will be welcomed to the best single track there is to run in the Robertson valley, with more than 85% of the 21km route consisting of single track. ",
//     CATEGORIES: "Open Male and Female",
//     DISTANCES: "Summit Challenge: 21km&lt;br&gt;&lt;br&gt;Medium Route:  10km&lt;br&gt;&lt;br&gt;5km Fun Walk ",
//     ENTRIES:"Summit Challenge: 21km – R250&lt;br&gt;&lt;br&gt;Medium Route:  10km – R170&lt;br&gt;&lt;br&gt;5km Fun Walk – R50 (kids under 12 for free)&lt;br&gt;&lt;br&gt;Late entries – R30 extra from 07:30 at the venue on the day of the event if capacity is not reached. SAS timing chip compulsory for this event @ R50 same chip as all the Amoija / Warrior / Impi / Entry ninja events. Chips can also be rented for R10 on the day.",
//     REGISTRATION:"From 07:30 at the venue on the day of the event.",
//     STARTING:"21km – 09:00&lt;br&gt;&lt;br&gt;&lt;br&gt;10km – 09:10&lt;br&gt;&lt;br&gt;5km Walk – 09:15&lt;br&gt;&lt;br&gt;Registration and late entries from 07:30 at the venue on the day of the event.&lt;br&gt;&lt;br&gt;Lucky draw at 11:00&lt;br&gt;&lt;br&gt;Big prizes and cash for the winners.",
//     MORE:"Goody Bags to the first 200 online entries.&lt;br&gt;Medals to the first 200 finishers.&lt;br&gt;Olive oil tasting and cellar tour @ R10.&lt;br&gt;Bonfires will be ready early the morning to warm you up!&lt;br&gt;Music, coffee, food and drinks available afterwards. &lt;br&gt;Bring the whole family and enjoy a beautiful morning in the Breede River Valley. For a map of the location, see www.olyfberg.co.za",
//     ENTERHERE:"https://www.entryninja.com/events/event/15001-olyfberg-summit-challenge"
//     }
//}
var socialLinks ={
    twitter : "http://www.twitter.com/AmoijaEvents",
    facebook : "http://www.facebook.com/AmoijaEvents",
    envelope: "mailto:herman@amoija.com"
}



