const user = "Sathyajith";

let ticketData = {};
var ticket_creator_tab_card = []
var ticket_viewer_tab_card = []
var ticket_mainassignee_tab_card = []
var ticket_subassignee_tab_card = []


const allDepartments = {
  Engineering: [
    "Aadithya R",
    "Baskaran",
    "G Kirankumar",
    "Manoj R",
    "Mohammad Wasif",
    "Murali M",
    "Prashanth",
    "Rajesh S",
    "S Aakash",
    "V.N.Venkateshwara Rao",
    "V.Yuvaraj",
    "Vinoth Kumar C",
    "Yogeshwaran",
    "Vijay Jose",
    "Sriganesan",
  ],
  Sales: [
    "Azeez K",
    "Kathiravan",
    "Pijesh A",
    "Veeramani",
    "Ragupathi V",
  ],
  Accounts: [
    "C Santhosh Kumar",
    "G Easwar",
    "K Chandrasekar",
    "Nachammai",
    "Nivedha S",
    "Sajitha",
    "Vaishnavi",
  ],
  Human_Resource: ["Ithayavani B", "Parvathy P"],
  Land_Acquisition_Liasoning: ["J Gopinath"],
  Administration: ["Jayalaxmi", "L Sreemathy"],
  Telemarketing: [
    "Kavi Priya S",
    "Sarathy K",
    "Sridevi",
    "Vijay Hari P",
  ],
  Purchase: ["Kumar", "Roja"],
  IT: [
    "Uma Maheswari M",
    "M Saraboj",
    "Sathyajith N B",
    "Ram Kumar R",
  ],
  Store: ["Moorthy M"],
  Webapp_Board: ["Praneeth Jain"],
  Board: ["Pravin Kumar Jain", "Vipul Jain"],
  GM: ["Puneeth Bhatia"],
  CRM: ["Radha"],
  Marketing: ["S Jenifer Raj"],
  Digital_Marketing: ["Sasi Kumar"],
  Legal: ["Supriya M"],
};

//////////////////////////////////////////////////////////////////////////////////////
/* ----------------------------- Add Ticket Modal Functions ---------------------------- */
//////////////////////////////////////////////////////////////////////////////////////

function move_to_ticket(){
  get_template('ticket');
}

function dashboard_count_ticket_setter(){
  const dashBoard = dashBoardTicketFirebase(logUserDatas.emp_name);
  dashBoard.then((d)=>{
      if(d.status!=false){
          header_overview_ticket_box_count(d.data);
          dashboard_render(d.data)
      }
  })
}

function header_overview_ticket_box_count(count_obj){
  const count_value = Object.keys(count_obj);
  if(count_value.length>0){
      count_value.forEach((keyT)=>{
          $(`.ticket_${keyT}_count`).text(count_obj[keyT].length);
      })
  }
}

function addNewTicket() {
  let now = new Date();

  let no_of_assignees = $("#no_of_assignees").val();
  let no_of_viewers = $("#no_of_viewers").val();
  let main_assignee_dept = $("#main_assignee_dept").val();
  let main_assignee_name = $("#main_assignee_name").val();
  let sub_assignee1_dept = $("#sub_assignee1_dept").val();
  let sub_assignee1_name = $("#sub_assignee1_name").val();
  let sub_assignee2_dept = $("#sub_assignee2_dept").val();
  let sub_assignee2_name = $("#sub_assignee2_name").val();
  let viewer1_dept = $("#viewer1_dept").val();
  let viewer1_name = $("#viewer1_name").val();
  let viewer2_dept = $("#viewer2_dept").val();
  let viewer2_name = $("#viewer2_name").val();
  let ticketInfo = $("#new_ticket_info").val();
  let valid = true;

  if (main_assignee_dept == null) {
    valid = false;
    $("#main_assignee_dept").focus();
    return alertify.error(
      "Message!",
      "Please choose the Main Assignees Department...."
    );
  } else if (main_assignee_name == null) {
    valid = false;
    $("#main_assignee_name").focus();
    return alertify.error(
      "Message!",
      "Please choose the Main Assignees Name...."
    );
  } else if (no_of_assignees == "0" && no_of_viewers == "0") {
    if (ticketInfo == "") {
      valid = false;
      $("#new_ticket_info").focus();
      return alertify.error("Message!", "Please enter the Ticket info");
    }
    // return;
  }

  // SUB ASSIGNEE EMPTY CHECKING
  if (no_of_assignees != "0") {
    if (no_of_assignees == "1") {
      if (sub_assignee1_dept == null) {
        valid = false;
        $("#sub_assignee1_dept").focus();
        return alertify.error(
          "Message!",
          "Please choose the Sub Assignee Department"
        );
      } else if (sub_assignee1_name == null) {
        valid = false;
        $("#sub_assignee1_name").focus();
        return alertify.error(
          "Message!",
          "Please choose the Sub Assignees Name"
        );
      }
    } else if (no_of_assignees == "2") {
      if (sub_assignee1_dept == null) {
        valid = false;
        $("#sub_assignee1_dept").focus();
        return alertify.error(
          "Message!",
          "Please choose the Sub Assignee Department"
        );
      } else if (sub_assignee1_name == null) {
        valid = false;
        $("#sub_assignee1_name").focus();
        return alertify.error(
          "Message!",
          "Please choose the Sub Assignees Name"
        );
      }
      if (sub_assignee2_dept == null) {
        valid = false;
        $("#sub_assignee2_dept").focus();
        return alertify.error(
          "Message!",
          "Please choose the Second Sub Assignee Department"
        );
      } else if (sub_assignee2_name == null) {
        valid = false;
        $("#sub_assignee2_name").focus();
        return alertify.error(
          "Message!",
          "Please choose the Second Sub Assignees Name"
        );
      }
    }
  }

  // VIEWER EMPTY CHECKING
  if (no_of_viewers != "0") {
    if (no_of_viewers == "1") {
      if (viewer1_dept == null) {
        valid = false;
        $("#viewer1_dept").focus();
        return alertify.error(
          "Message!",
          "Please choose the Viewer Department"
        );
      } else if (viewer1_name == null) {
        valid = false;
        $("#viewer1_name").focus();
        return alertify.error("Message!", "Please choose the Viewer Name");
      }
    } else if (no_of_viewers == "2") {
      if (viewer1_dept == null) {
        valid = false;
        $("#viewer1_dept").focus();
        return alertify.error(
          "Message!",
          "Please choose the Viewer Department"
        );
      } else if (viewer1_name == null) {
        valid = false;
        $("#viewer1_name").focus();
        return alertify.error("Message!", "Please choose the Viewer Name");
      }
      if (viewer2_dept == null) {
        valid = false;
        $("#viewer2_dept").focus();
        return alertify.error(
          "Message!",
          "Please choose the Second Viewer Department"
        );
      } else if (viewer2_name == null) {
        valid = false;
        $("#viewer2_name").focus();
        return alertify.error(
          "Message!",
          "Please choose the Second Viewer Name"
        );
      }
    }
  }

  if (ticketInfo == "") {
    valid = false;
    $("#new_ticket_info").focus();
    return alertify.error("Message!", "Please enter the Ticket info");
  }

  
  
// setting empty values
sub_assignee1_dept = sub_assignee1_dept == null ? "" : sub_assignee1_dept;
sub_assignee1_name = sub_assignee1_name == null ? "" : sub_assignee1_name;
sub_assignee2_dept = sub_assignee2_dept == null ? "" : sub_assignee2_dept;
sub_assignee2_name = sub_assignee2_name == null ? "" : sub_assignee2_name;
viewer1_dept = viewer1_dept == null ? "" : viewer1_dept;
viewer1_name = viewer1_name == null ? "" : viewer1_name;
viewer2_dept = viewer2_dept == null ? "" : viewer2_dept;
viewer2_name = viewer2_name == null ? "" : viewer2_name;

  const ticketObj = {
    create_date: now,
    no_of_assignees: no_of_assignees,
    no_of_viewers: no_of_viewers,
    main_assignee_dept: main_assignee_dept,
    main_assignee_name: main_assignee_name,
    sub_assignee1_dept: sub_assignee1_dept,
    sub_assignee1_name: sub_assignee1_name,
    sub_assignee2_dept: sub_assignee2_dept,
    sub_assignee2_name: sub_assignee2_name,
    viewer1_dept: viewer1_dept,
    viewer1_name: viewer1_name,
    viewer2_dept: viewer2_dept,
    viewer2_name: viewer2_name,
    ticketInfo: `${ticketInfo.trim().charAt(0).toUpperCase() + ticketInfo.slice(1)
      }`,
  };

  if (valid == true) {
    console.log(ticketObj);
    showLoader();
    
    $(".assign_name").html(
      `<Option value='' disabled selected>Select the Name</Option>`
    );
    modalscrollreset();

    // 23rd feb
    const user = logUserDatas.emp_name
    const ticketstoredData = addticketFirebase(ticketObj, user)
    ticketstoredData.then((tickDs)=>{
      hideLoader();
      $("#add_ticket_modal").modal("hide");
      $("#add_ticket_modal_form")[0].reset();
      $(".assignee").css("display", "none");

      const card = make_Ticket_Card(tickDs);
      $("#raised_card_list_container").append(card);
      alertify.success("New Ticket added Successfully");
    })
  // console.log(ticketData);
  // addticketFirebase(ticketObj, user).then((addTic=>{
  //   return addTic
  // })
 };
};

