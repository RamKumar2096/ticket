function loginUserInfo(valueS){
    'use strict';
    
    var module = {
        options: [],
        header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
        dataos: [
            { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
            { name: 'Windows', value: 'Win', version: 'NT' },
            { name: 'iPhone', value: 'iPhone', version: 'OS' },
            { name: 'iPad', value: 'iPad', version: 'OS' },
            { name: 'Kindle', value: 'Silk', version: 'Silk' },
            { name: 'Android', value: 'Android', version: 'Android' },
            { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
            { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
            { name: 'Macintosh', value: 'Mac', version: 'OS X' },
            { name: 'Linux', value: 'Linux', version: 'rv' },
            { name: 'Palm', value: 'Palm', version: 'PalmOS' }
        ],
        databrowser: [
            { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
            { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
            { name: 'Safari', value: 'Safari', version: 'Version' },
            { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
            { name: 'Opera', value: 'Opera', version: 'Opera' },
            { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
            { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
        ],
        init: function () {
            var agent = this.header.join(' '),
                os = this.matchItem(agent, this.dataos),
                browser = this.matchItem(agent, this.databrowser);
            
            return { os: os, browser: browser };
        },
        matchItem: function (string, data) {
            var i = 0,
                j = 0,
                html = '',
                regex,
                regexv,
                match,
                matches,
                version;
            
            for (i = 0; i < data.length; i += 1) {
                regex = new RegExp(data[i].value, 'i');
                match = regex.test(string);
                if (match) {
                    regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
                    matches = string.match(regexv);
                    version = '';
                    if (matches) { if (matches[1]) { matches = matches[1]; } }
                    if (matches) {
                        matches = matches.split(/[._]+/);
                        for (j = 0; j < matches.length; j += 1) {
                            if (j === 0) {
                                version += matches[j] + '.';
                            } else {
                                version += matches[j];
                            }
                        }
                    } else {
                        version = '0';
                    }
                    return {
                        name: data[i].name,
                        version: parseFloat(version)
                    };
                }
            }
            return { name: 'unknown', version: 0 };
        }
    };
    
    var e = module.init();

    $.getJSON("https://api.ipify.org?format=json", function(data) {
        const de = {username:valueS.name,system:e,func:"loginUser",date:new Date().toDateString()+" - "+ new Date().toTimeString(),ip:data.ip};
    fetch('https://script.google.com/macros/s/AKfycbx5sJ4xzRxk7c0kmo_mFJosMtiKO0xHvREFTgXOhNEiPZJ6kPn_HC-78NJyV3WGwJ37BQ/exec', {
        method: 'post',
        body:JSON.stringify(de)
    }).then((responsedata)=>{
       responsedata.json((result)=>{
         console.log(result)
       })
   })
    })
    
}












var logUserDatas;
var task_entry_point = null;
var current_software = 'home';
var click_notify;
var notification_data_ar = [];



var task_pending_tab_status_ls = [];
var preloader_tab_type_ls = [];
var view_tab_type_ls = [];
var manage_tab_type_ls = [];
var managing_tab_type_ls = [];
var approval_tab_type_ls = [];
var preloader_obj = {}


var log_no_record = `<div class="no_record_img mt-5"><div><img src="/vendors/images/log_no_record.svg" alt=""></div><div>No Record</div></div>`;
var no_record = `<div class="no_record_img mt-5"><div><img src="/vendors/images/no_data.svg" alt=""></div><div>No Record</div></div>`;
var fetch_loader = ` <div class="d-flex align-items-center justify-content-center  fetching_loader" style="height:400px"><div class="dashBB_loader"></div></div>`
var loacalTemplate_chatLoader = '<div class="w-100 h-100 d-flex align-items-center justify-content-center no_chat_template p-4">' + '<div class="w-50 h-50 text-center">' + ' <div><img src="https://drive.google.com/uc?export=view&id=10hd-GQbTgi1T06vvGF5_SGuSs_pqYLva" alt="" width="50%" height="50%"></div>' + '<div class="no_chat_text my-2"><div class="chat_prograss_bar"></div></div>' + '</div>' + '</div>';
var button_loader = '<div class="spinner-border text-light" role="status" style="width:20px;height:20px;"><span class="visually-hidden">Loading...</span></div>'
function fetch_loader_show(id){
 $(id).html(fetch_loader)
}


async function browser_notification(localmessage){
  console.log("ape",localmessage)
    let granted = false;

    if (Notification.permission === 'granted') {
        granted = true;
    } else if (Notification.permission !== 'denied') {
        let permission = await Notification.requestPermission();
        granted = permission === 'granted' ? true : false;
    }

    if(granted){
 // create a new notification
        const notification = new Notification('Sidharthhousing-webapp', {
            body: localmessage.notification_info,
            icon: '../vendors/images/Sidharth-Logo-Final.png',
            vibrate: true
        });

        // close the notification after 10 seconds
        setTimeout(() => {
            notification.close();
        }, 10 * 1000);


  }
 
}



checkForCookie('key');
function checkForCookie(name) {
    let cookieString = document.cookie.match(name + '=[^;]+')
    const cookie = cookieString ? cookieString[0] : cookieString;
    if (cookie) {
        const splitToken = cookie.split("=")[1];
        const values = splitToken.split(',');
        getUserLog(values[0]).then((result) => {
            if (result.status == true) {
                const log_user = result.data[0].data();
                logUserDatas = log_user;
                notificationlive(logUserDatas.emp_name);
                //  loginUserInfo({name:logUserDatas.emp_name})
                assign_user_details()
                dashboard_count_setter();

            } else {
                window.open("/index.html", "_top")
            }
        })
    } else {
        console.log(cookie, 'a')
    }
}


function dashboard_count_setter() {
    const dashBoard = dashBoardTask(logUserDatas.emp_name);
    dashBoard.then((d) => {
        if (d.status != false) {
            header_overview_box_count(d.data);
            dashboard_render(d.data);
        }
    })

}



function assign_user_details() {
    $(".user-name").text(logUserDatas.emp_name)
    showDeparment()
}
function showDeparment(){
    const allowBar = {admin:["task","ticket","log"],marketing:['leads']}
    const software = logUserDatas.software;
    const departments = Object.keys(allowBar);
    const store_df =[]
    departments.forEach((dept)=>{
        const currentDepart = allowBar[dept];
        currentDepart.forEach((fD)=>{
            const dE = software.indexOf(fD);
            if(dE != -1){
               $(`.${dept}_tab_dropdown`).css("display","block")
               store_df.push(fD)
            }
        })
    })

    console.log(store_df)
    store_df.forEach((dD)=>{
        $(`.deparment_based_down[data-render=${dD}]`).parent().css("display","block")
    })

}


function scroll_down(scroll) {
    $(scroll).stop().animate({
        scrollTop: $(scroll)[0].scrollHeight
    }, 1000);
}

// loader functions
function showLoader() {
    $(".loadingPage").css("display", "block")
    $("body,html").css("overflow", 'hidden')
}

function hideLoader() {
    $(".loadingPage").css("display", "none")
    $("body,html").css("overflow-y", 'auto')
}

function checkPreDate(e) {
    var q = new Date();
    var date = new Date(q.getFullYear(), q.getMonth(), q.getDate());
    var mydate = new Date($(e).val());
    if (date > mydate) {
        alertify.alert("Message!", "You have selected previous date.....");
        $(e).val("")
    }
}

function header_overview_box_count(count_obj) {
    const count_value = Object.keys(count_obj);
    if (count_value.length > 0) {
        count_value.forEach((keyV) => {
            $(`.task_${keyV}_count`).text(count_obj[keyV].length)
        })
    }
}







function addNotify_func(notify, ad_value) {
    console.log("notiy", notify)
    let sent_tab;
    if (ad_value.tabs != "auto") {
        sent_tab = ad_value.tabs
    } else {
        sent_tab = logUserDatas.emp_name == notify.user_name ? "Managing" : "Pending"
    }

    let receiver;
    if (ad_value.receiver != "") {
        receiver = ad_value.receiver
    } else {
        receiver = logUserDatas.emp_name == notify.user_name ? logUserDatas.manager : logUserDatas.emp_name
    }

    console.log("uloa", logUserDatas)
    const notification_obj = {
        action: ad_value.action,
        sender: logUserDatas.emp_name,
        receiver,
        software: ad_value.software,
        tab: sent_tab,
        token: notify.token,
        click: ad_value.click,
        message: ad_value.message,
        card_user: notify.user_name
    }
    console.log(notification_obj, "sdfasdf")
    console.log(notify, "sdfasdf")
    notificationalert(notification_obj)
}







function notification_ui(notification) {
    const notification_tag = `<li class="notification_tag" data-notification-token="${notification.doc_id}" onclick="click_notifications_tag(this)">
                                    <a href="javascript:;"> 
                                            <h3>${notification.software_name}</h3>
                                        <p>
                                            ${notification.notification_info}
                                        </p>
                                    </a>
                             </li>`;
    return notification_tag;
}



function append_notification(notification) {
    if ($('.no_nofity')) {
        $('.no_nofity').remove()
    }
    // browser_notification(notification)
    const notification_tag = notification_ui(notification);
    $("#notifications_container_list").append(notification_tag);
    notification_data_ar.push(notification);
    find_notification_card(notification)
    notification_bell_count();
}


function find_notification_card(notify_card){
    const tab = notify_card.moveto_tab.toLowerCase();
    const token = notify_card.doc_id;
    const modify = $(`[data-modify=${token}]`);
    const chat = $(`[data-chat-token=${token}]`);
    console.log(chat,modify)
     if(notify_card.icon == 'Chat'){
       $(chat).children('.red_dt_cls').removeClass('d-none')
      }else{
        $(modify).children('.red_dt_cls').removeClass('d-none')
      }
  }

function notification_readed(id) {
    $(`.notification_tag[data-notification-token=${id}]`).remove();
    $(".notification-active").addClass('d-none')

}

function notification_empty() {
    $("#notifications_container_list").html('<h3 class="no_nofity font-12 text-center">No Notifications...</h3>')
}

function notification_bell_count() {
    if (notification_data_ar.length == 0) {
        $(".notification-active").addClass('d-none')
    } else {
        $(".notification-active").removeClass('d-none')
        $(".notification-active").text(notification_data_ar.length)
    }
}


$('.bell_icon_container').click(function () {
    const badge = $(".notification-active")
    if (!$(badge).hasClass('d-none')) {
        $(badge).addClass('d-none')
    }
})


function click_notifications_tag(e) {
    const notificaionToken = $(e).attr('data-notification-token');
    console.log(notification_data_ar,"ddS")
    const find_notifications = notification_data_ar.filter((nofify) => { return nofify.doc_id == notificaionToken });
    console.log(notification_data_ar,"dddS")
    $(e).addClass("d-none");
    if (find_notifications.length > 0) {
        const get_obj = find_notifications[find_notifications.length - 1];
        click_notify = get_obj;
        read_update_notification(get_obj.doc_id);
        if(get_obj.notification_type == "Click"){
            notification_move_software(get_obj)
        }else{
            alertify.success('It cannot be redirected..!');
        }
        notification_data_ar = notification_data_ar.filter((nofify) => { return nofify.doc_id != notificaionToken });
    } else {
        notification_bell_count()
        alertify.error('Sorry! this message already readed');
    }
}


function notification_move_software(notificaion_keys){
    const notify_data = notificaion_keys;
    const tab = notify_data.moveto_tab.toLowerCase();
    const sotfware = notify_data.software_name.toLowerCase();
    task_entry_point = {tab,notification:true,notification_data:notify_data};
    console.log(current_software)
  if(current_software == notify_data.software_name.toLowerCase()){
    auto_move_tab("");
  }else{
    get_template(sotfware);
  }
console.log(notificaion_keys,"keysss")
}


function read_update_notification(id) {
    readNotification(logUserDatas.emp_name, id);
}




function dashboard_render(chart_data) {
    $("#task_chart_tag").empty()
    $("#ticket_chart_tag").empty()
    google.charts.load('current', { 'packages': ['bar'] });
    google.charts.setOnLoadCallback(drawStuff);
    google.charts.setOnLoadCallback(drawStuffs);
    function drawStuff() {
        var data = new google.visualization.arrayToDataTable([
            ['Task', 'Counts'],
            ["Pending", chart_data['pending'].length],
            ["Scheduling", chart_data['scheduling'].length],
            ["Completed", chart_data['completed'].length],
            ["Awaiting Approval", chart_data['awaiting_approval'].length]
        ]);

        var options = {
            width: 400,
            height: 400,
            legend: { position: 'none' },
            chart: {
                title: 'Task Overview',
            },
            axes: {
                x: {
                    0: { side: 'top', label: 'Task type of cards' } // Top x-axis.
                }
            },
            bar: { groupWidth: "10%" }
        };


        var task = new google.charts.Bar(document.getElementById('task_chart_tag'));
        // Convert the Classic options to Material options.
        task.draw(data, google.charts.Bar.convertOptions(options));
        
    };
    function drawStuffs(){
        var data = new google.visualization.arrayToDataTable([
            ['Ticket', 'Counts'],
            ["Pending", chart_data['pending'].length],
            ["Scheduling", chart_data['scheduling'].length],
            ["Completed", chart_data['completed'].length],
            ["Awaiting Approval", chart_data['awaiting_approval'].length]
        ]);
        var options = {
            width: 400,
            height: 400,
            legend: { position: 'none' },
            chart: {
                title: 'Ticket Overview',
            },
            axes: {
                x: {
                    0: { side: 'top', label: 'Ticket type of cards' } // Top x-axis.
                }
            },
            bar: { groupWidth: "10%" }
        };
        var ticket = new google.charts.Bar(document.getElementById('ticket_chart_tag'));
        // Convert the Classic options to Material options.
        ticket.draw(data, google.charts.Bar.convertOptions(options));
    }
}

function unsubcribe_onsnap(){
    const snap_unsub = Object.keys(onsnap_store_obj);
    if(snap_unsub.length != 0){
        snap_unsub.forEach((unsub)=>{
           onsnap_store_obj[unsub]();
        })
    }
}

function get_template(software) {
    const verifie = logUserDatas.software.findIndex(ar=>{return ar == software})
    if(verifie != -1){
        showLoader();
        unsubcribe_onsnap()
        $.get(`/component/${software}-template.html`, function (data) {
            current_software  = software;
            $('.main-container').html(data);
            if (software == 'task') {
                taskFunctions();
                task_snap_funtions(logUserDatas.emp_name);
                taskPreloader(logUserDatas.emp_name).then((preloder_card)=>{
                    if(preloder_card.status == false){
                     makePreloaderCard([])
                    }else{
                        console.log(preloder_card,'pre')
                        makePreloaderCard(preloder_card.data,false)
                    }
                })
                let sub_ar = logUserDatas.subordinates_details.ad;
                console.log(sub_ar)
                if (sub_ar.length != 0) {
                    sub_ar = sub_ar.map((sub) => { return sub.subname })
                    approvalCard({sub_name:sub_ar}).then((aprD)=>{
                        if(aprD.status == false){
                           makeApprovalCard([],"",false)
                        }else{
                            makeApprovalCard(aprD.data,"",true)
                        }
                        console.log(aprD,"apprf")
                    })
                }
                auto_move_tab("");
    
            } else if (software == 'home') {
                dashboard_count_setter()
            }else if(software == 'profile'){
                profile_set()
            }else if(software == 'leads'){
             
                    leadsFunctions()
                    auto_move_tab_leads("dashboard")
                    tele_report_dash(logUserDatas.emp_name)
                    callDashboardCount(logUserDatas.emp_name)
                    lead_onsnap(logUserDatas.emp_name);
                    sitevisitCard(logUserDatas.emp_name).then((sitE)=>{
                        if(sitE.status == true){
                            makeLeadSitevisitCard(sitE.data,false,false)
                        }
                    })
                
               
            }else if(software == "log"){
                logFunctions()
            }else if(software == 'ticket'){
                obj={status: `Scheduling`}
                // cardCreatorStatusCheck(obj,logUserDatas.emp_name).then((ti_e)=>{
                //     console.log(ti_e)
                //     ti_e.forEach(d=>{
                //         console.log(d)
                //        const card= make_Ticket_Card(d)
                //        $("#raised_card_list_container").append(card);
                //     })
                    
                // })
            }
            hideLoader()
        })
    }else{
        alertify.error("Not Allowed!")
    }
    
}



$('.select_software_tag').click(function () {
    $('.left-side-bar').removeClass('open');
    $('.mobile-menu-overlay').removeClass('show');
    const sotfware = $(this).attr('data-render');
    get_template(sotfware)
    $('.select_software_tag').removeClass('active')
    if($(this).hasClass('side_link_tag')){
         $('.side_link_tag').removeClass('active')
        $(this).addClass('active')
    }
})

function move_to_task(){
    get_template('task')
}


//profile funtions;

function profile_set(){
    const de = logUserDatas;
    console.log(de)
    $(".emp_name").text(de.emp_name)
    $(".emp_designation").text(de.designation)
    $(".emp_code").text(de.emp_code)
    $(".emp_manager").text(de.manager)
    $(".emp_department").text(de.department)
    $(".emp_mail").text(de.mail_id)
    $(".emp_password").val(de.password)
    
}

function profile_edit(e){
    console.log(e)
    const eE = $(e).text();
    const passE = $(".emp_password");
    if(eE == 'Edit'){
      $(e).text("Cancel")
      $(e).next().prop("disabled",false)
      $(passE).prop("disabled",false)
    }else{
        $(e).text("Edit")
        $(e).next().prop("disabled",true)
        $(passE).prop("disabled",true)
    }
    
}


function change_profile(e){
    const passE = $(".emp_password").val();
    const user = logUserDatas;
    if(passE.length > 4){
        $(e).html('<div class="spinner-border text-light" role="status" style="width:20px;height:20px;"><span class="visually-hidden">Loading...</span></div>')
        changeProfile(user.emp_name,passE).then((userUpdate)=>{
            $(e).html("Save")
            $(e).prop("disabled",true);
            $(".emp_password").prop("disabled",true);
            $(e).prev().html("Edit")
            logUserDatas = userUpdate;
            profile_set()
            alertify.alert("Message!","Profile Update Successfully....");
        })
    }else{
        alertify.alert("Message!","Password length Minimum  5 letter")
    }
    
}

// TASK FUNCTIONS START HERE
function auto_move_tab(manual_move) {
    $('.tab_container_box .tab-pane').removeClass('show active')
    $('.tab_container_box_header .nav-item .nav-link').removeClass('active')

    if(manual_move != ""){
        $(`[href="#${manual_move}_bg_tab"]`).addClass("active");
        $(`#${manual_move}_bg_tab`).addClass('active show');
        // if (task_entry_point.notification == true) {
        //     console.log(task_entry_point.notification_data,'noffff')
        // }
    }else{
        if (task_entry_point == null) {
            $('[href="#pending_bg_tab"]').addClass("active");
            $("#pending_bg_tab").addClass('active show');
        } else {
            console.log(task_entry_point)
            $(`[href="#${task_entry_point.tab}_bg_tab"]`).addClass("active");
            $(`#${task_entry_point.tab}_bg_tab`).addClass('active show');
            if (task_entry_point.notification == true) {
                console.log(task_entry_point.notification_data,'noffff');
                if(task_entry_point.tab == 'managing'){
                    const managing_tab_filter = { fill_name:task_entry_point.notification_data.notification_send_by,fill_status:"All", sub_users: "" };
                    managing_main_filter(managing_tab_filter,task_entry_point);
                    $("#task_managing_name_sort").val(managing_tab_filter.fill_name);
                }else if(task_entry_point.tab == 'pending'){
                    const ve = task_entry_point
                    setTimeout(()=>{
                        const filter_by = {status:"All",user:logUserDatas.emp_name};
                        pending_main_filter(filter_by,ve,true)
                    },2000)
                    
                }else if(task_entry_point.tab == 'approval'){
                    const ve = task_entry_point
                   setTimeout(()=>{
                    const approval_tab_filter = { user: ve.notification_data.notification_send_by, user_name: logUserDatas.emp_name, sub_name:[]};
                    approval_main_filter(approval_tab_filter,ve,true,true)
                    $("#task_approval_name_sort").val(approval_tab_filter.user)
                   },2000)
                }
            }
        }
    }
    
    task_entry_point = null;
}






function taskFunctions() {
    task_pending_tab_status_ls = [],preloader_tab_type_ls = [],approval_tab_type_ls = [],manage_tab_type_ls = [],managing_tab_type_ls = [],view_tab_type_ls = []
    $(".head_buttons").click(add_task_click_assign)
    $("#add_task_confirm_btn").click(addNewTask)
    $(".chatValue").keyup(enterChatKey)
    selectInputs_value();
}


function add_task_click_assign() {
    let btnType = $(this).attr('data-modal')
    if (btnType == 'preloader')
        $(".preloader_sub_inputs").css("display", 'none');$("#preloaderChange_task_confirm_btn").addClass('d-none');$("#preloader_task_confirm_btn").removeClass('d-none')


    if (btnType == "add")
        $(".extra_close_btn").parent().remove();

    
    $(`#${btnType}_task_modal_form`)[0].reset();
    $(`#${btnType}_task_modal`).modal("show");
}






/* ----------------- add multiple task button fun start here ---------------- */

function extra_task() {
    let taskInfos = Array.from($(".new_task_info"))
    let taskLength = taskInfos.length;
    let extra_template = `<div class="page-header">
                                <div class="text-right extra_close_btn " onclick="remove_extra_task(this)"><i class="fa fa-close"></i></div>
                                <div class="form-group">
                                    <label>Task Info</label>
                                    <textarea class="form-control new_task_info " type="text" placeholder="Task Info......."  cols="30" rows="10"></textarea>
                                </div>
                                <div class="form-group">
                                    <label>Schedule Date</label>
                                    <input class="form-control new_task_date requirePreDate" type="date" onchange="checkPreDate(this)">
                                </div>
                            </div>`

    if (taskLength < 5) {
        $("#add_task_modal_form").append(extra_template)
        ex_cHide()
        $('#add_task_modal_form').stop().animate({
            scrollTop: $('#add_task_modal_form')[0].scrollHeight
        }, 100);

    } else {
        alertify.alert('Message!', 'Maximum 5 task can be added!');
    }


}
/* ----------------- add multiple task button fun end here ---------------- */


/* ------------------- remove multiple task fun start here ------------------ */
function remove_extra_task(e) {
    $(e).parent().removeClass("extra_task_add_ani")
    $(e).parent().addClass("extra_task_close_ani")
    $(e).parent().fadeOut("1000", function () {
        $(this).remove();
        ex_cHide()
    });
}
/* ------------------- remove multiple task fun end here ------------------ */




/* ---------------- add multiple add task sub fun start here ---------------- */
function ex_cHide() {
    $(".extra_close_btn").addClass('d-none');
    const ex_length = $(".extra_close_btn").length - 1;
    $(".extra_close_btn").eq(ex_length).removeClass('d-none');
}
/* ---------------- add multiple add task sub fun end here ---------------- */


/* --------------- preloader type sub selecter fun start here --------------- */
function preloaderTypeLoad(e) {
    const selectType = $(e).val()
    if (selectType == 'Daily')
        return $(".preloader_sub_inputs").css("display", 'none');


    $(".preloader_sub_inputs").css("display", 'none');
    $(`.${selectType.toLowerCase()
        }_container`).fadeIn()
}
/* --------------- preloader type sub selecter fun end here --------------- */



function addNewTask() {
    let taskInfos = Array.from($(".new_task_info"))
    let taskDates = Array.from($(".new_task_date"))
    let storeTT = []
    let taskLength = taskInfos.length;
    let valid = true
    for (let i = 0; i < taskLength; i++) {
        if ($(taskInfos[i]).val().trim() == "") {
            alertify.alert("Message!", "Please enter task info....")
            valid = false
            $(taskInfos[i])[0].focus()
        } else if ($(taskDates[i]).val() == "") {
            alertify.alert("Message!", "Please select date....")
            $(taskDates[i])[0].focus()
            valid = false
        } else {
            storeTT.push([
                $(taskInfos[i]).val(),
                $(taskDates[i]).val()
            ])
        }
    }

    if (valid == true) {
        showLoader()
        console.log(storeTT)
        $("#add_task_modal").modal("hide")
        const ex_ma = { manager: logUserDatas.manager, user: logUserDatas.emp_name }
        addtask(storeTT, ex_ma).then((r) => {
            console.log("ne", r)
            scroll_down("#pending_card_list_container")
            alertify.success('New task added successfully');
        })
        hideLoader()
    }

}


/* ----------------------- task assign fun start here ----------------------- */
function assignTask() {
    let info = $("#assign_task_info").val();
    let mbName = $("#assing_mmb_value").val();
    if (!info.trim()) {
        alertify.alert("Message!", "Please enter info....")
        return
    } else if (!mbName) {
        alertify.alert("Message!", "Please select name....")
        return
    } else {
        showLoader()
        $("#assign_task_modal").modal("hide")
        assignNewTask(info, mbName, logUserDatas.emp_name).then((ass_task) => {
            console.log(ass_task, "sdfasdf")
            const sub_notify_value = {
                tabs: "auto",
                software: "TASK",
                action: "Assign Task",
                message: 'Task has been assigned by ' + logUserDatas.emp_name,
                click: "Click",
                receiver: ass_task.data.user_name
            }

            addNotify_func(ass_task.data, sub_notify_value)
            auto_move_tab('managing')
            const managing_tab_filter = {fill_name:mbName,fill_status:"Scheduling", sub_users:"" };
            setTimeout(()=>{
                const select_card =  $(`[data-card-container-managing=${ass_task.data.token}]`);
                moving_card("#managing_card_list_container",select_card);
            },2000)
            $("#task_managing_name_sort").val(mbName)
            $("#task_managing_status_sort").val("Scheduling")
              managing_main_filter(managing_tab_filter,false)
             
            alertify.success(' Task assigned successfully');
        })
        hideLoader()
    }
}
/* ----------------------- task assign fun end here ----------------------- */


/* ---------------------- task preloader form fun start here --------------------- */
function preloaderTask() {
    const selecttype = $("#preloader_type_value").val();
    const infoe = $("#preloader_info_value").val();
    if (!infoe.trim())
        return alertify.alert("Message!", "Please enter task info....");
    console.log(selecttype, infoe)

    const preloaderObjec = {
        type: selecttype,
        info: infoe,
        user: logUserDatas.emp_name
    }
    if (selecttype == 'Weekly') {
        const t1 = $("#preloader_type_weekly").val();
        preloaderObjec.weeklyDay = t1;
        addPreloadertask(preloaderObjec)
    } else if (selecttype == 'Monthly') {
        const m1 = $("#preloader_type_monthly_month").val();
        const m2 = $("#preloader_type_monthly_date").val();
        if (!m2)
            return alertify.alert("Message!", "Please enter date....");


        preloaderObjec.month = m1
        preloaderObjec.date = m2
        addPreloadertask(preloaderObjec)
    } else if (selecttype == 'Yearly') {
        const date = $("#preloader_type_yearly").val();
        if (!date)
            return alertify.alert("Message!", "Please Select Date....");


        preloaderObjec.yeardate = date;
        addPreloadertask(preloaderObjec)
    } else if (selecttype == 'Daily') {
        addPreloadertask(preloaderObjec)
    }

}




/* ---------------------- task preloader fun start here --------------------- */
function addPreloadertask(obj) {
    showLoader()
    $("#preloader_task_modal").modal("hide")
    addPreLoad(obj,logUserDatas).then((preloadEs)=>{
        if(preloadEs.status == false) return alertify.alert("Message!",preloadEs.message);
        makePreloaderCard([preloadEs.data],false)
        scroll_down("#preloader_card_list_container")
        alertify.success('Preloader task added successfully');
    })
    hideLoader()
}
/* ---------------------- task preloader fun end here --------------------- */






/* ----------- select and inputs assign value functions start here ---------- */
function selectInputs_value() {
    const sub_ar = logUserDatas.subordinates_details.ad;
    const allsub_ar = logUserDatas.allsubordinates.as;
    console.log(allsub_ar)
    if (sub_ar.length == 0) {
        $('.admin_c_tab').addClass("d-none")
     } else {
         $('.admin_c_tab').removeClass("d-none")
        let sub_option
        let sub_option_all = '<option value="All" selected>All</option>'
        sub_ar.forEach((sub) => {
            sub_option += `<option value="${sub.subname
                }">${sub.subname
                }</option>`;
            sub_option_all += `<option value="${sub.subname
                }">${sub.subname
                }</option>`;
        })
        $("#assing_mmb_value").append(sub_option)
        $("#task_managing_name_sort,#task_approval_name_sort").append(sub_option_all)

        let all_sub_a = '<option value="All" selected >All</option>';
        allsub_ar.forEach((alsub) => {
            all_sub_a += `<option value="${alsub}"  >${alsub}</option>`
        })
        $("#task_manage_name_sort").html(all_sub_a)

    }
}
/* ----------- select and inputs assign value functions end here ---------- */


var menu_card_objects = {}
function task_menu_icons(e){
    const select_append_tab = $(e).parent().parent().parent().parent().parent().next();
    console.log(select_append_tab,'see')
    if($(select_append_tab).children().eq(0).hasClass('options_cc_container')){
        $(select_append_tab).empty()
        $(e).children('i')[0].outerHTML = '<i class="dw dw-down-arrow-4"></i>'
    }else{
        refreshCard()
        $(e).children('i')[0].outerHTML = '<i class="dw dw-up-arrow"></i>'
        const loaderSp = `<div style="text-align: center;" class="my-2"><div class="spinner-border text-success" role="status"><span class="visually-hidden">Loading...</span></div></div>`
        const tab = $(e).attr('data-tab');
        const token = $(e).attr('data-modify');
        const card_user = $(e).attr('data-card-owner')
        const obj = { user_name:card_user,token}
        $(e).children('.red_dt_cls').addClass("d-none")
        console.log($(e).parent().parent())
        $(e).parent().parent().next().children('.red_dt_cls').addClass("d-none")
        $(select_append_tab).html(loaderSp);
        read_update_notification(token)
        console.log(notification_data_ar,'dddd')
        notification_data_ar = notification_data_ar.filter((notify)=>{return notify.doc_id != token});
        $(".notification-active").addClass('d-none')
        modifyIcon(obj).then((task_data)=>{
            if(task_data.status == true){
                const append_options_container = modify_make_container(task_data.data,tab);
                $(select_append_tab).html(append_options_container);
                menu_card_objects = task_data.data;
                const card =  $(e).parent().parent().parent().parent().parent().parent();
                const cardparent = $(e).parent().parent().parent().parent().parent().parent().parent();
                window.setTimeout(function(){
                    var a = card[0].offsetTop
                    $(cardparent).stop().animate({ scrollTop: a},10);
                  },100);
            }else{
                alertify.alert("!Message","Please Try Again....");
            }
        })




    }
  
    

}


// function set_pre_input_value(input_date){
//     $(".empty_valu_einput").val("")
    
//     const create_date  = new Date(input_date.created_on.toDate()).toISOString().split("T")[0];
//     $(".modify_task_info_input").val(input_date.task_description)
//     $(".modify_task_create_date_input").val(create_date)
//     $(".modify_task_manager_name_input").val(input_date.manager)
//     $(".modify_task_status_input").val(input_date.card_status)

//     if(input_date.card_status != "Scheduling"){
//         const schedule_date  = new Date(input_date.scheduled_On.toDate()).toISOString().split("T")[0];
//         console.log(schedule_date)
//         $(".modify_task_schedule_input").val(schedule_date)
//     }
//     if(input_date.card_status == "Awaiting Approval"){
       
//         const extend_date = new Date(input_date.extended_on[input_date.extended_on.length - 1].date.toDate()).toISOString().split("T")[0];
//         $('.extend_date_input').val(extend_date)
        
//     }

// }





/* -------------------------- modify icons funtions ------------------------- */

/* ------------ task modify edit icons event functions start here ----------- */
function editTask(e){
    const card_store_value = menu_card_objects;
    const editText = $("#modify_edit_input").val();
    console.log(card_store_value)
    if (card_store_value.task_description == editText) return alertify.alert("Messsage!", "Same Descriptions....!")
    if (editText.trim() == "")
        return alertify.alert("Message!", "Please enter task info")
    const edit_obj = { user: card_store_value.user_name, token: card_store_value.token, editText }

    $("#task_edit_modity_modal").modal("hide");
    $(e).html(button_loader)
    editTaskInfo(edit_obj).then((tass)=>{
        if(tass.status == true && card_store_value.card_type == "Assign"){
            console.log(tass)
            const wDcard = tass.data;
            const modify_make = makeTaskCard(wDcard,'managing');
            const find_tag = $(`.card_template_main[data-card-container-managing=${wDcard.token}]`);
            console.log(find_tag)
            if(find_tag){
                find_tag[0].outerHTML = modify_make;
            }
    }
    alertify.success('Info edited successfully');
    })


    let receiverE = ""
    if(card_store_value.card_type == 'Assign'){
        receiverE = card_store_value.user_name;
    }
    const sub_notify_value = {
        tabs: "auto",
        software: "TASK",
        action: "Edit Task",
        message: 'Task has been edited by ' + logUserDatas.emp_name,
        click: "Click",
        receiver: receiverE
    }
    addNotify_func(card_store_value, sub_notify_value)
    hideLoader()

}
/* ------------- task modifty edit icon event function end here ------------- */





/* ---------------- task modify schedule icon fun start here ---------------- */
function scheduleTask() {
    const card_store_value = menu_card_objects;
    const scheduleDate = $("#modify_task_schedule_input").val();
    if (scheduleDate == "")
        return alertify.alert("Message!", "Please select schedule date....!");
    const edit_obj = { user: card_store_value.user_name, token: card_store_value.token, schedule_date: new Date(scheduleDate) }
    const sub_notify_value = {
        tabs: "auto",
        software: "TASK",
        action: "Schedule Task",
        message: 'Task has been scheduled by ' + logUserDatas.emp_name,
        click: "Click",
        receiver: ""
    }
    addNotify_func(card_store_value, sub_notify_value)
    alertify.success('Task scheduled successfully');
    $("#task_schedule_modity_modal").modal("hide");
     showLoader()
    scheduleTask_backend(edit_obj)
     hideLoader()
}
/* --------------- task modify schedule icon function end here -------------- */


/* ------------------------- deleted task start here ------------------------ */
function deleteTask() {
    const card_store_value = menu_card_objects;
    const edit_obj = { user: card_store_value.user_name, token: card_store_value.token }
    let receiverE = ""
    if(card_store_value.card_type == 'Assign'){
        receiverE = card_store_value.user_name;
    }
    const sub_notify_value = {
        tabs: "auto",
        software: "TASK",
        action: "Delete Task",
        message: 'Task has been deleted by ' + logUserDatas.emp_name,
        click: "Non-Click",
        receiver:receiverE
    }
    addNotify_func(card_store_value, sub_notify_value)
    $("#task_delete_modity_modal").modal("hide");
   if(card_store_value.card_type == "Assign"){
        $(`.card_template_main[data-card-container-managing=${edit_obj.token}]`).remove();
    }
     showLoader()
     taskDelete(edit_obj)
     const addD = {...card_store_value,cre:card_store_value.created_on.toDate(),sch:card_store_value.scheduled_On.toDate()}
     deleteTaskappend({deleteData:addD,func:"deleteTask"})
     alertify.success('Task deleted successfully');
     hideLoader()
}


function deleteTaskappend(params){
    return fetch('https://script.google.com/macros/s/AKfycbx5sJ4xzRxk7c0kmo_mFJosMtiKO0xHvREFTgXOhNEiPZJ6kPn_HC-78NJyV3WGwJ37BQ/exec', {
         method: 'post',
         body:JSON.stringify(params)
     }).then((responsedata)=>{
        responsedata.json((result)=>{
          console.log(result)
        })
    })
 }

function deleted_task_all(data) {
    $(`.card_template_main[data-card-container-pending=${data.token}]`).remove();
    task_pending_tab_status_ls = task_pending_tab_status_ls.filter((eTask)=>{return eTask.token != data.token})
    const pard = Array.from($('#pending_card_list_container').children('.card_template_main'));
    if(pard.length == 0){
        $('#pending_card_list_container').html(no_record);
    }
    task_pending_tab_set_counts()
}
/* ------------------------- deleted task end here ------------------------ */


/* ---------------- task modify completed icon fun start here --------------- */
function completedTask() {
    const card_store_value = menu_card_objects;
    const edit_obj = { user: card_store_value.user_name, token: card_store_value.token, comD: card_store_value.completed_on }
    const sub_notify_value = {
        tabs: "auto",
        software: "TASK",
        action: "Completed Task",
        message: 'Task has been completed by ' + logUserDatas.emp_name,
        click: "Click",
        receiver: ""
    }
    addNotify_func(card_store_value, sub_notify_value)

    $("#task_completed_modity_modal").modal("hide");
     showLoader()
    completeTask(edit_obj).then((compTask) => { hideLoader()
        alertify.success('Task completed  successfully');
    })
   
   
}
/* ---------------- task modify completed icon fun end here --------------- */




/* ----------------- task modify restore icon fun start here ---------------- */

function restoreTask() {
    const card_store_value = menu_card_objects;
    const edit_obj = { user: card_store_value.user_name, token: card_store_value.token, comD: card_store_value.completed_on }
    $("#task_restore_modity_modal").modal("hide");
    const sub_notify_value = {
        tabs: "auto",
        software: "TASK",
        action: "Restore Task",
        message: 'Task has been Restore by ' + logUserDatas.emp_name,
        click: "Click",
        receiver: ""
    }
    showLoader()
    addNotify_func(card_store_value, sub_notify_value)
    restoreTask_backend(edit_obj).then((restore) => {
        if (restore.status == false) return alertify.alert("Message!", restore.message);
        alertify.success(restore.message);
    })
     hideLoader()
}







/* ----------------- task modify extend icon fun start here ----------------- */
function extendTask() {
    const card_store_value = menu_card_objects;
    const exDate = $("#modify_extend_date").val();
    if (exDate == "")
        return alertify.alert("Message!", "Please selecet extend date....!")
    const edit_obj = { user: card_store_value.user_name, token: card_store_value.token, ex_ar: card_store_value.extended_on, ex_date: new Date(exDate) }
    const sub_notify_value = {
        tabs: "Approval",
        software: "TASK",
        action: "Extends Task",
        message: 'Requesting for task extension from ' + logUserDatas.emp_name,
        click: "Click",
        receiver: ""
    }
    console.log(card_store_value, sub_notify_value, "df")
    addNotify_func(card_store_value, sub_notify_value)
    $("#task_extend_modity_modal").modal("hide");
     showLoader()
    extendTask_backend(edit_obj)
    alertify.success('Task extended successfully');
     hideLoader()
    console.log(exDate)
}

/* ----------------- task modify extend icon fun start here ----------------- */
function checkAppr_card(id) {
    const ce_ee = Array.from($(`#${id} .card_template_main`));
    if (ce_ee.length == 0) {
        $(`#${id}`).html(no_record)
    }
}

function approvalTask() {
    const appval_status1 = $("#approval1")[0].checked;
    const appval_status2 = $("#approval2")[0].checked;
    var approved;
    if(appval_status1 == true){
        approved = true
    }else{
        approved = false
    }
    const card_store_value = menu_card_objects;
    const edit_obj = { user: card_store_value.user_name, token: card_store_value.token, status: approved, ex_on_ar: card_store_value.extended_on }
    const sub_notify_value = {
        tabs: "auto",
        software: "TASK",
        action: "Approved Task",
        message: 'Task has been verified by ' + logUserDatas.emp_name,
        click: "Click",
        receiver: card_store_value.user_name
    }
    addNotify_func(card_store_value, sub_notify_value)
    approval_tab_type_ls = approval_tab_type_ls.filter((appr)=>{return appr.token != card_store_value.token})
    task_approval_tab_set_counts()
    $("#task_approval_modity_modal").modal("hide");
    showLoader()
    console.log(card_store_value, "dfsdf")
    $(`.card_template_main[data-card-container-approval=${card_store_value.token}]`).remove();
    checkAppr_card("approval_card_list_container")
    approvetask(edit_obj)
    hideLoader()
}





/* ----------------------- MODIFY FUNCTIONS END HERE ---------------------- */



/* ----------------- task modify upload icons fun start here ---------------- */
function uploadeTask(e) {
    const card_store_value = menu_card_objects;
    const uploadFile = $("#task_upload_input");
    const files = uploadFile[0].files;
    if (files.length == 0)
        return alertify.alert("Message!", "Please select file..!");

        console.log(files)
    const upload_data = { user: logUserDatas.emp_name, uploade_files: files, token: card_store_value.token };
    let receivarE = "";
    if(card_store_value.manager == logUserDatas.emp_name){
        receivarE = card_store_value.user_name;
    }
    const sub_notify_value = {
        tabs: "auto",
        software: "TASK",
        action: "Uploade Task",
        message: 'Task has been uploaded by ' + logUserDatas.emp_name,
        click: "Click",
        receiver: receivarE
    }
    $("#task_upload_modity_modal").modal('hide')
    showLoader()
    addNotify_func(card_store_value, sub_notify_value)
    $(e).html('<div class="spinner-border text-light" role="status" style="width:20px;height:20px;"><span class="visually-hidden">Loading...</span></div>')
    uploader(files, card_store_value).then((fs)=>{
      refreshCard()
        alertify.success("File uploaded successfully....")
    })
    hideLoader()
    console.log(upload_data)
}


function refreshCard(){
    $(".options_append_tab").empty()
    $(".menu_tag_class").children("i").removeClass("dw dw-up-arrow");
    $(".menu_tag_class").children("i").addClass("dw dw-down-arrow-4");
}

function getDownFile(){
    const card_store_value = menu_card_objects;
    const downloadFile = card_store_value.file_details;
        $(".download_append").empty()
        hideLoader()
        if(downloadFile.length == 0){
            $(".download_append").html(' <h5 class="text-center w-100">No Files</h5>')
        }else{
            downloadFile.forEach(async(down)=>{
                const downUrl  = await down.url
                console.log(down)
              let  downUI = `<div class="down_file text-center">
                <div class="down_file_icon">
                   <i class="icon-copy dw dw-file"></i>
                </div>
                <div class="down_file_name">
                   <a href="${downUrl}" download="${down.fileName}" target="_blank" > <samp>${down.fileName}</samp></a>
                </div>
            </div>`;
                console.log(down)
                $(".download_append").append(downUI)
            })
        }
     
}


/* ----------------- task modify upload icons fun end here ---------------- */
function preloaderTask_update() {
    const selecttype = $("#preloader_type_value").val();
    const infoe = $("#preloader_info_value").val();
    if (!infoe.trim()){
     alertify.alert("Message!", "Please enter task info....");
     return {status:false}
    }else{
        const preloaderObjec = {
            type: selecttype,
            info: infoe,
            user: logUserDatas.emp_name
        }
        if (selecttype == 'Weekly') {
            const t1 = $("#preloader_type_weekly").val();
            preloaderObjec.weeklyDay = t1;
            return {status:true,data:preloaderObjec}
        } else if (selecttype == 'Monthly') {
            const m1 = $("#preloader_type_monthly_month").val();
            const m2 = $("#preloader_type_monthly_date").val();
            if (!m2){
    
                 alertify.alert("Message!", "Please enter date....");
                 return {status:false}
            }else{
                preloaderObjec.month = m1
                preloaderObjec.date = m2
                return {status:true,data:preloaderObjec}
            }
    
    
            
        } else if (selecttype == 'Yearly') {
            const date = $("#preloader_type_yearly").val();
            if (!date){
                 alertify.alert("Message!", "Please Select Date....");
                 return {status:false}
            }else{
                preloaderObjec.yeardate = date;
                return {status:true,data:preloaderObjec}
            }
        } else if (selecttype == 'Daily') {
            return {status:true,data:preloaderObjec}
        }
    }


    

}
function preloaderTaskEdit(){
   const getDt = preloaderTask_update();
   const cardEE = preloader_obj;
   if(getDt.status){
    showLoader()
    const pre = {user:logUserDatas.emp_name,token:cardEE.token};
    console.log(pre,"dddd",getDt.data)
    updatePreloaderCard(pre,getDt.data).then((updatePreloader)=>{
        hideLoader();
        $("#preloader_task_modal").modal('hide');
        const maked = makePreloadTask_card_ui(updatePreloader.data,false);
       const replaceTag  =  $(`.card_template_main[data-card-container-preloader=${updatePreloader.data.token}]`);
       console.log(replaceTag,updatePreloader)
       replaceTag[0].outerHTML = maked;
        console.log(updatePreloader,"update")
    })
   }
  
}


function deletePreloaderTask(){
    const delData = preloader_obj
    showLoader();
    deletePreloaderCard({user:logUserDatas.emp_name,token:delData.token}).then((del)=>{
      hideLoader();
      $("#preloadertask_delete_modity_modal").modal('hide');
      const replaceTag  =  $(`.card_template_main[data-card-container-preloader=${delData.token}]`);
      preloader_tab_type_ls = preloader_tab_type_ls.filter((prel)=>{return prel.token != delData.token});
      $(replaceTag).remove()
      preloader_cx_count_set()
      checkAppr_card("preloader_card_list_container")
    })
}


function modify_make_container_preloader(taskData,tab){
    
    let task_card = `  <div class="border-top mt-2 options_cc_container">
    <div class="pd-20">
        <div class="tab">
            <div class="row clearfix align-items-start" style="background: #ecf0f4;">
                <div class="col-md-3 col-sm-12">
                    <ul class="nav flex-column nav-pills vtabs" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" data-toggle="tab" href="#delete_icon" role="tab" aria-selected="false"><i class="dw dw-eye"></i> Delete</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " data-toggle="tab" href="#edit_icon" role="tab" aria-selected="false" onclick="preloader_edit_prefil()"><i class="dw dw-eye"></i> Edit</a>
                        </li>
                       `
                        task_card +=   `</ul>
                </div>
                <div class="col-md-9 col-sm-12">

                    <div class="tab-content page-header my-2">

                            <div class="tab-pane fade show active" id="delete_icon" role="tabpanel">
                                <div class="">
                                    <div>
                                        <form class="modify_form_preloader">
                                            <div class="form-group">
                                                <label>Task Info</label>
                                                <input class="form-control prealoder_info_view " type="text" value="${taskData.preInfo}" readonly="">
                                            </div>
                                        </form>
                                        <div class="text-right">
                                            <button class="btn btn-sm btn-danger" onclick="deletePreloaderTask(this)">Delete</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                                    </div>
                                </div>
                            </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`

return task_card
}

















function preloader_menu(e){
    console.log("dsfas")
    const token = $(e).attr('data-modify-token');
    const getPre = {user:logUserDatas.emp_name,token}
    const select_append_tab = $(e).parent().parent().parent().parent().next();
    if($(select_append_tab).children().eq(0).hasClass('options_cc_container')){
        $(select_append_tab).empty()
        $(e).children('i')[0].outerHTML = '<i class="dw dw-down-arrow-4"></i>'
    }else{
        $(".options_append_tab").empty()
        $(".menu_tag_class").children("i").removeClass("dw dw-up-arrow");
        $(".menu_tag_class").children("i").addClass("dw dw-down-arrow-4");
        $(e).children('i')[0].outerHTML = '<i class="dw dw-up-arrow"></i>'
        const loaderSp = `<div style="text-align: center;" class="my-2"><div class="spinner-border text-success" role="status"><span class="visually-hidden">Loading...</span></div></div>`
        $(select_append_tab).html(loaderSp)
        getPreloaderCard(getPre).then((preData)=>{
            hideLoader()
           console.log(preData)
            if(preData.status){
                const preloaderCard = preData.data;
                preloader_obj = preloaderCard
                const append_options_container = modify_make_container_preloader(preloaderCard);
                console.log(append_options_container,select_append_tab)
                    $(select_append_tab).html(append_options_container);
                    const card =  $(e).parent().parent().parent().parent().parent();
                    const cardparent = $(e).parent().parent().parent().parent().parent().parent();
                    window.setTimeout(function(){
                        var a = card[0].offsetTop
                        $(cardparent).stop().animate({ scrollTop: a},10);
                      },100);
            }else{
                alertify.alert("Message!","Please Try Again...")
            }
        })

    }
    
}



function preloader_edit_prefil(){
    const preloaderCard = preloader_obj
    $("#preloaderChange_task_confirm_btn").removeClass('d-none')
    $("#preloader_task_confirm_btn").addClass('d-none')
    $("#preloader_info_value").val(preloaderCard.preInfo)
    $("#preloader_task_modal").modal("show");
    $(".preloader_sub_inputs").css("display", 'none');
    $("#preloader_type_value").val(preloaderCard.preTpye)
    if(preloaderCard.preTpye == "Weekly"){
     $('.weekly_container').fadeIn();
     $("#preloader_type_weekly").val(preloaderCard.preDay)
    }else if(preloaderCard.preTpye == "Monthly"){
     $(".monthly_container").fadeIn();
     $("#preloader_type_monthly_month").val(preloaderCard.preMonth)
     $("#preloader_type_monthly_date").val(preloaderCard.preDate)
    }else if(preloaderCard.preTpye == "Yearly"){
        $(".yearly_container").fadeIn();
        $("#preloader_type_yearly").val(preloaderCard.preyear)
    }
    // $("#preloader_task_modal").modal('show')
}




/* -------------------------- // task ui start functions -------------------------- */
 
function makeTaskCard(taskData,tab){
    let create_date = taskData.created_on.toDate();
    create_date = new Date(create_date).toDateString();
 
    let schedule_date;
    if(taskData.card_status != "Scheduling"){
        schedule_date = taskData.scheduled_On.toDate();
        schedule_date = new Date(schedule_date).toDateString();
    }
    let extend_date;
    if(taskData.card_status == "Approved"){
        extend_date = new Date(taskData.extended_on[taskData.extended_on.length - 1].date.toDate()).toDateString();
    }
    
    let completed_date;
    if(taskData.card_status == "Completed"){
        completed_date = new Date(taskData.completed_on[taskData.completed_on.length - 1].date.toDate()).toDateString()
    }

   let sub_s = taskData.sub_status;
   
   
   let noOfEx = false;
   if(taskData.extended_on[0] != "empty"){
    noOfEx = taskData.extended_on.length;
   }

   let delayBg = false;
   if(taskData.delay != ""){
    delayBg = "Delayed Task"
   }

    let chat = false;
    let task= false;
    chat = notification_data_ar.some((eR)=>{return eR.icon == 'Chat' && eR.doc_id == taskData.token});
    task = notification_data_ar.some((eR)=>{return eR.icon != 'Chat' && eR.doc_id == taskData.token});

   var task_card = ` <li class=" card-box mb-2   border-bottom card_template_main" data-card-container-${tab}="${taskData.token}" >
  <div class="d-flex align-items-center justify-content-between"> <div class="name-avatar d-flex align-items-center ml-2">
  <div>
       <div>
           <div  data-modify="${taskData.token}" data-tab="${tab}" data-card-owner="${taskData.user_name}">
               <span class="menu_tag_class" onclick="task_menu_icons(this)" data-modify="${taskData.token}" data-tab="${tab}" data-card-owner="${taskData.user_name}" >
               <i class="dw dw-down-arrow-4"></i>`;
                   if(task == true){
                    task_card +=  `<div class="red_dt_cls" style="transform: translate(15px, -20px);"></div>`
                   }else{
                    task_card +=  `<div class="red_dt_cls d-none" style="transform: translate(15px, -20px);"></div>`
                   }
      task_card +=  `</span>
              
           </div>
       </div>
       <div class="cta flex-shrink-0 mx-3 chat_menu_cls" data-modify="Chat" data-chat-token="${taskData.token}"  >`;
           if(chat == true){
            task_card +=  `<div class="red_dt_cls bg-success" style="transform: translate(0px, -20px);"></div>`
           }else{
            task_card +=  `<div class="red_dt_cls d-none bg-success" style="transform: translate(0px, -20px);"></div>`
           }
     task_card += `</div>
      </div>
       <div class="txt">
           <div>
               <span class="badge badge-pill badge ${taskData.card_status.toLowerCase().replaceAll(" ","_")}_badge_cls" style=" background-color: rgb(231, 235, 245);">${taskData.card_status}</span>
               <span class="badge badge-pill badge ${taskData.card_type.toLowerCase().replaceAll(" ","_")}_badge_cls mx-1" style=" background-color: rgb(231, 235, 245);">${taskData.card_type}</span>
               <span class="badge badge-pill badge ${taskData.card_status.toLowerCase().replaceAll(" ","_")}_badge bg-warning" style=" background-color: rgb(231, 235, 245);">Scheduling</span>`;
               if(taskData.badge != ""){
                task_card +=`<span class="badge badge-pill badge text-danger new_badge_tag" style=" background-color: rgb(231, 235, 245);">New</span>`
               }

               if(tab == "managing" || tab == "approval" || tab == "manage"){
                task_card +=`<span class="badge badge-pill badge text-dark ml-1" style=" background-color: rgb(231, 235, 245);">${taskData.user_name}</span>`
               }
               if(sub_s ==  'Rejected'){
                task_card +=`<span class="badge badge-pill badge text-danger ml-1" style=" background-color: rgb(231, 235, 245);">${sub_s}</span>`
               }
               if(delayBg != false){
                task_card +=`<span class="badge badge-pill badge text-danger ml-1" style=" background-color: rgb(231, 235, 245);">${delayBg}</span>`
               }
               if(noOfEx !=  false){
                task_card +=`<span class="badge badge-pill badge text-danger ml-1" style=" background-color: rgb(231, 235, 245);">No.of.extension ${noOfEx}</span>`
               }
               task_card += `</div>
           <div class=" weight-600 card_info_text my-1">${taskData.task_description}</div>`;
           if(taskData.card_status == 'Scheduling'){
             task_card += `<div class="font-12 weight-500 card_schedule_date"  style="color: rgb(79 78 82);">
                                 <span><span><b class="text-success">Created Date</b> :${create_date}</span></span>
                         </div>`;
           }else if(taskData.card_status == "Approved"){
            task_card +=  `<div class="font-12 weight-500 card_schedule_date"  style="color: rgb(79 78 82);">
                         <span><span><b class="text-success">Extended Date</b> : ${extend_date}</span></span>
                 </div>`;
           }else if(taskData.card_status == "Completed"){
            task_card +=  `<div class="font-12 weight-500 card_schedule_date"  style="color: rgb(79 78 82);">
                         <span><span><b class="text-success">Completed Date</b> : ${completed_date}</span></span>
                 </div>`;
           }else{
            task_card +=  `<div class="font-12 weight-500 card_schedule_date"  style="color: rgb(79 78 82);">
                         <span><span><b class="text-success">Scheduled Date</b> : ${schedule_date}</span></span>
                 </div>`;
           }
           task_card += `</div>
   </div>
   </div>
   <div class="options_append_tab"></div>
</li>`

return task_card;
}



function modify_make_container(taskData,tab){
    console.log(taskData)
    let create_date = taskData.created_on.toDate();
    create_date = new Date(create_date).toDateString();
 
    let schedule_date = "---"
    if(taskData.card_status != "Scheduling"){
        schedule_date = taskData.scheduled_On.toDate();
        schedule_date = new Date(schedule_date).toDateString();
    }
    let extend_date;
    if(taskData.card_status == "Approved"){
        extend_date = new Date(taskData.extended_on[taskData.extended_on.length - 1].date.toDate()).toDateString();
    }
    let extend_date_e;
    if(taskData.card_status == "Awaiting Approval"){
        extend_date_e = new Date(taskData.extended_on[taskData.extended_on.length - 1].date.toDate()).toDateString();
    }
    
    let completed_date = false
    if(taskData.card_status == "Completed"){
        completed_date = new Date(taskData.completed_on[taskData.completed_on.length - 1].date.toDate()).toDateString()
    }
    let download_file = false;
    if(taskData.file_details[0] != "empty"){
     download_file = true
    }



    let task_card = `  <div class="border-top mt-2 options_cc_container">
    <div class="pd-20 ">
        <div class="tab">
            <div class="row clearfix align-items-start" style="background: #ecf0f4;">
                <div class="col-md-3 col-sm-12">
                    <ul class="nav flex-column nav-pills vtabs" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" data-toggle="tab" href="#view_icon" role="tab" aria-selected="false"><i class="dw dw-eye"></i> View</a>
                        </li>`
                        if(tab == 'pending' || tab == "managing" || tab == 'approval'){
                          
                            if((taskData.card_type == "Self" && logUserDatas.emp_name == taskData.user_name &&(taskData.card_status == "Pending" || taskData.card_status == "Approved")) || (taskData.card_type == 'Assign' && logUserDatas.emp_name == taskData.manager && (taskData.card_status == "Pending" || taskData.card_status == "Approved"))){
                                task_card += `<li class="nav-item">
                                                     <a class="nav-link" data-toggle="tab" href="#edit_icon" role="tab" aria-selected="false"><i class="dw dw-edit2"></i> Edit</a>
                                              </li>`
                                if(taskData.card_status == "Pending" || taskData.card_status == "Approved"){
                                    task_card +=  `<li class="nav-item">
                                                         <a class="nav-link " data-toggle="tab" href="#delete_icon" role="tab" aria-selected="true"><i class="dw dw-delete-3"></i> Delete</a>
                                                  </li>`
                                 }
                             }


                            if(taskData.card_status == "Scheduling" && logUserDatas.emp_name == taskData.user_name){
                             task_card +=  `<li class="nav-item">
                                                <a class="nav-link " data-toggle="tab" href="#schedule_icon" role="tab" aria-selected="true"><i class="dw dw-time-management"></i> Schedule</a>
                                             </li>`
                            }
                          
                            if((taskData.card_status == "Approved" || taskData.card_status == "Pending") && taskData.user_name == logUserDatas.emp_name){
                                task_card +=    `<li class="nav-item">
                                                     <a class="nav-link " data-toggle="tab" href="#complete_icon" role="tab" aria-selected="true"><i class="dw dw-tick"></i> Complete</a>
                                                  </li>`
                            }
                             
                            if(taskData.card_status == "Completed" && taskData.user_name == logUserDatas.emp_name){
                                task_card += `<li class="nav-item">
                                                    <a class="nav-link " data-toggle="tab" href="#restore_icon" role="tab" aria-selected="true"><i class="dw dw-refresh1"></i> Restore</a></a>
                                             </li>`
                            }
                       
                            if((taskData.card_status == "Pending" || taskData.card_status == "Approved") && taskData.user_name == logUserDatas.emp_name){
                                task_card +=   `<li class="nav-item">
                                                    <a class="nav-link " data-toggle="tab" href="#extend_icon" role="tab" aria-selected="true"><i class="dw dw-wall-clock2"></i> Extend</a>
                                                </li>`
                            }
                      
                            if(taskData.card_status == "Awaiting Approval" && logUserDatas.emp_name == taskData.manager){
                                task_card +=  `<li class="nav-item">
                                                    <a class="nav-link " data-toggle="tab" href="#approval_icon" role="tab" aria-selected="true"><i class="dw dw-check"></i> Approval</a>
                                                </li>`
                            }

                            if((tab == "managing" || tab == "pending") && (taskData.card_status == "Pending" || taskData.card_status == "Approved" || taskData.card_status == "Awaiting Approval")){
                                task_card +=   `<li class="nav-item">
                                                    <a class="nav-link " data-toggle="tab" href="#upload_icon" role="tab" aria-selected="true"><i class="dw dw-upload1"></i> Upload</a>
                                                </li>`
                            }


                        }
                         if(download_file){
                            task_card += `<li class="nav-item">
                                            <a class="nav-link " data-toggle="tab" href="#download_icon" role="tab" aria-selected="true" onclick="getDownFile()"><i class="dw dw-download1"></i> Download</a>
                                        </li>`
                         }
                        
                        task_card +=  `<li class="nav-item">
                            <a class="nav-link " data-toggle="tab" href="#chat_icon" role="tab" aria-selected="true" data-chat-token="${taskData.token}" data-owner="${taskData.user_name}" data-tab="${tab}" onclick="chat_menu_button(this)" ><i class="dw dw-chat"></i> Chat</a></a>
                        </li>`
                        task_card +=    `</ul>
                </div>
                <div class="col-md-9 col-sm-12 d-flex align-items-center justify-content-center">

                    <div class="tab-content page-header my-2" style="width:90%">
    
                            <div class="tab-pane fade show active" id="view_icon" role="tabpanel">
                                <div class="">
                                    <div>
                                    <table class="table">
                                    <tbody>
                                    <tr>
                                        <th scope="row">Task Owner</th>
                                        <td colspan="2">${taskData.user_name}</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Status</th>
                                        <td>${taskData.card_status}</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Manager</th>
                                        <td>${taskData.manager}</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Created  on</th>
                                        <td colspan="2">${create_date}</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Scheduled on</th>
                                        <td colspan="2">${schedule_date}</td>
                                      </tr>`;

                                      if(completed_date != false){
                                        task_card +=  `<tr>
                                        <th scope="row">Completed on</th>
                                        <td colspan="2">${completed_date}</td>
                                      </tr>`
                                      }

                                      task_card +=  `</tbody>
                                  </table>
                                        
                                    </div>
                                </div>
                            </div>

                     
                            <div class="tab-pane fade" id="edit_icon" role="tabpanel">
                                <div class="">
                                    <div>
                                        <form class="modify_form ">
                                            <div class="form-group">
                                                <label>Task Info</label>
                                                <input class="form-control modify_task_info_input" type="text" value="${taskData.task_description}" id="modify_edit_input">
                                            </div>
                                        </form>
                                        <div class="text-right">
                                            <button class="btn btn-sm btn-primary" onclick="editTask(this)">Change</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-pane fade" id="delete_icon" role="tabpanel">
                                <div class="">
                                    <div>
                                        <form class="modify_form">
                                           <div class="form-group">
                                                <label>Task Info</label>
                                                <input class="form-control modify_task_info_input" type="text" value="${taskData.task_description}" readonly="">
                                            </div>
                                        </form>
                                        <div class="text-right">
                                        <button class="btn btn-sm btn-danger" onclick="deleteTask(this)">Delete</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="tab-pane fade " id="complete_icon" role="tabpanel">
                                <div class="">
                                    <div>
                                        <form class="modify_form">
                                            <div class="form-group">
                                                <label>Task Info</label>
                                                <input class="form-control modify_task_info_input" value="${taskData.task_description}" type="text" readonly="">
                                            </div>
                                        </form>
                                        <div class="text-right">
                                            <button class="btn btn-sm btn-success" onclick="completedTask()">Complete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-pane fade " id="extend_icon" role="tabpanel">
                                <div class="">
                                    <div>
                                        <form class="modify_form">
                                                <div class="form-group">
                                                    <label>Task Info</label>
                                                    <input class="form-control modify_task_info_input" type="text" value="${taskData.task_description}" readonly="">
                                                </div>
                                                <div class="form-group">
                                                    <label>Previous Date</label>
                                                    <input class="form-control modify_task_schedule_input" type="text" value="${schedule_date}" readonly="">
                                                </div>
                                                <div class="form-group">
                                                    <label>New Date</label>
                                                    <input class="form-control" type="date" id="modify_extend_date" onchange="checkPreDate(this)">
                                                </div>
                                     </form>
                                        <div class="text-right">
                                        <button class="btn btn-sm btn-primary" onclick="extendTask()">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-pane fade " id="schedule_icon" role="tabpanel">
                                <div class="">
                                    <div>
                                        <form class="modify_form">
                                            <div class="form-group">
                                                <label>Task Info</label>
                                                <input class="form-control modify_task_info_input " value="${taskData.task_description}" type="text" readonly="">
                                            </div>
                                            <div class="form-group">
                                                <label>Schedule Date</label>
                                                <input class="form-control empty_value_input " type="date" id="modify_task_schedule_input" onchange="checkPreDate(this)">
                                            </div>
                                        </form>
                                        <div class="text-right">
                                              <button class="btn btn-sm btn-primary" onclick="scheduleTask()">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-pane fade " id="download_icon" role="tabpanel">
                                <div class="">
                                    <div>
                                    <div class="down_container">
                                      <div class="download_append d-flex px-2"> <h5 class="text-center w-100">No Files</h5></div>
                                   </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-pane fade " id="upload_icon" role="tabpanel">
                                <div class="">
                                    <div>
                                        <form class="modify_form ">
                                            <div class="form-group">
                                                <label>Task Info</label>
                                                <input class="form-control modify_task_info_input" type="text" value="${taskData.task_description}" readonly="">
                                            </div>
                                            <div class="form-group">
                                                <label>Custom file input</label>
                                                <div class="custom-file">
                                                    <input type="file" class="custom-file-input" id="task_upload_input" multiple="">
                                                    <label class="custom-file-label">Choose file</label>
                                                </div>
                                            </div>
                                        </form>
                                        <div class="text-right">
                                        <button class="btn btn-sm btn-primary" onclick="uploadeTask(this)">Upload</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-pane fade " id="approval_icon" role="tabpanel">
                                <div class="">
                                    <div>
                                     <form class="modify_form">
                                            <div class="form-group">
                                                <label>Task info</label>
                                                <input class="form-control modify_task_info_input" type="text" value="${taskData.task_description}" readonly="">
                                            </div>

                                            <div class="form-group">
                                                <label>Previous Date</label>
                                                <input class="form-control modify_task_schedule_input" value="${schedule_date}" type="text" readonly="">
                                            </div>

                                            <div class="form-group">
                                                <label>New Date</label>
                                                <input class="form-control extend_date_input" type="text" value="${extend_date_e}"  readonly="">
                                            </div>
                        
                                            <div class="col-md-6 col-sm-12">
                                                <label class="weight-600">Select</label>
                                                <div class="custom-control custom-radio mb-5">
                                                    <input type="radio" id="approval1" name="approval_radio"  class="custom-control-input" checked="">
                                                    <label class="custom-control-label" for="approval1">Approval</label>
                                                </div>

                                                <div class="custom-control custom-radio mb-5">
                                                    <input type="radio" id="approval2" name="approval_radio" class="custom-control-input">
                                                    <label class="custom-control-label" for="approval2">Disapproval</label>
                                                </div>
                                            </div>

                                     </form>
                                        <div class="text-right">
                                           <button class="btn btn-sm btn-primary" onclick="approvalTask()">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-pane fade " id="restore_icon" role="tabpanel">
                                <div class="">
                                    <div>
                                        <form class="modify_form">
                                            <div class="form-group">
                                                <label>Task Info</label>
                                                <input class="form-control modify_task_info_input" type="text" value="${taskData.task_description}" readonly="">
                                            </div>
                                      </form>
                                        <div class="text-right">
                                             <button class="btn btn-sm btn-primary" onclick="restoreTask()">Restore</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-pane fade " id="chat_icon" role="tabpanel">
                                <div class="">
                                    <div>
                                    <div class="p-2 chat_CS  ">
                                    <div class=" h-100">
                                        <div class="chat_container ">
                                            <div class="chat_box_container ">
                                                <div class="chat_box  ">
                                                    <!-- <div class="chat_box_header">Chat</div> -->
                                                    <div class="chat_box_body ">
                                                        <div class="chat_box_content ">
                                                            <div class="chat_box_messages ">
                                                                <div class="chat_append"><div class="w-100 h-100 d-flex align-items-center justify-content-center no_chat_template p-4"><div class="w-50 h-50 text-center"> <div><img src="https://drive.google.com/uc?export=view&amp;id=10hd-GQbTgi1T06vvGF5_SGuSs_pqYLva" alt="" width="50%" height="50%"></div><div class="no_chat_text my-2"><h6>No Record</h6></div></div></div></div>
                                                            </div>`
                                                            if(taskData.card_status != "Completed"){
                                                               task_card += `<div class="chat_input_box_cC">
                                                                <div class="d-flex align-items-center justify-content-around">
                                                                    <div class="input_chat_box chat_box_input w-75 position-relative">
                                                                        <div class="spinner-border text-success chat_spinner" role="status" style="display:none;">
                                                                            <span class="sr-only">Loading...</span>
                                                                        </div>
                                                                        <div class="input_st chatValue" contenteditable="true" disabled="true" onkeyup="enterChatKey(this)"> </div>
                                                                    </div>
                                                                    <div class="chat_box_send" onclick="addChat()">
                                                                        <i class="icon-copy dw dw-paper-plane1"></i>
                                                                    </div>
                                                                </div>
                                                            </div>`
                                                            }
                                                        `</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                    </div>
                                </div>
                            </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`

return task_card
}

function preloader_cx_count_set(){
    const preload_types = {daily:[],monthly:[],yearly:[],weekly:[]}
    preloader_tab_type_ls.filter((preloade_s)=>{
       
        preload_types[preloade_s.preTpye.toLowerCase()].push(preloade_s);
    });
    const typeLength = Object.keys(preload_types);
    typeLength.forEach((tys)=>{
        $(`.status_count_s_${tys}`).text(preload_types[tys].length);
    })
}




 function makePreloadTask_card_ui(taskData){

    var preload_task_ui = `<li class=" card-box mb-2  border-bottom card_template_main" data-card-container-preloader="${taskData.token}" >
                                    <div class="d-flex justify-content-between align-items-center">
                                    <div class=" mr-2">
                                        <div class="">
                                            <div class="dropdown">
                                                <span class="p-0 menu_tag_class"   onclick="preloader_menu(this)" data-modify-token="${taskData.token}">
                                                <i class="dw dw-down-arrow-4"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="name-avatar d-flex align-items-center px-2" style="flex:1;">
                                        <div class="txt">
                                            <div>
                                                <span class="badge badge-pill badge text-primary"  style="background-color: rgb(231, 235, 245);">${taskData.preStatus}</span>
                                                <span class="badge badge-pill badge text-dark"  style="background-color: rgb(231, 235, 245);">${taskData.preTpye}</span>
                                            </div>
                                            <div class=" weight-600 card_info_text my-1">${taskData.preInfo}</div>`
                                            if(taskData.preTpye == 'Weekly'){
                                                preload_task_ui += `<div class="font-12 weight-500 card_schedule_date"  style="color: rgb(79 78 82);">
                                                                    <span><span><b class="text-success">Assigned on</b> : ${taskData.preDay}</span></span>
                                                            </div>`;
                                              }else if(taskData.preTpye == "Monthly"){
                                                preload_task_ui +=  `<div class="font-12 weight-500 card_schedule_date"  style="color: rgb(79 78 82);">
                                                            <span><span><b class="text-success">Assigned on</b> : ${taskData.preMonth +" - "+ taskData.preDate}</span></span>
                                                    </div>`;
                                              }else if(taskData.preTpye == "Yearly"){
                                                preload_task_ui +=  `<div class="font-12 weight-500 card_schedule_date"  style="color: rgb(79 78 82);">
                                                            <span><span><b class="text-success">Assigned on</b> : ${taskData.preyear}</span></span>
                                                    </div>`;
                                              }
                                              preload_task_ui +=   `</div>
                                    </div>
                                    
                                    </div>
                                    <div class="options_append_tab"></div>
                            </li>`;
            return preload_task_ui
 }


 function makePreloaderCard(card_preloader,empty_count){
    remove_no_RL("#preloader_card_list_container")
    if(empty_count){
        preloader_tab_type_ls = []
    }
      if(card_preloader.length == 0){
        $("#preloader_card_list_container").html(no_record)
      }else{
        card_preloader.filter((preload)=>{
            preloader_tab_type_ls.push(preload);
            const preloaderCxU = makePreloadTask_card_ui(preload);
            $("#preloader_card_list_container").append(preloaderCxU);
        })
    }
    preloader_cx_count_set()
 }






function task_pending_tab_set_counts(){
    const status_list = task_pending_tab_status_ls;
    const task_status_obj ={pending:[],approved:[],awaiting_approval:[],scheduling:[]};
    status_list.filter((status_list)=>{
        if(status_list.card_status != "Completed"){
            task_status_obj[status_list.card_status.toLowerCase().replaceAll(" ","_")].push(status_list);
        }
    });
    const status_D = Object.keys(task_status_obj);
    status_D.filter((key_status)=>{
        $(`.status_count_s_${key_status}`).text(task_status_obj[key_status].length)
    })
}

function task_view_tab_set_counts(){
    const status_list = view_tab_type_ls;
    const task_status_obj ={pending:[],approved:[],awaiting_approval:[],completed:[]};

    status_list.filter((status_list)=>{
        console.log(status_list.card_status.toLowerCase().replaceAll(" ","_"))
        task_status_obj[status_list.card_status.toLowerCase().replaceAll(" ","_")].push(status_list);
    });

    const status_D = Object.keys(task_status_obj);
    status_D.filter((key_status)=>{
        $(`.view_count_list_${key_status}`).text(task_status_obj[key_status].length)
    })
}
function task_manage_tab_set_counts(){
    const status_list = manage_tab_type_ls;
    const task_status_obj ={pending:[],approved:[],awaiting_approval:[],completed:[]};

    status_list.filter((status_list)=>{
        console.log(status_list.card_status.toLowerCase().replaceAll(" ","_"))
        task_status_obj[status_list.card_status.toLowerCase().replaceAll(" ","_")].push(status_list);
    });

    const status_D = Object.keys(task_status_obj);
    status_D.filter((key_status)=>{
        $(`.manage_count_list_${key_status}`).text(task_status_obj[key_status].length)
    })
}
function task_managing_tab_set_counts(){
    const status_list = managing_tab_type_ls;
    const task_status_obj ={pending:[],approved:[],completed:[],scheduling:[]};

    status_list.filter((status_list)=>{
        console.log(status_list.card_status.toLowerCase().replaceAll(" ","_"))
        task_status_obj[status_list.card_status.toLowerCase().replaceAll(" ","_")].push(status_list);
    });

    const status_D = Object.keys(task_status_obj);
    status_D.filter((key_status)=>{
        $(`.managing_count_list_${key_status}`).text(task_status_obj[key_status].length)
    })
}
function task_approval_tab_set_counts(){
    const status_list = approval_tab_type_ls;
    const task_status_obj ={awaiting_approval:[]};

    status_list.filter((status_list)=>{
        console.log(status_list.card_status.toLowerCase().replaceAll(" ","_"))
        task_status_obj[status_list.card_status.toLowerCase().replaceAll(" ","_")].push(status_list);
    });

    const status_D = Object.keys(task_status_obj);
    status_D.filter((key_status)=>{
        $(`.approval_count_list_${key_status}`).text(task_status_obj[key_status].length)
    })
}


function remove_no_RL(appengingTag){
       console.log(appengingTag)
    if($(appengingTag).children().hasClass('fetching_loader')){
        $(appengingTag).children('.fetching_loader').remove()
    }else if($(appengingTag).children().hasClass('no_record_img')){
        
        $(appengingTag).children('.no_record_img ').remove();
    }
}

function makePendingCard(card_data,callback,empty_count){
    const appengingTag =  $("#pending_card_list_container")
    remove_no_RL(appengingTag)
    if(empty_count){
        task_pending_tab_status_ls = [];
    }

    if(card_data.length ==0){
        $(appengingTag).html(no_record);
    }else{
       card_data.forEach((task_make_card)=>{
        task_pending_tab_status_ls.push(task_make_card);
        const makeCard = makeTaskCard(task_make_card,'pending');
        $(appengingTag).append(makeCard);
       });

       if(callback != false){
        const select_card =  $(`[data-card-container-pending=${callback.notification_data.doc_id}]`);
        moving_card("#pending_card_list_container",select_card);
       }
    }
    task_pending_tab_set_counts()

}

function makeViewCard(view_card_data){
    remove_no_RL("#view_card_list_container")
    view_tab_type_ls = [];
    if(view_card_data.length == 0){
        $("#view_card_list_container").html(no_record)
     }else{
        view_card_data.filter((view_dD)=>{
            view_tab_type_ls.push(view_dD);
            const viewW = makeTaskCard(view_dD,"view");
            $("#view_card_list_container").append(viewW)
        })
    }
    task_view_tab_set_counts();
}

function makeManageCard(manage_card_data){
    remove_no_RL("#manage_card_list_container")
     manage_tab_type_ls = []
    if(manage_card_data.length == 0){
        $("#manage_card_list_container").html(no_record)
      }else{
        manage_card_data.filter((manageD)=>{
            manage_tab_type_ls.push(manageD);
            const manage = makeTaskCard(manageD,'manage');
            $("#manage_card_list_container").append(manage);
        })
    }
    task_manage_tab_set_counts()
}

function makeManagingCard(managing_card_data,callback){
    remove_no_RL("#managing_card_list_container")
    managing_tab_type_ls = [];
    if(managing_card_data.length == 0){
        $("#managing_card_list_container").html(no_record)
    }else{
        managing_card_data.filter((managingE)=>{
            managing_tab_type_ls.push(managingE)
            const manaagingCaS = makeTaskCard(managingE,"managing");
            $("#managing_card_list_container").append(manaagingCaS);
        })
        if(callback != false){
            const select_card =  $(`[data-card-container-managing=${callback.notification_data.doc_id}]`);
            moving_card("#managing_card_list_container",select_card);
            console.log(select_card,"selelcted card")
            console.log(callback,"notificaions call back")
        }
    }
    task_managing_tab_set_counts()
}



function makeApprovalCard(approval_card_data,callback,empty_count){
    remove_no_RL("#approval_card_list_container")
   if(empty_count){
    approval_tab_type_ls = []
   }
    if(approval_card_data.length == 0){
        $("#approval_card_list_container").html(no_record)
    }else{
        approval_card_data.filter((approvale)=>{
            approval_tab_type_ls.push(approvale)
            const approvalsse = makeTaskCard(approvale,"approval");
            $("#approval_card_list_container").append(approvalsse);
        })
        if(callback != false){
            const select_card =  $(`[data-card-container-approval=${callback.notification_data.doc_id}]`);
            moving_card("#approval_card_list_container",select_card);
        }
    }
    task_approval_tab_set_counts()
}

function modify_card(card_data){
    const wDcard = card_data[0]
    const modify_make = makeTaskCard(wDcard,'pending');
    const find_tag = $(`.card_template_main[data-card-container-pending=${wDcard.token}]`);
    console.log(find_tag)
    if(find_tag){
        find_tag[0].outerHTML = modify_make;
        task_pending_tab_status_ls = task_pending_tab_status_ls.map((rep)=>{
            if(rep.token == wDcard.token){
                return wDcard
            }else{
                return rep
            }
        })
        task_pending_tab_set_counts()
    }
    console.log(find_tag)
}




/* -------------------------- // task ui end functions -------------------------- */


function moving_card(appendId,id) { 
    var $container = $(appendId),$scrollTo = $(id);
    $container.animate({
        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
    })
    $(id).addClass("bg-secondary")
    setTimeout(()=>{
    $(id).removeClass("bg-secondary")
    },5000)
 }



/* ----------------------------- filter function ---------------------------- */

function pending_filter_tag(e){
    const filter_by = {status:$(e).val(),user:logUserDatas.emp_name};
     (filter_by,false)
}

function pending_main_filter(filter_by,callback){
    fetch_loader_show("#pending_card_list_container")
    pendingTab(filter_by).then((pending_filter_return)=>{
        $("#pending_card_list_container").empty()
        if(pending_filter_return.status == false){
            makePendingCard([],false,false)
        }else{
            makePendingCard(pending_filter_return.data,callback,true)
        }
        console.log(pending_filter_return);
        
    })
}


function view_filter_tag(){
    const status = $('#task_view_status_sort').val()
    const start_date = $('#task_view_start_date').val()
    const last_date = $('#task_view_end_date').val();
    if(start_date == "") return alertify.alert("Message!","Please Select From Date...");
    if(last_date == "") return alertify.alert("Message!","Please Select To Date....");
    const view_filter_obj = {start_date,last_date,status,user:logUserDatas.emp_name}
    
    fetch_loader_show("#view_card_list_container")
    viewTask(view_filter_obj).then((view_pre)=>{
        console.log(view_pre)
        $("#view_card_list_container").empty()
        if(view_pre.status == true){
            const fiterEs = view_pre.data.filter((deS)=>{return deS.card_status != "Scheduling"})
            makeViewCard(fiterEs)
        }else{
            makeViewCard([])
        }
    })

}


function manage_filter_tag(){
    const status =  $("#task_manage_status_sort").val()
    const name =  $("#task_manage_name_sort").val()
    const start_date = $("#manage_filter_start_date").val()
    const last_date = $("#manage_filter_end_date").val()
    if (!start_date) return alertify.alert("Message!", "Please  select start date...");
    if (!last_date) return alertify.alert("Message!", "Please selcet end date.....");
    let all_sub = logUserDatas.allsubordinates.as;
    const manage_tab_filter = { status, name, start_date, last_date, sub_users: all_sub }
    fetch_loader_show("#manage_card_list_container")
    manageTask(manage_tab_filter).then((manage_f)=>{
        $("#manage_card_list_container").empty()
        if(manage_f.status == false){
          makeManageCard([])
        }else{
            const fileD = manage_f.data.filter((manageRew)=>{return manageRew.card_status != "Scheduling"})
            makeManageCard(fileD)
        }
        console.log(manage_f,"manag")
    })
}







function managing_filter_tag() {
    const fill_name = $("#task_managing_name_sort").val()
    const fill_status = $("#task_managing_status_sort").val();
    let sub_ar = logUserDatas.subordinates_details.ad;
    if (sub_ar.length != 0) {
        sub_ar = sub_ar.map((sub) => { return sub.subname })
    }
    const managing_tab_filter = { fill_name,fill_status, sub_users: sub_ar };
    managing_main_filter(managing_tab_filter,false)
  }


 function managing_main_filter(managing_tab_filter,callback){
    fetch_loader_show("#managing_card_list_container")
    managingTab(managing_tab_filter).then((managingD)=>{
        $("#managing_card_list_container").empty()
        if(managingD.status == false){
            makeManagingCard([],false);
        }else{
            const managingEE = managingD.data.filter((manag)=>{return manag.card_status != "Awaiting Approval"});
            makeManagingCard(managingEE,callback);
        }
        console.log(managingD,'sdfa')
    })
 }





  function approval_filter_tag(e){
    const name = $(e).val();
    let sub_ar = logUserDatas.subordinates_details.ad;
    if (sub_ar.length != 0) {
        sub_ar = sub_ar.map((sub) => { return sub.subname })
    }

   const approval_tab_filter = { user: name, user_name: logUserDatas.emp_name, sub_name: sub_ar };
   approval_main_filter(approval_tab_filter,"",true)
  }

function approval_main_filter(approval_tab_filter,callback){
    fetch_loader_show("#approval_card_list_container")
    approveTab(approval_tab_filter).then((approvalD)=>{
        $("#approval_card_list_container").empty()
        if(approvalD.status == false){
          makeApprovalCard([],false,false)
        }else{
            makeApprovalCard(approvalD.data,callback,true)
        }
        console.log(approvalD)
    })
}


  function preloader_filter_tag(e){
    const valuE = $(e).val();
    const fE = {user:logUserDatas.emp_name,type:valuE};
   fetch_loader_show("#preloader_card_list_container")

    preloaderTab(fE).then((preladerD)=>{
        $("#preloader_card_list_container").empty()
        if(preladerD.status == false){
            makePreloaderCard([],true)
        }else{
            makePreloaderCard(preladerD.data,true)
        }
    })
  }


















  /* ----------------------------- CHAT FUNCTIONS ----------------------------- */
  
  /* -------------------- chat UI box append fun start here ------------------- */
function chatUI(chatData, appendType) {
    if (chatData.length == 0) {
        $(".no_chat_text").html("<h6>No Record</h6>")
    } else {
        var messageUI = ""
        chatData.forEach((chatArData) => {
            const chat_date_c = chatArData.chat_date.split("T");
            if (chatArData.chat_send_by == logUserDatas.emp_name) {
                messageUI += `<div class="message_container  mb-3 mLeft extra_task_add_ani">
             <div class="text-end message_sub_text" >You</div>
              <div class="chat_content_text">${
                    chatArData.chat_message
                }</div>
              <div class="d-flex message_sub_text justify-content-end">
                  <div class="chat_footer_text  text-end mb-2 align-items-center">${
                    chat_date_c[0]+" - "+chat_date_c[1].slice(0,8)
                }</div>
                  <div class="messageDD ml-1"><i class="icon-copy ion-android-done-all chat_${
                    chatArData.chat_status.toLowerCase()
                }"></i></div>
              </div>
            </div>`;
            } else {
                messageUI += `<div class="message_container  mb-3  extra_task_add_ani">
             <div class=" message_sub_text" >${
                    chatArData.chat_send_by
                }</div>
              <div class="chat_content_text">${
                    chatArData.chat_message
                }</div>
              <div class="d-flex message_sub_text">
                  <div class="chat_footer_text">${
                    chat_date_c[0]+" - "+chat_date_c[1].slice(0,8)
                }</div>
              </div>
            </div>`;
            }


        });

        if ($('.no_chat_template')) 
            $(".no_chat_template").remove();
        

        $(".chat_append").append(messageUI)
        const scrollEl = $(".chat_append").parent()
        $(scrollEl).stop().animate({
            scrollTop: $(scrollEl)[0].scrollHeight
        }, 1);
    }

}
/* -------------------- chat UI box append fun end here ------------------- */









/* --------------------- add chat common fun start here --------------------- */
function addChat() { // const message = $(".chatValue").val();
    var userInput = $('.chatValue');
    var message = userInput.html().replace(/\<div\>|\<br.*?\>/ig, '\n').replace(/\<\/div\>/g, '').trim().replace(/\n/g, '<br>');
    if (!message.trim())
        return alertify.alert("Message!", "Plesae enter your message.....");
    $(".chat_spinner").fadeIn()
    const chatDate = new Date().toISOString();
    const backend_chat = { user: logUserDatas.emp_name, taskOwner: chat_button_token.user, message, chatDate, token: chat_button_token.token, status: "Unread" }
    taskChat(backend_chat).then((chat_cc) => {
        if (chat_cc.status == true) {
            chatUI([chat_cc.data])
            const sub_notify_value = {
                tabs: "auto",
                software: "TASK",
                action: "Chat",
                message: 'Chat has been added by ' + logUserDatas.emp_name,
                click: "Click",
                receiver: logUserDatas.emp_name == chat_button_token.user ? logUserDatas.manager : chat_button_token.user
            }
            const sub_notify_value_1 = {
                token: chat_button_token.token,
                user_name: chat_button_token.user
            }
            addNotify_func(sub_notify_value_1, sub_notify_value)

            $(".chat_spinner").fadeOut()
        } else {
            alertify.alert("Message!", "Try again...!")
        }
    })

    userInput.html("")
}
/* --------------------- add chat common fun start here --------------------- */


/* ------------------ add chat by enter key fun start here ------------------ */
function enterChatKey(e) {
    if ((event.metaKey || event.ctrlKey) && event.keyCode == 13) {
        addChat()
    }
}
/* ------------------ add chat by enter key fun end here ------------------ */


// chat code end





var chat_button_token ={}

  function chat_menu_button(e){
    const cardToken = $(e).attr('data-chat-token');
    const card_owner = $(e).attr("data-owner");
    const tab = $(e).attr('data-tab');
    const card_info = $(e).parent().prev().children().children('.card_info_text').text();
    console.log(tab)
    if(tab == 'manage' || tab == 'view'){
        $('.chat_input_box_cC').addClass('d-none')
    }else{
        $('.chat_input_box_cC').removeClass('d-none')
    }
    const user = logUserDatas.emp_name;
    const chat_ob = {token:cardToken,user:card_owner,currentuser:user};
    chat_button_token = chat_ob;
    $('.chat_task_add_info').text(card_info)
    $("#chat_task_modal").modal('show'); 
    $(".chat_append").html(loacalTemplate_chatLoader);
    $(e).children(".red_dt_cls").addClass('d-none');

    getChats(chat_ob).then((chatFindData)=>{
           if(chatFindData.status == false){
            chatUI([])
           }else{
            chatUI(chatFindData.data)
            // read_update_notification(cardToken)
            makechatread(chat_ob)
           }
        console.log(chatFindData)
    })
    // showLoader()
   console.log(cardToken)
  }

// TASK FUNCTIONS END HERE





/* -------------------------------------------------------------------------- */
/*                           LOG FUNCTIONS CONTAINER                          */
/* -------------------------------------------------------------------------- */



/* ------------------------ LOG FUNCTIONS START HERE ------------------------ */
function logFunctions(){
    getAdminLogToday(logUserDatas.emp_name).then((tOD)=>{
        addTodayLog(tOD.data)
    })
    logAllSubName_on_manage()
}


function leadModal(e){
    $("#logINF").val("")
    $("#log_add_modal").modal("show")
}

function logAllSubName_on_manage(){
    const subName = logUserDatas.allsubordinates.as;
    if(subName.length == 0){
        $(".adminLog").remove();
    }else{
        var optionsb = `<option value=""  selected>Choose...</option>`;
        subName.forEach((subAll)=>{
            optionsb += `<option value="${subAll}">${subAll}</option>`
        })
        $("#log_manage_name").html(optionsb)
        console.log(subName)
    }
   
}

function addLogFL(e){
    const logD = $("#logINF").val();
    if(logD.trim() == ""){
         alertify.error("Please enter log info")
    }else{
        $(e).html(button_loader)
        if($('#today_log_append_list .no_record_img ')){
            $("#today_log_append_list .no_record_img ").remove()
        }
        const f = {info:logD,username:logUserDatas.emp_name}
        addAdminLog(f).then((rER)=>{
            $(e).html("Confirm")
            $("#log_add_modal").modal("hide");
            addTodayLog([rER.data])
        })
        
       console.log(logD)
    }
}



function makeLogHtml(logcData){
    
    var today = logcData.log_add_date.toDate();
    var time = today.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
    var day = today.toDateString()
    console.log(time,day)
    var log_html = `<li>
    <div class="task-name">
    <i class="icon-copy ion-calendar"></i>
        ${day}
    </div>
    <p>
     ${logcData.log_info}
    </p>
    <div class="task-time"><i class="icon-copy ion-clock"></i> ${time}</div>
</li>`;
    return log_html;
}


function addTodayLog(todayLogs){
    if(todayLogs.length == 0){
        $("#today_log_append_list").prepend(log_no_record)
    }else{
        todayLogs.forEach((logs)=>{
            const logContainer = makeLogHtml(logs)
            $("#today_log_append_list").prepend(logContainer)
        })
    }
    
}
function addViewLog(todayLogs){
    if(todayLogs.length == 0){
        $("#view_log_append_list").prepend(log_no_record)
    }else{
        todayLogs.forEach((logs)=>{
            const logContainer = makeLogHtml(logs)
            $("#view_log_append_list").prepend(logContainer)
        })
    }
    
}
function addManageLog(todayLogs){
    if(todayLogs.length == 0){
        $("#manage_log_append_list").prepend(log_no_record)
    }else{
        todayLogs.forEach((logs)=>{
            const logContainer = makeLogHtml(logs)
            $("#manage_log_append_list").prepend(logContainer)
        })
    }
    
}



/* ------------------------- LOG FUNCTIONS END HERE ------------------------- */










/* -------------------------------------------------------------------------- */
/*                         LEADS FUNCTIONS CONTAINER                          */
/* -------------------------------------------------------------------------- */


function auto_move_tab_leads(manual_move) {
    $('.tab_container_box .tab-pane').removeClass('show active')
    $('.tab_container_box_header .nav-item .nav-link').removeClass('active')

    if(manual_move != ""){
        $(`[href="#${manual_move}_bg_tab"]`).addClass("active");
        $(`#${manual_move}_bg_tab`).addClass('active show');
        // if (task_entry_point.notification == true) {
        //     console.log(task_entry_point.notification_data,'noffff')
        // }
    }else{
        // if (task_entry_point == null) {
        //     $('[href="#pending_bg_tab"]').addClass("active");
        //     $("#pending_bg_tab").addClass('active show');
        // } else {
        //     console.log(task_entry_point)
        //     $(`[href="#${task_entry_point.tab}_bg_tab"]`).addClass("active");
        //     $(`#${task_entry_point.tab}_bg_tab`).addClass('active show');
        //     if (task_entry_point.notification == true) {
        //         console.log(task_entry_point.notification_data,'noffff');
        //         if(task_entry_point.tab == 'managing'){
        //             const managing_tab_filter = { fill_name:task_entry_point.notification_data.notification_send_by,fill_status:"All", sub_users: "" };
        //             managing_main_filter(managing_tab_filter,task_entry_point);
        //             $("#task_managing_name_sort").val(managing_tab_filter.fill_name);
        //         }else if(task_entry_point.tab == 'pending'){
        //             const ve = task_entry_point
        //             setTimeout(()=>{
        //                 const filter_by = {status:"All",user:logUserDatas.emp_name};
        //                 pending_main_filter(filter_by,ve,true)
        //             },2000)
                    
        //         }else if(task_entry_point.tab == 'approval'){
        //             const ve = task_entry_point
        //            setTimeout(()=>{
        //             const approval_tab_filter = { user: ve.notification_data.notification_send_by, user_name: logUserDatas.emp_name, sub_name:[]};
        //             approval_main_filter(approval_tab_filter,ve,true,true)
        //             $("#task_approval_name_sort").val(approval_tab_filter.user)
        //            },2000)
        //         }
        //     }
        // }
    }
    
    task_entry_point = null;
}



var telecaller_details = {}
var user_leads_container_ar = [];

var active_leads_ls_ar = [];


var assign_tab_list_ar = []
var active_tab_list_ar = []
var sitevisit_tab_list_ar = []




function leadsFunctions(){
     assign_tab_list_ar = [], active_tab_list_ar = [],sitevisit_tab_list_ar = [],statusCLEE= []
    get_assign_values()
     $(".head_buttons").click(leads_header_btn)
    
}

var leads_menu_card_obj = {}
function lead_menu_icons(e){
    const select_append_tab = $(e).parent().parent().parent().parent().parent().next();
    console.log(select_append_tab,'see')
    if($(select_append_tab).children().eq(0).hasClass('options_cc_container')){
        $(select_append_tab).empty()
        $(e).children('i')[0].outerHTML = '<i class="dw dw-down-arrow-4"></i>'
    }else{
        refreshCard()
        $(e).children('i')[0].outerHTML = '<i class="dw dw-up-arrow"></i>'
        const loaderSp = `<div style="text-align: center;" class="my-2"><div class="spinner-border text-success" role="status"><span class="visually-hidden">Loading...</span></div></div>`
        const tab = $(e).attr('data-tab');
        const token = $(e).attr('data-modify');
        const card_user = $(e).attr('data-card-owner')
        const obj = { user_name:card_user,token}
        console.log(obj)
        $(e).children('.red_dt_cls').addClass("d-none")
        console.log($(e).parent().parent())
        $(e).parent().parent().next().children('.red_dt_cls').addClass("d-none")
        $(select_append_tab).html(loaderSp);
        // read_update_notification(token)
        // console.log(notification_data_ar,'dddd')
        // notification_data_ar = notification_data_ar.filter((notify)=>{return notify.doc_id != token});
        // $(".notification-active").addClass('d-none')

        modifyIcon_lead(obj).then((lead_data)=>{
            console.log(lead_data)
            if(lead_data.status == true){
                const append_options_container = leads_modify_container(lead_data.data,tab);
                $(select_append_tab).html(append_options_container);
                leads_menu_card_obj = lead_data.data;
                const card =  $(e).parent().parent().parent().parent().parent().parent();
                const cardparent = $(e).parent().parent().parent().parent().parent().parent().parent();
                console.log(cardparent,card)
                window.setTimeout(function(){
                    var a = card[0].offsetTop
                    $(cardparent).stop().animate({ scrollTop: a},10);
                  },100);
            }else{

                alertify.alert("!Message","Please Try Again....");
            }
        })




    }

}

/* ----------------------- LEADS FUNCTIONS START HERE ----------------------- */


function makeLeadsCard(leadTL,tab){
    
    let followUpDate; 
    if(!(leadTL.lead_followup_date == "Lead Completed" || leadTL.lead_followup_date == "Lead Dead")){
        if(leadTL.lead_followup_date["toDate"]){
            followUpDate  = leadTL.lead_followup_date["toDate"]();
        }else{
            followUpDate  = new Date(leadTL.lead_followup_date._seconds*1000);
            console.log(followUpDate)
        }
        
    }
    let sitevisitDate;
    if(leadTL.lead_card_status ==  "Completed"){
        // console.log(leadTL.lead_site_visit_details.lead_scheduled_on['toDate'],444444444444)
        if(leadTL.lead_site_visit_details.lead_scheduled_on['toDate']){
            sitevisitDate =   leadTL.lead_site_visit_details.lead_scheduled_on['toDate']()
        }else{
            sitevisitDate  = new Date(leadTL.lead_site_visit_details.lead_scheduled_on._seconds*1000);
        }
    }

    let deadDate;
    if(leadTL.lead_card_status ==  "Closed"){
        console.log(leadTL)
        if(leadTL.lead_dead_on["toDate"]){
            deadDate  = leadTL.lead_dead_on["toDate"]();
        }else{
            deadDate  = new Date(leadTL.lead_dead_on._seconds*1000);
        }
    }
     deadDate = new Date(deadDate).toDateString()
    followUpDate = new Date(followUpDate).toDateString();
    sitevisitDate = new Date(sitevisitDate).toDateString();
    var leadCard =  `<li class=" card-box mb-2   border-bottom card_template_main col-xl-7" data-card-container-${tab}="${leadTL.token}">
    <div class="d-flex align-items-center justify-content-between">
        <div class="name-avatar d-flex align-items-center ml-2">
            <div>
                <div>
                    <div data-modify="${leadTL.token}" data-tab="${tab}" data-card-owner="${leadTL.lead_owner}">
                        <span class="menu_tag_class" onclick="lead_menu_icons(this)" data-modify="${leadTL.token}" data-tab="${tab}" data-card-owner="${leadTL.lead_owner}">
                            <i class="dw dw-down-arrow-4"></i>
                            <div class="red_dt_cls d-none" style="transform: translate(15px, -20px);"></div>
                        </span>

                    </div>
                </div>
                <div class="cta flex-shrink-0 mx-3 chat_menu_cls" data-modify="Chat" data-chat-token="${leadTL.token}">
                    <div class="red_dt_cls d-none bg-success" style="transform: translate(0px, -20px);"></div>
                </div>
            </div>
            <div class="txt">
                <div>
                    <span class="badge badge-pill badge ${leadTL.lead_card_status.toLowerCase()}_badge_cls" style=" background-color: rgb(231, 235, 245);">${leadTL.lead_card_status}</span>
                    <span class="badge badge-pill badge ${leadTL.lead_card_type.toLowerCase()}_badge_cls mx-1" style=" background-color: rgb(231, 235, 245);">${leadTL.lead_card_type}</span>
                    <span class="badge badge-pill text-dark badge  mx-1" style=" background-color: rgb(231, 235, 245);">${leadTL.lead_client_status}</span>`;
                    if(tab == "search"){
                        leadCard +=  `<span class="badge badge-pill text-dark badge  mx-1" style=" background-color: rgb(231, 235, 245);">${leadTL.lead_owner}</span>`;
                    }
                    if(leadTL.lead_no_of_days != 0){
                       leadCard += `<span class="badge badge-pill text-dark badge  mx-1" style=" background-color: rgb(231, 235, 245);font-size:10px !important;">No.Of.Days ${leadTL.lead_no_of_days}</span>`;
                    }
                    if(leadTL.lead_remainder){
                        leadCard += `<span class="badge badge-pill  badge-primary text-white  mx-1" style="font-size:10px !important;">${leadTL.lead_remainder}</span>`;
                    }
                    if(leadTL.delay){
                        if(leadTL.delay != ""){
                            leadCard += `<span class="badge badge-pill  badge-danger text-white  mx-1" style="font-size:8px !important;">${leadTL.delay}</span>`;
                        }
                    }
                    if(leadTL.lead_missed_call_details.length > 0){
                        leadCard += `<span class="badge badge-pill  badge-danger text-white  mx-1" style="font-size:10px !important;"><i class="icon-copy bi bi-telephone-inbound-fill"></i></span>`;
                    }
                    

                leadCard +=  `</div>
                <div class=" weight-600 card_info_text my-1">${leadTL.lead_client_name}</div>
                <div class="font-12 weight-500 card_schedule_date" style="color: rgb(79 78 82);">`
             if(leadTL.lead_card_status == "Completed"){
                leadCard +=   `<span>
                  <span><b class="text-success">Site visit schedule Date</b> : ${sitevisitDate}</span>
              </span>`
             }else if(leadTL.lead_card_status == "Pending" || leadTL.lead_card_status == "Scheduling" ){
                leadCard +=   `<span>
                  <span><b class="text-success">FollowUp Date</b> : ${followUpDate}</span>
              </span>`
             }else if(leadTL.lead_card_status == "Closed"){
                leadCard +=   `<span>
                  <span><b class="text-success">Dead On Date</b> : ${deadDate}</span>
              </span>`
             }
                leadCard +=  `</div>
            </div>
        </div>
    </div>
    <div class="options_append_tab "></div>
    </li>`;
    return leadCard;
}



function leads_modify_container(leadTL,tab){
    console.log(leadTL,tab)
  var leadTh = `<div class="options_cc_container"><div class="accordion accordion-flush" id="leads_expant_box_container">
  <div class="accordion-item">
      <h2 class="accordion-header" id="client_box_container_cc">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#client_info_container_box" aria-expanded="false" aria-controls="client_info_container_box">
              Client Details
          </button>
      </h2>
      <div id="client_info_container_box" class="accordion-collapse collapse" aria-labelledby="client_box_container_cc" data-bs-parent="#leads_expant_box_container">
          <div class="accordion-body">
              <div class="client_info_table_container">
                  <table class="table table-striped client_info_table">
                      <tbody>
                          <tr>
                              <th>Client Name</th>
                              <td>${leadTL.lead_client_name}</td>
                          </tr>
                          <tr>
                              <th>Status</th>
                              <td>${leadTL.lead_client_status}</td>
                          </tr> 
                          <tr>
                                <th>Received Date</th>
                                <td>${leadTL.lead_receive_date.toDate().toDateString()}</td>
                            </tr>
                            <tr>
                                <th>Card Owner</th>
                                <td>${leadTL.lead_owner}</td>
                            </tr>`
                          leadTL.lead_client_phone_numbers.forEach((num,i)=>{
                            if(num.isd != ""){
                                leadTh +=  `<tr>
                              <th>ISD - ${i+1}</th>
                              <td>${num.isd}</td>
                           </tr>`
                            }
                            leadTh +=  `<tr>
                              <th>Phone.No - ${i+1}</th>
                              <td>${num.number}</td>
                           </tr>`
                          })
                          leadTL.lead_email_id.forEach((email,i)=>{
                            leadTh +=  `<tr>
                              <th>Email - ${i+1}</th>
                              <td>${email}</td>
                           </tr>`
                          })
                          if(leadTL.lead_project != ""){
                            leadTh +=  `<tr>
                            <th>Project</th>
                              <td>${leadTL.lead_project}</td>
                           </tr>`
                          }
                          if(leadTL.lead_flat_type != ""){
                            leadTh +=  `<tr>
                            <th>Type</th>
                              <td>${leadTL.lead_flat_type}</td>
                           </tr>`
                          }
                          if(leadTL.lead_budget != ""){
                            leadTh +=  `<tr>
                            <th>Project</th>
                              <td>${leadTL.lead_budget}</td>
                           </tr>`
                          }
                          if(leadTL.lead_squre_feet != ""){
                            leadTh +=  `<tr>
                            <th>Project</th>
                              <td>${leadTL.lead_squre_feet}</td>
                           </tr>`
                          }
                          leadTL.lead_source.forEach((srcD,i)=>{
                            leadTh +=  `<tr>
                              <th>Main Source- ${i+1}</th>
                              <td>${srcD.main }</td>
                           </tr>
                           <tr>
                              <th>Sub Source - ${i+1}</th>
                              <td>${srcD.sub}</td>
                           </tr>`
                          })


                          leadTh +=   `</tbody>
                  </table>
              </div>
          </div>
      </div>
  </div>
  <div class="accordion-item">
      <h2 class="accordion-header" id="action_icons_container_cc">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#action_icons_container_box" aria-expanded="true" aria-controls="action_icons_container_box">
              Actions
          </button>
      </h2>
      <div id="action_icons_container_box" class="accordion-collapse collapse show" aria-labelledby="action_icons_container_cc" data-bs-parent="#leads_expant_box_container">
          <div class="accordion-body">
              <div class="leads_icons_container">
                  <div class="container">
                      <div class="d-flex  text-center leads_actions_icons_list" data-token="${leadTL.token}" data-lead-owner="${leadTL.lead_owner}" data-tab="${tab}">
                          <div class="m-1 leads_action_icon conversations_icons_box" data-icon-name="conversations" onclick="leads_icons(this)">
                              <div class="lead_cl_icon">
                                  <i class="icon-copy dw dw-chat-4"></i>
                              </div>
                              <div class="lead_cl_text">Conversation</div>
                          </div>`
                          if(tab == "assigned"){
                            leadTh += `<div class=" m-1 leads_action_icon brochure_icons_box" data-icon-name="brochure" onclick="leads_icons(this)">
                                <div class="lead_cl_icon">
                                    <i class="icon-copy dw dw-folder-28"></i>
                                </div>
                            <div class="lead_cl_text">brochure</div>
                         </div>
                         `
                          leadTL.lead_client_phone_numbers.forEach((num,i)=>{
                            leadTh += `
                            <a target="iframe_a" href="https://open.pulsework360.com/sidd_callapi.php?token=d310d5288060f4180fd860c70b9692f2&agent_number=${telecaller_details[0].agent_number}&pwd=${telecaller_details[0].password}&customer_number=${num.number.toString().trim()}" class=" m-1 leads_action_icon call_icons_box" data-icon-name="complete" title="${num.number}" data-num="${num.number}" onclick="leads_icons(this)">
                            <div class="lead_cl_icon">
                                <i class="icon-copy dw dw-phone-call"></i>
                            </div>
                             <div class="lead_cl_text">Call - ${i+1}</div>
                         </a>`
                          })
                          }
                          if(tab == "assigned" || tab == "active"){
                            leadTh +=   `<div class=" m-1 leads_action_icon complete_icons_box" data-icon-name="complete" onclick="leads_icons(this)">
                                <div class="lead_cl_icon">
                                    <i class="icon-copy bi bi-patch-check-fill"></i>
                                </div>
                                <div class="lead_cl_text">Complete</div>
                            </div>
                            <div class=" m-1 leads_action_icon addinfo_icons_box" data-icon-name="addinfo" onclick="leads_icons(this)">
                              <div class="lead_cl_icon">
                                  <i class="icon-copy dw dw-add"></i>
                              </div>
                              <div class="lead_cl_text">Add Info</div>
                          </div>`
                          }else if(tab == "search" && leadTL.lead_card_status != 'Closed' ){
                            leadTh +=   `<div class=" m-1 leads_action_icon complete_icons_box" data-icon-name="gotocard" onclick="leads_icons(this)">
                                <div class="lead_cl_icon">
                                    <i class="icon-copy bi bi-patch-check-fill"></i>
                                </div>
                                <div class="lead_cl_text">Go to Card</div>
                            </div>`
                          }else if(tab == "sitevisit" && leadTL.lead_client_status != 'Site Visit Completed' ){
                            leadTh +=   `<div class=" m-1 leads_action_icon complete_icons_box" data-icon-name="visited" onclick="leads_icons(this)">
                            <div class="lead_cl_icon">
                            <i class="icon-copy dw dw-house"></i>
                            </div>
                            <div class="lead_cl_text">Site visited</div>
                        </div>`
                          }else if(leadTL.lead_card_status == "Closed" &&  leadTL.lead_owner == logUserDatas.emp_name){
                            leadTh +=   `<div class=" m-1 leads_action_icon complete_icons_box" data-icon-name="ativeDead" onclick="leads_icons(this)">
                                <div class="lead_cl_icon">
                                <i class="icon-copy dw dw-share-2"></i>
                                </div>
                                <div class="lead_cl_text">Active Lead</div>
                            </div>`
                          }
           leadTh +=`</div>
                  </div>
              </div>
          </div>
      </div>
  </div>

</div></div>`;


return leadTh;
}



function lead_modify_card(card_data,tab){
    console.log(card_data,tab)
    const wDcard = card_data[0]
    var modify_make;
    if(tab == "assigned"){
        modify_make = makeLeadsCard(wDcard,tab)
    }else if(tab == "active"){
        modify_make = makeLeadsCard(wDcard,tab)
    }
    console.log(tab,wDcard.token)
    const find_tag = $(`.card_template_main[data-card-container-${tab}=${wDcard.token}]`);
    console.log(find_tag)
    if(find_tag.length > 0){
        find_tag[0].outerHTML = modify_make;
        if(tab == 'assigned'){
            assign_tab_list_ar = assign_tab_list_ar.map((rep)=>{
                if(rep.token == wDcard.token){
                    return wDcard
                }else{
                    return rep
                }
            })
            lead_assigned_tab_set_count()
        }else if(tab == "active"){
            active_tab_list_ar = active_tab_list_ar.map((rep)=>{
                if(rep.token == wDcard.token){
                    return wDcard
                }else{
                    return rep
                }
            })
            lead_acitve_tab_set_count()
        }
        
       
    }
    console.log(find_tag,"dfadsf")
}

function deleted_lead_all(data,tab) {
    $(`.card_template_main[data-card-container-${tab}=${data.token}]`).remove();
    if(tab == "assigned"){
        assign_tab_list_ar = assign_tab_list_ar.filter((eTask)=>{return eTask.token != data.token})
        
    }else if(tab == "active"){
        active_tab_list_ar = active_tab_list_ar.filter((eTask)=>{return eTask.token != data.token})
    }
    
    const pard = Array.from($(`#${tab}_card_list_container`).children('.card_template_main'));
    if(pard.length == 0){
        $(`#${tab}_card_list_container`).html(no_record);
    }
    if(tab == "active"){
        lead_acitve_tab_set_count()
    }else if(tab == 'assigned'){
        lead_assigned_tab_set_count()
    }
   
}


function lead_acitve_tab_set_count(){
    const status_list = active_tab_list_ar;
    const lead_status_obj ={cold:[],warm:[],hot:[],reenquired:[]};
    const leadCard_status_obj = {pending:[],scheduling:[]}
    const missed = []
    status_list.filter((status_list)=>{
        if(status_list.lead_client_status == "Cold" ||status_list.lead_client_status == "Warm" || status_list.lead_client_status == "Hot" || status_list.lead_client_status == "Re-Enquired"){
            lead_status_obj[status_list.lead_client_status.toLowerCase().replaceAll(" ","_").replaceAll("-","")].push((status_list))
        }
        if(status_list.lead_card_status == "Pending" || status_list.lead_card_status == "Scheduling"){
            leadCard_status_obj[status_list.lead_card_status.toLowerCase()].push(status_list)
       }
       if(status_list.lead_missed_call_details.length > 0){
        missed.push(status_list)
       }
       
    });
    const status_D = Object.keys(lead_status_obj);
    let dcD = 0
    status_D.filter((key_status)=>{
        dcD += lead_status_obj[key_status].length
        $(`.active_count_list_${key_status}`).text(lead_status_obj[key_status].length)
    })
    const status_DC = Object.keys(leadCard_status_obj);
    status_DC.filter((key_status)=>{
        $(`.active_count_list_${key_status}`).text(leadCard_status_obj[key_status].length)
    })
    $(".active_count_list_missed").text(missed.length)
    $('.active_count_list_total').text(dcD)
}
function lead_assigned_tab_set_count(){
    const status_list = assign_tab_list_ar;
    const lead_status_obj ={cold:[],warm:[],hot:[],reenquired:[]};
    const leadCard_status_obj = {pending:[],scheduling:[]}
    const missed = []
    status_list.filter((status_list)=>{
        if(status_list.lead_client_status == "Cold" ||status_list.lead_client_status == "Warm" || status_list.lead_client_status == "Hot" || status_list.lead_client_status == "Re-Enquired" ){
            lead_status_obj[status_list.lead_client_status.toLowerCase().replaceAll(" ","_").replaceAll("-","")].push(status_list);
        }
        if(status_list.lead_card_status == "Pending" || status_list.lead_card_status == "Scheduling"){
             leadCard_status_obj[status_list.lead_card_status.toLowerCase()].push(status_list)
        }
        if(status_list.lead_missed_call_details.length > 0){
            missed.push(status_list)
        }
    });
    const status_D = Object.keys(lead_status_obj);
    let dcD = 0
    status_D.filter((key_status)=>{
        dcD += lead_status_obj[key_status].length
        $(`.status_count_s_${key_status}`).text(lead_status_obj[key_status].length)
    })
    const status_DC = Object.keys(leadCard_status_obj);
    status_DC.filter((key_status)=>{
        $(`.status_count_s_${key_status}`).text(leadCard_status_obj[key_status].length)
    })

   $(".status_count_s_missed").text(missed.length)

    $('.status_count_s_total').text(dcD)
}

function lead_sitevisit_tab_set_count(){
    const status_list = sitevisit_tab_list_ar;
    const lead_status_obj ={sitevisitscheduled:[],sitevisitcompleted:[]};
    status_list.filter((status_list)=>{
        if(status_list.lead_client_status == "Site Visit Scheduled" ||status_list.lead_client_status == "Site Visit Completed"){
            lead_status_obj[status_list.lead_client_status.toLowerCase().replaceAll(" ","").replaceAll("-","")].push(status_list);
        }
    });
    const status_D = Object.keys(lead_status_obj);
    status_D.filter((key_status)=>{
        $(`.sitevisit_count_list_${key_status}`).text(lead_status_obj[key_status].length)
    })
}


function makeLeadActiveCard(leadAr,callback,empty_count){
    const appengingTag =  $("#active_card_list_container")
    remove_no_RL(appengingTag)
    if(empty_count){
        active_tab_list_ar = [];
    }

    if(leadAr.length ==0){
        $(appengingTag).html(no_record);
    }else{
        leadAr.forEach((task_make_card)=>{
        active_tab_list_ar.push(task_make_card);
        const makeCard = makeLeadsCard(task_make_card,'active');
        $(appengingTag).append(makeCard);
       });

       if(callback != false){
        const select_card =  $(`[data-card-container-pending=${callback.notification_data.doc_id}]`);
        // moving_card("#assigned_card_list_container",select_card);
       }
    }
    lead_acitve_tab_set_count()

}

function makeLeadAssignCard(leadAr,callback,empty_count){
    const appengingTag =  $("#assigned_card_list_container")
    remove_no_RL(appengingTag)
    if(empty_count){
        assign_tab_list_ar = [];
    }

    if(leadAr.length ==0){
        $(appengingTag).html(no_record);
    }else{
        leadAr.forEach((task_make_card)=>{
        assign_tab_list_ar.push(task_make_card);
        const makeCard = makeLeadsCard(task_make_card,'assigned');
        $(appengingTag).append(makeCard);
       });

       if(callback != false){
        const select_card =  $(`[data-card-container-pending=${callback.notification_data.doc_id}]`);
        // moving_card("#assigned_card_list_container",select_card);
       }
    }
    lead_assigned_tab_set_count()

}

function makeLeadSitevisitCard(leadAr,callback,empty_count){
    const appengingTag =  $("#sitevisit_card_list_container")
    remove_no_RL(appengingTag)
    if(empty_count){
        sitevisit_tab_list_ar = [];
    }

    if(leadAr.length ==0){
        $(appengingTag).html(no_record);
    }else{
        leadAr.forEach((task_make_card)=>{
        sitevisit_tab_list_ar.push(task_make_card);
        const makeCard = makeLeadsCard(task_make_card,'sitevisit');
        $(appengingTag).append(makeCard);
       });

       if(callback != false){
        const select_card =  $(`[data-card-container-sitevisit=${callback.notification_data.doc_id}]`);
        // moving_card("#assigned_card_list_container",select_card);
       }
    }
    lead_sitevisit_tab_set_count()
}


function makeLeadSearchCard(leadAr){
    
    const appengingTag =  $("#search_card_list_container")
    remove_no_RL(appengingTag)
   
    if(leadAr.length ==0){
        $(appengingTag).html(no_record);
    }else{
        leadAr.forEach((task_make_card)=>{
            console.log(task_make_card)
        sitevisit_tab_list_ar.push(task_make_card);
        const makeCard = makeLeadsCard(task_make_card,'search');
        $(appengingTag).append(makeCard);
       });       
    }
    // lead_sitevisit_tab_set_count()
}













function leads_header_btn(){
    let btnType = $(this).attr('data-modal')
     if(btnType == "create"){
        $('.hD_element').css("display",'none')
     }

    $(`#${btnType}_leads_modal_form`)[0].reset();
    $(`#${btnType}_leads_modal`).modal("show");
}









function create_leads(e){
    const formValidations = add_lead_validFrom();
    if(formValidations.status == true){
      const formData_obj = formValidations.formAr;
      const sub = {owner_name:logUserDatas.emp_name,manager:logUserDatas.manager}
      $(e).html(button_loader)
      addfreshleads(formData_obj,sub).then((de)=>{
        if(de.status == true){
         $(e).html("Submit")
         $("#create_leads_modal").modal("hide")
         alertify.success("Lead added successfully")
        }
      })
     
    }
}

function add_lead_validFrom(){
    const getForm = $("#create_leads_modal_form");
    var formData = new FormData(getForm[0]);
    var form_object = {};
    var projcetAr = Array.from($(".project_c_box"));
    var getProjcet = []
     projcetAr.filter((prd)=>{
        const rE = $(prd)[0].checked;
        if(rE == true){
            const va = $(prd)[0].value
            getProjcet.push(va)
        }
    })
    form_object.client_name = toNameCase(formData.get("client_name"))
    form_object.isd_1 = formData.get("isd_1")
    form_object.phone_1 = formData.get("phone_1")
    form_object.isd_2 = formData.get("isd_2")
    form_object.phone_2 = formData.get("phone_2")
    form_object.email_1 = formData.get("email_1")
    form_object.email_2 = formData.get("email_2")
    form_object.project_name = formData.get("project_name")
    form_object.budg = formData.get("budg")
    form_object.type = formData.get("type")
    form_object.squ = formData.get("squ")
    form_object.project_name = formData.get("project_name")
    form_object.main_src_1 = formData.get("main_src_1")
    form_object.sub_src_1 = formData.get("sub_src_1")
    form_object.main_src_2 = formData.get("main_src_2")
    form_object.sub_src_2 = formData.get("sub_src_2")
    form_object.client_status = formData.get("client_status")
    form_object.remarks = formData.get("remarks");
    form_object.dead_remark =  formData.get('dead_remarks');
    form_object.followUp = formData.get("followUpdate_date");
    form_object.locations = formData.get('dead_location')
    // if(getProjcet.length == 0){
    //     form_object.project_name = "";
    // }else{
    //     form_object.project_name = getProjcet;
    // }
    if(form_object.client_name == ""){
       alertify.error("Please enter client name");
       return {status:false}
    }else if(form_object.isd_1 == ""){
        alertify.error("Please enter ISD Number")
        return {status:false}
    }else if(form_object.phone_1 == ""){
        alertify.error("Please enter Phone Number")
        return {status:false}
    }else if(form_object.phone_1.length < 9){
        alertify.error("Invalid phone number")
        return {status:false}
    }else if(form_object.email_1 == ""){
        alertify.error("Please enter email id")
        return {status:false}
    }else if(form_object.email_1.includes("@") == false){
        alertify.error("Invalid email id")
        return {status:false}
    }else if(form_object.project_name == "" || form_object.project_name == null ){
        alertify.error("Please select project name")
        return {status:false}
    }else if(form_object.budg == ""){
        alertify.error("Please select Budget range")
        return {status:false}
    }else if(form_object.type == ""){
        alertify.error("Please select type")
        return {status:false}
    }else if(form_object.squ == ""){
        alertify.error("Please Square feet")
        return {status:false}
    }else if(form_object.main_src_1 == ""){
        alertify.error("Please selecet main source")
        return {status:false}
    }else if(form_object.sub_src_1 == ""){
        alertify.error("Please select sub source")
        return {status:false}
    }else if(form_object.client_status == ""){
        alertify.error("Please select client status")
        return {status:false}
    }else if(form_object.remarks == ""){
        alertify.error("Please enter remarks")
        return {status:false}
    }if(form_object.client_status != "Dead" && form_object.followUp == ""){
        alertify.error("Please selecet followup date")
        return {status:false}
    }else if(form_object.client_status == "Dead" && form_object.dead_remark == ""){
        alertify.error("Please selecet dead remarks")
        return {status:false}
    }else if(form_object.dead_remark == "NI Location" && form_object.locations == "" ){
        alertify.error("Please selecet  locations")
        return {status:false}
    }else{
        return {status:true,formAr:form_object}
    }

}



function leads_icons(e){
  Array.from($(".leads_modifty_modal_form")).forEach((fE)=>{$(fE)[0].reset()})
  const getIcon = $(e).attr('data-icon-name');
  const token = $(e).parent().attr('data-token');
  const lead_owner = $(e).parent().attr("data-lead-owner");
  const cardD = leads_menu_card_obj;
  console.log(cardD)
  if(getIcon == 'call'){
      const nmD = $(e).attr('data-num')
    console.log(cardD.lead_client_name,nmD)
    $(".call_name").val(cardD.lead_client_name)
    $(".call_number").val(nmD)
    // callingRemarkDD(cardD)
  }else if(getIcon == "brochure"){
     let num_radio ="";
     let email_radio = ""
     cardD.lead_client_phone_numbers.forEach((num,i)=>{
        num_radio +=`<div class="custom-control custom-radio mb-5">
        <input type="radio" id="sm-${i}" name="send_to_num_radio" class="custom-control-input  sendToNumCls" value="${num.number}">
        <label class="custom-control-label" for="sm-${i}">${num.number}</label>
      </div>`
     })
     $("#send_br_num_ap").html(num_radio)
     if(cardD.lead_email_id.length == 0){
      
     }else{
        cardD.lead_email_id.forEach((email,i)=>{
            email_radio +=`<div class="custom-control custom-radio mb-5">
                        <input type="radio" id="se-${i}" name="send_to_mail_radio" value="${email}" class="custom-control-input sendToEmCls" >
                        <label class="custom-control-label" for="se-${i}">${email}</label>
                        </div>`
         })
         $("#send_br_email_ap").html(email_radio)
     }
    
  }else if(getIcon == "addinfo"){
    $("[name=client_name_info]").val(cardD.lead_client_name)
    if(cardD.lead_project != ""){
        $(`.project_c_box_add[value=${cardD.lead_project}]`).attr("checked",true)
    }
  }else if(getIcon == 'conversations'){
    leadCChatRender()
  }else if(getIcon == "complete"){
    $('.dy_base_box_completed').css("display",'none')
    callingRemarkDD(cardD)
  }else if(getIcon == "gotocard"){
    if(lead_owner == logUserDatas.emp_name){
       const tab = leads_menu_card_obj.lead_on_tab.toLowerCase().replaceAll(" ","");
       if(tab == "active" || tab == "assigned" || tab == "sitevisit"){
        auto_move_tab_leads(tab)
        const select_card =  $(`[data-card-container-${tab}=${token}]`);
        moving_card(`#${tab}_card_list_container`,select_card);
       }
    }else{
        alertify.error(`Card owner ${lead_owner}`)
    }

  }else if(getIcon == "visited"){
    setSiteCompleted(cardD)
  }else if(getIcon == "ativeDead"){
    const deadTo =  leads_menu_card_obj
     deadTo.lead_card_status = "Pending"
     deadTo.lead_client_status = "Cold"
     deadTo.lead_followup_date = new Date()
     deadTo.lead_on_tab = "Assigned"
     deadTo.lead_card_type = "Assigned",
     deadTo.lead_receive_type = "Re-active"
     const tk = deadTo.token
     delete deadTo.token
     re_active_lead(deadTo,tk,e)
  }

  $(`#lead_${getIcon}_modity_modal`).modal("show")
}



async function re_active_lead(daE,token,element){
    const lead = daE
    const ded =   await db.collection('sotfwares').doc("active_leads_database").collection(lead.lead_owner).add(lead);
     const  id = ded.id
     await db.collection('sotfwares').doc("dead_leads_database").collection(lead.lead_owner).doc(token).delete()
    const addDeadLead = {
        "id": lead.lead_id,
        "owner_name": lead.lead_owner,
        "manager": lead.lead_manager,
        "client_name": lead.lead_client_name.trim(),
        "isd1": lead.lead_client_phone_numbers[0].isd,
        "ph1": lead.lead_client_phone_numbers[0].number,
        "isd2": lead.lead_client_phone_numbers[1] ? lead.lead_client_phone_numbers[1].isd : "",
        "ph2": lead.lead_client_phone_numbers[1] ? lead.lead_client_phone_numbers[1].number : "",
        "mail1": lead.lead_email_id[0] ? lead.lead_email_id[0] : "",
        "mail2": lead.lead_email_id[1] ? lead.lead_email_id[1] : "",
        "project": lead.lead_project,
        "type": lead.lead_flat_type,
        "sqFt": lead.lead_squre_feet,
        "main1": lead.lead_source[0].main,
        "sub1": lead.lead_source[0].sub,
        "main2": lead.lead_source[1] ? lead.lead_source[1].main : "",
        "sub2": lead.lead_source[1] ? lead.lead_source[1].sub : "",
        "budget": lead.lead_budget,
        "client_status": lead.lead_client_status,
        "follup":new Date(),
        "remark": "",
        "cardMKType":"Re-acitve",
        "cardAssignType":"Self"
    }
    add_fresh_leads(addDeadLead)
    $(element).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().remove()
    auto_move_tab_leads("assigned")
    const select_card =  $(`[data-card-container-assigned=${id}]`);
    moving_card(`#assigned_card_list_container`,select_card);
    alertify.success("Completed")
}








function setSiteCompleted(data){
    $('.siteCompletedForm')[0].reset()
    $(".compleateSV_base").css("display","none")
  $('.sitevisitCompleteClient').val(data.lead_client_name)
  $('.sitevisitScheduleData').val(data.lead_site_visit_details.lead_scheduled_on.toDate().toDateString())
}


function sitevisitCompleteDD(e){
    const eed = leads_menu_card_obj
   const remarE = $('#siteComRemark').val()
    const clienEt = $("#completeSelectStatus").val();
    if(clienEt == ""){
      alertify.error("Please select client status")
    }else{ 
        if(clienEt == "Site Visit Completed"){
            const complete_date  = $('#siteCDate').val();
            if(complete_date == ""){
                alertify.error("Please select completed date")
             }else{
                const ofB = {date:complete_date,remark:remarE}
                $(e).html(button_loader)
                  siteCompleteDD(eed,ofB).then(()=>{
                     $(e).html("Confirm")
                     $(`.card_template_main[data-card-container-sitevisit=${eed.token}]`).remove()
                     $('#lead_visited_modity_modal').modal("hide")
                     alertify.success("Completed")
                  })
                  const seEE = dateToStr(new Date())
                  const seCOMP = dateToStr(complete_date)
                  const speadDSO = {"Follow Up Date":"Lead Completed","Client Status":"Site Visit Completed","Card Status":"Completed","worked On":seEE,"Site Visit Status":"Site Visit Completed","SiteVisted Date":seCOMP}
                  const speadTk = eed.lead_id.trim()
                  update_spreadSheet(speadDSO,speadTk)
             }
        }else if(clienEt != "Dead"){
            const schedule_date  = $('#rescheCDate').val();
            if(schedule_date == ""){
                alertify.error("Please select reschedule date")
             }else{
                const ofB = {status:clienEt,date:schedule_date,remark:remarE}
                $(e).html(button_loader)
                  siteRescheduleDD(eed,ofB).then(()=>{
                     $(e).html("Confirm")
                     $(`.card_template_main[data-card-container-sitevisit=${eed.token}]`).remove()
                     $('#lead_visited_modity_modal').modal("hide")
                     alertify.success("Completed")
                  })
                  removeSaleDatabase(eed.token)
                  const seEE = dateToStr(schedule_date)
                  const speadDSO = {"Follow Up Date":seEE,"Client Status":clienEt,"Card Status":"Pending","worked On":new Date().toLocaleDateString()}
                  const speadTk = eed.lead_id.trim()
                  update_spreadSheet(speadDSO,speadTk)
                  add_spreadSheet_chat({id:speadTk,owner:logUserDatas.emp_name,message:remarE})
             }
        }else if(clienEt == "Dead"){
            $(e).html(button_loader)
             const e = {remark:remarE}
            lead_dead_subD(dead_data, eed).then(()=>{
                $(e).html("Confirm")
                     $(`.card_template_main[data-card-container-sitevisit=${eed.token}]`).remove()
                     $('#lead_visited_modity_modal').modal("hide")
                     alertify.success("Completed")
            })
            removeSaleDatabase(eed.token)
            const worked_d = dateToStr(new Date())
                const speadDSO = {"Follow Up Date":"Lead Dead","Client Status":"Dead","Card Status":"Completed","worked On":worked_d,"Remarks":remarE}
                const speadTk = eed.lead_id.trim()
                add_dead_spreadSheet(speadDSO,speadTk)
                add_spreadSheet_chat({id:speadTk,owner:logUserDatas.emp_name,message:remarks})
        }

    }
    if(complete_date == ""){
       alertify.error("Please select completed date")
    }else{
         $(e).html(button_loader)
         $('#lead_visited_modity_modal').modal("hide")
         siteCompleteDD(eed,complete_date).then(()=>{
            $(e).html("Confirm")
            $(`.card_template_main[data-card-container-sitevisit=${eed.token}]`).remove()
            $('#lead_visited_modity_modal').modal("hide")
            alertify.success("Completed")
         })
       
    }
    
}


function sendWhatsapp(e){
    const selectNum = Array.from($('.sendToNumCls'));
    const selectMessa = Array.from($('.sendTypeMessage'));
    const customsMsg = $('.whatsapp_customs_msgg');
    let sendD ;
    let typemessage;
   selectNum.filter((radio)=>{
        const eRr = $(radio)[0].checked;
        const erV = $(radio).val();
       if(eRr == true){
       sendD = erV 
        return erV;
       }
    });
    selectMessa.filter((radio)=>{
        const eRr = $(radio)[0].checked;
        const erV = $(radio).val();
       if(eRr == true){
        typemessage = erV 
        return erV;
       }
    });
    if(typemessage != "auto" && $(customsMsg).val() == ""){
           alertify.error("Please enter message")
      }else{
        if(sendD == undefined){
            alertify.error("Please select number")
        }else{
             const eV = $(e);
             $(eV).html(button_loader)
            console.log(sendD)
        }
      }
    

}


function sendEmail(e){
    const selectId= Array.from($('.sendToEmCls'));
    let email;
    selectId.filter((radio)=>{
        const eRr = $(radio)[0].checked;
        const erV = $(radio).val();
       if(eRr == true){
        email = erV 
        return erV;
       }
    });
   if(email == undefined){
    alertify.error("Please select email id")
   }else{
    const eV = $(e);
    $(eV).html(button_loader);
    console.log(email)
   }
    
}



function leadsAddInfo(e){
    const formE = new FormData($('#add_info_form')[0])
    const formEb = {};
    formEb.cname = formE.get('client_name_info')
    formEb.cnumber = formE.get('client_number_info')
    formEb.cemail = formE.get('client_email_info')
    formEb.cproject = formE.get('project_name_add')
    formEb.cbdg = formE.get('bdg_info')
    formEb.ctype = formE.get('type_info')
    formEb.csql = formE.get('sql_info')
    formEb.cisd = formE.get('client_isd_info')
    if(formEb.cproject == null){
        formEb.cproject = ""
    }
    const sudEL = {old_lead:leads_menu_card_obj}
    $(e).html(button_loader);
    adddetails(formEb,sudEL).then((d)=>{
        if(d.status == true){
            $(e).html("Confirm")
            $("#lead_addinfo_modity_modal").modal("hide")
            alertify.success("added succesfully")
        }
    })
    
  console.log(formEb)
}


function complete_select_status(e){
    const statusE = $(e);
    const statusValue = statusE[0].value;
    $('.dy_base_box_completed').css('display',"none")
    if(statusValue != ""){
        $(`#complete_card_${statusValue.toLowerCase().replaceAll(" ","")}`).css("display","block")
    }
}


function oncab(e){
    const thSs = $(e)[0].checked;
    const next = $(e).parent().next();
    if(thSs == true){
     $(next).slideDown()
    }else{
     $(next).slideUp();
    }
}



function lead_call_status(e){
    const complete_f = new FormData($("#call_leads_modal_form")[0]);
    const callER = {};
    callER.status = complete_f.get("calling_status_se");
    callER.remark = complete_f.get("calling_remark");
    callER.reminder = complete_f.get("calling_remainder");
    console.log(callER.reminder)
    const leD = leads_menu_card_obj
    if(callER.reminder != ""){

        var datetime = new Date();
        datetime.setHours(datetime.getHours()+Number(callER.reminder)); 
        callER.reminder = datetime.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
    }
    
    if(callER.status == ""){
        alertify.error("Please select call status")
    }else{
        $(e).html(button_loader);
        console.log(callER,leD)
        callrecord(callER, leD).then((d)=>{
            if(d.status == true){
                $("#lead_call_modity_modal").modal("hide")
                $(e).html("Confirm");
                alertify.success("Added successfully")
            }
        })
        if(callER.remark.trim() != ""){
            add_spreadSheet_chat({id:leD.lead_id,owner:logUserDatas.emp_name,message:callER.remark.trim()})
        }
    }
    

}



function lead_complete_func(e){
    const complete_f = new FormData($("#completeForm")[0]);
    const status = complete_f.get("status");
    const remarks = complete_f.get("complete_remark")
    let  reminder = complete_f.get("calling_remainder");
    const subD = {owner_name:logUserDatas.emp_name,token:leads_menu_card_obj.token}
    const leadSheetId = leads_menu_card_obj.lead_id



    if(reminder != ""){
        var datetime = new Date();
        datetime.setHours(datetime.getHours()+Number(reminder)); 
        reminder = datetime.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
    }


    if(status == ""){
         alertify.error("Please select client status")
    }else if(remarks.trim() == ""){
        alertify.error("Please enter your remarks")
    }else{
        if(status == "Site visit"){
         const addVa = leads_menu_card_obj;
         if(addVa.lead_budget == ""){
            alertify.error("Missing client budget range")
         }else if(addVa.lead_project == ""){
            alertify.error("Missing client project")
         }else if(addVa.lead_flat_type == ""){
            alertify.error("Missing client flat type")
         }else if(addVa.lead_squre_feet == ""){
            alertify.error("Missing client squre feet")
         }else{
         const sitevisit_data = {}
         sitevisit_data.visit_date = complete_f.get('sitevisit_date');
         sitevisit_data.visit_time = complete_f.get('sitevisit_time'); 
         sitevisit_data.remarks = remarks;

         sitevisit_data.cab = complete_f.get("cab_cbox");
         if(sitevisit_data.visit_date == "") return alertify.error("Please select site visit date");
         if(sitevisit_data.visit_time == "") return alertify.error("Please select site visit time");
         if(sitevisit_data.cab == 'Booked'){
            sitevisit_data.cab_address = complete_f.get("cab_address")
            sitevisit_data.cab_land_mark = complete_f.get("cab_land_mark")
            sitevisit_data.cab_map_link = complete_f.get("cab_maplink")
            sitevisit_data.cab_member = complete_f.get("cab_member")
         }
         let dke = Object.values(sitevisit_data);
         const ckE = dke.every((ds)=>{return ds != ""});
         if(ckE){
            $(e).prop("disabled",true)
           $(e).html(button_loader)
           lead_addSite_visit(sitevisit_data,subD).then((d)=>{
            if(d.status == true){
                $(e).html("Confirm")
                $(e).prop("disabled",false)
                $("#lead_complete_modity_modal").modal("hide")
                alertify.success("added succesfully")
                const worked_d = dateToStr(new Date())
                const speadDSO = {"Follow Up Date":"Lead Completed","Client Status":"Site Visit Scheduled","Card Status":"Completed","worked On":worked_d,"Completed Date":worked_d}
                const speadTk = leadSheetId.trim()
                let saleEmple = "";
                if(leads_menu_card_obj.lead_project == 'Greenwood'){
                    saleEmple = "kathiravan"
                }
                const saleData = {
                    "id":leadSheetId,
                    "sitevisitDate":sitevisit_data.visit_date,
                    "client_name":leads_menu_card_obj.lead_client_name,
                    "isd1":leads_menu_card_obj.lead_client_phone_numbers[0].isd,
                    "ph1":leads_menu_card_obj.lead_client_phone_numbers[0].number,
                    "isd2":leads_menu_card_obj.lead_client_phone_numbers[1]?leads_menu_card_obj.lead_client_phone_numbers[1].isd:"",
                    "ph2":leads_menu_card_obj.lead_client_phone_numbers[1]?leads_menu_card_obj.lead_client_phone_numbers[1].number:"",
                    "mail1":leads_menu_card_obj[0]?leads_menu_card_obj[0]:"",
                    "mail2":leads_menu_card_obj[1]?leads_menu_card_obj[1]:"",
                    "project":leads_menu_card_obj.lead_project,
                    "type":leads_menu_card_obj.lead_flat_type,
                    "sqFt":leads_menu_card_obj.lead_squre_feet,
                    "main1":leads_menu_card_obj.lead_source[0].main,
                    "sub1":leads_menu_card_obj.lead_source[0].sub,
                    "main2":leads_menu_card_obj.lead_source[1]?leads_menu_card_obj.lead_source[1].main:"",
                    "sub2":leads_menu_card_obj.lead_source[1]?leads_menu_card_obj.lead_source[1].sub:"",
                    "main3":leads_menu_card_obj.lead_source[2]?leads_menu_card_obj.lead_source[2].main:"",
                    "sub3":leads_menu_card_obj.lead_source[2]?leads_menu_card_obj.lead_source[2].sub:"",
                    "cab_address":sitevisit_data.cab?sitevisit_data.cab_address:"",
                    "cab_land_mark":sitevisit_data.cab?sitevisit_data.cab_land_mark:"",
                    "site_admin":leads_sub_additional_data.sales.sales_admin,
                    "site_manager":leads_sub_additional_data.sales.sales_manager,
                    "tele_name":leads_menu_card_obj.lead_owner,
                    "cab_status":sitevisit_data.cab?"TRUE":"FALSE",
                    "budget":leads_menu_card_obj.lead_budget,
                    "remark":remarks,
                    "saleEmp":saleEmple
                
                }
                update_spreadSheet(speadDSO,speadTk)
                add_spreadSheet_chat({id:speadTk,owner:logUserDatas.emp_name,message:remarks})
                add_sitevisit_sales(saleData)
            }
           })
         }else{
            alertify.error("Site visit form invalid1")
         }
        console.log(sitevisit_data,ckE)
         }
        
        }else if(status == "Reschedule"){
         const reschedule_data = {}
         reschedule_data.remarks = remarks
         reschedule_data.reminder = reminder
         reschedule_data.reshedule_date = complete_f.get("complete_rescheudle_date");
         reschedule_data.reshedule_status= complete_f.get("complete_reschedule_status");
         if(reschedule_data.reshedule_date == "") return alertify.error("Please select reschedule date")
         if(reschedule_data.reshedule_status == "") return alertify.error("Please select client status")
         $(e).html(button_loader)
         $(e).prop("disabled",true)
         lead_reschedule(reschedule_data,subD).then((dW)=>{
            if(dW.status == true){
                $(e).prop("disabled",false)
                $(e).html("Confirm")
                $("#lead_complete_modity_modal").modal("hide")
                alertify.success("added succesfully")
                console.log(reschedule_data)
                const worked_d = dateToStr(new Date())
                const seEE = dateToStr(reschedule_data.reshedule_date)
                const speadDSO = {"Follow Up Date":seEE,"Client Status":reschedule_data.reshedule_status,"Card Status":"Pending","worked On":worked_d}
                const speadTk = leadSheetId.trim()
                update_spreadSheet(speadDSO,speadTk)
                add_spreadSheet_chat({id:speadTk,owner:logUserDatas.emp_name,message:remarks})
            }
         })
        }else if(status == "Dead"){
            const dead_data = {};
            dead_data.remarks = remarks
            dead_data.dead_remark = complete_f.get('complete_dead_remark');
            dead_data.location = complete_f.get('complete_dead_location_r2');
            if(dead_data.dead_remark == "") return alertify.error("Please select dead remark");
            $(e).html(button_loader)
            $(e).prop("disabled",true)
            lead_dead(dead_data,subD).then((d)=>{
                if(d.status == true){
                $(e).prop("disabled",false)
                $(e).html("Confirm")
                $("#lead_complete_modity_modal").modal("hide")
                alertify.success("added succesfully")
                const worked_d = dateToStr(new Date())
                const speadDSO = {"Follow Up Date":"Lead Dead","Client Status":"Dead","Card Status":"Completed","worked On":worked_d,"Remarks":remarks}
                const speadTk = leadSheetId.trim()
                add_dead_spreadSheet(speadDSO,speadTk)
                add_spreadSheet_chat({id:speadTk,owner:logUserDatas.emp_name,message:remarks})
                }
            })

        }
    }
    console.log(complete_f,leadSheetId)
}










/* -------------------- LEADS FILTER FUNTIONS START HERE -------------------- */
function lead_tele_dashboard_fitler(){
    const value = $('#lead_tele_dash_report_select').val();
}


function leads_assign_tele_filter(e){
    const filter_sub = {}
    filter_sub.main_src = $("#leads_assign_tele_main_src").val();
    filter_sub.sub_src = $("#leads_assign_tele_sub_src").val();
    filter_sub.client_status = $("#leads_assign_tele_client_status").val();
    filter_sub.card_status = $("#leads_assign_tele_card_status").val();
    filter_sub.start_date = $("#leads_assign_tele_card_start_date").val();
    filter_sub.end_date = $("#leads_assign_tele_card_end_date").val();
    const proE = Array.from($('.project_c_box_filter_assigned'));
     proE.forEach((roA)=>{
        if($(roA)[0].checked == true){
            filter_sub.project = $(roA).val()
        }
     })
    const sub_details = {card_user:logUserDatas.emp_name,tab:"Assigned"}
    if(filter_sub.card_status == "Custom"){
     if(filter_sub.start_date == ""){
        alertify.error("Please select start date")
     }else if(filter_sub.end_date == ""){
        alertify.error("Please select end date")
     }else{
        fetch_loader_show("#assigned_card_list_container")
        leads_tell_tab_filter(filter_sub,sub_details).then((filteRE)=>{
            $("#assigned_card_list_container").empty()
            if(filteRE.status == true){
             const des = filteRE.data;
             tele_filter_app_data("Assigned",des)
            }
        })
     }
    }else{
       
        fetch_loader_show("#assigned_card_list_container")
        leads_tell_tab_filter(filter_sub,sub_details).then((filteRE)=>{
            $("#assigned_card_list_container").empty()
            if(filteRE.status == true){
             const des = filteRE.data;
             tele_filter_app_data("Assigned",des)
            }
        })
    }
   
}

function tele_filter_app_data(tab,data){
    if(tab == 'Assigned'){
      makeLeadAssignCard(data,false,true)
    }else if(tab == "Active"){
      makeLeadActiveCard(data,false,true)
    }

}






function leads_active_tele_filter(){
    const filter_sub = {}
    filter_sub.main_src = $("#leads_active_tele_main_src").val();
    filter_sub.sub_src = $("#leads_active_tele_sub_src").val();
    filter_sub.client_status = $("#leads_active_tele_client_status").val();
    filter_sub.card_status = $("#leads_active_tele_card_status").val();
    filter_sub.start_date = $("#leads_active_tele_card_start_date").val();
    filter_sub.end_date = $("#leads_active_tele_card_end_date").val();
    const sub_details = {card_user:logUserDatas.emp_name,tab:"Active"}
    const proE = Array.from($('.project_c_box_filter_active'));
     proE.forEach((roA)=>{
        if($(roA)[0].checked == true){
            filter_sub.project = $(roA).val()
        }
     })
     console.log(filter_sub)
    if(filter_sub.card_status == "Custom"){
        if(filter_sub.start_date == ""){
            alertify.error("Please select start date")
        }else if(filter_sub.end_date  == ""){
            alertify.error("Please select end date")
        }else{
            fetch_loader_show("#active_card_list_container")
            leads_tell_tab_filter(filter_sub,sub_details).then((filteRE)=>{
                $("#active_card_list_container").empty()
                if(filteRE.status == true){
                 const des = filteRE.data;
                 console.log(filteRE)
                 tele_filter_app_data("Active",des)
                }
            })
        }
    }else {
        fetch_loader_show("#active_card_list_container")
        leads_tell_tab_filter(filter_sub,sub_details).then((filteRE)=>{
            $("#active_card_list_container").empty()
            if(filteRE.status == true){
             const des = filteRE.data;
             console.log(filteRE)
             tele_filter_app_data("Active",des)
            }
        })
    }

}




function tele_search_lead(e){
    const searchE = $('#tele_search_value').val();
    const typed = $('#tele_search_type').val()
    if(searchE == ""){
       alertify.error("Please enter value...")
    }else{
        const eVe = $(e)
       $(eVe).html(button_loader)
       $(eVe).prop("disabled",true)
       fetch_loader_show("#search_card_list_container")
       const seEc = {type:typed,key:searchE}
    //    const ledAs = leads_sub_additional_data.agent_list;
    console.log(seEc)
       fetch("https://us-central1-nodal-time-327708.cloudfunctions.net/app/api/searchLead",{
        method:"POST",
        body:JSON.stringify(seEc)
       }).then((e)=>{
        e.json().then((ew)=>{
            $(eVe).prop("disabled",false)
            $(eVe).html("Confirm");
            $("#search_card_list_container").empty();
            if(ew.status == true){
                console.log(ew.data)
                makeLeadSearchCard(ew.data)
            }else{
                makeLeadSearchCard([])
            }
            
        },(err)=>{
            alertify.error("Please try again")
            $(eVe).prop("disabled",false)
            $(eVe).html("Confirm");
            makeLeadSearchCard([])
           })
       },(err)=>{
        alertify.error("Please try again")
            $(eVe).prop("disabled",false)
            $(eVe).html("Confirm");
            makeLeadSearchCard([])
       })
      
    }

}

function tele_sitevisti_fitler(){
    const vD = {};
    vD.start_date = $("#sitevisit_filter_start_date").val()
    vD.end_date = $("#sitevisit_filter_end_date").val()
    vD.status =  $("#tele_site_filter_type").val()
    if(vD.start_date == ""){
        alertify.error("Please select end start")

    }else if(vD.end_date == ""){
        alertify.error("Please select end date")
    }else{
        fetch_loader_show("#sitevisit_card_list_container")
        sitevisitCard_filter(vD,logUserDatas.emp_name).then((d)=>{
            $("#sitevisit_card_list_container").empty()
            if(d.status == true){
                makeLeadSitevisitCard(d.data,false,true)
            }
        })
        console.log(vD)
    }
}
/* --------------------- LEADS FILTER FUNTIONS END HERE --------------------- */


/* ---------------------- SELECT BASE EVENTS START HERE --------------------- */
function enablE_client(e){
    const eD = $(e);
    const eDValue = $(eD).val();
    const neXe = $(eD).parent().next();
    $(".base_cs").css('display',"none")
    if(eDValue != ""){
        if(eDValue == "Dead"){
          $(neXe).next().slideDown()
        }else{
            $(neXe).slideDown()
        }
    }else{
        $(neXe).slideUp()
    }
}
/* ----------------------- SELECT BASE EVENTS END HERE ---------------------- */

/* ------------------ SET VALUE ASSIGN FUNCTIONS START HERE ----------------- */
var leads_sub_additional_data;
function get_assign_values(){
    getAdditional_values().then((add_subS)=>{
        console.log(add_subS)
        leads_sub_additional_data = add_subS.data;
        leads_set_values();
    })
}


function leads_set_values(){
    const datas = leads_sub_additional_data;
    setMain_src_sel(datas);
   
}


function select_main_src_set_sub(e){
    const selectEv = $(e);
    const selectVe = $(e).val();
    const appEv = $($(e).attr("data-base-sub"));
    const type = $(e).attr("data-select-type")
    let select ;
    const sub_data = leads_sub_additional_data.source_details;
    console.log(type)
    if(type == "without"){
        select = ` <option selected value="">Choose...</option>`
    }else{
        select = ` <option selected value="All">All</option>`
    }
    if(selectVe == "All" || selectVe == ""){
       $(appEv).html(select)
     }else{
    //    console.log(sub_data)
      const getSubSrc = sub_data.filter((sub)=>{return sub.mainsource == selectVe});
      const datas_sub = getSubSrc[0].subsouce;
      datas_sub.forEach((suD)=>{
        select +=`<option  value="${suD}">${suD}</option>`
      })
      $(appEv).html(select)
     }
    
}


function type_base(e){
    const value = $(e).val();
    const apE = $(e).attr('data-sq')
    let optType = `<option selected="selected" value="">Choose...</option>`
    console.log(value)
    if(value != ""){
        let type  = leads_sub_additional_data.bhk_list.filter((ty)=>{return ty.bhk_type == value});
         type = type[0].sqft
         console.log(type)
        type.forEach((tE)=>{
            optType += `<option  value="${tE}">${tE}</option>`
        })
    }
    $(apE).html(optType)
}




function setMain_src_sel(dataS){
    /* -------------------- GET TELECALLER DETAILS START HERE ------------------- */
    telecaller_details = dataS.agent_list.filter((agent)=>{return agent.user_name == logUserDatas.emp_name});
    console.log(telecaller_details)
    /* ------------------------- GET TELECALLER END HERE ------------------------ */
    /* ----------------------- ADD MAIN SOURCE START HERE ----------------------- */
    const value = dataS.source_details;
    const main_src  = value.map(main => {return main.mainsource});
    let all = `<option value="All">All</option>`;
    let select = `<option value="">choose...</option>`;
    main_src.forEach((d)=>{
        all += `<option value="${d}">${d}</option>`
        select += `<option value="${d}">${d}</option>`
    });
    $('.main_src_select_wd').html(all)
    $('.main_src_ww').html(select);

    /* ----------------------- ADD MAIN SOURCE END HERE ----------------------- */

   /* --------------------------- ADD PROJECT VALUES  START--------------------------- */

    const project_value = dataS.project_list;
    let projec_1="";
    let projec_2="";
    let projec_3=`<div class="custom-control custom-radio mb-5">
    <input checked type="radio" class="custom-control-input project_c_box_filter_assigned " name="project_name_assigned_filter" value="All" id="project-add-assigned-filter-all">
    <label class="custom-control-label weight-400" for="project-add-assigned-filter-all">All</label>
</div>`;
    let projec_4=`<div class="custom-control custom-radio mb-5">
    <input checked type="radio" class="custom-control-input project_c_box_filter_active  " name="project_name_active_filter" value="All" id="project-add-active-filter-all">
    <label class="custom-control-label weight-400" for="project-add-active-filter-all">All</label></div>`;




    project_value.forEach((pro,i)=>{
        projec_1 +=`<div class="custom-control custom-radio mb-5">
        <input  type="radio" class="custom-control-input project_c_box " name="project_name" value="${pro}" id="project-${i}">
        <label class="custom-control-label weight-400" for="project-${i}">${pro}</label>
    </div>`

      projec_2 +=`<div class="custom-control custom-radio mb-5">
      <input type="radio" class="custom-control-input project_c_box_add " name="project_name_add" value="${pro}" id="project-add-${i}">
      <label class="custom-control-label weight-400" for="project-add-${i}">${pro}</label>
  </div>`
      projec_3 +=`<div class="custom-control custom-radio mb-5">
      <input type="radio" class="custom-control-input project_c_box_filter_assigned " name="project_name_assigned_filter" value="${pro}" id="project-add-assigned-filter-${i}">
      <label class="custom-control-label weight-400" for="project-add-assigned-filter-${i}">${pro}</label>
  </div>`
      projec_4 +=`<div class="custom-control custom-radio mb-5">
      <input type="radio" class="custom-control-input project_c_box_filter_active " name="project_name_active_filter" value="${pro}" id="project-add-active-filter-${i}">
      <label class="custom-control-label weight-400" for="project-add-active-filter-${i}">${pro}</label>
  </div>`
    });


    $("#add_leads_project").html(projec_1);
    $("#add_info_project").html(projec_2);
    $("#add_active_filter_project").html(projec_4);
    $("#add_assigned_filter_project").html(projec_3);
   /* --------------------------- ADD PROJECT VALUES  END--------------------------- */
    

   /* ---------------------- ADD BUDGET RANGET START HERE ---------------------- */
  console.log(dataS)
  let bud = dataS.budget_range;
  let budOp = `<option value="" selected>Choose...</option>`
  bud.forEach((budget)=>{
    console.log(budget)
    budOp += `<option value="${budget}">${budget}</option>`
  })
  $(".budget_sel").html(budOp)
  /* ------------------------ ADD BUDGET RANGE END HERE ----------------------- */
  /* ------------------------ ADD TYPE RANGET START HER ----------------------- */
   let type  = dataS.bhk_list.map((tE)=>{return tE.bhk_type});
   let typeopt = `<option selected value="">Choose...</option>`;
  
   type.forEach((typeds)=>{
    typeopt += `<option  value="${typeds}">${typeds}</option>`
   })
   $('.type_sel').html(typeopt)
  /* ------------------------- ADD TYPE RANGE END HERE ------------------------ */


   /* ----------------------- ADD DEAD REMARKS START HERE ---------------------- */
   let remarE = dataS.dead_sub_status;
   let remaopt = `<option selected value="">Choose...</option>`;
   remarE.forEach((rema)=>{
    remaopt += `<option  value="${rema}">${rema}</option>`;
   })
   $('.dead_rm').html(remaopt)
   /* ------------------------ ADD DEAD REMARKS END HERE ----------------------- */
 
   /* ------------------------- ADD LOCAITON START HERE ------------------------ */
   let locationsd = dataS.location_list.map((fE)=>{return fE.pole});
   let locaO = `<option selected value="">Choose...</option>`;
   locationsd.forEach((loc)=>{
    locaO += `<option  value="${loc}">${loc}</option>`
   })
   $('.dead_location_pole').html(locaO);
   /* -------------------------- ADD LOCATION END HERE ------------------------- */


}


function base_location(e){
    const aE = $(e).val();
    const eElem = $(e).parent().parent().next().children('div').children("select");
    let locaO = `<option selected value="">Choose...</option>`;
    if(aE != ""){
        const filee = leads_sub_additional_data.location_list.filter((lo)=>{return lo.pole == aE})
        let dEd = filee[0].location.split(',');
        dEd.forEach((loeE)=>{
            locaO += `<option  value="${loeE}">${loeE}</option>`;
        })
        
    }
    $(eElem).html(locaO)
}

function dead_lo(e){
    const ess = $(e).val();
    const nx = $(e).attr("data-loc");
    if(ess == "NI Location"){
        $(nx).slideDown()
    }else{
        $(nx).slideUp()
    }
}






/* ------------------- SET VALUE ASSIGN FUNCTIONS END HERE ------------------ */


function filterCTab(e){
  const ed = $(e).val();
  const hiE = $(e).parent().parent().next()
  if(ed == "Custom"){
   $(hiE).slideDown()
  }else{
    $(hiE).slideUp()
  }
}

 /* -------------------- chat UI box append fun start here ------------------- */
 function leadchatUI(chatData, appendType) {
    if (chatData.length == 0) {
        $(".no_chat_text").html("<h6>No Record</h6>")
    } else {
        var messageUI = ""
        chatData.forEach((chatArData) => {
            const chat_date_c = chatArData.chat_date.toDate()
            if (chatArData.chat_send_by == logUserDatas.emp_name) {
                messageUI += `<div class="message_container  mb-3 mLeft extra_task_add_ani">
             <div class="text-end message_sub_text" >You</div>
              <div class="chat_content_text">${
                    chatArData.chat_message
                }</div>
              <div class="d-flex message_sub_text justify-content-end">
                  <div class="chat_footer_text  text-end mb-2 align-items-center">${
                    chat_date_c.toDateString()+" - "+chat_date_c.toLocaleTimeString()
                }</div>
                  <div class="messageDD ml-1"><i class="icon-copy ion-android-done-all chat_${
                    chatArData.chat_status.toLowerCase()
                }"></i></div>
              </div>
            </div>`;
            } else {
                messageUI += `<div class="message_container  mb-3  extra_task_add_ani">
             <div class=" message_sub_text" >${
                    chatArData.chat_send_by
                }</div>
              <div class="chat_content_text">${
                    chatArData.chat_message
                }</div>
              <div class="d-flex message_sub_text">
                  <div class="chat_footer_text">${
                    chat_date_c.toDateString()+" - "+chat_date_c.toLocaleTimeString()
                }</div>
              </div>
            </div>`;
            }


        });

        if ($('.no_chat_template')) 
            $(".no_chat_template").remove();
        

        $(".chat_append").append(messageUI)
        const scrollEl = $(".chat_append").parent()
        $(scrollEl).stop().animate({
            scrollTop: $(scrollEl)[0].scrollHeight
        }, 1);
    }

}
/* -------------------- chat UI box append fun end here ------------------- */

function leadChat() { // const message = $(".chatValue").val();
    var userInput = $('.chatValue');
    var message = userInput.html().replace(/\<div\>|\<br.*?\>/ig, '\n').replace(/\<\/div\>/g, '').trim().replace(/\n/g, '<br>');
    if (!message.trim())
        return alertify.alert("Message!", "Plesae enter your message.....");
    $(".chat_spinner").fadeIn()
    const chatDate = new Date().toISOString();
    console.log(leads_menu_card_obj,'asdfasdf')
    const backend_chat = { user: logUserDatas.emp_name, lead_owner: leads_menu_card_obj.lead_owner, message, chatDate, token:leads_menu_card_obj.token, status: "Unread",lead_id:leads_menu_card_obj.lead_id}
    leadChatBC(backend_chat).then((chat_cc) => {
        if (chat_cc.status == true) {
            leadchatUI([chat_cc.data])
            // const sub_notify_value = {
            //     tabs: "auto",
            //     software: "TASK",
            //     action: "Chat",
            //     message: 'Chat has been added by ' + logUserDatas.emp_name,
            //     click: "Click",
            //     receiver: logUserDatas.emp_name == chat_button_token.user ? logUserDatas.manager : chat_button_token.user
            // }
            // const sub_notify_value_1 = {
            //     token: chat_button_token.token,
            //     user_name: chat_button_token.user
            // }
            // addNotify_func(sub_notify_value_1, sub_notify_value)
            $(".chat_spinner").fadeOut()
        } else {
            alertify.alert("Message!", "Try again...!")
        }
    })

    userInput.html("")
}


function leadenterChatKey(e) {
    if ((event.metaKey || event.ctrlKey) && event.keyCode == 13) {
        leadChat()
    }
}

/* ------------------- LEAD CHAT GET FUNCTIONS START HERE ------------------- */
function leadCChatRender(vA){
    const dEchat = leads_menu_card_obj;
    const chat_ob = {token:dEchat.token,user:dEchat.lead_owner,currentuser:logUserDatas.emp_name};
    var cardToken = dEchat.toke
    $(".chat_append").html(loacalTemplate_chatLoader);
    getLeadChats(chat_ob).then((chatFindData)=>{
        console.log(chat_ob,"dfasdfasdfasdfasdf")
        if(chatFindData.status == false){
            leadchatUI([])
        }else{
            leadchatUI(chatFindData.data)
        //  read_update_notification(cardToken)
        //  makechatread(chat_ob)
        }
     console.log(chatFindData)
 })

}


function callingRemarkDD(dEchat){
    const chat_ob = {token:dEchat.token,user:dEchat.lead_owner,currentuser:logUserDatas.emp_name};
    $(".remarkClientView").empty()
    getLeadChats(chat_ob).then((chatFindData)=>{
        console.log(chat_ob,"dsfasdf")
        if(chatFindData.status == true){
            let chEE = '';
            chatFindData.data.forEach((remarE)=>{
                chEE += `<div class="card border-dark mb-3 p-2">
                 <div class="card-header">${remarE.chat_send_by}</div>
                 <div class="card-body text-primary">${remarE.chat_message}</div>
                 <pre class="card-footer">${remarE.chat_date.toDate().toDateString()}</pre>
                </div>`
            })
            $(".remarkClientView").html(chEE)
        }
     console.log(chatFindData,"dsfasdf")
 })
}
/* --------------------- LEAD CHAT GET FUNTIONS END HERE -------------------- */

var statusCLEE = []

/* --------------------- TELECALLER DASHBOARD START HERE -------------------- */
function tele_dash_report(updateStatus){

   updateStatus.forEach((leadsDE)=>{
        const statusE =  leadsDE.s;
        const leadDataE = leadsDE.data;
        if(statusE == 'added'){
            statusCLEE.push(leadDataE)
        }else if(statusE == 'modified'){
         statusCLEE = statusCLEE.map((modifyLead)=>{
            if(modifyLead.token == leadDataE.token){
               return leadDataE
            }else{
                return modifyLead
            }
         })
        }else if(statusE == 'removed'){
            statusCLEE = statusCLEE.filter((removeLead)=>{return removeLead.token != leadDataE.token})
        }
   })
    // tele_dash_reportVE(logUserDatas.emp_name).then((reportD)=>{
    //     if(reportD.status == true){
    //         const sTA = reportD.data;
    //         const lead_count_total = {cold:[[],[]],warm:[[],[]],hot:[[],[]],reenquired:[[],[]],sitevisitscheduled:[[],[]],sitevisitcompleted:[[],[]],fresh:[[],[]]}
    //         sTA.filter((dEE)=>{
    //             if(dEE.lead_client_status == "Cold" || dEE.lead_client_status == "Warm" || dEE.lead_client_status == "Hot" || dEE.lead_client_status == "Site Visit Scheduled" ||dEE.lead_client_status == "Site Visit Completed" ){
    //                 lead_count_total[dEE.lead_client_status.toLowerCase().replaceAll(" ","").replaceAll("-","")][0].push(dEE);
    //                 if(dEE.lead_worked_on != ""){
    //                     const wDate = dEE.lead_worked_on.toDate();
    //                     const matchd = new Date().toDateString();
    //                     if(wDate.toDateString() == matchd){
    //                         lead_count_total[dEE.lead_client_status.toLowerCase().replaceAll(" ","").replaceAll("-","")][1].push(dEE);
    //                     }
    //                 }
    //             }
    //            const receivarED = dEE.lead_receive_date.toDate();
    //            if(receivarED.toDateString() == new Date().toDateString()){
    //             lead_count_total.fresh[0].push(dEE)
    //                console.log(receivarED)
    //            }
    //         //    if(dEE.lead_worked_on != ""){
    //         //       const workedD = dEE.lead_worked_on.toDate()
    //         //        if(receivarED.toDateString() == new Date().toDateString() && workedD.toDateString() == new Date().toDateString() ){
    //         //         lead_count_total.fresh[1].push(dEE)
    //         //        }
    //         //    }
    //         });

    //         const keyD = Object.keys(lead_count_total);
    //         keyD.forEach((keyhj)=>{
    //             $(`.${keyhj}_leads_report`).children().eq(2).text(lead_count_total[keyhj][0].length)
    //             $(`.${keyhj}_leads_report`).children().eq(1).text(lead_count_total[keyhj][1].length)
    //         })
          
    //         console.log(lead_count_total)
    //     }
    // })
    liveUpdatesClientStatus()
}


function liveUpdatesClientStatus(){
            const sTA = statusCLEE;
            const lead_count_total = {cold:[[],[]],warm:[[],[]],hot:[[],[]],reenquired:[[],[]],sitevisitscheduled:[[],[]],sitevisitcompleted:[[],[]],fresh:[[],[]]}
            sTA.filter((dEE)=>{
                if(dEE.lead_client_status == "Cold" || dEE.lead_client_status == "Warm" || dEE.lead_client_status == "Hot" || dEE.lead_client_status == "Site Visit Scheduled" ||dEE.lead_client_status == "Site Visit Completed" ||dEE.lead_client_status == "Re-Enquired" ){
                    lead_count_total[dEE.lead_client_status.toLowerCase().replaceAll(" ","").replaceAll("-","")][0].push(dEE);
                    if(dEE.lead_worked_on != ""){
                        const wDate = dEE.lead_worked_on.toDate();
                        const matchd = new Date().toDateString();
                        if(wDate.toDateString() == matchd){
                            lead_count_total[dEE.lead_client_status.toLowerCase().replaceAll(" ","").replaceAll("-","")][1].push(dEE);
                        }
                    }
                }
               const receivarED = dEE.lead_receive_date.toDate();
               if(receivarED.toDateString() == new Date().toDateString()){
                lead_count_total.fresh[0].push(dEE)
               }
            //    if(dEE.lead_worked_on != ""){
            //       const workedD = dEE.lead_worked_on.toDate()
            //        if(receivarED.toDateString() == new Date().toDateString() && workedD.toDateString() == new Date().toDateString() ){
            //         lead_count_total.fresh[1].push(dEE)
            //        }
            //    }
            });

            const keyD = Object.keys(lead_count_total);
            keyD.forEach((keyhj)=>{
                $(`.${keyhj}_leads_report`).children().eq(2).text(lead_count_total[keyhj][0].length)
                $(`.${keyhj}_leads_report`).children().eq(1).text(lead_count_total[keyhj][1].length)
            })
}


function deadCount_dashboard(count1,count2){
    $('.dead_leads_report').children().eq(1).text(count1)
    $('.dead_leads_report').children().eq(2).text(count2)
}


function findContactNumber(e){
    const preEle = $(e).parent().children(".contactSpin")
    const type = $(e).attr("data-type");
    const key =$(e).val();
    if(key.trim().length > 8){
        $('#leadCreatBtn').prop("disabled",true)
        $(preEle).removeClass("d-none")
        const seEc = {type,key}
        fetch("https://us-central1-nodal-time-327708.cloudfunctions.net/app/api/searchLead",{
            method:"POST",
            body:JSON.stringify(seEc)
           }).then((e)=>{
            $(preEle).addClass("d-none")
            e.json().then((ew)=>{
                if(ew.status != false){
                    alertify.alert("Message!","This Number already exits")
                    $('#leadCreatBtn').prop("disabled",true)
                }else{
                    $('#leadCreatBtn').prop("disabled",false)
                }
                // $(eVe).prop("disabled",false)
                // $(eVe).html("Confirm");
                // $("#search_card_list_container").empty();
                // if(ew.status == true){
                //     console.log(ew.data)
                //     makeLeadSearchCard(ew.data)
                // }else{
                //     makeLeadSearchCard([])
                // }
                
            },(err)=>{
                // alertify.error("Please try again")
                // $(eVe).prop("disabled",false)
                // $(eVe).html("Confirm");
                // makeLeadSearchCard([])
               })
           },(err)=>{
            // alertify.error("Please try again")
            //     $(eVe).prop("disabled",false)
            //     $(eVe).html("Confirm");
            //     makeLeadSearchCard([])
           })
    }
    
}
/* ---------------------- TELECALLER DASHBOARD END HERE --------------------- */



/* ---------------- BACKEND SHEET UPDATE FUCNTIONS START HERE --------------- */
function update_spreadSheet(updatekey,token){
    console.log(updatekey,token,"saraarrr")
 return new Promise((res,rej)=>{
    const post_SA_Data = {
        changeObj: updatekey,
        token
    }
    fetch('https://us-central1-nodal-time-327708.cloudfunctions.net/app/api/LeadUpdateRow',{
        method:"POST",
        body:JSON.stringify(post_SA_Data)
    }).then((fetch_return)=>{
       fetch_return.json().then((return_json)=>{
        console.log(return_json,token,updatekey,"dfdfddf")
       })
    })
   res({status:"success"})
 })
}
function add_dead_spreadSheet(updatekey,token){
    console.log(updatekey,"dead")
 return new Promise((res,rej)=>{
    const post_SA_Data = {
        changeObj: updatekey,
        token
    }
    fetch('https://us-central1-nodal-time-327708.cloudfunctions.net/app/api/addDeadLead',{
        method:"POST",
        body:JSON.stringify(post_SA_Data)
    }).then((fetch_return)=>{
       fetch_return.json().then((return_json)=>{
        res(return_json)
       })
    })
 })
}


function add_spreadSheet_chat(chatOB){
    return new Promise((res,rej)=>{
        const worked_d = dateToStr(new Date())
        const post_SA_Data ={'Id.No':chatOB.id, 'Chat Date and time':worked_d+" "+new Date().toLocaleTimeString(),'Owner Name':chatOB.owner,"Message":chatOB.message }
        fetch('https://us-central1-nodal-time-327708.cloudfunctions.net/app/api/leadChatAdd',{
            method:"POST",
            body:JSON.stringify(post_SA_Data)
        }).then((fetch_return)=>{
           fetch_return.json().then((return_json)=>{
            res(return_json)
           })
        })
    })
}

function add_sitevisit_sales(add_obj){
    return new Promise((res,rej)=>{
        fetch('https://us-central1-nodal-time-327708.cloudfunctions.net/app/api/addSalesLead',{
            method:"POST",
            body:JSON.stringify(add_obj)
        }).then((fetch_return)=>{
           fetch_return.json().then((return_json)=>{
            res(return_json)
           })
        })
    })
}
function add_fresh_leads(add_obj){
    return new Promise((res,rej)=>{
        fetch('https://us-central1-nodal-time-327708.cloudfunctions.net/app/api/addFreshLead',{
            method:"POST",
            body:JSON.stringify(add_obj)
        }).then((fetch_return)=>{
           fetch_return.json().then((return_json)=>{
            res(return_json)
           })
        })
    })
}

function call_live_count(call_data){
  const call_statusE = {"outbound":[[],[]],"inbound":[[],[]]};
  const mise = []
  call_data.forEach((data_d)=>{
    
    if(data_d.call_status == "NO ANSWER" || data_d.call_status == "BUSY" ){

        data_d.call_event,call_statusE[data_d.call_event][0].push(1)
    }else if(data_d.call_status == "ANSWERED"){

        data_d.call_event,call_statusE[data_d.call_event][1].push(1)
    }else if(data_d.call_status == "MISSED"){
        mise.push(1)
    }
  })
  
    $(".calling_count_answare_in").text(call_statusE["inbound"][1].length)
    $(".calling_count_answare_out").text(call_statusE["outbound"][1].length)
    $(".calling_count_not_answare_out ").text(call_statusE["outbound"][0].length)
    $(".calling_count_missed_in ").text(mise.length)
    $(".calling_count_total ").text(call_data.length)
}




function sitevisitSTS(e){
   const vaE = $(e).val();
   $(".compleateSV_base").css("display","none")
   if(vaE != ""){
    if(vaE == 'Site Visit Completed'){
      $("#svComplete_sitevisitcompleted").slideDown()
    }else if(vaE != "Dead"){
        $("#svComplete_reschedule").slideDown()
    }
   }
}




function log_view_filter(e){
    const dates = {};
    dates.from = $('#log_view_start_date').val()
    dates.to = $("#log_view_end_date").val();
    if(dates.from == ""){
       alertify.error("Please select from date")
    }else if(dates.to == ""){
       alertify.error("Please selecet to date")
    }else{
       $(e).html(button_loader);
       $(e).prop("disabled",true)
       $("#view_log_append_list").empty()
       logViewFilter(dates,{user:logUserDatas.emp_name}).then((returnValue)=>{
        $(e).html("Filter");
       $(e).prop("disabled",false)
        addViewLog(returnValue.data)
       })
    }
}

function log_manage_filter(e){
    const fiDTT = {}
    fiDTT.selectName = $("#log_manage_name").val();
    fiDTT.date = $("#log_manage_date").val();
    if(fiDTT.selectName == ""){
        alertify.error("Please select name")
    }else if(fiDTT.date == ""){
        alertify.error("Please select date")
    }else{
        $(e).html(button_loader);
        $(e).prop("disabled",true)
        $("#manage_log_append_list").empty()
        logMangefilter(fiDTT).then((returnValue)=>{
            $(e).html("Filter");
         $(e).prop("disabled",false);
         addManageLog(returnValue.data)
        })
    }
}



/* ----------------------- DAILER FUNCTIONS START HERE ---------------------- */

 
 
 var DialPad = {
    init: function () {
       this.filter();
       this.keypad();
       this.dialing();
    //    $("body,html,img").bind("contextmenu selectstart dragstart", function () {
    //       return false;
    //    });
    },
    dialing: function () {
       $(".people").click(function () {
          DialPad.call($(this));
       });
       $(".action .btn").click(function () {
          $(this).toggleClass("active");
       });
       $(".call-end").click(function () {
          $(".left-pan").removeClass("active");
          $(".calling").fadeOut(100);
          $(".contacts").fadeIn(800);
          $(".calling .photo").html("");
          $(".calling .name").html("Unknown");
          $(".calling .number").html("");
       });
    },
    longClick: function () {
       var pressTimer;
       $('.dial-key-wrap[data-key="back"]')
          .mouseup(function () {
             clearTimeout(pressTimer);
             return false;
          })
          .mousedown(function () {
             pressTimer = window.setTimeout(function () {
                $(".dial-screen").text("");
             }, 1000);
             return false;
          });
    },
    keypad: function () {
       $(".dial-key-wrap").on("click", function () {
          var key = $(this).data("key");
          var display = $(".dial-screen").text();
          switch (key) {
             case "back":
                DialPad.press($('.dial-key-wrap[data-key="back"]'));
                display = $(".dial-screen").text(
                   display.substring(0, display.length - 1)
                );
                DialPad.longClick();
                break;
             case "call":
                DialPad.press($('.dial-key-wrap[data-key="call"]'));
                DialPad.call();
                break;
             case 0:
                DialPad.press($('.dial-key-wrap[data-key="0"]'));
                display = $(".dial-screen").text(display + "0");
                break;
             case 1:
                DialPad.press($('.dial-key-wrap[data-key="1"]'));
                display = $(".dial-screen").text(display + "1");
                break;
             case 2:
                DialPad.press($('.dial-key-wrap[data-key="2"]'));
                display = $(".dial-screen").text(display + "2");
                break;
             case 3:
                DialPad.press($('.dial-key-wrap[data-key="3"]'));
                display = $(".dial-screen").text(display + "3");
                break;
             case 4:
                DialPad.press($('.dial-key-wrap[data-key="4"]'));
                display = $(".dial-screen").text(display + "4");
                break;
             case 5:
                DialPad.press($('.dial-key-wrap[data-key="5"]'));
                display = $(".dial-screen").text(display + "5");
                break;
             case 6:
                DialPad.press($('.dial-key-wrap[data-key="6"]'));
                display = $(".dial-screen").text(display + "6");
                break;
             case 7:
                DialPad.press($('.dial-key-wrap[data-key="7"]'));
                display = $(".dial-screen").text(display + "7");
                break;
             case 8:
                DialPad.press($('.dial-key-wrap[data-key="8"]'));
                display = $(".dial-screen").text(display + "8");
                break;
             case 9:
                DialPad.press($('.dial-key-wrap[data-key="9"]'));
                display = $(".dial-screen").text(display + "9");
                break;
             case "*":
                DialPad.press($('.dial-key-wrap[data-key="*"]'));
                display = $(".dial-screen").text(display + "*");
                break;
             case "#":
                DialPad.press($('.dial-key-wrap[data-key="#"]'));
                display = $(".dial-screen").html(display + "#");
                break;
          }
          DialPad.filter();
       });
    //    $(document).keydown(function (e) {
    //       var key = e.which;
    //       var screen = $(".dial-screen").text();
 
    //       switch (e.which) {
    //          case 8:
    //             DialPad.press($('.dial-key-wrap[data-key="back"]'));
    //             screen = $(".dial-screen").text(
    //                screen.substring(0, screen.length - 1)
    //             );
    //             break;
    //          case 13:
    //             DialPad.press($('.dial-key-wrap[data-key="call"]'));
    //             DialPad.call();
    //             break;
    //          case 96:
    //             DialPad.press($('.dial-key-wrap[data-key="0"]'));
    //             screen = $(".dial-screen").text(screen + "0");
    //             break;
    //          case 97:
    //             DialPad.press($('.dial-key-wrap[data-key="1"]'));
    //             screen = $(".dial-screen").text(screen + "1");
    //             break;
    //          case 98:
    //             DialPad.press($('.dial-key-wrap[data-key="2"]'));
    //             screen = $(".dial-screen").text(screen + "2");
    //             break;
    //          case 99:
    //             DialPad.press($('.dial-key-wrap[data-key="3"]'));
    //             screen = $(".dial-screen").text(screen + "3");
    //             break;
    //          case 100:
    //             DialPad.press($('.dial-key-wrap[data-key="4"]'));
    //             screen = $(".dial-screen").text(screen + "4");
    //             break;
    //          case 101:
    //             DialPad.press($('.dial-key-wrap[data-key="5"]'));
    //             screen = $(".dial-screen").text(screen + "5");
    //             break;
    //          case 102:
    //             DialPad.press($('.dial-key-wrap[data-key="6"]'));
    //             screen = $(".dial-screen").text(screen + "6");
    //             break;
    //          case 103:
    //             DialPad.press($('.dial-key-wrap[data-key="7"]'));
    //             screen = $(".dial-screen").text(screen + "7");
    //             break;
    //          case 104:
    //             DialPad.press($('.dial-key-wrap[data-key="8"]'));
    //             screen = $(".dial-screen").text(screen + "8");
    //             break;
    //          case 105:
    //             DialPad.press($('.dial-key-wrap[data-key="9"]'));
    //             screen = $(".dial-screen").text(screen + "9");
    //             break;
    //       }
    //       var array = [8, 13, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
    //       var prevent = true;
    //       for (var i = 0; i < array.length; i++) {
    //          if (key == array[i]) {
    //             DialPad.filter();
    //             break;
    //          }
    //       }
    //       if (key == 8) {
    //          return false;
    //       }
    //    });
    },
    call: function (info) {
       var num = $(".dial-screen").text().length;
       console.log(num)
       if (num > 8) {
          var photo, name, number;
          $(".left-pan").addClass("active");
          $(".contacts").fadeOut(100);
          $(".calling").fadeIn(800);
          if (info) {
             photo = info.find("img").attr("src")
                ? '<img src="' + info.find("img").attr("src") + '">'
                : null;
             name = info.find(".name").text()
                ? info.find(".name").text()
                : "Unknown";
             number = info.find(".phone2_lNumber").text();
             $(".calling .photo").html(photo);
             $(".calling .name").text(name);
             $(".calling .number").text(number);
          } else {
             $(".calling .number").text($(".dial-screen").text());
          }
          setTimeout(function () {
             $(".call-end .btn").focus();
          }, 800);
       }
    },
    filter: function () {
       var highlight = function (string) {
        if(string.length >4){
            var hrefD = `https://open.pulsework360.com/sidd_callapi.php?token=d310d5288060f4180fd860c70b9692f2&agent_number=${telecaller_details[0].agent_number}&pwd=${telecaller_details[0].password}&customer_number=${string}`
            $(".callIFrame").attr('href',hrefD)
            console.log("dsfadsf",string)
            $(".people .number.match").each(function () {
                var matchStart = $(this)
                   .text()
                   .toLowerCase()
                   .indexOf("" + string.toLowerCase() + "");
                var matchEnd = matchStart + string.length - 1;
                var beforeMatch = $(this).text().slice(0, matchStart);
                var matchText = $(this)
                   .text()
                   .slice(matchStart, matchEnd + 1);
                var afterMatch = $(this)
                   .text()
                   .slice(matchEnd + 1);
                $(this).html(
                   beforeMatch +
                      '<span class="highlight">' +
                      matchText +
                      "</span>" +
                      afterMatch
                );
             });
        }
         
       };
       var showcontact = function () {
          $(".people .number").each(function () {
             if ($(this).css("display") == "inline") {
                $(this).parent().parent().parent().show();
             } else {
                $(this).parent().parent().parent().hide();
             }
          });
       };
       //var refine = function(){
       var _this = $(".dial-screen");
       if (_this.text() && _this.text().length > 8) {
        console.log(_this.text())
          $(".people .number")
             .removeClass("match")
             .hide()
             .filter(function () {
                return (
                   $(this)
                      .text()
                      .toLowerCase()
                      .indexOf(_this.text().toLowerCase()) != -1
                );
             })
             .addClass("match")
             .show();
          highlight(_this.text());
          $(".people").show();
          showcontact();
       } else {
          $(".people,.people .number").removeClass("match").hide();
       }
       //};
    },
    press: function (obj) {
       var button = obj.addClass("active");
       setTimeout(function () {
          button.removeClass("active");
       }, 200);
    }
 };



function showManualDailer(){
    const status = $("#daileContainer").attr("data-active");
    const container = $("#daileContainer");
    $("#dialerAllNUM").empty()
    $(".dial-screen").empty()
    $("#daileContainer").empty()
    if(status == 'true'){
        $(container).slideUp()
   $("#daileContainer").attr("data-active","false")
    }else{
        const merchContact = active_tab_list_ar.concat(assign_tab_list_ar)
        $(container).slideDown()
        $("#daileContainer").attr("data-active","true")
        dialerHtml()
        merchContact.forEach((addContact)=>{
            const clienEtE =  dialerNumberfilter(addContact)
            $("#dialerAllNUM").append(clienEtE)
        })
    }
}

function contactMove(e){
     const token = $(e).attr('data-token');
     const tab = $(e).attr('data-tab').toLowerCase();
     auto_move_tab_leads(tab)
     const select_card =  $(`[data-card-container-${tab}=${token}]`);
     moving_card(`#${tab}_card_list_container`,select_card);
}

function dialerNumberfilter(leadData){
    var dailerHtml = `<div class="people clearfix" style="cursor:pointer;" onclick="contactMove(this)" data-token="${leadData.token}" data-tab="${leadData.lead_on_tab}">
    <div class="photo pull-left">
    </div>
    <div class="info pull-left">
       <div class="name">${leadData.lead_client_name}</div>`;
       leadData.lead_client_phone_numbers.forEach((eNum)=>{
        dailerHtml +=`<div class="phone2_lNumber"><span>${eNum.isd}</span><span class="number">${eNum.number}</span></div>`
       })
    dailerHtml +=`</div>
 </div>`
 return dailerHtml;
}

function dialerHtml(){
    const dialerCC = `<div class="dialEEEEER" >
    <div class="left-pan">
        <div class="contacts">
           <div class="title">Contacts</div>
           <div id="dialerAllNUM">
           </div>
          
        </div>
        <div class="calling">
           <div class="title fadeIn animated infinite">Calling</div>
           <div class="photo bounceInDown animated"></div>
           <div class="name rubberBand animated">Unknown</div>
           <div class="number"></div>
           <!-- <div class="action">
              <div class="lnk"><button class="btn fadeInLeftBig animated"><i class="fa fa-mic"></i></button></div>
              <div class="lnk"><button class="btn fadeInLeftBig animated"><i class="fa fa-vol"></i></button></div>
              <div class="lnk"><button class="btn fadeInRightBig animated"><i class="fa fa-camera"></i></button></div>
              <div class="lnk"><button class="btn fadeInRightBig animated"><i class="fa fa-video-camera"></i></button></div>
           </div> -->
           <div class="call-end bounceInUp animated">
              <button class="btn"><i class="fa fa-phone"></i></button>
           </div>
        </div>
     </div>
     <div class="dial-pad">
        <div class="dial-screen border-bottom" contenteditable="false"></div>
        <div class="dial-table">
           <div class="dial-table-row">
              <div class="dial-table-col">
                 <div class="dial-key-wrap" data-key="1">
                    <div class="dial-key">1</div>
                    <div class="dial-sub-key">&nbsp;</div>
                 </div>
              </div>
              <div class="dial-table-col">
                 <div class="dial-key-wrap" data-key="2">
                    <div class="dial-key">2</div>
                    <div class="dial-sub-key">abc</div>
                 </div>
              </div>
              <div class="dial-table-col">
                 <div class="dial-key-wrap" data-key="3">
                    <div class="dial-key">3</div>
                    <div class="dial-sub-key">def</div>
                 </div>
              </div>
           </div>
           <div class="dial-table-row">
              <div class="dial-table-col">
                 <div class="dial-key-wrap" data-key="4">
                    <div class="dial-key">4</div>
                    <div class="dial-sub-key">ghi</div>
                 </div>
              </div>
              <div class="dial-table-col">
                 <div class="dial-key-wrap" data-key="5">
                    <div class="dial-key">5</div>
                    <div class="dial-sub-key">jkl</div>
                 </div>
              </div>
              <div class="dial-table-col">
                 <div class="dial-key-wrap" data-key="6">
                    <div class="dial-key">6</div>
                    <div class="dial-sub-key">mno</div>
                 </div>
              </div>
           </div>
           <div class="dial-table-row">
              <div class="dial-table-col">
                 <div class="dial-key-wrap" data-key="7">
                    <div class="dial-key">7</div>
                    <div class="dial-sub-key">pqrs</div>
                 </div>
              </div>
              <div class="dial-table-col">
                 <div class="dial-key-wrap" data-key="8">
                    <div class="dial-key">8</div>
                    <div class="dial-sub-key">tuv</div>
                 </div>
              </div>
              <div class="dial-table-col">
                 <div class="dial-key-wrap" data-key="9">
                    <div class="dial-key">9</div>
                    <div class="dial-sub-key">wxyz</div>
                 </div>
              </div>
           </div>
           <div class="dial-table-row">
              <div class="dial-table-col">
                 <div class="dial-key-wrap" data-key="*">
                    <div class="dial-key">*</div>
                    <div class="dial-sub-key">&nbsp;</div>
                 </div>
              </div>
              <div class="dial-table-col">
                 <div class="dial-key-wrap" data-key="0">
                    <div class="dial-key">0</div>
                    <div class="dial-sub-key">+</div>
                 </div>
              </div>
              <div class="dial-table-col">
                 <div class="dial-key-wrap" data-key="#">
                    <div class="dial-key">#</div>
                    <div class="dial-sub-key">&nbsp;</div>
                 </div>
              </div>
           </div>
           <div class="dial-table-row no-sub-key">
              <div class="dial-table-col">
              </div>
              <a class="dial-table-col callIFrame" href="" target="iframe_a">
                 <div class="dial-key-wrap" data-key="call">
                    <div class="dial-key"><i class="fa fa-phone"></i></div>
                    <div class="dial-sub-key">Call</div>
                 </div>
              </a>
              <div class="dial-table-col">
                 <div class="dial-key-wrap" data-key="back">
                    <div class="dial-key"><i class="fa fa-long-arrow-left"></i></div>
                    <div class="dial-sub-key">Back</div>
                 </div>
              </div>
           </div>
        </div>
     </div>
</div>`;
 $("#daileContainer").html(dialerCC);
 DialPad.init();
 
}


/* ------------------------ DAILER FUCNTIONS END HERE ----------------------- */


/* ------------------------ LEADS FUNCTIONS END HERE ------------------------ */





/* ---------------------------- TRIGGER FUNCIONS ---------------------------- */

var waitTime = 15 * 60 * 1000;

function onTringer(){
  if(logUserDatas.emp_name == "Sarathy K"){
    tempgetleadsheet()
  }
}

setInterval(onTringer,waitTime);

function tempgetleadsheet() {
    return new Promise(async (res, rej) => {
        const getLeadSheet = new Promise(async(leadRes,leadRej)=>{
            var x = await fetch('https://script.google.com/macros/s/AKfycbwduvln-JNi8jtCZZK3XXa3HOxA6vjS1qCqDSvDHXfyeiU2P_A1e-kToL90fG5p8Dt9dg/exec?task=tempLeadsheet')
            var b = await x.json();
            const leadDE = b.data;
            console.log(leadDE)
            leadRes(leadDE)
        })
       
        const filter_to_firebase = new Promise(async(firebaseRes,firebaseRej)=>{
            var firebaseAdded_file = [];
            const lead_sheet_data = await getLeadSheet
            lead_sheet_data.filter((a) => {
                var followDate;
                if (a[18] != "Lead Completed" && a[18] != "") {
                    var p = a[18].split("/")
                    followDate = new Date(p[2], p[1] - 1, p[0])
                } else {
                    followDate = a[18];
                }
                var rd;
                if (a[2] !== "") {
                    var s = a[2].split("-")
                    let rec_Date = s[0].split("/")
                    let f = s[1].split(":")
                    rd = new Date(rec_Date[2], rec_Date[1] - 1, rec_Date[0], f[0], f[1], f[2])
                }
                var lead_client_phone_numbers = [];
                if (a[8] != "") {
                    lead_client_phone_numbers.push({ isd: a[7], number: a[8] })
                }
    
                if (a[9] != "") {
                    lead_client_phone_numbers.push({ isd: a[25], number: a[9] })
                }
                var lead_email_id = [];
                if (a[10] != "") {
                    lead_email_id.push(a[10])
                }
                if (a[11] != "") {
                    lead_email_id.push(a[11])
                }
    
                var lead_source = []
                var v;
                if (a[14] != "" && a[15] != "") {
    
                    if (a[57] != "") {
                        var source1 = a[57].split("-")
                        let leadDate = source1[0].split("/")
                        let f = source1[1].split(":")
                        v = new Date(leadDate[2], leadDate[1] - 1, leadDate[0], f[0], f[1], f[2])
                        lead_source.push({ main: a[14], sub: a[15], src_receive_date: new Date() })
    
                    } else {
                        lead_source.push({ main: a[14], sub: a[15], src_receive_date: "Date not recored" })
                    }
    
                }
                if (a[16] != "" && a[17] != "") {
                    if (a[58] !== "") {
                        var source2 = a[58].split("-")
                        let leadDate = source2[0].split("/")
                        let f = source2[1].split(":")
                        v = new Date(leadDate[2], leadDate[1] - 1, leadDate[0], f[0], f[1], f[2])
                        lead_source.push({ main: a[16], sub: a[17], src_receive_date: v })
                    } else {
                        lead_source.push({ main: a[16], sub: a[17], src_receive_date: "Date not recored" })
                    }
    
                }
                if (a[54] != "" && a[55] != "") {
                    if (a[59] !== "") {
                        var source3 = a[59].split("-")
                        let leadDate = source3[0].split("/")
                        let f = source3[1].split(":")
                        v = new Date(leadDate[2], leadDate[1] - 1, leadDate[0], f[0], f[1], f[2])
                        lead_source.push({ main: a[54], sub: a[55], src_receive_date: v })
                    } else {
                        lead_source.push({ main: a[54], sub: a[55], src_receive_date: "Date not recored" })
                    }
    
    
                }
    
                const followUpDate = new Date(followDate);
                let tab = "Active";
                if (followUpDate.toDateString() == new Date().toDateString()) {
                    tab = "Assigned"
                }
    
                var svstatus = false;
                var sv, book, ss;
                if (a[19] == "Site Visit Completed") {
                    var sv_date = a[23].split("/")
                    sv = new Date(sv_date[2], sv_date[1] - 1, sv_date[0])
                    console.log(sv, a[0])
                    // if (a[19] == "Booked") {
                    //     var bk_date = a[47].split("/")
                    //     book = new Date(bk_date[2], bk_date[1] - 1, bk_date[0])
                    //     svstatus = { lead_scheduled_on: new Date(sv), lead_visit_time: "", cab_details: false, lead_cancelled_afterVisit: false, sitevisit_status: "Completed", booked: { status: "Booked", booked_on: book } }
                    // } else {
                    svstatus = { lead_scheduled_on: new Date(sv), lead_visit_time: "", cab_details: false, lead_cancelled_afterVisit: false, sitevisit_status: "Completed", booked: false }
                    // }
                    tab = "Site Visit"
                } else if (a[19] == "Site Visit Scheduled") {
                    var ss_date = a[41].split("/")
                    ss = new Date(ss_date[2], ss_date[1] - 1, ss_date[0])
                    svstatus = { lead_scheduled_on: new Date(ss), lead_visit_time: "", cab_details: false, lead_cancelled_afterVisit: false, sitevisit_status: "Scheduling", booked: false }
                    tab = "Site Visit"
                } else if (a[19] == "Booked") {
                    var sv_date = a[23].split("/")
                    sv = new Date(sv_date[2], sv_date[1] - 1, sv_date[0])
                    var bk_date = a[47].split("/")
                    book = new Date(bk_date[2], bk_date[1] - 1, bk_date[0])
                    svstatus = { lead_scheduled_on: new Date(sv), lead_visit_time: "", cab_details: false, lead_cancelled_afterVisit: false, sitevisit_status: "Completed", booked: { status: "Booked", booked_on: book } }
                    tab = "Site Visit"
                }
    
                var call_log = new Array()
    
                if (a[48] !== "") {
                    if (a[48].includes("||")) {
                        var call_ss = a[48].split("||")
                        call_ss.forEach((j) => {
                            call_log.push({ call_status: j, call_on: new Date() })
                        })
                    } else {
                        var call_ss = a[48]
                        call_log.push({ call_status: call_ss, call_on: new Date() })
                    }
                }
                var work = ""
                if (a[26] != "") {
                    var wk = a[26].split("/")
                    work = new Date(wk[2], wk[1] - 1, wk[0])
                } else if (a[26] == "" || a[26] == "undefined") {
                    work = ""
                }
                var chat = [];
                if (a[66] !== "") {
                    var c = a[66].split("|||")
                    c.forEach((e) => {
                        chat.push(e)
                    })
    
                }
                const leadS = {
                    lead_id: a[0],
                    lead_owner: a[1],
                    lead_receive_date: rd,
                    lead_manager: a[3],
                    lead_project: a[4],
                    lead_project_id: "",
                    lead_client_name: a[6].trim(),
                    lead_client_phone_numbers,
                    lead_email_id,
                    lead_budget: a[12],
                    lead_flat_type: a[13],
                    lead_source,
                    lead_card_status: a[27],
                    lead_client_status: a[19] == "Booked" ? "Site Visit Completed" : a[19],
                    lead_squre_feet: a[34],
                    lead_no_of_days: 0,
                    lead_call_details: call_log,
                    lead_followup_date: followDate,
                    lead_site_visit_details: svstatus,
                    lead_worked_on: work,
                    lead_card_type: a[33],
                    lead_missed_call_details: new Array(),
                    lead_delay_badge: a[51],
                    lead_receive_type: a[52],
                    lead_invoice_form: a[65],
                    lead_on_tab: tab
                };
                firebaseAdded_file.push([leadS, chat])
            });
           firebaseRes(firebaseAdded_file)
        })
         

        const firebaseFile_to_add_ar = await filter_to_firebase
        console.log(firebaseFile_to_add_ar,"srabo")
        const add_Loop_firebase_data = new Promise(async(loopRes,loopRej)=>{
        const final_file = await  addleadfirebase(firebaseFile_to_add_ar)
         loopRes(final_file)
        })
       
        const final_Lr = await add_Loop_firebase_data
        res(final_Lr)
    })

}










