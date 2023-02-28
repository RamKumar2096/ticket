
function pending_filter_tag(e) {
    const filter_by = { status: $(e).val(), user: logUserDatas.emp_name };
    pending_main_filter(filter_by, false);
}


function pending_main_filter(filter_by, callback) {
    fetch_loader_show("#pending_card_list_container");
    pendingTab(filter_by).then((pending_filter_return) => {
        $("#pending_card_list_container").empty();
        if (pending_filter_return.status == false) {
            makePendingCard([], false, false);
        } else {
            makePendingCard(pending_filter_return.data, callback, true);
        }
        console.log(pending_filter_return);
    });
}
function fetch_loader_show(id) {
    $(id).html(fetch_loader);
}


function makePendingCard(card_data, callback, empty_count) {
    const appengingTag = $("#raised_card_list_container");
    remove_no_RL(appengingTag);
    if (empty_count) {
        task_pending_tab_status_ls = [];
    }

    if (card_data.length == 0) {
        $(appengingTag).html(no_record);
    } else {
        card_data.forEach((task_make_card) => {
            task_pending_tab_status_ls.push(task_make_card);
            const makeCard = makeTaskCard(task_make_card, "pending");
            $(appengingTag).append(makeCard);
        });

        if (callback != false) {
            const select_card = $(
                `[data-card-container-pending=${callback.notification_data.doc_id}]`
            );
            moving_card("#pending_card_list_container", select_card);
        }
    }
    task_pending_tab_set_counts();
}



function makeViewCard(view_card_data) {
    remove_no_RL("#view_card_list_container");
    view_tab_type_ls = [];
    if (view_card_data.length == 0) {
        $("#view_card_list_container").html(no_record);
    } else {
        view_card_data.filter((view_dD) => {
            view_tab_type_ls.push(view_dD);
            const viewW = makeTaskCard(view_dD, "view");
            $("#view_card_list_container").append(viewW);
        });
    }
    task_view_tab_set_counts();
}

function remove_no_RL(appengingTag) {
    if ($(appengingTag).children().hasClass("fetching_loader")) {
        $(appengingTag).children(".fetching_loader").remove();
    } else if ($(appengingTag).children().hasClass("no_record_img")) {
        $(appengingTag).children(".no_record_img ").remove();
    }
}


function task_view_tab_set_counts() {
    const status_list = view_tab_type_ls;
    const task_status_obj = {
        pending: [],
        approved: [],
        awaiting_approval: [],
        completed: [],
    };

    status_list.filter((status_list) => {
        console.log(status_list.card_status.toLowerCase().replaceAll(" ", "_"));
        task_status_obj[
            status_list.card_status.toLowerCase().replaceAll(" ", "_")
        ].push(status_list);
    });

    const status_D = Object.keys(task_status_obj);
    status_D.filter((key_status) => {
        $(`.view_count_list_${key_status}`).text(
            task_status_obj[key_status].length
        );
    });
}