function display_assignee() {
  let no_of_assignees = Number($("#no_of_assignees").val());
  if (no_of_assignees === 0) {
    $(".sub_assignee1_container").css("display", "none");
    $(".sub_assignee2_container").css("display", "none");
  } else if (no_of_assignees === 1) {
    $(".sub_assignee1_container").css("display", "block");
    $(".sub_assignee2_container").css("display", "none");
  } else if (no_of_assignees === 2) {
    $(".sub_assignee1_container").css("display", "block");
    $(".sub_assignee2_container").css("display", "block");
  }
}

function display_viewer() {
  let no_of_viewers = Number($("#no_of_viewers").val());
  if (no_of_viewers === 0) {
    $(".viewer1_container").css("display", "none");
    $(".viewer2_container").css("display", "none");
  } else if (no_of_viewers === 1) {
    $(".viewer1_container").css("display", "block");
    $(".viewer2_container").css("display", "none");
  } else if (no_of_viewers === 2) {
    $(".viewer1_container").css("display", "block");
    $(".viewer2_container").css("display", "block");
  }
}

function display_name(dept, name, index) {
  // let mainName = $('#' + name)// format for data coming with " " marks ->'main_assignee_name'
  let mainName = $(name);
  // if ($(dept).val() != "") {
  delete selNameObj[index];
  mainName.html("");
  mainName.append(
    `<Option value='' disabled selected>Select the Name</Option>`
  );
  // console.log(name);
  let listOfname = allDepartments[$(dept).val()];

  Object.values(selNameObj).forEach((el) => {
    listOfname = listOfname.filter((rxl) => {
      return rxl != el;
    });
  });
  listOfname.forEach((el) => {
    mainName.append(`<Option value='${el}'>${el}</Option>`);
  });
  // }
}

let selNameObj = {};

function selName(val, index) {
  const x = $(val).children();
  // console.log(x);
  $(x).css("display", "none");
  $(val).children(`[value="${val.value}"]`).css("display", "block");
  selNameObj[index] = $(val).val();
  console.log(selNameObj);
}

function clearform() {
  setTimeout(() => $("#add_ticket_modal_form")[0].reset(), 1000);
  $(".assignee").css("display", "none");
  $(".assign_name").html(
    `<Option value='' disabled selected>Select the Name</Option>`
  );
  // $(".assign_name").reset()
  selNameObj = {};
  listOfname = [];
  // $("#add_ticket_modal_form")[0].reset();
  // $('#add_ticket_modal').scrollTop();
  modalscrollreset();
}

function modalscrollreset() {
  $("#add_ticket_modal").on("show.bs.modal", function () {
    // console.log("i am modal");
    $("#add_ticket_modal_form").animate({ scrollTop: 0 }, "fast");
    // $('#add_ticket_modal_form').scrollTop(0);
  });
}

//////////////////////////////////////////////////////////////////////////////////////
/* ----------------------------- Ticket Page functions ---------------------------- */
//////////////////////////////////////////////////////////////////////////////////////

/* -------------------------- // ticket ui start functions -------------------------- */
// Ticket Card UI Functions
function make_Ticket_Card(ticke_Data,tab) {
  console.log(ticke_Data.ticket_information);
    let create_date = ticke_Data.created_on.toDate();
    create_date = new Date(create_date).toDateString();
    let schedule_date;
    if(ticke_Data.card_status != "Scheduling"){
        schedule_date = ticke_Data.scheduled_On.toDate();
        schedule_date = new Date(schedule_date).toDateString();
    }
    let extend_date;
    if(ticke_Data.card_status == "Approved"){
        extend_date = new Date(ticke_Data.extended_on[ticke_Data.extended_on.length - 1].date.toDate()).toDateString();
    }
    let completed_date;
    if(ticke_Data.card_status == "Completed"){
        completed_date = new Date(ticke_Data.completed_on[ticke_Data.completed_on.length - 1].date.toDate()).toDateString()
    }
    let chat = false;
    let ticket= false;
    // chat = notification_data_ar.some((eR)=>{return eR.icon == 'Chat' && eR.doc_id == ticke_Data.token});
    // ticket = notification_data_ar.some((eR)=>{return eR.icon != 'Chat' && eR.doc_id == ticke_Data.token});
  let ticketMainCard = 
  `<li class="card-box mb-2 border-bottom card_template_main"
  data-card-container-${tab}="${ticke_Data.token}">
<div class="d-flex align-items-center justify-content-between mr-2 m-1">
  <div class="name-avatar d-flex align-items-center ml-2">
    <div>
      <div>
        <div data-modify="${ticke_Data.token}" data-tab="${tab}" data-card-owner="${ticke_Data.user_name}">
          <span class="menu_tag_class" onclick="ticket_menu_icons(this)" data-modify="${ticke_Data.token}"
            data-tab="${tab}" data-card-owner=${ticke_Data.user_name}">
            <i class="dw dw-down-arrow-4"></i>`;
            if(ticket == true){
              ticketMainCard += `<div class="red_dt_cls " style="
              transform: translate(
                15px,
                -20px
              );
            "></div>`
            }else{
              ticketMainCard += `<div class="red_dt_cls d-none" style="
              transform: translate(
                15px,
                -20px
              );
            "></div>`
            }
        ticketMainCard +=     
          `</span>
        </div>
      </div>
      <div class="cta flex-shrink-0 mx-3 chat_menu_cls" data-modify="Chat"
        data-chat-token="${ticke_Data.token}">`
        if(chat == true){
          ticketMainCard +=  `<div class="red_dt_cls bg-success" style="transform: translate(0px, -20px);"></div>`
         }else{
          ticketMainCard +=  `<div class="red_dt_cls d-none bg-success" style="transform: translate(0px, -20px);"></div>`
         }
    ticketMainCard += `</div>
    </div>

    <div class="d-flex justify-content-evenly txt">
      <div class="">
        <div class="weight-600 card_info_text ticket my-1">
          ${ticke_Data.ticket_information}
        </div>
        <div class="font-12 weight-500 card_schedule_date" style="color: rgb(79 78 82)">
          <span>
            <b class="text-success">Scheduled On:</b>
          ${create_date}
          </span>
        </div>
      </div>
    </div>
  </div>

  <div>
    <span class="badge badge-pill badge ${ticke_Data.card_status.toLowerCase().replaceAll(" ","_")}_badge_cls" style="
        background-color: rgb(231, 235, 245);
      ">${ticke_Data.card_status}</span>

    <span class="badge badge-pill badge self_badge_cls mx-1"
      style=" background-color: rgb(231, 235, 245);">Self</span>
    <span class="badge badge-pill badge text-danger ml-1"
      style=" background-color: rgb(231, 235, 245);">Delayed
      Ticket</span>



  </div>
</div>
<div class="options_append_tab"></div>
</li>`
  return ticketMainCard;
}

