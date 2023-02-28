let global_obj = {};
function ticketUpdate(e) {
  let no_of_assigns = $("#text").val();
  let no_of_viewers = $("#text2").val();
  let main_assign = $("#text3").val();
  let main_assign_name = $("#text4").val();
  let sub_assign1 = $("#text5").val();
  let sub_assign1_name = $("#text6").val();
  let sub_assign2 = $("#text7").val();
  let sub_assign2_name = $("#text8").val();
  let ticket_viewers1 = $("#text9").val();
  let ticket_viewers1_name = $("#text10").val();
  let ticket_viewers2 = $("#text11").val();
  let ticket_viewers2_name = $("#text12").val();
  let ticket_information = $("#text13").val();
  let valid = true;
  if (no_of_assigns == "") {
    alertify.alert("Message!", "Please select your no of assigne");
    return false;
  } else if (no_of_viewers == "") {
    alertify.alert("Message!", "Please select your no of viewers");
    return false;
  } else if (main_assign == "") {
    alertify.alert("Message!", "Please select Main Assigne department");
    return false;
  } else if (main_assign_name == "") {
    alertify.alert("Message!", "Please select Main Assigne name");
    return false;
  } else if (no_of_assigns == 1 && sub_assign1 == "") {
    alertify.alert("Message!", "Please select Sub Assigne1 department");
    return false;
  } else if (no_of_assigns == 1 && sub_assign1_name == "") {
    alertify.alert("Message!", "Please select Sub Assigne1 name");
    return false;
  } else if (no_of_assigns == 2 && sub_assign1 == "") {
    alertify.alert("Message!", "Please select Sub Assigne1 department");
    return false;
  } else if (no_of_assigns == 2 && sub_assign1_name == "") {
    alertify.alert("Message!", "Please select Sub Assigne1 name");
    return false;
  } else if (no_of_assigns == 2 && sub_assign2 == "") {
    alertify.alert("Message!", "Please select Sub Assigne2 department");
    return false;
  } else if (no_of_assigns == 2 && sub_assign2_name == "") {
    alertify.alert("Message!", "Please select Sub Assigne2 name");
    return false;
  } else if (no_of_viewers == 1 && ticket_viewers1 == "") {
    alertify.alert("Message!", "Please select your no of Viewers1 department");
    return false;
  } else if (no_of_viewers == 1 && ticket_viewers1_name == "") {
    alertify.alert("Message!", "Please select your no of Viewers1 name");
    return false;
  } else if (no_of_viewers == 2 && ticket_viewers1 == "") {
    alertify.alert("Message!", "Please select your no of Viewers1 department");
    return false;
  } else if (no_of_viewers == 2 && ticket_viewers1_name == "") {
    alertify.alert("Message!", "Please select your no of Viewers1 name");
    return false;
  } else if (no_of_viewers == 2 && ticket_viewers2 == "") {
    alertify.alert("Message!", "Please select your no of Viewers2 department");
    return false;
  } else if (no_of_viewers == 2 && ticket_viewers2_name == "") {
    alertify.alert("Message!", "Please select your no of Viewers2 name");
    return false;
  } else if (ticket_information == "") {
    alertify.alert("Message", "Please fill your Ticket Info");
    return false;
  }

  const ticketObjct = {
    no_of_assigns: no_of_assigns,
    no_of_viewers: no_of_viewers,
    main_assign: main_assign,
    main_assign_name: main_assign_name,
    sub_assign1: sub_assign1,
    sub_assign1_name: sub_assign1_name,
    sub_assign2: sub_assign2,
    sub_assign2_name: sub_assign2_name,
    ticket_viewers1: ticket_viewers1,
    ticket_viewers1_name: ticket_viewers1_name,
    ticket_viewers2: ticket_viewers2,
    ticket_viewers2_name: ticket_viewers2_name,
    ticket_information: `${
      ticket_information.trim().charAt(0).toUpperCase() +
      ticket_information.slice(1)
    }`,
  };

  if (valid == true) {
    console.log(ticketObjct);
    showLoader();

    $("#myForm")[0].reset();
    array1 = {};
    $("#ticket_create_modal").modal("hide");
    $(".default").css("display", "none");
    hideLoader();
    alertify.success("New ticket added successfully");
    const ticket_detail_raised_card = ticketCard(ticketObjct);
    $("#creator_card_list_container").append(ticket_detail_raised_card);
  }
}

