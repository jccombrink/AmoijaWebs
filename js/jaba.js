var quill;
var eventInfo = {};
var raceInfo = {};
var summaryHTML;
var optionsList;
var race_id;
var event_id;
var raceEditor = $('<div class="row add-edit_races">\
                        <div class = "col-xs-2">\
                            <label for="race_event">Event:</label>\
                            <select type="text" class="form-control race_event">\
                            </select>\
                        </div>\
                        <div class = "col-xs-2">\
                            <label for="race_date">Date:</label>\
                            <input class="form-control race_date" type="text">\
                        </div>\
                        <div class = "col-xs-2">\
                            <label for="race_type">Type:</label>\
                            <input class="form-control race_type" type="text">\
                        </div>\
                        <div class = "col-xs-2">\
                            <label for="race_venue">Venue:</label>\
                            <input class="form-control race_venue" type="text">\
                        </div>\
                        <div class = "col-xs-4">\
                            <label for="race_entry">Entry Link:</label>\
                            <input class="form-control race_entry" type="text">\
                        </div>\
                       <button class="btn btn-primary active submit_race" type="button">Save Race</button>\
                    </div>');
$(document).ready(function() {
    $('#nav_summary').addClass('active');
    get_events();
    get_races();
//    quill = new Quill('#event_abstract', {
//        modules: {
//            toolbar: [
//                [{ header: [1, 2, false] }],
//                ['bold', 'italic', 'underline'],
//                ['image', 'code-block']
//            ]
//        },
//        placeholder: 'Type it up...',
//        theme: 'snow'
//    });
    $(".btn").mouseup(function(){
        $(this).blur();
    })
    $(document).on('click','.submit_race', function (e) {
        $("#theDimMaker").addClass("active");
        var event_id = $(e.currentTarget).parent().parent().data('id');
        var date = $(".add-edit_races .race_date").val();
        var type = $(".add-edit_races .race_type").val();
        var venue = $(".add-edit_races .race_venue").val();
        var entrylink = $(".add-edit_races .race_entry").val();

        //TODO: Validation

        if( date && type && venue && entrylink){
            $.post("submit_race.php", {
                id: race_id,
                event_id: event_id,
                date: date,
                type: type,
                venue: venue,
                entrylink: entrylink,
                }, 
                function(data) {
                $("#theDimMaker").removeClass("active");
                    if(data.status == "success"){
                        get_races();
                        $(".alert-success *:not('a')").remove();
                        $('.alert-success').append("<strong>Success.</strong><span> Race has been added.</span><br/>");
                        $('.alert-success').show();

                        $(".race_event").val('');
                        $(".race_date").val('');
                        $(".race_type").val('');
                        $(".race_venue").val('');
                        $(".race_entry").val('');

                        $("#nav_summary").click();
                    }
                    else{
                        $(".alert-danger *:not('a')").remove();
                        $('.alert-danger').append("<strong>There was an error.</strong><br/>");
                        $.each(data.messages,function(key,value){
                            $('.alert-danger').append("<span>"+value+"</span><br/>");
                        });
                        $('.alert-danger').show();
                    }
                }, "json");
        }
        else{
            $(".alert-danger *:not('a')").remove();
            $('.alert-danger').append("<strong>Eish...</strong><span> Not everything has been filled in.</span><br/>");
            $('.alert-danger').show();
        }
    });
    $(document).on('click','.race_adder', function (e) {
        race_id = undefined;
        raceEditor.insertAfter($(e.currentTarget)).show();
        let ev_name = $(e.currentTarget).data('event_name');
        $(".add-edit_races .race_event").val(ev_name);
        $(".add-edit_races .race_date").val('');
        $(".add-edit_races .race_type").val('');
        $(".add-edit_races .race_venue").val('');
        $(".add-edit_races .race_entry").val('');
    });
    $(document).on('click','.event_edit', function (e) {
        event_id = $(e.currentTarget).data('id');
        let event = eventInfo[event_id];
        $("#event_name").val(event.NAME);
        $("#event_type").val(event.TYPE);
        $("#event_abstract").html(event.ABSTRACT);
        $("#event_date").val(event.DATE);
        $("#event_route").html(event.ROUTE);
        $("#event_distances").html(event.DISTANCE);
        $("#event_starting").html(event.STARTING);
        $("#event_entries").html(event.ENTRIES);
        $("#event_registration").html(event.REGISTRATION);
        $("#event_categories").val(event.CATEGORIES);
        $("#event_more").html(event.MORE);
        $("#submit_event").data('id', event_id);
        $('#admin-Content > div:not(".navBar_admin")').hide();
        $('#add-edit_events').show();
    });
    $(document).on('click','.event_delete', function (e) {
        event_id = $(e.currentTarget).data('id');
        $('.event-alert').show();
    });
    $(document).on('click','.race_edit', function (e) {
        raceEditor.insertAfter($(e.currentTarget).parent()).show();
        let id = $(e.currentTarget).data('id');
        race_id = id;
        let race = raceInfo[id];
        let ev_name = eventInfo[race.event_id].NAME;
        $(".add-edit_races .race_event").val(ev_name);
        $(".add-edit_races .race_date").val(race.date);
        $(".add-edit_races .race_type").val(race.type);
        $(".add-edit_races .race_venue").val(race.venue);
        $(".add-edit_races .race_entry").val(race.entrylink);
    });
    $(document).on('click','.race_delete', function (e) {
        race_id = raceInfo[$(e.currentTarget).data('id')].id;
        $('.race-alert').show();
    });
    $(document).on('click','.event i', function (e) {
        var collapsed = $(e.currentTarget).parent().data("collapsed");
        $('.add-edit_races').detach();
        var event = $(e.currentTarget).parent().data("name");
        collapsed == true ? (() => {$('div[data-event_name="'+event+'"].race').show(); $(e.currentTarget).parent().data("collapsed", false); $(e.currentTarget).removeClass('fa-plus').addClass('fa-minus');})() : (() => {$('div[data-event_name="'+event+'"].race').hide(); $(e.currentTarget).parent().data("collapsed", true); $(e.currentTarget).removeClass('fa-minus').addClass('fa-plus');})();
        $(".add-edit_races").hide();
    });
});