function modify_make_ticket_container(ticke_Data,tab) {
  console.log(ticke_Data,tab)
  let create_date = ticke_Data.created_on.toDate();
    create_date = new Date(create_date).toDateString();
 
    let schedule_date = "---"
    if(ticke_Data.card_status != "Scheduling"){
        schedule_date = ticke_Data.scheduled_On.toDate();
        schedule_date = new Date(schedule_date).toDateString();
    }
    let extend_date;
    if(ticke_Data.card_status == "Approved"){
        extend_date = new Date(ticke_Data.extended_on[ticke_Data.extended_on.length - 1].date.toDate()).toDateString();
    }
    let extend_date_e;
    if(ticke_Data.card_status == "Awaiting Approval"){
        extend_date_e = new Date(ticke_Data.extended_on[ticke_Data.extended_on.length - 1].date.toDate()).toDateString();
    }
    
    // let completed_date = false
    // if(ticke_Data.card_status == "Completed"){
    //     completed_date = new Date(ticke_Data.completed_on[ticke_Data.completed_on.length - 1].date.toDate()).toDateString()
    // }
    // let download_file = false;
    // if(ticke_Data.file_details[0] != "empty"){
    //  download_file = true
    // }
  let ticketMainCard =                                 
  `<div class="border-top mt-2 options_cc_container">    
  <div class="client_info_table_container">
    <div class="col font-12">

      <div class="row text-center mt-2 mb-3">
        <div class="col col-lg-6 col-md-6 col-sm-6 card-remark floatLeft"
          style="text-align: left">
          <div class="row">
            <div>
              <span class="text-success card_label "><b>Creator:</b></span>
              <span class="card_info_text">${ticke_Data.creator_name}</span>
            </div>
          </div>

          <div class="row mt-3">
            <div class="">

              <span class="text-success card_label"><b>Viewer - 1:</b>
              </span>

              <span class="card_info_text">${ticke_Data.viewer1_name}</span>
            </div>
            
          </div>

          <div class="row mt-3">
            <div>

              <span class="text-success card_label"><b>Viewer - 2:</b>
              </span>

              <span class="card_info_text">${ticke_Data.viewer2_name}</span>
            </div>
            
          </div>
        </div>

        <div class="col col-lg-6 col-md-6 col-sm-6 card-remark floatLeft"
          style="text-align: left">
          <div class="row">
            <div>

              <span class="text-success card_label"><b>Main Assignee:</b>

              </span>
              <span class="card_info_text">${ticke_Data.main_assignee_name}<br /></span>
            </div>
            <div>

              <span class="text-success card_label"><b>Status:</b></span>

              <span class="badge badge-pill badge pending_badge_cls" style="
                    background-color: rgb(
                      231,
                      235,
                      245
                    );
                  ">${ticke_Data.card_status}</span>
            </div>
          </div>

          <div class="row mt-3 }">
            <div>

              <span class="text-success card_label"><b>Sub Assignee - 1:</b>
              </span>

              <span class="card_info_text">${ticke_Data.sub_assignee1_name}</span>
            </div>
            <div>

              <span class="text-success card_label"><b>Status:</b></span>

              <span class="badge badge-pill badge pending_badge_cls" style="
                    background-color: rgb(
                      231,
                      235,
                      245
                    );
                  ">${ticke_Data.card_status}</span>
            </div>
          </div>

          <div class="row mt-3 ">
            <div>

              <span class="text-success card_label"><b>Sub Assignee - 2:</b>
              </span>

              <span class="card_info_text">${ticke_Data.sub_assignee2_name}</span>
            </div>
            <div>

              <span class="text-success card_label"><b>Status:</b></span>

              <span class="badge badge-pill badge pending_badge_cls" style="
                    background-color: rgb(
                      231,
                      235,
                      245
                    );
                  ">${ticke_Data.card_status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="ticket_icons_container ">
        <div class="d-flex text-center pl-3 tickets_actions_icons_list" data-token="${ticke_Data.token}"
          data-lead-owner="" data-tab="${tab}">
          <div class="m-1 ticket_action_icon edit_icons_box" data-icon-name="edit"
            onclick="ticket_icons(this)">
            <div class="ticket_cl_icon">
              <i class="dw dw-edit2 "></i>
            </div>
            <div class="ticket_cl_text">
              Edit
            </div>
          </div>

          <div class="m-1 ticket_action_icon delete_icons_box" data-icon-name="delete"
            onclick="ticket_icons(this)">
            <div class="ticket_cl_icon">
              <i class="icon-copy dw dw-delete-3"></i>
            </div>
            <div class="ticket_cl_text">
              Delete
            </div>
          </div>

          <div class="m-1 ticket_action_icon upload_icons_box" data-icon-name="upload"
            onclick="ticket_icons(this)">
            <div class="ticket_cl_icon">
              <i class="icon-copy dw dw-upload1"></i>
            </div>
            <div class="ticket_cl_text">
              Upload
            </div>
          </div>

          <div class="m-1 ticket_action_icon chat_icons_box" data-icon-name="chat"
            onclick="ticket_icons(this)">
            <div class="ticket_cl_icon">
              <i class="icon-copy dw dw-chat"></i>
            </div>
            <div class="ticket_cl_text">
              Chat
            </div>
          </div>

          <div class="m-1 ticket_action_icon reassign_icons_box"
            data-icon-name="reassign" onclick="ticket_icons(this)">
            <div class="ticket_cl_icon">
              <i class="icon-copy bi bi-arrow-repeat"></i>
            </div>
            <div class="ticket_cl_text">
              Re-assign
            </div>
          </div>

          <div class="m-1 ticket_action_icon schedule_icons_box"
            data-icon-name="schedule" onclick="ticket_icons(this)">
            <div class="ticket_cl_icon">
              <i class="icon-copy bi bi-clock"></i>
            </div>
            <div class="ticket_cl_text">
              Schedule
            </div>
          </div>

          <div class="m-1 ticket_action_icon complete_icons_box"
            data-icon-name="complete" onclick="ticket_icons(this)">
            <div class="ticket_cl_icon">
              <i class="icon-copy dw dw-tick"></i>
            </div>
            <div class="ticket_cl_text">
              Complete
            </div>
          </div>

          <div class="m-1 ticket_action_icon download_icons_box"
            data-icon-name="download" onclick=" ticket_icons(this)">
            <div class="ticket_cl_icon">
              <i class="icon-copy dw dw-file"></i>
            </div>
            <div class="ticket_cl_text">
              Download
            </div>
          </div>

          <div class="m-1 ticket_action_icon chat_icons_box"
            data-icon-name="remove_viewer" onclick="ticket_icons(this)">
            <div class="ticket_cl_icon">
              <i class="icon-copy bi bi-eye-slash"></i>
            </div>
            <div class="ticket_cl_text">
              Remove Viewer
            </div>
          </div>

          <div class="m-1 ticket_action_icon chat_icons_box"
            data-icon-name="remove_subassignee" onclick="ticket_icons(this)">
            <div class="ticket_cl_icon">
              <i class="icon-copy bi bi-person-dash"></i>
            </div>
            <div class="ticket_cl_text">
              Remove Sub Assignee
            </div>
          </div>

          <div class="m-1 ticket_action_icon chat_icons_box"
            data-icon-name="add_subassignee" onclick="ticket_icons(this)">
            <div class="ticket_cl_icon">
              <i class="icon-copy bi bi-person-plus"></i>
            </div>
            <div class="ticket_cl_text">
              Add Sub Assignee
            </div>
          </div>

          <div class="m-1 ticket_action_icon chat_icons_box"
            data-icon-name="restore_assignee" onclick="ticket_icons(this)">
            <div class="ticket_cl_icon">
              <i class="icon-copy dw dw-refresh1  "></i>
            </div>
            <div class="ticket_cl_text">
              Restore
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

</div>`
  return ticketMainCard;
}