// SubAssigne Dependent field fun
function subAsigne() {
  let val = parseInt(document.getElementById("text").value);

  if (val == 0) {
    document.getElementById("subAssign").style.display = "none";
    document.getElementById("subAssign1").style.display = "none";
  } else if (val == 1) {
    document.getElementById("subAssign").style.display = "block";
    document.getElementById("subAssign1").style.display = "none";
  } else if (val == 2) {
    document.getElementById("subAssign").style.display = "block";
    document.getElementById("subAssign1").style.display = "block";
  }
}

// Main Assign Dependent field fun
function viewer() {
  let val1 = parseInt(document.getElementById("text2").value);
  if (val1 == 0) {
    document.getElementById("viewers").style.display = "none";
    document.getElementById("viewers1").style.display = "none";
  } else if (val1 == 1) {
    document.getElementById("viewers").style.display = "block";
    document.getElementById("viewers1").style.display = "none";
  } else if (val1 == 2) {
    document.getElementById("viewers").style.display = "block";
    document.getElementById("viewers1").style.display = "block";
  }
  global_obj = dropdown1;
}

//  Dropdown for MainAssign and SubAssign
const dropdown1 = {
  "Select Your Option": ["Select Your Option"],
  Engineering: [
    "Select Your Option",
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
    "Select Your Option",
    "Azeez K",
    "Kathiravan",
    "Pijesh A",
    "Veeramani",
    "Ragupathi V",
  ],
  Accounts: [
    "Select Your Option",
    "C Santhosh Kumar",
    "G Easwar",
    "K Chandrasekar",
    "Nachammai",
    "Nivedha S",
    "Sajitha",
    "Vaishnavi",
  ],
  Human_Resource: ["Select Your Option", "Ithayavani B", "Parvathy P"],
  Land_Acquisition_Liasoning: ["Select Your Option", "J Gopinath"],
  Administration: ["Select Your Option", "Jayalaxmi", "L Sreemathy"],
  Telemarketing: [
    "Select Your Option",
    "Kavi Priya S",
    "Sarathy K",
    "Sridevi",
    "Vijay Hari P",
  ],
  Purchase: ["Select Your Option", "Kumar", "Roja"],
  IT: [
    "Select Your Option",
    "Uma Maheswari M",
    "M Saraboj",
    "Sathyajith N B",
    "Ramkumar R",
  ],
  Store: ["Select Your Option", "Moorthy M"],
  Webapp_Board: ["Select Your Option", "Praneeth Jain"],
  Board: ["Select Your Option", "Pravin Kumar Jain", "Vipul Jain"],
  GM: ["Select Your Option", "Puneeth Bhatia"],
  CRM: ["Select Your Option", "Radha"],
  Marketing: ["Select Your Option", "S Jenifer Raj"],
  Digital_Marketing: ["Select Your Option", "Sasi Kumar"],
  Legal: ["Select Your Option", "Supriya M"],
};

// Dropdown for Name values
var array1 = {};
function setName(val, index) {
  const x = $(val).children();
  console.log(x);
  //$(x).css('display', "none")
  $(val).children(`[value = "${val.value}"]`).css("display", "block");
  array1[index] = $(val).val();
  console.log(array1);
}

// SubAssign Fun
function changed(e, appendId) {
  console.log(e, appendId);
  let appendTag = $("#" + appendId);
  if ($(e).val() != "") {
    let namelist = dropdown1[$(e).val()];
    $(appendTag).html("");
    // Filter Dependent Dropdown for Name values
    Object.values(array1).forEach((el) => {
      namelist = namelist.filter((ele) => {
        return ele != el;
      });
    });
    //console.log(array1)
    //console.log(namelist)
    namelist.forEach((element, i) => {
      //THIS if condition if i select department, the name index 0 should be shown select your option
      if (i == 0) {
        const listOption = `<option value="" selected>Select Your Option..</option>`;

        appendTag.append(listOption);
      } else {
        const listOption = `<option value="${element}">${element}</option>`;

        appendTag.append(listOption);
      }
    });
  } else {
    $(appendTag).html(
      `<option value="" selected>Select Your Option..</option>`
    );
  }
}

