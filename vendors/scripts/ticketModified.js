const user = "Sathyajith";

let ticketData = {};

const allDepartments = {
  Engineering: ["Kiran", "Baskaran", "Murali", "Rajesh"],
  Sales: ["Sathya", "Ramesh", "Paveen", "Vignesh"],
  IT: ["Uma", "Saraboj", "Ram Kumar", "Sathyajith"],
  Accounts: [],
  "Human Resource": [],
  Administration: [],
  "Tele Marketing": [],
  Stores: [],
};

//////////////////////////////////////////////////////////////////////////////////////
/* ----------------------------- Ticket Modal functions ---------------------------- */
//////////////////////////////////////////////////////////////////////////////////////

function addNewTicket() {
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
    return alertify.alert(
      "Message!",
      "Please choose the Main Assignees Department...."
    );
  } else if (main_assignee_name == null) {
    valid = false;
    $("#main_assignee_name").focus();
    return alertify.alert(
      "Message!",
      "Please choose the Main Assignees Name...."
    );
  } else if (no_of_assignees == "0" && no_of_viewers == "0") {
    if (ticketInfo == "") {
      valid = false;
      $("#new_ticket_info").focus();
      return alertify.alert("Message!", "Please enter the Ticket info");
    }
    // return;
  }

  // SUB ASSIGNEE EMPTY CHECKING
  if (no_of_assignees != "0") {
    if (no_of_assignees == "1") {
      if (sub_assignee1_dept == null) {
        valid = false;
        $("#sub_assignee1_dept").focus();
        return alertify.alert(
          "Message!",
          "Please choose the Sub Assignee Department"
        );
      } else if (sub_assignee1_name == null) {
        valid = false;
        $("#sub_assignee1_name").focus();
        return alertify.alert(
          "Message!",
          "Please choose the Sub Assignees Name"
        );
      }
    } else if (no_of_assignees == "2") {
      if (sub_assignee1_dept == null) {
        valid = false;
        $("#sub_assignee1_dept").focus();
        return alertify.alert(
          "Message!",
          "Please choose the Sub Assignee Department"
        );
      } else if (sub_assignee1_name == null) {
        valid = false;
        $("#sub_assignee1_name").focus();
        return alertify.alert(
          "Message!",
          "Please choose the Sub Assignees Name"
        );
      }
      if (sub_assignee2_dept == null) {
        valid = false;
        $("#sub_assignee2_dept").focus();
        return alertify.alert(
          "Message!",
          "Please choose the Second Sub Assignee Department"
        );
      } else if (sub_assignee2_name == null) {
        valid = false;
        $("#sub_assignee2_name").focus();
        return alertify.alert(
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
        return alertify.alert(
          "Message!",
          "Please choose the Viewer Department"
        );
      } else if (viewer1_name == null) {
        valid = false;
        $("#viewer1_name").focus();
        return alertify.alert("Message!", "Please choose the Viewer Name");
      }
    } else if (no_of_viewers == "2") {
      if (viewer1_dept == null) {
        valid = false;
        $("#viewer1_dept").focus();
        return alertify.alert(
          "Message!",
          "Please choose the Viewer Department"
        );
      } else if (viewer1_name == null) {
        valid = false;
        $("#viewer1_name").focus();
        return alertify.alert("Message!", "Please choose the Viewer Name");
      }
      if (viewer2_dept == null) {
        valid = false;
        $("#viewer2_dept").focus();
        return alertify.alert(
          "Message!",
          "Please choose the Second Viewer Department"
        );
      } else if (viewer2_name == null) {
        valid = false;
        $("#viewer2_name").focus();
        return alertify.alert(
          "Message!",
          "Please choose the Second Viewer Name"
        );
      }
    }
  }

  if (ticketInfo == "") {
    valid = false;
    $("#new_ticket_info").focus();
    return alertify.alert("Message!", "Please enter the Ticket info");
  }

  // setting empty values
  sub_assignee1_dept = sub_assignee1_dept == null ? "" : _;
  sub_assignee2_dept = sub_assignee2_dept == null ? "" : _;
  viewer1_dept = viewer1_dept == null ? "" : _;
  viewer2_dept = viewer2_dept == null ? "" : _;


  const ticketObj = {
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
  ticketData = ticketObj;

  if (valid == true) {
    console.log(ticketObj);
    // console.log(ticketData);

    showLoader();

    $("#add_ticket_modal").modal("hide");
    $("#add_ticket_modal_form")[0].reset();
    $(".assignee").css("display", "none");

    hideLoader();

    listOfname = [];
    selNameObj = {};
    $(".assign_name").html(
      `<Option value='' disabled selected>Select the Name</Option>`
    );
    modalscrollreset();
    // console.log(selNameObj);
    // console.log(listOfname);
    alertify.success("New Ticket added Successfully");

    // const card = makeTicketCardContent(ticketObj);

    // $("#creator_card_list_container").append(card);
    // $("#viewer_card_list_container").append(card);
    // console.log(card);

    // const issuedcard = issuedticketCard(ticketObj);
    // $("#main_card_list_container").append(issuedcard);
    // $("#sub_card_list_container").append(issuedcard);
    // console.log(issuedcard);

    const user = logUserDatas.emp_name
    addticketFirebase(ticketObj, user);

  }
}

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

function roleswap(type, role) {
  let userType = $(type);
  const userRole = $(role);
  if (userType.val() == "Raised") {
    $(".issue_role").css("display", "none");
    $(".raise_role").css("display", "block");
  } else {
    $(".issue_role").css("display", "block");
    $(".raise_role").css("display", "none");
  }
}


function cardChecker(id_name) {
  // const raisedCardStatus = $('#ticket_raised_card_status').val();
  // const issuedCardStatus = $('#ticket_issued_card_status').val();
  // console.log(id_name);
  let cardName = $(id_name).val();
  console.log(cardName);
  if (cardName == 'Creator') {
    $('.create').removeClass("d-none");
    $(".view").addClass("d-none");
  } else if (cardName == 'Viewer') {
    $('.create').addClass("d-none");
    $(".view").removeClass("d-none");
  } else if (cardName == "Main Assignee") {
    $('.mainassign').removeClass("d-none");
    $(".subassign").addClass("d-none");
  } else if (cardName == "Sub Assignee") {
    $('.mainassign').addClass("d-none");
    $(".subassign").removeClass("d-none");
  }

}

let count = 0;

function addAssignee(btn) {
  $(btn).addClass("d-none");
  $('.subasgn2').removeClass("d-none");
  count++;
}

function ticket_icons(e) {
  Array.from($(".ticket_modify_modal_form")).forEach((fE) => {
    $(fE)[0].reset();
  });
  // console.log(e);
  const getIcon = $(e).attr("data-icon-name");
  // console.log(getIcon);


  $(`#ticket_${getIcon}_icon_modal`).modal("show");
}





function ticketEdit() {
  const newTicket = $('#edit_ticket_info').val();
  if (newTicket == "") {
    $('#edit_ticket_info').focus();
    return alertify.error(
      "Please enter the Ticket info"
    );
  }
  $("#ticket_edit_icon_modal").modal("hide");

  const user = logUserDatas.emp_name
  // console.log(user);
  editTicketFirebase(newTicket, 'shiva', user);
}

function ticketDelete() {
  const deletedTicket = $('.ticket_info').val();
  console.log(deletedTicket);
  $("#ticket_delete_icon_modal").modal("hide");

  deleteTicketFirebase('del');
}

function ticketUpload() {
  const ticketFileUpload = $("#ticket_upload_input").val();

  if (ticketFileUpload == "") {
    $("#ticket_upload_input").focus();
    return alertify.error(
      "Please choose the File to Upload"
    );
  }
  console.log(ticketFileUpload);
  $("#ticket_upload_icon_modal").modal("hide");

  uploadTicketFirebase(ticketFileUpload, ticketData)
}

function ticketChat() {
  // console.log($('.chatValue').val());
  // $("#ticket_chat_icon_modal").modal("hide");
}

function ticketReassign() {
  const reassgn_dept = $('#reassignee_dept').val();
  const reassgn_name = $('#reassignee_name').val();

  if (reassgn_dept == null) {
    // $('#reassignee_dept').focus();
    return alertify.error(
      "Please choose the Assignee Department"
    );
  } else if (reassgn_name == null) {
    // $('#reassignee_name').focus();
    return alertify.error(
      "Please choose the Assignee Name"
    );
  }
  console.log(reassgn_dept, reassgn_name);
  $("#ticket_reassign_icon_modal").modal("hide");

}

function ticketSchedule() {
  const newScheduleDate = $('#new_ticket_date').val();
  if (newScheduleDate == "") {
    // $('#new_ticket_date').focus();
    return alertify.error(
      "Please choose the Schedule Date"
    );
  }
  console.log(newScheduleDate);
  $("#ticket_schedule_icon_modal").modal("hide");

  const token = "RPB6OytrZXAE8XAnESSP"
  scheduleTicketFirebase(newScheduleDate, token);
}

function ticketComplete() {
  console.log($('.ticket_info').val());
  $("#ticket_complete_icon_modal").modal("hide");

  completeTicketFirebase("complete");
}

function ticketDownload() {
  console.log($('.file').val());
  $("#ticket_download_icon_modal").modal("hide");

}

function ticketRemoveViewer() {
  const v1Dept = $('#view1').val()
  const v1Name = $('#view1_name').val()
  const v2Dept = $('#view2').val()
  const v2Name = $('#view2_name').val()
  let remObj;
  let removeViewer1 = { v1Dept, v1Name, "position": 1, }
  let removeViewer2 = { v2Dept, v2Name, "position": 2, }
  let removeBothViewer = { "viewer1": removeViewer1, "viewer2": removeViewer2, "position": 3, };

  const v1check = $('#viewer1')[0].checked;
  const v2check = $('#viewer2')[0].checked;

  if (v1check && v2check) {
    // console.log(removeBothViewer);
    remObj = removeBothViewer;
  } else if (v1check) {
    // console.log(removeViewer1);
    remObj = removeViewer1;
  } else if (v2check) {
    // console.log(removeViewer2);
    remObj = removeViewer2;
  } else {
    return alertify.error(
      "Please choose the Viewer"
    );
  }

  $("#ticket_remove_viewer_icon_modal").modal("hide");
  removeViewerFirebase(remObj, "RPB6OytrZXAE8XAnESSP");
}


function ticketRemoveSubassignee() {
  const s1Dept = $('#sub1_dept').val()
  const s1Name = $('#sub1_name').val()
  const s2Dept = $('#sub2_dept').val()
  const s2Name = $('#sub2_name').val()
  let remSubAssgnObj;
  let removeSub1 = { s1Dept, s1Name, position: 1 }
  let removeSub2 = { s2Dept, s2Name, position: 2 }
  let removeBothSubAssgn = { 'sub assignee 1': removeSub1, 'sub assignee 2': removeSub2, position: 3 };

  const sub1check = $('#sub1')[0].checked;
  const sub2check = $('#sub2')[0].checked;

  if (sub1check && sub2check) {
    console.log(removeBothSubAssgn);
    remSubAssgnObj = removeBothSubAssgn
  } else if (sub1check) {
    console.log(removeSub1);
    remSubAssgnObj = removeSub1
  } else if (sub2check) {
    console.log(removeSub2);
    remSubAssgnObj = removeSub2
  } else {
    return alertify.error(
      "Please choose the Sub Assignee"
    );
  }

  $("#ticket_remove_subassignee_icon_modal").modal("hide");
  removeSubasgnFirebase(remSubAssgnObj, token)
}



function ticketAddSubassignee() {
  const addsubasgn1_dept = $("#addsub1_dept").val();
  const addsubasgn1_name = $("#addsub1_name").val();
  const addsubasgn2_dept = $("#addsub2_dept").val();
  const addsubasgn2_name = $("#addsub2_name").val();
  let addObj;

  const addsub1 = { addsubasgn1_dept, addsubasgn1_name, "position": 1, }
  const addsub2 = { addsubasgn2_dept, addsubasgn2_name, }
  const addBothsub = { "subassgn1": addsub1, "subassgn2": addsub2, "position": 2, };

  // validator
  if (addsubasgn1_dept == null) {
    $("#addsub1_dept").focus();
    return alertify.error(
      "Please choose the Sub Assignee Department...."
    );
  } else if (addsubasgn1_name == null) {
    $("#addsub1_name").focus();
    return alertify.error(
      "Please choose the Sub Assignees Name...."
    );
  }
  addObj = addsub1;
  if (count != 0) {
    if (addsubasgn2_dept == null) {
      $("#addsub2_dept").focus();
      return alertify.error(
        "Please choose the Sub Assignee Department...."
      );
    } else if (addsubasgn2_name == null) {
      $("#addsub2_name").focus();
      return alertify.error(
        "Please choose the Sub Assignees Name...."
      );
    }
    addObj = addBothsub;
  }

  console.log(addsubasgn1_dept, addsubasgn1_name);
  console.log(addsubasgn2_dept, addsubasgn2_name);


  $("#ticket_add_subassignee_icon_modal").modal("hide");
  $("#addsubassgn_btn").removeClass("d-none");
  $('.subasgn2').addClass("d-none");

  addsubassgnFirebase(addObj);
}









































//////////////////////////////////////////////////////////////////////////////////////
/* ----------------------------- Ticket Page functions ---------------------------- */
//////////////////////////////////////////////////////////////////////////////////////

/* -------------------------- // ticket ui start functions -------------------------- */

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
    console.log(select_append_tab);
  } else {
    refreshCard();
    $(e).children("i")[0].outerHTML = '<i class="dw dw-up-arrow"></i>';
    // const loaderSp = `< div style = "text-align: center;" class="my-2" > <div class="spinner-border text-success" role="status"><span class="visually-hidden">Loading...</span></div></div > `;
    const tab = $(e).attr("data-tab");
    const token = $(e).attr("data-modify");
    const card_user = $(e).attr("data-card-owner");
    const obj = { user_name: card_user, token };
    $(e).children(".red_dt_cls").addClass("d-none");
    console.log($(e).parent().parent());
    $(e).parent().parent().next().children(".red_dt_cls").addClass("d-none");
    $(select_append_tab).html(loaderSp);
    read_update_notification(token);
    console.log(notification_data_ar, "dddd");
    notification_data_ar = notification_data_ar.filter((notify) => {
      return notify.doc_id != token;
    });
    $(".notification-active").addClass("d-none");
    var task_data = {
      status: true,
      data: {
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
        ticketInfo: ticketInfo,
      },
    };
    console.log(task_data);
    if (task_data.status == true) {
      const append_options_container = modify_make_container(
        task_data.data,
        tab
      );
      $(select_append_tab).html(append_options_container);
      menu_card_objects = task_data.data;
      const card = $(e).parent().parent().parent().parent().parent().parent();
      const cardparent = $(e)
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent();
      window.setTimeout(function () {
        var a = card[0].offsetTop;
        $(cardparent).stop().animate({ scrollTop: a }, 10);
      }, 100);
    }
    // modifyIcon(obj).then((task_data) => {
    //   if (task_data.status == true) {
    //     const append_options_container = modify_make_container(
    //       task_data.data,
    //       tab
    //     );
    //     $(select_append_tab).html(append_options_container);
    //     menu_card_objects = task_data.data;
    //     const card = $(e).parent().parent().parent().parent().parent().parent();
    //     const cardparent = $(e)
    //       .parent()
    //       .parent()
    //       .parent()
    //       .parent()
    //       .parent()
    //       .parent()
    //       .parent();
    //     window.setTimeout(function () {
    //       var a = card[0].offsetTop;
    //       $(cardparent).stop().animate({ scrollTop: a }, 10);
    //     }, 100);
    //   } else {
    //     alertify.alert("!Message", "Please Try Again....");
    //   }
    // });
  }
}

// edited

function makeRaisedCard(card_data, callback, empty_count) {
  const appengingTag = $("#creator_card_list_container");
  remove_no_RL(appengingTag);
  if (empty_count) {
    ticket_pending_tab_status_ls = [];
  }

  if (card_data.length == 0) {
    $(appengingTag).html(no_record);
  } else {
    card_data.forEach((ticket_make_card) => {
      ticket_pending_tab_status_ls.push(ticket_make_card);
      const makeCard = makeTicketCard(ticket_make_card, "pending");
      $(appengingTag).append(makeCard);
    });

    //   if (callback != false) {
    //     const select_card = $(
    //       `[data-card-container-pending=${callback.notification_data.doc_id}]`
    //     );
    //     moving_card("#pending_card_list_container", select_card);
    //   }
  }
  // task_pending_tab_set_counts();
}