var menu_card_objects = {};

function ticket_menu_icons(e) {
  console.log(e);
  const select_append_tab = $(e)
    .parent()
    .parent()
    .parent()
    .parent()
    .parent()
    .next();
  console.log(select_append_tab, "see");
  if ($(select_append_tab).children().eq(0).hasClass("options_cc_container")) {
    $(select_append_tab).empty();
    $(e).children("i")[0].outerHTML = '<i class="dw dw-down-arrow-4"></i>';
    console.log(select_append_tab, "ram");
  } else {
    refreshCard();
    $(e).children("i")[0].outerHTML = '<i class="dw dw-up-arrow"></i>';
    const loaderSp = `<div style="text-align: center;" class="my-2"><div class="spinner-border text-success" role="status"><span class="visually-hidden">Loading...</span></div></div >`
    console.log(loaderSp)
    const tab = $(e).attr("data-tab");
    const token = $(e).attr("data-modify");
    // const card_user = $(e).attr("data-card-owner");
    //const obj = { user_name: card_user, token };
    $(e).children(".red_dt_cls").addClass("d-none");
    console.log($(e).parent().parent());
    $(e).parent().parent().next().children(".red_dt_cls").addClass("d-none");
    $(select_append_tab).html(loaderSp);
    // read_update_notification(token);
    // console.log(notification_data_ar, "dddd");
    // notification_data_ar = notification_data_ar.filter((notify) => {
    //   return notify.doc_id != token;
    // });
    // $(".notification-active").addClass("d-none");
    modifyticketIcon(token).then((ticket_daataa)=>{
      console.log(ticket_daataa)
      if(ticket_daataa.status == true){
        const append_options_container = modify_make_ticket_container(ticket_daataa.data,tab)
        $(select_append_tab).html(append_options_container);
        menu_card_objects = ticket_daataa.data;
        const card = $(e).parent().parent().parent().parent().parent().parent();
        const cardparent = $(e)
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent();
        console.log(cardparent, card);
        window.setTimeout(function () {
          var a = card[0].offsetTop;
          $(cardparent).stop().animate({ scrollTop: a }, 10);
        }, 100);
      }else{
        alertify.error("Alert! Please try again")
      }
    })
  }
}

// Ticket Card Icons Modal Functions

function ticket_icons(e) {
  Array.from($(".ticket_modify_modal_form")).forEach((fE) => {
    $(fE)[0].reset();
  });
  const getIcon = $(e).attr("data-icon-name");
  // const token = $(e).parent().attr('data-token')
  const cardD = menu_card_objects;
  //  console.log(cardD);
  if (getIcon == "edit") {
     $(".edit_values").val(cardD.ticket_information);
  } else if (getIcon == "chat") {
  } else if (getIcon == "delete") {
    $(".delete_values").val(cardD.ticket_information);
  } else if (getIcon == "upload") {
    $('.upload_values').val(cardD.ticket_information)
  } else if (getIcon == "download") {
  } else if (getIcon == "complete") {
    $('.complete_values').val(cardD.ticket_information)
  } else if (getIcon == "schedule") {
    $(".schedule_values").val(cardD.ticket_information)
  } else if (getIcon == "reassign") {
  } else if (getIcon == "add_subassignee") {
    $("#addsubassign_ticket_info").val(cardD.ticket_information);
  } else if (getIcon == "remove_subassignee") {
    $('.remove_subassignee_values').val(cardD.ticket_information);
    let sub1_dept=$('#sub1_dept').val(cardD.sub_assignee1_department);
    let sub1_name=$('#sub1_name').val(cardD.sub_assignee1_name);
    let sub2_dept=$('#sub2_dept').val(cardD.sub_assignee2_department);
    let sub2_name=$('#sub2_name').val(cardD.sub_assignee2_name);
    if(sub1_dept=="" && sub1_name==""){
      $("#rem_subassignee1").addClass("d-none");
    }else $("#rem_subassignee1").removeClass("d-none")
    if(sub2_dept=="" && sub2_name==""){
      $("#rem_subassignee2").addClass("d-none");
    }else $("#rem_subassignee2").removeClass("d-none")
  } else if (getIcon == "remove_viewer") {
    $(".remove_viewer_values").val(cardD.ticket_information);
   let viewer_dept1 = $('#view1').val(cardD.viewer1_department);
   let viewer_name1 = $('#view1_name').val(cardD.viewer1_name);
   let viewer_dept2 = $('#view2').val(cardD.viewer2_department);
   let viewer_name2 = $('#view2_name').val(cardD.viewer2_name);
   if(viewer_dept1 != "" && viewer_name1 != ""){
    $("#rem_viewer1").removeClass("d-none");
   }
   if(viewer_dept2 != "" && viewer_name2 != ""){
    $("#rem_viewer2").removeClass("d-none");
   }
  } else if(getIcon == "restore_assignee"){
    $(".restore_values").val(cardD.ticket_information);
  }
  $(`#ticket_${getIcon}_icon_modal`).modal("show");
}