function ticketCard(obj, tab) {
  // let raisedCreator = document.getElementById(
  //   "ticket_pending_status_sort"
  // ).value;
  let deadDate = new Date().toDateString();
  let ticketCards = `<li class=" card-box mb-2   border-bottom card_template_main" data-card-container="">
  <div class="d-flex align-items-center justify-content-between">
  <div class="name-avatar d-flex align-items-center ml-2">

  <div>
  <div>
  <div data-modify="" data-tab="" data-card-owner="">
  <span class="menu_tag_class" onclick="ticket_menu_icons(this)" data-modify="" data-tab="${tab}" data-card-owner="">
  <i class="dw dw-down-arrow-4"></i>
  <div class="red_dt_cls d-none" style="transform: translate(15px, -20px);">
  </div>
  </span>
  </div>
  </div>
  <div class="cta flex-shrink-0 mx-3 chat_menu_cls" data-modify="" data-chat-token="">
  <div class="red_dt_cls d-none bg-success" style="transform: translate(0px, -20px);">
  </div>
  </div>
  </div>


  

  <div class="d-flex justify-content-between">

  <div class="d-flex">
  <div class="col">
  <div class=" weight-600 card_info_text my-1">${obj.ticket_information}</div>

  <div class="font-12 weight-500 card_schedule_date" style="color: rgb(79 78 82);">
  <span>
  <span>
  <b class="text-success">Scheduled On</b> :  ${deadDate} </span>
  </span>
  </div>
  </div>
  </div>

  <div>
  <span class="badge badge-pill badge _badge_cls" style=" background-color: rgb(231, 235, 245);"></span>
  <span class="badge badge-pill badge self_badge_cls mx-1" style=" background-color: rgb(231, 235, 245);">Self</span>
  <span class="badge badge-pill badge bg-warning" style=" background-color: rgb(231, 235, 245);">Scheduling</span>
  </div>

  </div>




  </div>
  </div>
  
<div class="options_append_tab">
<div class="options_cc_container">
<!-- <div class="accordion accordion-flush" id="leads_expant_box_container"> -->
<!-- <div class="accordion-item"> -->
<!-- <div id="ticket_info_container_boxs" class="accordion-collapse collapse" aria-labelledby="ticket_box_container_ccc" data-bs-parent="#leads_expant_box_container"> -->
<!-- <div class="accordion-body font-12"> -->
<div class="ticket_info_table_container font-12">


<div class="d-flex flex-wrap justify-content-between">

<div class="col">

<div class="row mt-3">
<span><font class="text-success"><b>Creator:</b></font></span>
<span>RAMKUMAR R<br></span>
</div>

<div class="row mt-3 ${obj.ticket_viewers1_name ? "" : "d-none"}">
<span><font class="text-success"><b>Viewer - 1:</b></font></span>
<span>${obj.ticket_viewers1_name}</span>
</div>

<div class="row mt-3  ${obj.ticket_viewers2_name ? "" : "d-none"}">
<span><font class="text-success"><b>Viewer - 2:</b></font></span>
<span>${obj.ticket_viewers2_name}</span>
</div>

<div class="row mt-3">
<span><font class="text-success"><b>Created On:</b></font></span>
<span>${deadDate}</span>
</div>

</div>

<div class="col">
<div class="row mt-3">
<span>
<span class="text-success "><b>Main Assignee:</b></span>
<span>${obj.main_assign_name}</span>
</span>
<span class="text-success d-flex align-items-center"><b>Status:</b>
<span class="badge badge-pill badge bg-warning font-10" style=" background-color: rgb(231, 235, 245);">Scheduling</span>
</span>
</div>

<div class="row mt-3 ${obj.sub_assign1_name ? "" : "d-none"}">
<span>
<span class="text-success "><b>Sub Assignee 1: </b></span>
<span>${obj.sub_assign1_name}</span>
</span>
<span class="text-success d-flex align-items-center"><b>Status:</b>
<span class="badge badge-pill badge bg-warning font-10" style=" background-color: rgb(231, 235, 245);">Scheduling</span>
</span>
</div>

<div class="row mt-3 ${obj.sub_assign1_name ? "" : "d-none"}">
<span>
<span class="text-success "><b>Sub Assignee 2:</b></span>
<span>${obj.sub_assign2_name}</span>
</span>
<span class="text-success d-flex align-items-center"><b>Status:</b>
<span class="badge badge-pill badge bg-warning font-10" style=" background-color: rgb(231, 235, 245) ;">Scheduling</span>
</span>
</div>
</div>

</div>


</div>
<!-- </div> -->
<!-- </div> -->
<!-- </div> -->

<!-- <div class="accordion-item"> -->

<!-- <div id="action_icons_container_box" class="accordion-collapse collapse" aria-labelledby="action_icons_container_cc" data-bs-parent="#leads_expant_box_container"> -->
<!-- <div class="accordion-body"> -->
<div class="leads_icons_container">
<div class="container" >
<div class="d-flex   text-center leads_actions_icons_list"  data-token="${
    obj.token
  } data-lead-owner="" data-tab="">

<div class="m-1 leads_action_icon conversations_icons_box" data-icon-name="edit" data-btn-name="edit" onclick="ticket_icons(this)">
    <div class="lead_cl_icon">
        <i class="icon-copy dw dw-edit2"></i>
    </div>
    <div class="lead_cl_text">Edit</div>
</div>

<div class="m-1 leads_action_icon conversations_icons_box" data-icon-name="chat" onclick="ticket_icons(this)">
    <div class="lead_cl_icon">
        <i class="icon-copy dw dw-chat"></i>
    </div>
    <div class="lead_cl_text">Chat</div>
</div>

<div class="m-1 leads_action_icon conversations_icons_box"  data-icon-name="delete" onclick="ticket_icons(this)"> 
<a data-bs-toggle="modal" style="color: inherit">
   <div class="lead_cl_icon">
        <i class="icon-copy dw dw-delete-3"></i>
    </div>
    <div class="lead_cl_text" >Delete</div>
    </a>
</div>

<div class="m-1 leads_action_icon conversations_icons_box" data-icon-name="upload" onclick="ticket_icons(this)">
    <div class="lead_cl_icon">
        <i class="icon-copy dw dw-upload1"></i>
    </div>
    <div class="lead_cl_text">Upload</div>
</div>

<div class="m-1 leads_action_icon conversations_icons_box" data-icon-name="download" onclick="ticket_icons(this)">
    <div class="lead_cl_icon">
        <i class="icon-copy dw dw-upload1"></i>
    </div>
    <div class="lead_cl_text">Upload</div>
</div>

<div class="m-1 leads_action_icon conversations_icons_box" data-icon-name="complete" onclick="ticket_icons(this)">
    <div class="lead_cl_icon">
        <i class="icon-copy dw dw-upload1"></i>
    </div>
    <div class="lead_cl_text">Complete</div>
</div>

<div class="m-1 leads_action_icon conversations_icons_box" data-icon-name="schedule" onclick="ticket_icons(this)">
    <div class="lead_cl_icon">
        <i class="icon-copy dw dw-upload1"></i>
    </div>
    <div class="lead_cl_text">Scheduled</div>
</div>

<div class="m-1 leads_action_icon conversations_icons_box" data-icon-name="reassign" onclick="ticket_icons(this)">
    <div class="lead_cl_icon">
        <i class="icon-copy dw dw-upload1"></i>
    </div>
    <div class="lead_cl_text">Re-Assign</div>
</div>

<div class="m-1 leads_action_icon conversations_icons_box" data-icon-name="addsubassign" onclick="ticket_icons(this)">
    <div class="lead_cl_icon">
        <i class="icon-copy dw dw-upload1"></i>
    </div>
    <div class="lead_cl_text">Add Sub-Assign </div>
</div>

<div class="m-1 leads_action_icon conversations_icons_box" data-icon-name="removesubassign" onclick="ticket_icons(this)">
    <div class="lead_cl_icon">
        <i class="icon-copy dw dw-upload1"></i>
    </div>
    <div class="lead_cl_text">Remove Sub-Assign</div>
</div>

<div class="m-1 leads_action_icon conversations_icons_box" data-icon-name="removeviewer" onclick="ticket_icons(this)">
    <div class="lead_cl_icon">
        <i class="icon-copy dw dw-upload1"></i>
    </div>
    <div class="lead_cl_text">Remove-Viewers</div>
</div>



</div>
</div>
</div>
<!-- </div> -->
<!-- </div> -->
<!-- </div> -->

<!-- </div> -->
</div>
</div>
</li>`;
  return ticketCards;
}