function makeTaskCard(taskData, tab) {
    let create_date = taskData.created_on.toDate();
    create_date = new Date(create_date).toDateString();

    let schedule_date;
    if (taskData.card_status != "Scheduling") {
        schedule_date = taskData.scheduled_On.toDate();
        schedule_date = new Date(schedule_date).toDateString();
    }
    let extend_date;
    if (taskData.card_status == "Approved") {
        extend_date = new Date(
            taskData.extended_on[taskData.extended_on.length - 1].date.toDate()
        ).toDateString();
    }

    let completed_date;
    if (taskData.card_status == "Completed") {
        completed_date = new Date(
            taskData.completed_on[taskData.completed_on.length - 1].date.toDate()
        ).toDateString();
    }

    let sub_s = taskData.sub_status;

    let noOfEx = false;
    if (taskData.extended_on[0] != "empty") {
        noOfEx = taskData.extended_on.length;
    }

    let delayBg = false;
    if (taskData.delay != "") {
        delayBg = "Delayed Task";
    }

    let chat = false;
    let task = false;
    chat = notification_data_ar.some((eR) => {
        return eR.icon == "Chat" && eR.doc_id == taskData.token;
    });
    task = notification_data_ar.some((eR) => {
        return eR.icon != "Chat" && eR.doc_id == taskData.token;
    });

    var task_card = ` <li class=" card-box mb-2   border-bottom card_template_main" data-card-container-${tab}="${taskData.token}" >
    <div class="d-flex align-items-center justify-content-between"> <div class="name-avatar d-flex align-items-center ml-2">
    <div>
         <div>
             <div  data-modify="${taskData.token}" data-tab="${tab}" data-card-owner="${taskData.user_name}">
                 <span class="menu_tag_class" onclick="task_menu_icons(this)" data-modify="${taskData.token}" data-tab="${tab}" data-card-owner="${taskData.user_name}" >
                 <i class="dw dw-down-arrow-4"></i>`;
    if (task == true) {
        task_card += `<div class="red_dt_cls" style="transform: translate(15px, -20px);"></div>`;
    } else {
        task_card += `<div class="red_dt_cls d-none" style="transform: translate(15px, -20px);"></div>`;
    }
    task_card += `</span>
                
             </div>
         </div>
         <div class="cta flex-shrink-0 mx-3 chat_menu_cls" data-modify="Chat" data-chat-token="${taskData.token}"  >`;
    if (chat == true) {
        task_card += `<div class="red_dt_cls bg-success" style="transform: translate(0px, -20px);"></div>`;
    } else {
        task_card += `<div class="red_dt_cls d-none bg-success" style="transform: translate(0px, -20px);"></div>`;
    }
    task_card += `</div>
        </div>
         <div class="txt">
             <div>
                 <span class="badge badge-pill badge ${taskData.card_status
            .toLowerCase()
            .replaceAll(
                " ",
                "_"
            )}_badge_cls" style=" background-color: rgb(231, 235, 245);">${taskData.card_status
        }</span>
                 <span class="badge badge-pill badge ${taskData.card_type
            .toLowerCase()
            .replaceAll(
                " ",
                "_"
            )}_badge_cls mx-1" style=" background-color: rgb(231, 235, 245);">${taskData.card_type
        }</span>`;
    //    if(taskData.badge != ""){
    //     task_card +=`<span class="badge badge-pill badge text-danger new_badge_tag" style=" background-color: rgb(231, 235, 245);">New</span>`
    //    }

    if (tab == "managing" || tab == "approval" || tab == "manage") {
        task_card += `<span class="badge badge-pill badge text-dark ml-1" style=" background-color: rgb(231, 235, 245);">${taskData.user_name}</span>`;
    }
    if (sub_s == "Rejected") {
        task_card += `<span class="badge badge-pill badge text-danger ml-1" style=" background-color: rgb(231, 235, 245);">${sub_s}</span>`;
    }
    if (delayBg != false) {
        task_card += `<span class="badge badge-pill badge text-danger ml-1" style=" background-color: rgb(231, 235, 245);">${delayBg}</span>`;
    }
    if (noOfEx != false) {
        task_card += `<span class="badge badge-pill badge text-danger ml-1" style=" background-color: rgb(231, 235, 245);">No.of.extension ${noOfEx}</span>`;
    }
    task_card += `</div>
             <div class=" weight-600 card_info_text my-1">${taskData.task_description}</div>`;
    if (taskData.card_status == "Scheduling") {
        task_card += `<div class="font-12 weight-500 card_schedule_date"  style="color: rgb(79 78 82);">
                                   <span><span><b class="text-success">Created Date</b> :${create_date}</span></span>
                           </div>`;
    } else if (taskData.card_status == "Approved") {
        task_card += `<div class="font-12 weight-500 card_schedule_date"  style="color: rgb(79 78 82);">
                           <span><span><b class="text-success">Extended Date</b> : ${extend_date}</span></span>
                   </div>`;
    } else if (taskData.card_status == "Completed") {
        task_card += `<div class="font-12 weight-500 card_schedule_date"  style="color: rgb(79 78 82);">
                           <span><span><b class="text-success">Completed Date</b> : ${completed_date}</span></span>
                   </div>`;
    } else {
        task_card += `<div class="font-12 weight-500 card_schedule_date"  style="color: rgb(79 78 82);">
                           <span><span><b class="text-success">Scheduled Date</b> : ${schedule_date}</span></span>
                   </div>`;
    }
    task_card += `</div>
     </div>
  
     </div>
     <div class="options_append_tab"></div>
  </li>`;

    return task_card;
}