// TicketEdit Icon
function ticketEdit() {
  const card_store_value =  menu_card_objects;
  const newTicket = $('#edit_ticket_info').val();
  const valid = true;
  if(card_store_value.ticket_information == newTicket) return alertify.error("Alert! same descriptions")
  if (newTicket.trim() == "") return alertify.error("Please enter the Ticket info");
  const ticket_Edit_Obj = {token:card_store_value.token, newTicket };
         if (valid == true) {
          console.log(ticket_Edit_Obj);
          showLoader();
          editTicketFirebase(ticket_Edit_Obj).then((tic)=>{
          console.log(tic.data,tic.status)
          hideLoader();
          $("#ticket_edit_icon_modal").modal("hide");
          alertify.success("Info edited successfully")
         }) 
 }
};
// TicketDelete Icon
function ticketDelete(){
  const card_store_value = menu_card_objects;
  const deletedTicket = $('#ticket_info').val();
  const valid = true;
  const ticket_Delete_Obj = {token:card_store_value.token};

  
    if (valid == true) {
      console.log(ticket_Delete_Obj);
      showLoader();
      deleteTicketFirebase(card_store_value.token).then((del)=>{
        console.log(del);
        hideLoader()
        $("#ticket_delete_icon_modal").modal("hide")
        // const replaceTag  =  $(`.card_template_main[data-card-container=${card_store_value.token}]`);
        alertify.error('Task deleted successfully');
      })
      
      
    };
  }; 
 function deleted_ticket_all(data) {
  $(`.card_template_main[data-card-container=${data.token}]`).remove();
   ticket_creator_tab_card = ticket_creator_tab_card.filter((eTicket)=>{return eTicket.token != data.token})
  const pard = Array.from($('#raised_card_list_container').children('.card_template_main'));
  if(pard.length == 0){
      $('#raised_card_list_container').html(no_record);
  }
  ticket_creator_tab_set_counts()
}
// TicketUpload Icon
function ticketUpload() {
  const card_store_value =  menu_card_objects;
  const ticketFileInput = $("#ticket_upload_input").val();
  const ticketFileUpload = $("#ticket_upload_file_input");
  const files = ticketFileUpload[0].files;
  const valid = true;

  if (files.length == 0) return alertify.error("Please choose the File to Upload");
  const ticket_Upload_Obj = {...card_store_value}
 
    if (valid == true) {
      showLoader();
      uploadTicketFirebase(files,ticket_Upload_Obj).then((uplad)=>{
        refreshCard()
        hideLoader();
        $("#ticket_upload_icon_modal").modal("hide");
        alertify.success("File uploaded successfully")
      })
    };
  };
function refreshCard(){
    $(".options_append_tab").empty()
    $(".menu_tag_class").children("i").removeClass("dw dw-up-arrow");
    $(".menu_tag_class").children("i").addClass("dw dw-down-arrow-4");
}

function ticketChat() {
  // console.log($('.chatValue').val());
  // $("#ticket_chat_icon_modal").modal("hide");
}

function ticketReassign() {
  const reassgn_dept = $('#reassignee_dept').val();
  const reassgn_name = $('#reassignee_name').val();
  const valid = true;
  if (!reassgn_dept) {
    return alertify.error(
      "Please choose the Assignee Department"
    );
  } else if (!reassgn_name) {
    return alertify.error(
      "Please choose the Assignee Name"
    );
  }
  const ticket_Reassignee_obj = { reassgn_dept, reassgn_name }
  if (valid == true) {
    console.log(ticket_Reassignee_obj);
    showLoader();
    setTimeout(() => {
      hideLoader();
      $("#ticket_reassign_icon_modal").modal("hide");
    }, 1000)
  };
};
// TicketSchedule Icon
function ticketSchedule() {
  const card_store_value =  menu_card_objects;
  const scheduleDate = $('#new_ticket_date').val();
  const valid = true;
  if (!scheduleDate) return alertify.error("Please choose the Schedule Date");
  const ticket_Schedule_Obj = {schedule_date: new Date(scheduleDate),token:card_store_value.token };

  
    if (valid == true) {
      console.log(ticket_Schedule_Obj)
      alertify.success('Ticket scheduled successfully');
      $("#ticket_schedule_icon_modal").modal("hide");
        showLoader();
        scheduleTicketFirebase(ticket_Schedule_Obj)
        hideLoader();
    };
};
// TicketComplete Icon
function ticketComplete() {
  const card_store_value =  menu_card_objects;
  const completeTicket = $('#complete_ticket_info').val();
  const valid = true;
  //const ticket_Complete_Obj = {token: card_store_value.token,completeTicket}

  
    if (valid == true) {
      $("#ticket_complete_icon_modal").modal("hide");
      showLoader();
      completeTicketFirebase(card_store_value.token).then((co_mpl) => {
        hideLoader();
        alertify.success('Ticket completed  successfully');
      })
    };
};

function ticketRestore(){
  //const card_store_value = menu_card_objects;
  const restore_info = $("#restore_assignee_ticket_info").val();
  const restore_obj = {restore_info};
  const valid = true;
  if(valid == true){
    
    showLoader();
    setTimeout(()=>{
      console.log(restore_obj)
      $("#ticket_restore_assignee_icon_modal").modal("hide");
      hideLoader();
      alertify.success('Ticket restore successfully');
    },1000)
  }
}

function ticketDownload() {
  const downloadTicket = $('#file').val();
  const valid = true;

  const ticket_Download_Obj = { downloadTicket };
  if (valid == true) {
    console.log(ticket_Download_Obj);
    showLoader();
    setTimeout(() => {
      hideLoader();
      $('#ticket_download_icon_modal').modal('hide');
    }, 1000)
  };
};

function ticketRemoveViewer() {
  const card_store_value =  menu_card_objects;
  const v1Dept = $('#view1').val()
  const v1Name = $('#view1_name').val()
  const v2Dept = $('#view2').val()
  const v2Name = $('#view2_name').val()
  const valid = true;
  let remObj;
  let removeViewer1 = { v1Dept, v1Name, "position": 1, }
  let removeViewer2 = { v2Dept, v2Name, "position": 2, }
  let removeBothViewer = { "viewer1": removeViewer1, "viewer2": removeViewer2, "position": 3, };
  const v1check = $('#viewer1')[0].checked;
  const v2check = $('#viewer2')[0].checked
    if (valid == true) {
      if (v1check && v2check) {
        console.log(removeBothViewer);
        remObj = removeBothViewer;
      } else if (v1check) {
        console.log(removeViewer1);
        remObj = removeViewer1
      } else if (v2check) {
        console.log(removeViewer2);
        remObj = removeViewer2
      } else {
        return alertify.error(
          "Please choose the Viewer"
        );
      }
      showLoader();
      removeViewerFirebase(remObj, card_store_value.token).then((remo_vie) => {
        console.log(remo_vie)
        $("#ticket_remove_viewer_icon_modal").modal("hide");
        hideLoader();
      })
      console.log(remObj, card_store_value.token)
    };
  
  
};