function ticket_icons(e) {
  Array.from($(".ticket_modifty_modal_form")).forEach((eF) => {
    $(eF)[0].reset();
  });
  const getIcon = $(e).attr("data-icon-name");
  const cardD = dropdown1;
  console.log(cardD);
  if (getIcon == "edit") {
  } else if (getIcon == "chat") {
  } else if (getIcon == "delete") {
  } else if (getIcon == "upload") {
  } else if (getIcon == "download") {
  } else if (getIcon == "complete") {
  } else if (getIcon == "schedule") {
  } else if (getIcon == "reassign") {
  } else if (getIcon == "addsubassign") {
  } else if (getIcon == "removesubassign") {
  } else if (getIcon == "removeviewer") {
  }
  $(`#ticket_${getIcon}_modity_modal`).modal("show");
}
// Add sub-assigne functionalities
function subAsigneicon() {
  let subAssignInputField = parseInt(
    document.getElementById("subassignfield").value
  );
  if (subAssignInputField == 2) {
    document.getElementById("subAssignfun1").style.display = "block";
    document.getElementById("subAssignfun2").style.display = "block";
  }
}


// 16feb
// function ticket_button(e){
//   const ticketIcon = $(e).attr("data-btn-name");
//   if(ticketIcon == "edit"){
//     console.log($(".modify_task_info_input").val())
//   }else if(ticketIcon == "uploadfile"){
//     console.log($(".modify_upload_info_input").val())
//   }else if(ticketIcon == "schedule"){
//     console.log($(".modify_schedule_info_input").val())
//   }else if( ticketIcon == "reassign"){

