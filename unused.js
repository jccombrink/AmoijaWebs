//Paints DOM for each event sub-page. I.e. If the user clicks on a specific event
function paintEventsItem(item){
//    //Adding the event icon
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




//Temporary arrays holding databse information for now

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