function ticketRemoveSubassignee() {
  const card_store_value =  menu_card_objects;
  const s1Dept = $('#sub1_dept').val()
  const s1Name = $('#sub1_name').val()
  const s2Dept = $('#sub2_dept').val()
  const s2Name = $('#sub2_name').val()
  const valid = true;
  let remSubObj;
  let removeSub1 = { s1Dept, s1Name, position: 1 }
  let removeSub2 = { s2Dept, s2Name, position: 2 }
  let removeBothSubAssgn = { 'sub assignee 1': removeSub1, 'sub assignee 2': removeSub2, position: 3 };
  const sub1check = $('#sub1')[0].checked;
  const sub2check = $('#sub2')[0].checked;
  
  // Firebase Function
    if (valid == true) {
      if (sub1check && sub2check) {
        console.log(removeBothSubAssgn);
        remSubObj=removeBothSubAssgn;
      } else if (sub1check) {
        console.log(removeSub1);
        remSubObj=removeSub1;
      } else if (sub2check) {
        console.log(removeSub2);
        remSubObj=removeSub2;
      } else {
        return alertify.error(
          "Please choose the Sub Assignee"
        );
      }
      showLoader();
      removeSubasgnFirebase(remSubObj,card_store_value.token).then((remov_subA) => {
        hideLoader();
        $("#ticket_remove_subassignee_icon_modal").modal("hide");
    
    });
  }
  
};

// function ticketAddSubassignee() {
//   const card_store_value =  menu_card_objects;
//   const addsubasgn_info = $("#addsubassign_ticket_info").val();
//   const addsubasgn1_dept = $("#addsub1_dept").val();
//   const addsubasgn1_name = $("#addsub1_name").val();
//   const addsubasgn2_dept = $("#addsub2_dept").val();
//   const addsubasgn2_name = $("#addsub2_name").val();
//   const valid = true;
//   let addRemSub;
//   if (addsubasgn1_dept == null) {
//     $("#addsub1_dept").focus();
//     // addRemSub=addsubasgn1_dept
//     return alertify.error(
//       "Please choose the Sub Assignee Department...."
//     );
//   } else if (addsubasgn1_name == null) {
//     $("#addsub1_name").focus();
//     // addRemSub=addsubasgn1_name
//     return alertify.error(
//       "Please choose the Sub Assignees Name...."
//     );
//   }

//   if (count != 0) {
//     if (addsubasgn2_dept == null) {
//       $("#addsub2_dept").focus();
//       // addRemSub=addsubasgn2_dept
//       return alertify.error(
//         "Please choose the Sub Assignee Department...."
//       );
//     } else if (addsubasgn2_name == null) {
//       $("#addsub2_name").focus();
//       // addRemSub=addsubasgn2_name
//       return alertify.error(
//         "Please choose the Sub Assignees Name...."
//       );
//     }
//   }

//   const addsubassign_Obj = { addsubasgn_info }
//   const addsubassign1_Obj = { addsubasgn1_dept, addsubasgn1_name };
//   const addsubassign2_Obj = { addsubasgn2_dept, addsubasgn2_name };
//   //const addsubassigneeObj = {addsubassign_Obj,addsubassign1_Obj,addsubassign2_Obj}
//   if (valid == true) {
//     showLoader();
//     addsubassgnFirebase(card_store_value.token ).then((add_subA) => {
//       console.log(add_subA)
//       hideLoader();
//       $("#ticket_add_subassignee_icon_modal").modal("hide");
//       $("#addsubassgn_btn").removeClass("d-none");
//       $('.subasgn2').addClass("d-none");
//     })
//   };
// };
function ticketAddSubassignee() {
  const card_store_value =  menu_card_objects;
  const addsubasgn_info = $("#addsubassign_ticket_info").val();
  const addsubasgn1_dept = $("#addsub1_dept").val();
  const addsubasgn1_name = $("#addsub1_name").val();
  const addsubasgn2_dept = $("#addsub2_dept").val();
  const addsubasgn2_name = $("#addsub2_name").val();
  const valid = true;
  let addSubObj;
  const addsub1 = { addsubasgn1_dept, addsubasgn1_name, position: 1 };
  const addsub2 = { addsubasgn2_dept, addsubasgn2_name };
  const addBothsub = { subassgn1: addsub1, subassgn2: addsub2, position: 2 };
  if (addsubasgn1_dept == null) {
    $("#addsub1_dept").focus();
    // addRemSub=addsubasgn1_dept
    return alertify.error(
      "Please choose the Sub Assignee Department...."
    );
  } else if (addsubasgn1_name == null) {
    $("#addsub1_name").focus();
    // addRemSub=addsubasgn1_name
    return alertify.error(
      "Please choose the Sub Assignees Name...."
    );
  }
  addSubObj = addsub1
  if (count != 0) {
    if (addsubasgn2_dept == null) {
      $("#addsub2_dept").focus();
      // addRemSub=addsubasgn2_dept
      return alertify.error(
        "Please choose the Sub Assignee Department...."
      );
    } else if (addsubasgn2_name == null) {
      $("#addsub2_name").focus();
      // addRemSub=addsubasgn2_name
      return alertify.error(
        "Please choose the Sub Assignees Name...."
      );
    }
    addSubObj = addBothsub;
  }
  if (valid == true) {
    showLoader();
    addsubassgnFirebase(addSubObj,card_store_value.token ).then((add_subA) => {
      console.log(add_subA)
      hideLoader();
      $("#ticket_add_subassignee_icon_modal").modal("hide");
      $("#addsubassgn_btn").removeClass("d-none");
      $('.subasgn2').addClass("d-none");
    })
  };
};
let count = 0;

function addAssignee(btn) {
  $(btn).addClass("d-none");
  $('.subasgn2').removeClass("d-none");
  count++;
}

// Ticket UI Functions 
//Ticket status list count functions
function ticket_creator_tab_set_counts(){
  const status_list = ticket_creator_tab_card;
  const ticket_creator_status_obj = {pending:[],approved:[],scheduling:[],awaiting_approval:[]}
  status_list.filter((sts_list)=>{
      if(sts_list.card_status != "CreatorTimeline"){
          ticket_creator_status_obj[sts_list.card_status.toLowerCase().replaceAll(" ","_")].push(sts_list);
      }
  });
  const status_D = Object.keys(ticket_creator_status_obj);
  status_D.filter((key_status)=>{
      $(`.status_count_s_${key_status}`).text(ticket_creator_status_obj[key_status].length)
  })
}

function ticket_viewer_tab_set_counts(){
  const status_list = ticket_viewer_tab_card;
  const ticket_viewer_status_obj = {pending:[],approved:[],scheduling:[],awaiting_approval:[]}
  status_list.filter((vie_list)=>{
      if(vie_list.card_status != "ViewerTimeline"){
          ticket_viewer_status_obj[vie_list.card_status.toLowerCase().replaceAll(" ","_")].push(vie_list);
      }
  });
  const status_D = Object.keys(ticket_viewer_status_obj);
  status_D.filter((key_status)=>{
      $(`.status_count_s_${key_status}`).text(ticket_viewer_status_obj[key_status].length)
  })
}

function ticket_mainassignee_tab_set_counts(){
  const status_list = ticket_mainassignee_tab_card;
  const ticket_mainassignee_status_obj = {pending:[],approved:[],scheduling:[],awaiting_approval:[]}
  status_list.filter((mainA_list)=>{
      if(mainA_list.card_status != "MainassigneeTimeline"){
          ticket_mainassignee_status_obj[mainA_list.card_status.toLowerCase().replaceAll(" ","_")].push(mainA_list);
      }
  });
  const status_D = Object.keys(ticket_mainassignee_status_obj);
  status_D.filter((key_status)=>{
      $(`.status_count_s_${key_status}`).text(ticket_mainassignee_status_obj[key_status].length)
  })
}