//     let reassigne_textArea = $("#reassign_input").val()
//     let reassigne_select1 = $("#reassignee_dept").val()
//     let reassigne_select2 = $("#reassignee_name").val()
//     if(reassigne_textArea==""){
//       alertify.alert("Message", "Please fill your Ticket Info");
//     }else if(reassigne_select1 ==""){
//       alertify.alert("Message!", "Please select department");
//     }else if(reassigne_select2 == ""){
//       alertify.alert("Message!", "Please select name");
//     }
//     console.log($(".modify_reassign_info_input").val())

//   }else if(ticketIcon == "delete"){
//     console.log($(".modify_upload_info_input").val())
//   }
// }

// Modal Functions
function editTicket() {
  const edit_input = $("#ticket_edit_modity_modal_field").val();
  if (!edit_input) return alertify.alert("Alert", "");
  const edit_obj = { edit_input };
  console.log(edit_obj);
}
function scheduleTask() {
  const schedule_date = $("#ticket_schedule_modity_modal_field").val();
  if (!schedule_date) return alertify.alert("Alert!", "Please select date");
  const schedule_obj = { schedule_date };
  console.log(schedule_obj);
}
function uploadTicket() {
  const upload_input = $("#ticket_uploadfile_modity_modal_field").val();
  if (!upload_input) return alertify.alert("Alert!", "Please upload file");
  const upload_obj = { upload_input };
  console.log(upload_obj);
}
function reassignTicket() {
  const reassign_input_textArea = $(
    "#ticket_reassign_modity_modal_field"
  ).val();
  const reassign_input_dept = $("#reassignee_dept").val();
  const reassign_input_name = $("#reassignee_name").val();
  if (!reassign_input_textArea)
    return alertify.alert("Alert!", "Please fill text info");
  if (!reassign_input_dept)
    return alertify.alert("Alert!", "Please select your department");
  if (!reassign_input_name)
    return alertify.alert("Alert!", "Please select your name");
  const reassign_obj = {
    reassign_input_textArea,
    reassign_input_dept,
    reassign_input_name,
    user: logUserDatas.emp_name,
  };
  console.log(reassign_obj);
}
function addsubassignTicket() {
  const addsubassign_input_textarea = $(
    "#ticket_addsubassignee_modity_modal_field"
  ).val();
  const addsubassign_input_option = $("#subassignfield").val();
  const addsubassign_input_dept = $("#subAssignfun1").val();
  const addsubassign_input_name = $("#subassignfield1").val();
  const addsubassign_input_dept2 = $("#subAssignfun2").val();
  const addsubassign_input_name2 = $("#subassignfield2").val();
  if (!addsubassign_input_textarea)
    return alertify.alert("Alert!", "Please fill text info");
  if (!addsubassign_input_dept)
    return alertify.alert("Alert!", "Please select your sub-assign department");
  if (!addsubassign_input_name)
    return alertify.alert("Alert!", "Please select your sub-assign name");
  if (addsubassign_input_option == 2 && !addsubassign_input_dept2)
    return alertify.alert("Alert!", "Please select your sub-assign department");
  if (addsubassign_input_option == 2 && !addsubassign_input_name2)
    return alertify.alert("Alert!", "Please select your sub-assign name");
  //const addsubassign_obj = {dsubassign_input_textarea,addsubassign_input_option addsubassign_input_dept addsubassign_input_name}
}