$(".navItem").click(function(e){
    var clicked = $(e.currentTarget)[0].id;
    switch (clicked){
        case 'nav_summary':
            $('#admin-Content > div:not(".navBar_admin")').hide();
            $('#summary').show();
            break;
        case 'nav_event':
            $('#admin-Content > div:not(".navBar_admin")').hide();
            $('#add-edit_events').show();
            event_id = undefined;
            $("#add-edit_events .editDiv").html('');
            $("#add-edit_events input").val('');
            break;
        case 'nav_race':
            $('#admin-Content > div:not(".navBar_admin")').hide();
            $(".add-edit_races").show();
            break;
    }
});

function pop_summary(){
    summaryHTML = $('<div></div>');
    raceEditor.find('.race_event option').remove();
    $('#summary').empty();
    $.each(eventInfo, function (key, value){
        let eventId = key;
        let eventName = value['NAME'];
        raceEditor.find('.race_event').append($('<option>'+value['NAME']+'</option>'));
        let eventDiv = $('<div data-id="'+key+'"></div>');
        eventDiv.append($('<div class="event" data-name="'+eventName+'" data-collapsed="true"> <i class="fa fa-plus fa-1x"></i>'+eventName+'<span class="event_delete" data-id="'+key+'" style="display: none"><button class="btn active type="button">DELETE</button></span><span class="event_edit" data-id="'+key+'" style="display: none"><button class="btn active type="button">EDIT</button></span></div>'));
        $.each(raceInfo, function (key, value) {
            value['event_id'] === eventId ? eventDiv.append($('<div class="race" style="display:none" data-event_name="'+eventName+'">&bull;<span >'+value['date']+'</span><span>'+value['type']+'</span><span class="race_delete" data-id="'+key+'" style="display: none"><button class="btn active type="button">DELETE</button></span><span class="race_edit" data-id="'+key+'" style="display: none"><button class="btn active type="button">EDIT</button></span></div>')) : (() =>{});
        });
        eventDiv.append($('<div class="race race_adder" style="display:none" data-event_name="'+eventName+'">ADD NEW RACE TO THIS EVENT</div>'));
        summaryHTML.append(eventDiv);
    });
    $('#summary').append(summaryHTML);
}