function ticket_subassignee_tab_set_counts(){
  const status_list = ticket_subassignee_tab_card;
  const ticket_subassignee_status_obj = {pending:[],approved:[],scheduling:[],awaiting_approval:[]}
  status_list.filter((subA_list)=>{
      if(subA_list.card_status != "SubassigneeTimeline"){
          ticket_subassignee_status_obj[subA_list.card_status.toLowerCase().replaceAll(" ","_")].push(subA_list);
      }
  });
  const status_D = Object.keys(ticket_subassignee_status_obj);
  status_D.filter((key_status)=>{
      $(`.status_count_s_${key_status}`).text(ticket_subassignee_status_obj[key_status].length)
  })
}


//Ticket creator, viewer, mainassignee, subassignee card functions
function makeCreatorCard(creator_card_data,empty_count){
  const appengingTag = $('#raised_card_list_container')
  remove_no_RL(appengingTag)
  if(empty_count){
      ticket_creator_tab_card = [];
  }

  if(creator_card_data.length == 0){
      $(appengingTag).html(no_record);
  }else{
          creator_card_data.forEach((ticket_make_creator_card)=>{
          ticket_creator_tab_card.push(ticket_make_creator_card);
          const makeCard = make_Ticket_Card(ticket_make_creator_card,'crea');
          $(appengingTag).append(makeCard);
      });
  }
  ticket_creator_tab_set_counts()
}

function makeViewerCard(viewer_card_data,empty_count){
  const appengingTag = $('#raised_card_list_container')
  remove_no_RL(appengingTag)
  if(empty_count){
    ticket_viewer_tab_card = [];
  }

  if(viewer_card_data.length == 0){
      $(appengingTag).html(no_record);
  }else{
          viewer_card_data.forEach((ticket_make_viewer_card)=>{
          ticket_viewer_tab_card.push(ticket_make_viewer_card);
          const makeCard = make_Ticket_Card(ticket_make_viewer_card,'penn');
          // console.log(makeCard)
          $(appengingTag).append(makeCard);
      });
  }
  ticket_viewer_tab_set_counts()
}

function makeMainassigneeCard(mainassignee_card_data,empty_count){
  const appengingTag = $('#issued_card_list_container')
  remove_no_RL(appengingTag)
  if(empty_count){
    ticket_mainassignee_tab_card = [];
  }

  if(mainassignee_card_data.length == 0){
      $(appengingTag).html(no_record);
  }else{
          mainassignee_card_data.forEach((ticket_make_mainassignee_card)=>{
          ticket_mainassignee_tab_card.push(ticket_make_mainassignee_card);
          const makeCard = make_Ticket_Card(ticket_make_mainassignee_card,'penn');
          $(appengingTag).append(makeCard);
      });
  }
  ticket_mainassignee_tab_set_counts();
}

function makeSubassigneeCard(subassignee_card_data,empty_count){
  const appengingTag = $('#issued_card_list_container')
  remove_no_RL(appengingTag)
  if(empty_count){
    ticket_subassignee_tab_card = [];
  }

  if(subassignee_card_data.length == 0){
      $(appengingTag).html(no_record);
  }else{
          subassignee_card_data.forEach((ticket_make_subassignee_card)=>{
          ticket_subassignee_tab_card.push(ticket_make_subassignee_card);
          const makeCard = make_Ticket_Card(ticket_make_subassignee_card,'penn');
          $(appengingTag).append(makeCard);
      });
  }
  ticket_subassignee_tab_set_counts();
}

function raised_status(raised_func) {
  let raised_status_option = $(raised_func).val();
  if (raised_status_option == "Creator") {
    $("#creator_status").removeClass("d-none");
    $("#viewer_status").addClass("d-none");
  } else if (raised_status_option == "Viewer") {
    $("#creator_status").addClass("d-none");
    $("#viewer_status").removeClass("d-none");
  }

  if (raised_status_option =="Creator"){
  obj={status: `Scheduling`}
  cardCreatorStatusCheck(obj,logUserDatas.emp_name).then((cre_e)=>{
    //console.log(cre_e);
    $('#raised_card_list_container').empty()
    makeCreatorCard(cre_e,true)
    })
  } else if(raised_status_option == "Viewer"){
  obj={status: `Scheduling`}
  cardViewerStatusCheck(obj,logUserDatas.emp_name).then((vi_e)=>{
    $('#raised_card_list_container').empty()
    makeViewerCard(vi_e,true)
    console.log(vi_e)
    })
  }
}

function issued_status(issued_func) {
  let issued_status_option = $(issued_func).val();
  if (issued_status_option == "Main Assigne") {
    $("#mainassignee_status").removeClass("d-none");
    $("#subassignee_status").addClass("d-none");
  } else if (issued_status_option == "Sub Assigne") {
    $("#mainassignee_status").addClass("d-none");
    $("#subassignee_status").removeClass("d-none");
  }
  if(issued_status_option == "Main Assigne"){
    cardMainStatusCheck(obj,logUserDatas.emp_name).then((ma_in)=>{
      $('#issued_card_list_container').empty();
      makeMainassigneeCard(ma_in,true)
    })
  }else if(issued_status_option == "Sub Assigne"){
    cardSubAssgnStatusCheck(obj,logUserDatas.emp_name).then((su_b)=>{
      $('#issued_card_list_container').empty()
      makeSubassigneeCard(su_b,false)
    })
  }
}

// View Ticket Function
function view_filter_ticket_tag(e) {
  const selectType = $("#ticket_view_selectType_sort").val();
  const status = $("#ticket_view_status").val();
  const start_date = $("#ticket_view_start_date").val();
  const last_date = $("#ticket_view_end_date").val();
  const valid = true;
  // let all_sub = logUserDatas.allsubordinates.as;
  const view_filter_obj = {
    selectType,
    status,
    start_date,
    last_date,
    // sub_users: all_sub,
    user: logUserDatas.emp_name,
  };
  if (!selectType) {
    return alertify.error("Alert! Please Select Ticket Type")
  } else if (!status) {
    return alertify.error("Alert! Please Select Ticket Status");
  } else if (!start_date) {
    return alertify.error("Alert! Please Select From Date");
  } else if (!last_date) {
    return alertify.error("Alert! Please Select To Date");
  } else {
    $(e).html(button_loader)
    $(e).prop("disabled", true)
    $("#view_card_list_container").empty()
    console.log(view_filter_obj)
    fetch_loader_show('#view_card_list_container')
    setTimeout(() => {
      $(e).html("Filter");
      $(e).prop("disabled", false)
    }, 2000)
  };  
};