// function ticket_menu_icons(e){
//   const select_append_tab = $(e).parent().parent().parent().parent().parent().next();
//   console.log(select_append_tab,'see')
//   if($(select_append_tab).children().eq(0).hasClass('options_cc_container')){
//       $(select_append_tab).empty()
//       $(e).children('i')[0].outerHTML = '<i class="dw dw-down-arrow-4"></i>'
//   }else{
//       refreshCard()
//       $(e).children('i')[0].outerHTML = '<i class="dw dw-up-arrow"></i>'
//       const loaderSp = `<div style="text-align: center;" class="my-2"><div class="spinner-border text-success" role="status"><span class="visually-hidden">Loading...</span></div></div>`
//       const tab = $(e).attr('data-tab');
//       const token = $(e).attr('data-modify');
//       const card_user = $(e).attr('data-card-owner')
//       const obj = { user_name:card_user,token}
//       $(e).children('.red_dt_cls').addClass("d-none")
//       console.log($(e).parent().parent())
//       $(e).parent().parent().next().children('.red_dt_cls').addClass("d-none")
//       $(select_append_tab).html(loaderSp);
//       read_update_notification(token)
//       console.log(notification_data_ar,'dddd')
//       notification_data_ar = notification_data_ar.filter((notify)=>{return notify.doc_id != token});
//       $(".notification-active").addClass('d-none')
//       modifyIcon(obj).then((task_data)=>{
//           if(task_data.status == true){
//               const append_options_container = modify_make_container(task_data.data,tab);
//               $(select_append_tab).html(append_options_container);
//               menu_card_objects = task_data.data;
//               const card =  $(e).parent().parent().parent().parent().parent().parent();
//               const cardparent = $(e).parent().parent().parent().parent().parent().parent().parent();
//               window.setTimeout(function(){
//                   var a = card[0].offsetTop
//                   $(cardparent).stop().animate({ scrollTop: a},10);
//                 },100);
//           }else{
//               alertify.alert("!Message","Please Try Again....");
//           }
//       })

//   }

// }

// function deleteTask() {
//   const card_store_value = dropdown1;
//   console.log(card_store_value)
//   // const edit_obj = { user: card_store_value.user_name, token: card_store_value.token }
//   // let receiverE = ""
//   // if(card_store_value.card_type == 'Assign'){
//   //     receiverE = card_store_value.user_name;
//   // }
//   //  showLoader()
//   //  taskDelete(edit_obj)
//    alertify.success('Ticket deleted successfully');
//    hideLoader()
// }

// filter functions
function pending_filter_tag(e) {
  const filter_by = { status: $(e).val(), user: logUserDatas.emp_name };
  pending_main_filter(filter_by, false);
}

function pending_main_filter(filter_by, callback) {
  //fetch_loader_show("#pending_card_list_container")
  // pendingTab(filter_by).then((pending_filter_return)=>{
  //     $("#pending_card_list_container").empty()
  //     if(pending_filter_return.status == false){
  //         makePendingCard([],false,false)
  //     }else{
  //         makePendingCard(pending_filter_return.data,callback,true)
  //     }
  //     console.log(pending_filter_return);
  // })
}
// View Ticket Function
function view_filter_ticket_tag() {
  const selectType = $("#ticket_view_selectType_sort").val();
  const status = $("#ticket_view_status").val();
  const start_date = $("#ticket_view_start_date").val();
  const last_date = $("#ticket_view_end_date").val();
  if (!selectType) return alertify.error("Alert! Please Select Ticket Type");
  if (!status) return alertify.error("Alert! Please Select Ticket Status");
  if (!start_date)
    return alertify.error("Alert! Please Select From Date");
  if (!last_date)
    return alertify.error("Alert! Please Select To Date");
    // let all_sub = logUserDatas.allsubordinates.as;
  const view_filter_obj = {
    selectType,
    status,
    start_date,
    last_date,
    // sub_users: all_sub,
    user: logUserDatas.emp_name,
  };
  console.log(view_filter_obj);
  // fetch_loader_show("#view_card_list_container")
  // viewTicket(view_filter_obj).then((view_pre)=>{
  //     console.log(view_pre)
  //     $("#view_card_list_container").empty()
  //     if(view_pre.status == true){
  //         const fiterEs = view_pre.data.filter((deS)=>{return deS.card_status != "Scheduling"})
  //         makeViewCard(fiterEs)
  //     }else{
  //         makeViewCard([])
  //     }
  // })
}
//manage filter ticket function
function manage_filter_ticket_tag() {
  const name = $("#ticket_manage_name_sort").val();
  const selectType = $("#ticket_manage_selecttype_sort").val();
  const role = $("#ticket_manage_role_sort").val();
  const status = $("#ticket_manage_status_sort").val();
  const start_date = $("#ticket_manage_start_date").val();
  const last_date = $("#ticket_manage_end_date").val();

  if (!name) return alertify.error("Alert! Please Select Name");
  if (!selectType) return alertify.error("Alert! Please Select Type");
  if (!role) return alertify.error("Alert! Please Select Role");
  if (!status) return alertify.error("Alert! Please Select Status");
  if (!start_date)
    return alertify.error("Alert! Please Select Start Date");
  if (!last_date)
    return alertify.error("Alert! Please Selcet End Date");
  // let all_sub = logUserDatas.allsubordinates.as;
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
  console.log(manage_tab_filter);
  // fetch_loader_show("#manage_card_list_container")
  // manageTask(manage_tab_filter).then((manage_f)=>{
  //     $("#manage_card_list_container").empty()
  //     if(manage_f.status == false){
  //       makeManageCard([])
  //     }else{
  //         const fileD = manage_f.data.filter((manageRew)=>{return manageRew.card_status != "Scheduling"})
  //         makeManageCard(fileD)
  //     }
  //     console.log(manage_f,"managTICKET")
  // })
}