function get_events(){
    $.post("events.php", {}, function(data) {
        eventInfo = data;
        if(!$.isEmptyObject(raceInfo)){
            pop_summary();
        }
    }, "json");
}
function get_races(){
    $.post("races.php", {}, function(data) {
        raceInfo = data;
        if(!$.isEmptyObject(eventInfo)){
            pop_summary();
        }
    }, "json");
}

function format_input(id){
    return document.getElementById(id).innerText.replace(/(?:\r\n|\r|\n)/g, '<br>');
}

$("#submit_event").click(function(e) {
    $("#theDimMaker").addClass("active");
    var id = event_id;
    var name = $("#event_name").val();
    var type = $("#event_type").val();
    var abstract = format_input("event_abstract");
    var dates = $("#event_date").val();
    var route = format_input("event_route");
    var distances = format_input("event_distances");
    var starting = format_input("event_starting");
    var entries = format_input("event_entries");
    var registration = format_input("event_registration");
    var categories = $("#event_categories").val();
    var more = format_input("event_more");
    
    //TODO: Validation
    
    if(name && type && abstract && dates && route && distances && starting && entries && registration && categories && more){
        $.post("submit_event.php", {
            id: id,
            name: name,
            type: type,
            abstract: abstract,
            dates: dates,
            route: route,
            distances: distances,
            starting: starting,
            entries: entries,
            registration: registration,
            categories: categories,
            more: more,
            }, 
            function(data) {
                $("#theDimMaker").removeClass("active");
                if(data.status == "success"){
                    get_events();
                    $(".alert-success *:not('a')").remove();
                    $('.alert-success').append("<strong>Success.</strong><span> Event has been added.</span><br/>");
                    $('.alert-success').show();

                    $("#add-edit_events .editDiv").html('');
                    $("#add-edit_events input").val('');
                    $("#nav_summary").click();
                }
                else{
                    $(".alert-danger *:not('a')").remove();
                    $('.alert-danger').append("<strong>There was an error.</strong><br/>");
                    $.each(data.messages,function(key,value){
                        $('.alert-danger').append("<span>"+value+"</span><br/>");
                    });
                    $('.alert-danger').show();
                }
            }, "json");
    }
    else{
        $(".alert-danger *:not('a')").remove();
        $('.alert-danger').append("<strong>Eish...</strong><span> Not everything has been filled in.</span><br/>");
        $('.alert-danger').show();
    }
});



$('.race-alert .delete').click(function () {
    $("#theDimMaker").addClass("active");
    $('.alert').hide();
    $.post("delete_race.php", {
        id: race_id,
        }, 
        function(data) {
        $("#theDimMaker").removeClass("active");
            if(data.status == "success"){
                get_races();
                $(".alert-success *:not('a')").remove();
                $('.alert-success').append("<strong>Success.</strong><span> Race has been deleted.</span><br/>");
                $('.alert-success').show();
            }
            else{
                $(".alert-danger *:not('a')").remove();
                $('.alert-danger').append("<strong>There was an error.</strong><br/>");
                $.each(data.messages,function(key,value){
                    $('.alert-danger').append("<span>"+value+"</span><br/>");
                });
                $('.alert-danger').show();
            }
        }, "json");
});

$('.event-alert .delete').click(function () {
    $("#theDimMaker").addClass("active");
    $('.alert').hide();
    $.post("delete_event.php", {
        id: event_id,
        }, 
        function(data) {
        $("#theDimMaker").removeClass("active");
            if(data.status == "success"){
                eventInfo = {};
                raceInfo = {};
                get_races();
                get_events();
                $(".alert-success *:not('a')").remove();
                $('.alert-success').append("<strong>Success.</strong><span> Event has been deleted.</span><br/>");
                $('.alert-success').show();
            }
            else{
                $(".alert-danger *:not('a')").remove();
                $('.alert-danger').append("<strong>There was an error.</strong><br/>");
                $.each(data.messages,function(key,value){
                    $('.alert-danger').append("<span>"+value+"</span><br/>");
                });
                $('.alert-danger').show();
            }
        }, "json");
});

$('.close,.cancel').click( function () {
    $('.alert').hide();
});