//manage filter ticket function
function manage_filter_ticket_tag(e) {
  const name = $("#ticket_manage_name_sort").val();
  const selectType = $("#ticket_manage_selecttype_sort").val();
  const role = $("#ticket_manage_role_sort").val();
  const status = $("#ticket_manage_status_sort").val();
  const start_date = $("#ticket_manage_start_date").val();
  const last_date = $("#ticket_manage_end_date").val();
  const manage_tab_filter = {
    name,
    selectType,
    role,
    status,
    start_date,
    last_date,
    // sub_users: all_sub,
    user: logUserDatas.emp_name,
  };
  if (!name) {
    return alertify.error("Alert! Please Select Name");
  } else if (!selectType) {
    return alertify.error("Alert! Please Select Type");
  } else if (!role) {
    return alertify.error("Alert! Please Select Role");
  } else if (!status) {
    return alertify.error("Alert! Please Select Status");
  } else if (!start_date) {
    return alertify.error("Alert! Please Select Start Date");
  } else if (!last_date) {
    return alertify.error("Alert! Please Selcet End Date");
  } else {
    $(e).html(button_loader)
    $(e).prop("disabled", true)
    $("#manage_card_list_container").empty()
    console.log(manage_tab_filter);
    fetch_loader_show("#manage_card_list_container")
    setTimeout(() => {
      $(e).html("Filter");
      $(e).prop("disabled", false)
    }, 2000)
  };
};

// 17feb

// manage filter role function
let dropdown_role = {
  Raised: ["Select Option", "Creator", "Viewer"],
  Issued: ["Select Option", "MainAssignee", "SubAssignee"],
}

function role_options(e, appendId) {
  // console.log(e,appendId)
  let appendTag = $('#' + appendId)
  if ($(e).val() != "") {
    let role_value = dropdown_role[$(e).val()];
    $(appendTag).html("")
    role_value.forEach((ele, i) => {
      if (i == 0) {
        const roleOption = `<option value="" selected>Select Option</option>`;
        appendTag.append(roleOption)
      } else {
        const roleOption = `<option value=${ele}>${ele}</option>`;
        appendTag.append(roleOption)
      }
    });
  } else {
    $(appendTag).html(
      `<option value="" selected>Select Option</option>`
    );
  }
}

// Raised, Issued card and status Modal Functions
function showTimelinemodal(e) {
  const thisTagValue = $(e).val();
  if (thisTagValue == "ViewerTimeline") {
    $("#timeline_viewer_modal").modal("show");
  } else if (thisTagValue == "CreatorTimeline") {
    $("#timeline_creator_modal").modal("show");
  } else if (thisTagValue == "SubassigneeTimeline") {
    $("#timeline_subassignee_modal").modal("show");
  } else if (thisTagValue == "MainassigneeTimeline") {
    $("#timeline_mainassignee_modal").modal("show");
  }
  Array.from($(".raised_issued_modal")).forEach((form) => { form.reset() })
}

// 18th Feb
// Raised Viewer Timeline Modal Function
function viewer_timeline() {
  const viewer_card = $("#ticket_raised_sort").val();
  const viewer_status = $("#ticket_viewer_status_sorting").val();
  const viewer_timeline_start_date = $("#viewer_timeline_modal_start_date").val();
  const viewer_timeline_end_date = $("#viewer_timeline_modal_end_date").val();
  let valid = true;
  if (!viewer_timeline_start_date) return alertify.error("Alert! Please Select Start Date");
  if (!viewer_timeline_end_date) return alertify.error("Alert! Please Select End Date");
  const raised_viewer_obj = {
    viewer_card,
    viewer_status,
    viewer_timeline_start_date,
    viewer_timeline_end_date,
    user: logUserDatas.emp_name,
  };
  if (valid == true) {
    console.log(raised_viewer_obj)
    showLoader();
    setTimeout(() => {
      hideLoader();
      $("#timeline_viewer_modal").modal("hide")
      //  $(".default").css("display", "none");
    }, 1000)
  };
};

//  Raised Creator Timeline Modal Function
function creator_timeline() {
  const creator_card = $("#ticket_raised_sort").val();
  const creator_status = $("#ticket_creator_status_sorting").val();
  const creator_timeline_start_date = $("#creator_timeline_modal_start_date").val();
  const creator_timeline_end_date = $("#creator_timeline_modal_end_date").val();
  let valid = true;
  if (!creator_timeline_start_date) return alertify.error("Alert! Please Select Start Date");
  if (!creator_timeline_end_date) return alertify.error("Alert! Please Select End Date");
  const raised_viewer_obj = {
    creator_card,
    creator_status,
    creator_timeline_start_date,
    creator_timeline_end_date,
    user: logUserDatas.emp_name,
  };
  if (valid == true) {
    console.log(raised_viewer_obj)
    showLoader();
    setTimeout(() => {
      hideLoader();
      $("#timeline_creator_modal").modal("hide")
      // $(".default").css("display", "none");
    }, 1000)
  };
};

// Issued Sub-Assignee Timeline Modal Function
function subassignee_timeline() {
  const subassignee_card = $("#ticket_issued_sort").val();
  const subassignee_status = $("#ticket_subassignee_status_sorting").val();
  const subassignee_timeline_start_date = $("#subassignee_timeline_modal_start_date").val();
  const subassignee_timeline_end_date = $("#subassignee_timeline_modal_end_date").val();
  let valid = true;
  if (!subassignee_timeline_start_date) return alertify.error("Alert! Please Select Start Date");
  if (!subassignee_timeline_end_date) return alertify.error("Alert! Please Select End Date");
  const raised_viewer_obj = {
    subassignee_card,
    subassignee_status,
    subassignee_timeline_start_date,
    subassignee_timeline_end_date,
    user: logUserDatas.emp_name,
  };
  if (valid == true) {
    console.log(raised_viewer_obj)
    showLoader();
    setTimeout(() => {
      hideLoader();
      $("#timeline_subassignee_modal").modal("hide")
      // $(".default").css("display", "none");
    }, 1000)
  };
};

// Issued Main-Assignee Timeline Modal Function
function mainassignee_timeline() {
  const mainassignee_card = $("#ticket_issued_sort").val();
  const mainassignee_status = $("#ticket_mainassignee_status_sorting").val();
  const mainassignee_timeline_start_date = $("#mainassignee_timeline_modal_start_date").val();
  const mainassignee_timeline_end_date = $("#mainassignee_timeline_modal_end_date").val();
  let valid = true;
  if (!mainassignee_timeline_start_date) return alertify.error("Alert! Please Select Start Date");
  if (!mainassignee_timeline_end_date) return alertify.error("Alert! Please Select End Date");
  const raised_viewer_obj = {
    mainassignee_card,
    mainassignee_status,
    mainassignee_timeline_start_date,
    mainassignee_timeline_end_date,
    user: logUserDatas.emp_name,
  };
  if (valid == true) {
    console.log(raised_viewer_obj)
    showLoader();
    setTimeout(() => {
      hideLoader();
      $("#timeline_mainassignee_modal").modal("hide")
      // $(".default").css("display", "none");
    }, 1000)
  };
};











































// edited

// function makeRaisedCard(card_data, callback, empty_count) {
//   const appengingTag = $("#creator_card_list_container");
//   remove_no_RL(appengingTag);
//   if (empty_count) {
//     ticket_pending_tab_card = [];
//   }

//   if (card_data.length == 0) {
//     $(appengingTag).html(no_record);
//   } else {
//     card_data.forEach((ticket_make_card) => {
//       ticket_pending_tab_card.push(ticket_make_card);
//       const makeCard = makeTicketCard(ticket_make_card, "pending");
//       $(appengingTag).append(makeCard);
//     });

//     //   if (callback != false) {
//     //     const select_card = $(
//     //       `[data-card-container-pending=${callback.notification_data.doc_id}]`
//     //     );
//     //     moving_card("#pending_card_list_container", select_card);
//     //   }
//   }
//   // task_pending_tab_set_counts();
// }