// 17feb
// manage filter role function
let dropdown_role = {
  Raised : ["Select Option","Creator", "Viewer"],
  Issued : ["Select Option","MainAssignee", "SubAssignee"],
}
function role_options(e, appendId){
  // console.log(e,appendId)
  let appendTag = $('#' +appendId)
  if($(e).val()!=""){
    let role_value = dropdown_role[$(e).val()];
    $(appendTag).html("")
    role_value.forEach((ele, i) =>{
      if(i== 0){
        const roleOption = `<option value="" selected>Select Option</option>`;
        appendTag.append(roleOption)
      }else{
        const roleOption = `<option value=${ele}>${ele}</option>`;
        appendTag.append(roleOption)
      }
    });
  }else {
    $(appendTag).html(
      `<option value="" selected>Select Option</option>`
    );
  }
}

function raised_status(raised_func){
  let raised_status_option = $(raised_func).val();
  if(raised_status_option == "Creator"){
    $("#creator_status").removeClass("d-none");
    $("#viewer_status").addClass("d-none");
  }else if(raised_status_option == "Viewer"){
    $("#creator_status").addClass("d-none");
    $("#viewer_status").removeClass("d-none");
  }
}

function issued_status(issued_func){
  let raised_status_option = $(issued_func).val();
  if(raised_status_option == "Main Assigne"){
    $("#mainassignee_status").removeClass("d-none");
    $("#subassignee_status").addClass("d-none");
  }else if(raised_status_option == "Sub Assigne"){
    $("#mainassignee_status").addClass("d-none");
    $("#subassignee_status").removeClass("d-none");
  }
}

// Raised, Issued card and status Modal Functions
function showTimelinemodal(e){
  const thisTagValue = $(e).val();
  if(thisTagValue == "ViewerTimeline"){
   $("#timeline_viewer_modal").modal("show");
  }else if(thisTagValue == "CreatorTimeline"){
    $("#timeline_creator_modal").modal("show");
  }else if(thisTagValue == "SubassigneeTimeline"){
    $("#timeline_subassignee_modal").modal("show");
  }else if(thisTagValue == "MainassigneeTimeline"){
    $("#timeline_mainassignee_modal").modal("show");
  }
  Array.from($(".raised_issued_modal")).forEach((form)=>{form.reset()})
 }

 // 18th Feb
// Raised Viewer Timeline Modal Function
function viewer_timeline(){
  const viewer_card = $("#ticket_raised_sort").val();
  const viewer_status = $("#ticket_viewer_status_sorting").val();
  const Viewer_timeline_start_date = $("#viewer_timeline_modal_start_date").val();
  const Viewer_timeline_end_date = $("#viewer_timeline_modal_end_date").val();
  let valid = true;
  if(!Viewer_timeline_start_date) return alertify.error("Alert! Please Select Start Date"); 
  if(!Viewer_timeline_end_date) return alertify.error("Alert! Please Select End Date");
  const raised_viewer_obj = {
    viewer_card,
    viewer_status,
    Viewer_timeline_start_date,
    Viewer_timeline_end_date,
    user: logUserDatas.emp_name,
  };
  if(valid == true){
    console.log(raised_viewer_obj)
    showLoader();
    
    $("#timeline_viewer_modal").modal("hide")
    $(".default").css("display", "none");
    hideLoader();
  }
}
//  Raised Creator Timeline Modal Function
function creator_timeline(){
  const creator_card = $("#ticket_raised_sort").val();
  const creator_status = $("#ticket_creator_status_sorting").val();
  const Creator_timeline_start_date = $("#creator_timeline_modal_start_date").val();
  const Creator_timeline_end_date = $("#creator_timeline_modal_end_date").val();
  let valid = true;
  if(!Creator_timeline_start_date) return alertify.error("Alert! Please Select Start Date"); 
  if(!Creator_timeline_end_date) return alertify.error("Alert! Please Select End Date");
  const raised_viewer_obj = {
    creator_card,
    creator_status,
    Creator_timeline_start_date,
    Creator_timeline_end_date,
    user: logUserDatas.emp_name,
  };
  if(valid == true){
    console.log(raised_viewer_obj)
    showLoader();
    
    $("#timeline_creator_modal").modal("hide")
    $(".default").css("display", "none");
    hideLoader();
  }
}
// Issued Sub-Assignee Timeline Modal Function
function subassignee_timeline(){
  const subassignee_card = $("#ticket_issued_sort").val();
  const subassignee_status = $("#ticket_subassignee_status_sorting").val();
  const subassignee_timeline_start_date = $("#subassignee_timeline_modal_start_date").val();
  const subassignee_timeline_end_date = $("#subassignee_timeline_modal_end_date").val();
  let valid = true;
  if(!subassignee_timeline_start_date) return alertify.error("Alert! Please Select Start Date"); 
  if(!subassignee_timeline_end_date) return alertify.error("Alert! Please Select End Date");
  const raised_viewer_obj = {
    subassignee_card,
    subassignee_status,
    subassignee_timeline_start_date,
    subassignee_timeline_end_date,
    user: logUserDatas.emp_name,
  };
  if(valid == true){
    console.log(raised_viewer_obj)
    showLoader();
    
    $("#timeline_subassignee_modal").modal("hide")
    $(".default").css("display", "none");
    hideLoader();
  }
}
// Issued Main-Assignee Timeline Modal Function
function mainassignee_timeline(){
  const mainassignee_card = $("#ticket_issued_sort").val();
  const mainassignee_status = $("#ticket_mainassignee_status_sorting").val();
  const mainassignee_timeline_start_date = $("#mainassignee_timeline_modal_start_date").val();
  const mainassignee_timeline_end_date = $("#mainassignee_timeline_modal_end_date").val();
  let valid = true;
  if(!mainassignee_timeline_start_date) return alertify.error("Alert! Please Select Start Date"); 
  if(!mainassignee_timeline_end_date) return alertify.error("Alert! Please Select End Date");
  const raised_viewer_obj = {
    mainassignee_card,
    mainassignee_status,
    mainassignee_timeline_start_date,
    mainassignee_timeline_end_date,
    user: logUserDatas.emp_name,
  };
  if(valid == true){
    console.log(raised_viewer_obj)
    showLoader();
  
    $("#timeline_mainassignee_modal").modal("hide")
    $(".default").css("display", "none");
    hideLoader();
  }
}

if(event.target.id === "ticket-mainassignee-comp-btn"){
  var a = {};
  a.row = $('#ticket-ma-comp-rowNo').text();
  a.id = $('#ticket-ma-comp-id').val();
  var rowNo =parseInt(a.row);
  $(event.target).html(wloader)
  $('.mainassigneecard-timeline').eq(rowNo).addClass("d-none");
      google.script.run.withFailureHandler(function(e){
    showAlert("Server Issues please try again...",'false')
    console.log(e)
    $('#ticket-mainassignee-comp-btn').html('Confirm')
    })
  .withSuccessHandler(function(m){
    $('#ticket-mainassignee-comp-btn').html('Confirm')
    $(".macomplete").eq(rowNo).addClass("d-none");
    $(".reassign").eq(rowNo).addClass("d-none");
    $(".extend ").eq(rowNo).addClass("d-none");
    $(".addsub").eq(rowNo).addClass("d-none");
    $(".addviewer").eq(rowNo).addClass("d-none");
    $(".removeviewer").eq(rowNo).addClass("d-none");
    $(".removesub").eq(rowNo).addClass("d-none");
    $(".mainassigneecard-timeline").eq(rowNo).removeClass("d-none");
    $(".mainassigneecard-timeline").eq(rowNo).text("Ticket Completed");
    $(".mainassigneecard-timeline").eq(rowNo).addClass("bg-success");
    $(".mainassigneecard-timeline").eq(rowNo).css("color","#198754");
    $(".mainassigneecard-ma-status").eq(rowNo).text("Completed");
    $(".mainassigneecard-ma-status").eq(rowNo).addClass("bg-success");
    $(".mainCardStatus").eq(rowNo).addClass("bg-success");
    $(".mainCardStatus").eq(rowNo).removeClass("bg-primary");
    $(".mainCardStatus").eq(rowNo).text("Completed");
    showAlert("Ticket completed Successfully",'true');
  $("#ticket-mainassignee-comp-modal").modal("hide");
  }).compIsTicket(a);
}