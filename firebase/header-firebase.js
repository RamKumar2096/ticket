// connnecting my CDN code from firebase
const webapp = firebase.initializeApp({
  apiKey: "AIzaSyC2zOtfXmU2ZRS88GVfVf-i9EV214Gk7WY",
  authDomain: "working-on-ticket.firebaseapp.com",
  projectId: "working-on-ticket",
  storageBucket: "working-on-ticket.appspot.com",
  messagingSenderId: "1044551955464",
  appId: "1:1044551955464:web:017c34f77eba9171b54dbd",
});

// firestore servise
var db = firebase.firestore();

var onsnap_store_obj = {};

/* -------------------------------------------------------------------------- */
/*                             FRONT PAGE FIREBASE START                            */
/* -------------------------------------------------------------------------- */
async function dashBoardTask(user) {
  const taskCollection = await db
    .collection("sotfwares")
    .doc("task_database")
    .collection(user)
    .get();
  if (taskCollection.size == 0) {
    return { status: false };
  } else {
    let taskList = taskCollection.docs.map((d) => {
      return { ...d.data(), token: d.id };
    });
    const dashObj = {
      pending: [],
      scheduling: [],
      completed: [],
      ["awaiting_approval"]: [],
    };
    taskList.filter((status_par) => {
      if (
        status_par.card_status == "Pending" ||
        status_par.card_status == "Completed" ||
        status_par.card_status == "Scheduling" ||
        status_par.card_status == "Awaiting Approval"
      ) {
        const ss = status_par.card_status.toString().replaceAll(" ", "_");
        dashObj[ss.toLowerCase()].push(status_par);
      }
    });
    return { status: true, data: dashObj };
  }
}

function getUserLog(token) {
  return new Promise(async (res, rej) => {
    var code = await db
      .collection("employee_database")
      .doc("employee_list")
      .collection("Namelist")
      .where("mail_id", "==", token)
      .get();
    console.log(code);
    if (code.size == 0) {
      res({ status: false });
    } else {
      res({ status: true, data: code.docs });
    }
  });
}

function changeProfile(user, pass) {
  return new Promise(async (res, rej) => {
    await db
      .collection("employee_database")
      .doc("employee_list")
      .collection("Namelist")
      .doc(user)
      .update({
        password: pass,
      });
    var code = await db
      .collection("employee_database")
      .doc("employee_list")
      .collection("Namelist")
      .doc(user)
      .get();
    res(code.data());
  });
}

async function notificationalert(n) {
  console.log(n);
  var message = n.message;
  var clickType = n.click;
  var tab = n.tab;
  const add_obj = {
    software_name: n.software,
    doc_id: n.token,
    notification_received_by: n.receiver,
    notification_status: "Unread",
    notification_info: message,
    icon: n.action,
    notification_send_by: n.sender,
    moveto_tab: tab,
    notification_type: clickType,
    receive_date: new Date(),
  };
  const credential = await db
    .collection("sotfwares")
    .doc("notification_list")
    .collection(n.receiver)
    .add(add_obj);
  // console.log(credential)
}

async function notificationlive(user) {
  return (notify = await db
    .collection("sotfwares")
    .doc("notification_list")
    .collection(user)
    .where("notification_status", "==", "Unread")
    .onSnapshot((snap) => {
      console.log(snap);
      if (snap.size == 0) {
        notification_empty();
      } else {
        const change = snap.docChanges();
        change.filter((noti) => {
          console.log(noti);
          if (noti.type == "added") {
            console.log(noti.doc.data(), "dfsdfs");
            const no_data = { ...noti.doc.data(), token: noti.doc.id };
            append_notification(no_data);
          } else if (noti.type == "modified") {
            console.log("notify");
            notification_readed(noti.doc.data().doc_id);
          } else if (noti.type == "removed") {
            console.log("removed");
            notification_readed(noti.doc.data().doc_id);
          }
        });
      }
    }));
}

async function readNotification(user, token) {
  console.log("reading notificaion");
  const credential = await db
    .collection("sotfwares")
    .doc("notification_list")
    .collection(user)
    .where("doc_id", "==", token)
    .where("notification_status", "==", "Unread")
    .get();
  const doc = await credential.docs;
  doc.filter(async (d) => {
    d.ref.update({ notification_status: "Read" });
  });
}

/* -------------------------------------------------------------------------- */
/*                               FRONT PAGE FIREBASE END                               */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                          TASK PAGE FIREBASE START                          */
/* -------------------------------------------------------------------------- */

// add task function
async function addtask(n, s) {
  var now = new Date();
  var newtask, nTask;
  for (var i = 0; i < n.length; i++) {
    var td = n[i][1];
    var taskList = await db
      .collection("sotfwares")
      .doc("task_database")
      .collection(s.user)
      .add({
        task_description: n[i][0],
        scheduled_On: new Date(td),
        user_name: s.user,
        card_status: "Pending",
        card_type: "Self",
        badge: "New",
        assigned_by: "",
        created_on: now,
        extended_on: ["empty"],
        completed_on: ["empty"],
        no_of_days: 0,
        approved_on: ["empty"],
        rejecte_On: ["empty"],
        folder_details: ["empty"],
        file_details: ["empty"],
        manager: s.manager,
        delay: "",
      });
    newtask = await taskList.get();
    console.log(newtask);
    nTask = { ...newtask.data(), token: newtask.id };
    console.log(nTask);
    const sub_notify_value = {
      tabs: "auto",
      software: "TASK",
      action: "Add Task",
      message: "New Task has been added by " + logUserDatas.emp_name,
      click: "Click",
      receiver: "",
    };
    addNotify_func(nTask, sub_notify_value);
  }

  if (newtask.exists == true) {
    console.log("New Task Added Successfully");
    return {
      status: true,
      message: "New Task Added Successfully",
      data: { ...nTask, token: newtask.id },
    };
  } else {
    console.log("Try Again");
    return { status: false, message: "Try Again" };
  }
}

//assing task
async function assignNewTask(taskInfo, selectName, user) {
  var assignList = await db
    .collection("sotfwares")
    .doc("task_database")
    .collection(selectName)
    .add({
      task_description: taskInfo,
      scheduled_On: ["empty"],
      user_name: selectName,
      card_status: "Scheduling",
      card_type: "Assign",
      badge: "New",
      assigned_by: user,
      created_on: new Date(),
      extended_on: ["empty"],
      completed_on: ["empty"],
      no_of_days: 0,
      approved_on: ["empty"],
      rejecte_On: ["empty"],
      folder_details: ["empty"],
      file_details: ["empty"],
      manager: user,
      delay: "",
    });
  var asgtask = await assignList.get();
  console.log(asgtask);
  var asgData = asgtask.data();
  console.log(asgData);
  if (asgtask.id !== "") {
    console.log("Task Assigned Successfully");
    return {
      status: true,
      message: "Task Assigned Successfully",
      data: { ...asgData, token: asgtask.id },
    };
  } else {
    return { status: false, message: "Try Again" };
  }
}

//PRELOADER TASK
async function addPreLoad(pre, userL) {
  console.log(pre);
  var preLoad;
  var preoption = pre.type;
  var manager = userL.manager;

  if (preoption == "Daily") {
    preLoad = await db
      .collection("sotfwares")
      .doc("preloader_database")
      .collection(pre.user)
      .add({
        preTpye: pre.type,
        preInfo: pre.info,
        preStatus: "Pending",
        user: pre.user,
        manager,
      });
  } else if (preoption == "Weekly") {
    preLoad = await db
      .collection("sotfwares")
      .doc("preloader_database")
      .collection(pre.user)
      .add({
        preTpye: pre.type,
        preInfo: pre.info,
        preDay: pre.weeklyDay,
        preStatus: "Pending",
        user: pre.user,
        manager,
      });
  } else if (preoption == "Monthly") {
    preLoad = await db
      .collection("sotfwares")
      .doc("preloader_database")
      .collection(pre.user)
      .add({
        preTpye: pre.type,
        preInfo: pre.info,
        preDate: pre.date,
        preMonth: pre.month,
        preStatus: "Pending",
        user: pre.user,
        manager,
      });
  } else if (preoption == "Yearly") {
    preLoad = await db
      .collection("sotfwares")
      .doc("preloader_database")
      .collection(pre.user)
      .add({
        preTpye: pre.type,
        preInfo: pre.info,
        preyear: pre.yeardate,
        preStatus: "Pending",
        user: pre.user,
        manager,
      });
  }
  var preGetData = await preLoad.get();
  const preL = { ...preGetData.data(), token: preGetData.id };
  console.log(preL, "pre");
  if (preGetData.exists == true) {
    console.log("New PreLoader Added Successfully");
    return {
      status: true,
      message: "New PreLoader Added Successfully",
      data: preL,
    };
  } else {
    console.log("Try Again");
    return { status: false, message: "Try Again" };
  }
}

/* ----------------------- ONSNAP FUNCTIONS START HERE ---------------------- */

async function task_snap_funtions(user) {
  const task_user = await db
    .collection("sotfwares")
    .doc("task_database")
    .collection(user);
  const task_check_data = await task_user.get();
  console.log(task_check_data);
  // if(task_check_data.size == 0){

  // }else{
  onsnap_store_obj.pending_snap = task_user.onSnapshot((snap) => {
    const change_task = snap.docChanges();
    const d = change_task.map((task_data) => {
      const store_task = task_data;

      const make_details = {
        ...store_task.doc.data(),
        token: store_task.doc.id,
      };
      return { s: store_task.type, data: make_details };
    });
    const added_data = d.every((td) => {
      return td.s == "added";
    });
    const modify_data = d.every((td) => {
      return td.s == "modified";
    });
    const remove_data = d.every((td) => {
      return td.s == "removed";
    });
    console.log(remove_data, added_data, modify_data, "ddd");
    if (added_data) {
      const card_values = d.map((cE) => {
        return cE.data;
      });
      const filter_value = card_values.filter((ce) => {
        return ce.card_status != "Completed";
      });
      makePendingCard(filter_value, "", false);
    } else if (modify_data) {
      const card_values = d.map((cE) => {
        return cE.data;
      });
      modify_card(card_values);
    } else if (remove_data) {
      console.log(d, "sdr");
      d.filter((cE) => {
        const dD = cE.data;
        console.log(dD);
        deleted_task_all(dD);
      });
    }
  });
  // }
}

async function taskPreloader(user) {
  return new Promise(async (res, rej) => {
    const preload = await db
      .collection("sotfwares")
      .doc("preloader_database")
      .collection(user)
      .get();
    if (preload.size == 0) {
      res({ status: false });
    } else {
      const preloder_ar = preload.docs.map((preX) => {
        const preT = { ...preX.data(), token: preX.id };
        return preT;
      });
      res({ status: true, data: preloder_ar });
    }
  });
}

/* ----------------------- ONSNAP FUNCTIONS END HERE ---------------------- */

/* --------------------- TASK FILTER FUNCIONS START HERE -------------------- */
function preloaderTab(pre) {
  return new Promise(async (res, rej) => {
    if (pre.type == "All") {
      const preLoad = await db
        .collection("sotfwares")
        .doc("preloader_database")
        .collection(pre.user);
      const preloader_docs = await preLoad.get();
      if (preloader_docs.size == 0) {
        res({ status: false });
      } else {
        const mK_preloader = preloader_docs.docs.map((preD) => {
          return { ...preD.data(), token: preD.id };
        });
        res({ status: true, data: mK_preloader });
      }
    } else {
      const preLoad = await db
        .collection("sotfwares")
        .doc("preloader_database")
        .collection(pre.user)
        .where("preTpye", "==", pre.type);
      const preloader_docs = await preLoad.get();
      if (preloader_docs.size == 0) {
        res({ status: false });
      } else {
        const mK_preloader = preloader_docs.docs.map((preD) => {
          return { ...preD.data(), token: preD.id };
        });
        res({ status: true, data: mK_preloader });
      }
    }
  });
}

function approvalCard(h) {
  return new Promise((resMain, rejMain) => {
    var promises = {};
    h.sub_name.map((sub) => {
      promises[sub] = new Promise(async (res, rej) => {
        app_s = await db
          .collection("sotfwares")
          .doc("task_database")
          .collection(sub)
          .where("card_status", "==", "Awaiting Approval")
          .get();
        res(app_s.docs);
      });
    });
    Promise.all(Object.values(promises)).then((values) => {
      const find = values.every((f) => {
        return f.length == 0;
      });
      if (find == false) {
        const d = [];
        values.filter((dss) => {
          if (dss.length != 0) {
            dss.filter((e) => {
              d.push({ ...e.data(), token: e.id });
            });
          }
        });
        resMain({ status: true, data: d });
      } else {
        resMain({ status: false });
      }
    });
  });
}

// pending tab
function pendingTab(h) {
  return new Promise(async (res, rej) => {
    if (h.status == "All") {
      const d = await db
        .collection("sotfwares")
        .doc("task_database")
        .collection(h.user)
        .where("card_status", "!=", "Completed")
        .get();
      if (d.size == 0) {
        res({ status: false });
      } else {
        const da = d.docs.map((f) => {
          return { ...f.data(), token: f.id };
        });
        res({ status: true, data: da });
      }
    } else {
      const d = await db
        .collection("sotfwares")
        .doc("task_database")
        .collection(h.user)
        .where("card_status", "==", h.status)
        .get();
      if (d.size == 0) {
        res({ status: false });
      } else {
        const da = d.docs.map((f) => {
          return { ...f.data(), token: f.id };
        });
        res({ status: true, data: da });
      }
    }
  });
}

// approve tab
function approveTab(h) {
  console.log(h);
  return new Promise(async (resMain, mainrej) => {
    if (h.user == "All") {
      var promises = {};
      h.sub_name.map((sub) => {
        promises[sub] = new Promise(async (res, rej) => {
          app_s = await db
            .collection("sotfwares")
            .doc("task_database")
            .collection(sub)
            .where("card_status", "==", "Awaiting Approval")
            .get();
          res(app_s.docs);
        });
      });
      Promise.all(Object.values(promises)).then((values) => {
        const find = values.every((f) => {
          return f.length == 0;
        });
        if (find == false) {
          const d = [];
          values.filter((dss) => {
            if (dss.length != 0) {
              dss.filter((e) => {
                d.push({ ...e.data(), token: e.id });
              });
            }
          });
          resMain({ status: true, data: d });
        } else {
          resMain({ status: false });
        }
      });
    } else {
      var subList = await db
        .collection("sotfwares")
        .doc("task_database")
        .collection(h.user)
        .where("card_status", "==", "Awaiting Approval")
        .get();
      if (subList.size == 0) {
        resMain({ status: false });
      } else {
        const ap = subList.docs.map((ap_m) => {
          return { ...ap_m.data(), token: ap_m.id };
        });
        resMain({ status: true, data: ap });
      }
    }
  });
}

// managing'
function managingTab(managing_param) {
  console.log(managing_param);
  return new Promise(async (resMain, rejMain) => {
    if (
      managing_param.fill_status == "All" &&
      managing_param.fill_name == "All"
    ) {
      console.log("sdfasd");
      const managing_sub_user = managing_param.sub_users;
      const promises = {};
      managing_sub_user.filter((sub_tasks) => {
        console.log(sub_tasks);
        promises[sub_tasks] = new Promise(async (resA, resB) => {
          var one = await db
            .collection("sotfwares")
            .doc("task_database")
            .collection(sub_tasks)
            .where("card_status", "!=", "Awaiting Approval")
            .get();
          resA(one.docs);
        });
      });
      Promise.all(Object.values(promises)).then((values) => {
        const find = values.every((f) => {
          return f.length == 0;
        });
        if (find == false) {
          const d = [];
          values.filter((dss) => {
            if (dss.length != 0) {
              dss.filter((e) => {
                d.push({ ...e.data(), token: e.id });
              });
            }
          });
          resMain({ status: true, data: d });
        } else {
          resMain({ status: false });
        }
      });
    } else {
      console.log("sdfasd");
      if (
        managing_param.fill_status != "All" &&
        managing_param.fill_name != "All"
      ) {
        const sub_user_task = await db
          .collection("sotfwares")
          .doc("task_database")
          .collection(managing_param.fill_name)
          .where("card_status", "==", managing_param.fill_status)
          .get();
        if (sub_user_task.size != 0) {
          const finD = sub_user_task.docs.map((d) => {
            return { ...d.data(), token: d.id };
          });
          resMain({ status: true, data: finD });
        } else {
          resMain({ status: false });
        }
      } else if (managing_param.fill_status == "All") {
        const sub_user_task = await db
          .collection("sotfwares")
          .doc("task_database")
          .collection(managing_param.fill_name)
          .where("card_status", "!=", "Awaiting Approval")
          .get();
        if (sub_user_task.size != 0) {
          const finD = sub_user_task.docs.map((d) => {
            return { ...d.data(), token: d.id };
          });
          resMain({ status: true, data: finD });
        } else {
          resMain({ status: false });
        }
      } else if (managing_param.fill_name == "All") {
        const managing_sub_user = managing_param.sub_users;
        const promises = {};
        managing_sub_user.filter((sub_tasks) => {
          promises[sub_tasks] = new Promise(async (resA, resB) => {
            var one = await db
              .collection("sotfwares")
              .doc("task_database")
              .collection(sub_tasks)
              .where("card_status", "==", managing_param.fill_status)
              .get();
            resA(one.docs);
          });
        });
        Promise.all(Object.values(promises)).then((values) => {
          const find = values.every((f) => {
            return f.length == 0;
          });
          if (find == false) {
            const d = [];
            values.filter((dss) => {
              if (dss.length != 0) {
                dss.filter((e) => {
                  d.push({ ...e.data(), token: e.id });
                });
              }
            });
            resMain({ status: true, data: d });
          } else {
            resMain({ status: false });
          }
        });
      }
    }
  });
}

function viewTask(v) {
  console.log(v);
  return new Promise(async (res, rej) => {
    if (v.status == "All") {
      var viewList = await db
        .collection("sotfwares")
        .doc("task_database")
        .collection(v.user)
        .where("created_on", ">=", new Date(v.start_date))
        .where("created_on", "<=", new Date(v.last_date))
        .get();
      console.log(viewList);
      if (viewList.size == 0) {
        res({ status: false });
      } else {
        const dataD = viewList.docs.map((da) => {
          return { ...da.data(), token: da.id };
        });
        res({ status: true, data: dataD });
      }
    } else {
      var viewList = await db
        .collection("sotfwares")
        .doc("task_database")
        .collection(v.user)
        .where("created_on", ">=", new Date(v.start_date))
        .where("created_on", "<=", new Date(v.last_date))
        .get();
      console.log(viewList);
      if (viewList.size == 0) {
        res({ status: false });
      } else {
        const datas = viewList.docs.filter((r) => {
          return r.data().card_status == v.status;
        });
        if (datas.length == 0) {
          res({ status: false });
        } else {
          const viewD = datas.map((view_task) => {
            return { ...view_task.data(), token: view_task.id };
          });
          res({ status: true, data: viewD });
        }
      }
    }
  });
}

// manage task
function manageTask(manage_fill) {
  console.log(manage_fill);
  return new Promise(async (mainRes, mainRej) => {
    if (manage_fill.status == "All" && manage_fill.name == "All") {
      var promises = {};
      manage_fill.sub_users.filter((sub_user) => {
        promises[sub_user] = new Promise(async (subRes, subRej) => {
          const manage_arr = await db
            .collection("sotfwares")
            .doc("task_database")
            .collection(sub_user)
            .where("created_on", ">=", new Date(manage_fill.start_date))
            .where("created_on", "<=", new Date(manage_fill.last_date))
            .get();
          subRes(manage_arr.docs);
        });
      });

      Promise.all(Object.values(promises)).then((values) => {
        const find = values.every((f) => {
          return f.length == 0;
        });
        console.log(find);
        if (find == false) {
          const d = [];
          values.filter((dss) => {
            if (dss.length != 0) {
              dss.filter((e) => {
                d.push({ ...e.data(), token: e.id });
              });
            }
          });
          mainRes({ status: true, data: d });
        } else {
          mainRes({ status: false });
        }
      });
    } else {
      if (manage_fill.status != "All" && manage_fill.name != "All") {
        const manage_arr = await db
          .collection("sotfwares")
          .doc("task_database")
          .collection(manage_fill.name)
          .where("created_on", ">=", new Date(manage_fill.start_date))
          .where("created_on", "<=", new Date(manage_fill.last_date))
          .get();
        console.log(manage_arr);
        if (manage_arr.size == 0) {
          mainRes({ status: false });
        } else {
          const filerD_manage = manage_arr.docs.filter((m_d) => {
            return m_d.data().card_status == manage_fill.status;
          });
          if (filerD_manage.length == 0) {
            mainRes({ status: false });
          } else {
            const manage_data = filerD_manage.map((manage_data) => {
              return { ...manage_data.data(), token: manage_data.id };
            });
            mainRes({ status: true, data: manage_data });
          }
        }
      } else if (manage_fill.status == "All") {
        const manage_arr = await db
          .collection("sotfwares")
          .doc("task_database")
          .collection(manage_fill.name)
          .where("created_on", ">=", new Date(manage_fill.start_date))
          .where("created_on", "<=", new Date(manage_fill.last_date))
          .get();
        if (manage_arr.size == 0) {
          mainRes({ status: false });
        } else {
          const manage_re = manage_arr.docs.map((man) => {
            return { ...man.data(), token: man.id };
          });
          mainRes({ status: true, data: manage_re });
        }
      } else if (manage_fill.name == "All") {
        var promises = {};
        manage_fill.sub_users.filter((sub_user) => {
          promises[sub_user] = new Promise(async (subRes, subRej) => {
            const manage_arr = await db
              .collection("sotfwares")
              .doc("task_database")
              .collection(sub_user)
              .where("created_on", ">=", new Date(manage_fill.start_date))
              .where("created_on", "<=", new Date(manage_fill.last_date))
              .get();
            subRes(manage_arr.docs);
          });
        });

        Promise.all(Object.values(promises)).then((values) => {
          console.log(values, "asdfsf");
          const find = values.every((f) => {
            return f.length == 0;
          });
          if (find == false) {
            console.log(find);
            const d = [];
            values.filter((dss) => {
              if (dss.length != 0) {
                dss.filter((e) => {
                  console.log(e);
                  if (e.data().card_status == manage_fill.status) {
                    d.push({ ...e.data(), token: e.id });
                  }
                });
              }
            });
            console.log(d, "dsfsdf");
            if (d.length == 0) {
              mainRes({ status: false });
            } else {
              mainRes({ status: true, data: d });
            }
          } else {
            mainRes({ status: false });
          }
        });
      }
    }
  });
}

/* --------------------- TASK FILTER FUNCIONS END HERE -------------------- */

/* --------------------------- TASK CHAT STAR HERE -------------------------- */
/* ------------------------ CHAT FUNCITONS START HERE ------------------------ */

function getChats(chatJ) {
  return new Promise(async (res, rej) => {
    const getTaskChat = await db
      .collection("sotfwares")
      .doc("task_database")
      .collection(chatJ.user)
      .doc(chatJ.token)
      .collection("Chat")
      .orderBy("chat_date", "asc")
      .get();
    if (getTaskChat.size == 0) {
      res({ status: false });
    } else {
      var chat_ar = getTaskChat.docs.map((chat) => {
        return chat.data();
      });
      console.log(chat_ar);
      //  makechatread(chatJ)
      res({ status: true, data: chat_ar });
    }
  });
}

async function taskChat(f) {
  const chatList = await db
    .collection("sotfwares")
    .doc("task_database")
    .collection(f.taskOwner)
    .doc(f.token)
    .collection("Chat")
    .add({
      chat_send_by: f.user,
      chat_message: f.message,
      chat_date: f.chatDate,
      chat_status: "Unread",
    });
  var chatcheck = await chatList.get();
  var chatresult = chatcheck.data();
  if (chatcheck.exists == true) {
    console.log("chat added successfully");
    return {
      status: true,
      message: "New chat added successfully",
      data: chatresult,
    };
  } else {
    console.log("Try Again");
    return { status: false, message: "Try Again" };
  }
}

function getPreloaderCard(pre) {
  return new Promise(async (res, rej) => {
    const preLoad = await db
      .collection("sotfwares")
      .doc("preloader_database")
      .collection(pre.user)
      .doc(pre.token)
      .get();
    if (preLoad.exists) {
      res({ status: true, data: { ...preLoad.data(), token: preLoad.id } });
    } else {
      res({ status: false });
    }
  });
}

function updatePreloaderCard(pre, updates) {
  return new Promise(async (res, rej) => {
    await db
      .collection("sotfwares")
      .doc("preloader_database")
      .collection(pre.user)
      .doc(pre.token)
      .update({
        preTpye: updates.type,
        preInfo: updates.info,
      });
    if (updates.type == "Weekly") {
      await db
        .collection("sotfwares")
        .doc("preloader_database")
        .collection(pre.user)
        .doc(pre.token)
        .update({
          preDay: updates.weeklyDay,
        });
    } else if (updates.type == "Monthly") {
      await db
        .collection("sotfwares")
        .doc("preloader_database")
        .collection(pre.user)
        .doc(pre.token)
        .update({
          preMonth: updates.month,
          preDate: updates.date,
        });
    } else if (updates.type == "Yearly") {
      await db
        .collection("sotfwares")
        .doc("preloader_database")
        .collection(pre.user)
        .doc(pre.token)
        .update({
          preyear: updates.yeardate,
        });
    }
    const preLoad = await db
      .collection("sotfwares")
      .doc("preloader_database")
      .collection(pre.user)
      .doc(pre.token)
      .get();
    res({ data: { ...preLoad.data(), token: preLoad.id } });
  });
}

function deletePreloaderCard(pre) {
  console.log(pre);
  return new Promise(async (res, rej) => {
    const preLoad = await db
      .collection("sotfwares")
      .doc("preloader_database")
      .collection(pre.user)
      .doc(pre.token)
      .delete();
    res({ status: true });
  });
}

/* ------------------------ CHAT FUNCITONS END HERE ------------------------ */

async function makechatread(u) {
  var chatList = await db
    .collection("sotfwares")
    .doc("task_database")
    .collection(u.user)
    .doc(u.token)
    .collection("Chat")
    .where("chat_status", "==", "Unread")
    .get();
  chatList.forEach(async (v) => {
    var chatData = v.data();
    console.log(chatData);
    if (chatData.chat_send_by != u.currentuser) {
      v.ref.update({ chat_status: "read" });
    }
  });
}

/* --------------------------- TASK CHAT END HERE -------------------------- */

/* -------------------------- TASK MODIFY FUNCTIONS ------------------------- */

function modifyIcon(obj) {
  return new Promise(async (res, rej) => {
    const taskCollection = await db
      .collection("sotfwares")
      .doc("task_database")
      .collection(obj.user_name)
      .doc(obj.token)
      .get();
    if (taskCollection.exists == false) {
      res({ status: fasle });
    } else {
      const value = await {
        ...taskCollection.data(),
        token: taskCollection.id,
      };
      res({ status: true, data: value });
    }
  });
}

/* ----------------------- MODIFY FUNCTIONS START HERE ---------------------- */

// edit Task info
function editTaskInfo(g) {
  return new Promise(async (res, rej) => {
    await db
      .collection("sotfwares")
      .doc("task_database")
      .collection(g.user)
      .doc(g.token)
      .update({
        task_description: g.editText,
      });
    const eT = await db
      .collection("sotfwares")
      .doc("task_database")
      .collection(g.user)
      .doc(g.token)
      .get();
    res({ status: true, data: { ...eT.data(), token: eT.id } });
  });
}

// schedule task
async function scheduleTask_backend(s) {
  var scheduletask = await db
    .collection("sotfwares")
    .doc("task_database")
    .collection(s.user)
    .doc(s.token)
    .update({
      scheduled_On: s.schedule_date,
      card_status: "Pending",
    });
}

// delete task
async function taskDelete(d) {
  await db
    .collection("sotfwares")
    .doc("task_database")
    .collection(d.user)
    .doc(d.token)
    .delete();
}

// task complete
async function completeTask(g) {
  console.log(g);
  var completed_on = [];
  if (g.comD[0] == "empty") {
    completed_on = [];
  } else {
    completed_on = g.comD;
  }
  var now = new Date();
  completed_on.push({ status: "Completed", date: now });
  console.log(completed_on);
  await db
    .collection("sotfwares")
    .doc("task_database")
    .collection(g.user)
    .doc(g.token)
    .update({
      card_status: "Completed",
      completed_on,
      delay: "",
    });
  var comptask = await db
    .collection("sotfwares")
    .doc("task_database")
    .collection(g.user)
    .doc(g.token)
    .get();
  console.log(comptask);
  var compresult = { ...comptask.data(), token: comptask.id };
  console.log(compresult);
  if (comptask.exists == true) {
    console.log("Task completed successfully");
    return {
      status: true,
      message: "Task completed successfully",
      data: compresult,
    };
  } else {
    console.log("Try Again");
    return { status: false, message: "Try Again" };
  }
}

// restore task
async function restoreTask_backend(g) {
  const completed_on = g.comD;
  completed_on.push({ status: "Restore", date: new Date() });
  await db
    .collection("sotfwares")
    .doc("task_database")
    .collection(g.user)
    .doc(g.token)
    .update({
      card_status: "Pending",
      completed_on,
    });
  var retask = await db
    .collection("sotfwares")
    .doc("task_database")
    .collection(g.user)
    .doc(g.token)
    .get();
  console.log(retask);
  var restoreresult = retask.data();
  console.log(restoreresult);

  if (retask.exists == true) {
    console.log("Task restored successfully");
    return {
      status: true,
      message: "Task restored successfully",
      data: restoreresult,
    };
  } else {
    console.log("Try Again");
    return { status: false, message: "Try Again" };
  }
}

// extend task
async function extendTask_backend(h) {
  var extended_on = [];
  if (h.ex_ar[0] == "empty") {
    extended_on.push({ status: "Request", date: h.ex_date });
  } else {
    extended_on = h.ex_ar;
    extended_on.push({ status: "Request", date: h.ex_date });
  }
  await db
    .collection("sotfwares")
    .doc("task_database")
    .collection(h.user)
    .doc(h.token)
    .update({
      card_status: "Awaiting Approval",
      extended_on,
    });
}

// approve task
async function approvetask(a) {
  var now = new Date();
  if (a.status == true) {
    let exAr = a.ex_on_ar[a.ex_on_ar.length - 1];
    exAr.status = "Approved";
    a.ex_on_ar[a.ex_on_ar.length - 1] = { ...exAr, approve_on: now };
    console.log(a.ex_on_ar);
    await db
      .collection("sotfwares")
      .doc("task_database")
      .collection(a.user)
      .doc(a.token)
      .update({
        card_status: "Approved",
        extended_on: a.ex_on_ar,
        delay: "",
      });
  } else {
    let exAr = a.ex_on_ar[a.ex_on_ar.length - 1];
    exAr.status = "Rejected";
    a.ex_on_ar[a.ex_on_ar.length - 1] = { ...exAr, rejected_on: new Date() };
    await db
      .collection("sotfwares")
      .doc("task_database")
      .collection(a.user)
      .doc(a.token)
      .update({
        card_status: "Pending",
        sub_status: "Rejected",
        extended_on: a.ex_on_ar,
      });
  }
}

function uploader(file, task) {
  console.log(file, task);
  return new Promise((res, rej) => {
    const storage = firebase.storage();
    const file_doc = Array.from(file);
    const promises = [];
    file_doc.forEach((fc) => {
      const fileSize = fc.size / 1024 / 1024;
      console.log(fileSize);
      if (fileSize > 10) {
        alertify.alert(
          "Message!",
          fc.name + "  This file size greater than 10Mb"
        );
      } else {
        promises[promises.length] = new Promise((subres, subrej) => {
          const d = storage.ref(`task/${task.token}/${fc.name}`);
          console.log(fc);
          const metadata = { contentType: fc.type };
          d.put(fc, metadata).then((uploadDetails) => {
            const e = uploadDetails.ref.getDownloadURL().then((url) => {
              console.log(url);
              subres({ url, fileName: fc.name });
            });
          });
        });
      }
    });
    console.log(promises);
    const wD = Promise.all(promises).then((e) => {
      let storeFile = [];
      if (task.file_details[0] != "empty") {
        storeFile = task.file_details.concat(e);
      } else {
        storeFile = e;
      }
      addUploadFile(
        { user: task.user_name, token: task.token },
        storeFile
      ).then((addedFile) => {
        res(addedFile);
      });
    });
  });
}

function addUploadFile(a, fileAr) {
  return new Promise(async (res, rej) => {
    await db
      .collection("sotfwares")
      .doc("task_database")
      .collection(a.user)
      .doc(a.token)
      .update({
        file_details: fileAr,
      });

    res({ status: true });
  });
}

// function getUploadFile(id){
//   return  new Promise((res, rej) => {
//         const storage = firebase.storage();
//         const d = storage.ref(`task/${id}/`);
//         console.log(d)
//             d.listAll().then((s) => {
//                 console.log(s,'sdfads')
//                 const sd = s.items;
//                 res(sd)
//             })
//     })
// }

/* -------------------------------------------------------------------------- */
/*                           TASK PAGE FIREBASE END                           */
/* -------------------------------------------------------------------------- */

async function lead_onsnap(user) {
  console.log(user);
  onsnap_store_obj.lead_assign_snap = await db
    .collection("sotfwares")
    .doc("active_leads_database")
    .collection(user)
    .where("lead_on_tab", "==", "Assigned")
    .onSnapshot((snap) => {
      const change_new = snap.docChanges();
      const d = change_new.map((lead_data) => {
        const store_task = lead_data;

        const make_details = {
          ...store_task.doc.data(),
          token: store_task.doc.id,
        };
        return { s: store_task.type, data: make_details };
      });

      const added_data = d.every((td) => {
        return td.s == "added";
      });
      const modify_data = d.every((td) => {
        return td.s == "modified";
      });
      const remove_data = d.every((td) => {
        return td.s == "removed";
      });
      console.log(remove_data, added_data, modify_data, "ddd");
      if (added_data) {
        const card_values = d.map((cE) => {
          return cE.data;
        });
        const filter_value = card_values;

        makeLeadAssignCard(filter_value, "", false);
        //   makePendingCard(filter_value,"",false);
      } else if (modify_data) {
        const card_values = d.map((cE) => {
          return cE.data;
        });
        lead_modify_card(card_values, "assigned");
      } else if (remove_data) {
        d.filter((cE) => {
          const dD = cE.data;
          deleted_lead_all(dD, "assigned");
        });
      }
    });

  onsnap_store_obj.lead_active_snap = await db
    .collection("sotfwares")
    .doc("active_leads_database")
    .collection(user)
    .where("lead_on_tab", "==", "Active")
    .onSnapshot((snap) => {
      const change_new = snap.docChanges();
      const d = change_new.map((lead_data) => {
        const store_task = lead_data;
        const make_details = {
          ...store_task.doc.data(),
          token: store_task.doc.id,
        };
        return { s: store_task.type, data: make_details };
      });

      const added_data = d.every((td) => {
        return td.s == "added";
      });
      const modify_data = d.every((td) => {
        return td.s == "modified";
      });
      const remove_data = d.every((td) => {
        return td.s == "removed";
      });
      console.log(added_data, modify_data, remove_data);
      if (added_data) {
        const card_values = d.map((cE) => {
          return cE.data;
        });
        const filter_value = card_values;

        makeLeadActiveCard(filter_value, "", false);
        //   makePendingCard(filter_value,"",false);
      } else if (modify_data) {
        const card_values = d.map((cE) => {
          return cE.data;
        });

        lead_modify_card(card_values, "active");
      } else if (remove_data) {
        console.log(d, "sdr");
        d.filter((cE) => {
          const dD = cE.data;
          console.log(dD);
          deleted_lead_all(dD, "active");
        });
      }
    });
}

function sitevisitCard(user) {
  return new Promise(async (res, rej) => {
    const swa = await db
      .collection("sotfwares")
      .doc("active_leads_database")
      .collection(user)
      .get();
    const filSS = [];
    const sitECard = swa.docs.filter((stC) => {
      const sitEa = stC.data();
      if (
        sitEa.lead_client_status == "Site Visit Scheduled" ||
        sitEa.lead_client_status == "Site Visit Completed"
      ) {
        filSS.push({ ...sitEa, token: stC.id });
      }
    });
    res({ status: true, data: filSS });
  });
}

function sitevisitCard_filter(filter_data, user) {
  console.log(filter_data);
  return new Promise(async (res, rej) => {
    const swa = await db
      .collection("sotfwares")
      .doc("active_leads_database")
      .collection(user)
      .get();
    const filSS = [];
    const sitECard = swa.docs.filter((stC) => {
      const sitEa = stC.data();
      if (
        sitEa.lead_client_status == "Site Visit Scheduled" ||
        sitEa.lead_client_status == "Site Visit Completed"
      ) {
        if (filter_data.status == "All") {
          let cus_start_Date = new Date(filter_data.start_date);
          let cus_end_Date = new Date(filter_data.end_date);
          const site_schedule =
            sitEa.lead_site_visit_details.lead_scheduled_on.toDate();
          console.log(site_schedule);
          if (
            site_schedule >= cus_start_Date &&
            site_schedule <= cus_end_Date
          ) {
            filSS.push({ ...sitEa, token: stC.id });
          }
        } else if (
          filter_data.status == "Site Visit Scheduled" &&
          sitEa.lead_client_status == "Site Visit Scheduled"
        ) {
          let cus_start_Date = new Date(filter_data.start_date);
          let cus_end_Date = new Date(filter_data.end_date);
          const site_schedule =
            sitEa.lead_site_visit_details.lead_scheduled_on.toDate();
          console.log(site_schedule);
          if (
            site_schedule >= cus_start_Date &&
            site_schedule <= cus_end_Date
          ) {
            filSS.push({ ...sitEa, token: stC.id });
          }
        } else if (
          filter_data.status == "Site Visit Completed" &&
          sitEa.lead_client_status == "Site Visit Completed"
        ) {
          let cus_start_Date = new Date(filter_data.start_date);
          let cus_end_Date = new Date(filter_data.end_date);
          const site_schedule =
            sitEa.lead_site_visit_details.lead_scheduled_on.toDate();
          console.log(site_schedule);
          if (
            site_schedule >= cus_start_Date &&
            site_schedule <= cus_end_Date
          ) {
            filSS.push({ ...sitEa, token: stC.id });
          }
        }
      }
    });
    res({ status: true, data: filSS });
  });
}

async function tele_report_dash(user) {
  onsnap_store_obj.lead_tele_report_snap = await db
    .collection("sotfwares")
    .doc("active_leads_database")
    .collection(user)
    .onSnapshot((snap) => {
      const change_new = snap.docChanges();
      const d = change_new.map((lead_data) => {
        const store_task = lead_data;
        const make_details = {
          ...store_task.doc.data(),
          token: store_task.doc.id,
        };
        return { s: store_task.type, data: make_details };
      });

      const added_data = d.every((td) => {
        return td.s == "added";
      });
      const modify_data = d.every((td) => {
        return td.s == "modified";
      });
      const remove_data = d.every((td) => {
        return td.s == "removed";
      });
      if (added_data) {
        tele_dash_report(d);
      } else if (modify_data) {
        tele_dash_report(d);
      } else if (remove_data) {
        tele_dash_report(d);
      }
    });
  onsnap_store_obj.lead_tele_report_snap_dead = await db
    .collection("sotfwares")
    .doc("dead_leads_database")
    .collection(user)
    .onSnapshot((snap) => {
      const leadED = snap.docs.length;
      const leadTD = snap.docs.filter((ma) => {
        return (
          ma.data().lead_worked_on.toDate().toDateString() ==
          new Date().toDateString()
        );
      });
      deadCount_dashboard(leadTD.length, leadED);
    });
}

function tele_dash_reportVE(user) {
  return new Promise(async (res, rej) => {
    let leadDd = await db
      .collection("sotfwares")
      .doc("active_leads_database")
      .collection(user)
      .get();
    const leadDE = leadDd.docs.map((leadDT) => {
      return { ...leadDT.data(), token: leadDT.id };
    });
    res({ status: true, data: leadDE });
  });
}

function getAdditional_values() {
  return new Promise(async (res, rej) => {
    const aSub = await db
      .collection("sotfwares")
      .doc("lead_sub_database")
      .collection("List_of_resources")
      .doc("Lead_additional_details")
      .get();
    res({ status: true, data: aSub.data() });
  });
}

function modifyIcon_lead(obj) {
  return new Promise(async (res, rej) => {
    const taskCollection = await db
      .collection("sotfwares")
      .doc("active_leads_database")
      .collection(obj.user_name)
      .doc(obj.token)
      .get();
    if (taskCollection.exists == false) {
      const taskCollection = await db
        .collection("sotfwares")
        .doc("dead_leads_database")
        .collection(obj.user_name)
        .doc(obj.token)
        .get();
      if (taskCollection.exists == false) {
        res({ status: false });
      } else {
        const value = await {
          ...taskCollection.data(),
          token: taskCollection.id,
        };
        res({ status: true, data: value });
      }
    } else {
      const value = await {
        ...taskCollection.data(),
        token: taskCollection.id,
      };
      res({ status: true, data: value });
    }
  });
}

function modifyIcon_lead_dead(obj) {
  return new Promise(async (res, rej) => {
    const taskCollection = await db
      .collection("sotfwares")
      .doc("dead_leads_database")
      .collection(obj.user_name)
      .doc(obj.token)
      .get();
    if (taskCollection.exists == false) {
      res({ status: false });
    } else {
      const value = await {
        ...taskCollection.data(),
        token: taskCollection.id,
      };
      res({ status: true, data: value });
    }
  });
}
function getLeadChats(chatJ) {
  return new Promise(async (res, rej) => {
    const getTaskChat = await db
      .collection("sotfwares")
      .doc("active_leads_database")
      .collection(chatJ.user)
      .doc(chatJ.token)
      .collection("Chat")
      .orderBy("chat_date", "asc")
      .get();
    if (getTaskChat.size == 0) {
      res({ status: false });
    } else {
      var chat_ar = getTaskChat.docs.map((chat) => {
        return chat.data();
      });
      console.log(chat_ar);
      //  makechatread(chatJ)
      res({ status: true, data: chat_ar });
    }
  });
}
async function leadChatBC(f) {
  console.log(f);
  const chatList = await db
    .collection("sotfwares")
    .doc("active_leads_database")
    .collection(f.lead_owner)
    .doc(f.token)
    .collection("Chat")
    .add({
      chat_send_by: f.user,
      chat_message: f.message,
      chat_date: new Date(),
      chat_status: "Unread",
    });
  var chatcheck = await chatList.get();
  var chatresult = chatcheck.data();
  if (chatcheck.exists == true) {
    add_spreadSheet_chat({ id: f.lead_id, owner: f.user, message: f.message });
    console.log("chat added successfully");
    return {
      status: true,
      message: "New chat added successfully",
      data: chatresult,
    };
  } else {
    console.log("Try Again");
    return { status: false, message: "Try Again" };
  }
}

function leads_tell_tab_filter(filter_data, sub_data) {
  return new Promise(async (main_result, main_reject) => {
    const user_card_select = await db
      .collection("sotfwares")
      .doc("active_leads_database")
      .collection(sub_data.card_user)
      .where("lead_on_tab", "==", sub_data.tab)
      .get();
    var filter_lead = user_card_select.docs.map((d) => {
      return { ...d.data(), token: d.id };
    });

    if (filter_data.main_src != "All") {
      const fil_main_src = [];
      filter_lead.filter((dataL) => {
        const mainS = dataL.lead_source;
        if (mainS[0].main == filter_data.main_src) {
          fil_main_src.push(dataL);
        }
        // mainS.find((mn) => {
        //     if (mn.main == filter_data.main_src) {

        //     }
        // })
      });
      filter_lead = fil_main_src;
    }
    if (filter_data.sub_src != "All") {
      const fil_main_src = [];
      filter_lead.filter((dataL) => {
        const mainS = dataL.lead_source;
        if (mainS[0].sub == filter_data.sub_src) {
          fil_main_src.push(dataL);
        }
        // mainS.find((mn) => {
        //     if (mn.sub == filter_data.sub_src) {
        //         fil_main_src.push(dataL)
        //     }
        // })
      });
      filter_lead = fil_main_src;
    }

    if (filter_data.project != "All") {
      filter_lead = filter_lead.filter((dataL) => {
        const mainS = dataL.lead_project;
        if (mainS == filter_data.project) {
          return dataL;
        }
      });
    }
    if (filter_data.client_status != "All") {
      filter_lead = filter_lead.filter((dataL) => {
        const mainS = dataL.lead_client_status;
        if (mainS == filter_data.client_status) {
          return dataL;
        }
      });
    }

    if (filter_data.card_status != "All") {
      if (
        filter_data.card_status == "Pending" ||
        filter_data.card_status == "Scheduling"
      ) {
        filter_lead = filter_lead.filter((dadD) => {
          const stD = dadD.lead_card_status;
          console.log();
          if (stD == filter_data.card_status) {
            return dadD;
          }
        });
      } else if (filter_data.card_status == "Missed") {
        filter_lead = filter_lead.filter((dadD) => {
          const stD = dadD.lead_missed_call_details;
          if (stD.length > 0) {
            return dadD;
          }
        });
      } else if (filter_data.card_status == "Custom") {
        let cus_start_Date = new Date(filter_data.start_date);
        let cus_end_Date = new Date(filter_data.end_date);

        filter_lead = filter_lead.filter((dadD) => {
          const stD = dadD.lead_receive_date.toDate();
          if (stD >= cus_start_Date && stD <= cus_end_Date) {
            return dadD;
          }
        });
      }
    }

    main_result({ status: true, data: filter_lead });
  });
}

// to add fresh leads
function addfreshleads(lead, sub_details) {
  return new Promise(async (res, rej) => {
    console.log(lead);
    var lead_client_phone_numbers = [];
    if (lead.phone_1 != "") {
      lead_client_phone_numbers.push({ isd: lead.isd_1, number: lead.phone_1 });
    }

    if (lead.phone_2 != "") {
      lead_client_phone_numbers.push({ isd: lead.isd_2, number: lead.phone_2 });
    }
    var lead_email_id = [];
    if (lead.email_1 != "") {
      lead_email_id.push(lead.email_1);
    }
    if (lead.email_2 != "") {
      lead_email_id.push(lead.email_2);
    }

    var lead_source = [];
    if (lead.main_src_1 != "" && lead.sub_src_1 != "") {
      lead_source.push({
        main: lead.main_src_1,
        sub: lead.sub_src_1,
        src_receive_date: new Date(),
      });
    }
    if (lead.main_src_2 != "" && lead.sub_src_2 != "") {
      lead_source.push({
        main: lead.main_src_2,
        sub: lead.sub_src_2,
        src_receive_date: new Date(),
      });
    }
    const lead_id = returnHash();
    if (lead.client_status != "Dead") {
      const followUpDate = new Date(lead.followUp);
      let tab = "Active";
      if (followUpDate.toDateString() == new Date().toDateString()) {
        tab = "Assigned";
      }
      const leadS = {
        lead_owner: sub_details.owner_name,
        lead_receive_date: new Date(),
        lead_manager: sub_details.manager,
        lead_project: lead.project_name,
        lead_project_id: "",
        lead_client_name: lead.client_name.trim(),
        lead_client_phone_numbers,
        lead_email_id,
        lead_budget: lead.budg,
        lead_flat_type: lead.type,
        lead_source,
        lead_card_status: "Pending",
        lead_client_status: lead.client_status,
        lead_squre_feet: lead.squ,
        lead_no_of_days: 0,
        lead_call_details: new Array(),
        lead_followup_date: followUpDate,
        lead_site_visit_details: false,
        lead_worked_on: new Date(),
        lead_card_type: "Self",
        lead_missed_call_details: new Array(),
        lead_delay_badge: false,
        lead_receive_type: "Self",
        lead_invoice_form: "",
        lead_on_tab: tab,
        lead_id,
      };
      console.log(leadS);
      const adeL = await db
        .collection("sotfwares")
        .doc("active_leads_database")
        .collection(sub_details.owner_name)
        .add(leadS);
      console.log(adeL);
      db.collection("sotfwares")
        .doc("active_leads_database")
        .collection(sub_details.owner_name)
        .doc(adeL.id)
        .collection("Chat")
        .add({
          chat_send_by: sub_details.owner_name,
          chat_message: lead.remarks,
          chat_date: new Date(),
          chat_status: "Unread",
        });
    } else if (lead.client_status == "Dead") {
      const leadS = {
        lead_owner: sub_details.owner_name,
        lead_receive_date: new Date(),
        lead_manager: sub_details.manager,
        lead_project: lead.project_name,
        lead_project_id: "",
        lead_client_name: lead.client_name.trim(),
        lead_client_phone_numbers,
        lead_email_id,
        lead_budget: lead.budg,
        lead_flat_type: lead.type,
        lead_source,
        lead_card_status: "Closed",
        lead_client_status: lead.client_status,
        lead_squre_feet: lead.squ,
        lead_no_of_days: 0,
        lead_call_details: new Array(),
        lead_followup_date: "Dead Lead",
        lead_dead_on: new Date(),
        lead_site_visit_details: false,
        lead_worked_on: new Date(),
        lead_card_type: "Self",
        lead_missed_call_details: new Array(),
        lead_delay_badge: false,
        lead_receive_type: "Self",
        lead_invoice_form: "",
        lead_on_tab: "Assigned",
        lead_dead_remark: {
          remark: lead.dead_remark,
          sub_remark: lead.locations,
        },
        lead_id,
      };

      console.log(leadS);

      const adeL = await db
        .collection("sotfwares")
        .doc("dead_leads_database")
        .collection(sub_details.owner_name)
        .add(leadS);
      db.collection("sotfwares")
        .doc("dead_leads_database")
        .collection(sub_details.owner_name)
        .doc(adeL.id)
        .collection("Chat")
        .add({
          chat_send_by: sub_details.owner_name,
          chat_message: lead.remarks,
          chat_date: new Date(),
          chat_status: "Unread",
        });
    }
    const addDeadLead = {
      id: lead_id,
      owner_name: sub_details.owner_name,
      manager: sub_details.manager,
      client_name: lead.client_name.trim(),
      isd1: lead_client_phone_numbers[0].isd,
      ph1: lead_client_phone_numbers[0].number,
      isd2: lead_client_phone_numbers[1]
        ? lead_client_phone_numbers[1].isd
        : "",
      ph2: lead_client_phone_numbers[1]
        ? lead_client_phone_numbers[1].number
        : "",
      mail1: lead_email_id[0] ? lead_email_id[0] : "",
      mail2: lead_email_id[1] ? lead_email_id[1] : "",
      project: lead.project_name,
      type: lead.type,
      sqFt: lead.squ,
      main1: lead_source[0].main,
      sub1: lead_source[0].sub,
      main2: lead_source[1] ? lead_source[1].main : "",
      sub2: lead_source[1] ? lead_source[1].sub : "",
      budget: lead.budg,
      client_status: lead.client_status,
      follup: lead.client_status != "Dead" ? lead.followUp : "Dead Lead",
      remark: lead.remarks,
      cardMKType: "Self Lead",
      cardAssignType: "Self",
    };
    add_fresh_leads(addDeadLead);
    add_spreadSheet_chat({
      id: lead_id,
      owner: sub_details.owner_name,
      message: lead.remarks,
    });
    res({ status: true });
  });
}

//add info
function adddetails(add_lead_obj, sub_data) {
  return new Promise(async (res, rej) => {
    console.log(add_lead_obj, sub_data);
    var lead_client_phone_numbers = sub_data.old_lead.lead_client_phone_numbers;
    if (add_lead_obj.cnumber != "") {
      lead_client_phone_numbers.push({
        isd: add_lead_obj.cisd,
        number: add_lead_obj.cnumber,
      });
    }

    var lead_email_id = sub_data.old_lead.lead_email_id;
    if (add_lead_obj.cemail != "") {
      lead_email_id.push(add_lead_obj.cemail);
    }
    var projec = sub_data.old_lead.lead_project;
    if (add_lead_obj.cproject != "") {
      projec = add_lead_obj.cproject;
    }
    var sqld = sub_data.old_lead.lead_squre_feet;
    if (add_lead_obj.csql != "") {
      sqld = add_lead_obj.csql;
    }
    var type = sub_data.old_lead.lead_flat_type;
    if (add_lead_obj.ctype != "") {
      type = add_lead_obj.ctype;
    }
    var bdRg = sub_data.old_lead.lead_budget;
    if (add_lead_obj.cbdg != "") {
      bdRg = add_lead_obj.cbdg;
    }
    const information = await db
      .collection("sotfwares")
      .doc("active_leads_database")
      .collection(sub_data.old_lead.lead_owner)
      .doc(sub_data.old_lead.token)
      .update({
        lead_client_name: add_lead_obj.cname,
        lead_flat_type: type,
        lead_budget: bdRg,
        lead_squre_feet: sqld,
        lead_project: projec,
        lead_client_phone_numbers,
        lead_email_id,
        lead_worked_on: new Date(),
      });

    res({ status: true });
  });
}

//complete icon

function lead_addSite_visit(visited_data, sub_data) {
  console.log(visited_data, sub_data);
  return new Promise(async (res, rej) => {
    var cab = false;
    if (visited_data.cab == "Booked") {
      cab = {
        cab_status: visited_data.cab,
        client_address: visited_data.cab_address,
        client_landmark: visited_data.cab_land_mark,
        map_link: visited_data.cab_map_link,
        no_of_person: visited_data.cab_member,
      };
    }
    db.collection("sotfwares")
      .doc("active_leads_database")
      .collection(sub_data.owner_name)
      .doc(sub_data.token)
      .update({
        lead_followup_date: "Lead Completed",
        lead_client_status: "Site Visit Scheduled",
        lead_card_status: "Completed",
        lead_on_tab: "Site visit",
        lead_worked_on: new Date(),
        lead_completed_on: new Date(),
        lead_missed_call_details: new Array(),
        delay: "",
        lead_site_visit_details: {
          lead_scheduled_on: new Date(visited_data.visit_date),
          lead_visit_time: visited_data.visit_time,
          cab_details: cab,
          lead_cancelled_afterVisit: false,
          sitevisit_status: "Scheduling",
          booked: false,
        },
      });
    db.collection("sotfwares")
      .doc("active_leads_database")
      .collection(sub_data.owner_name)
      .doc(sub_data.token)
      .collection("Chat")
      .add({
        chat_send_by: sub_data.owner_name,
        chat_message: visited_data.remarks,
        chat_date: new Date(),
        chat_status: "Unread",
      });
    const saleData = await db
      .collection("sotfwares")
      .doc("active_leads_database")
      .collection(sub_data.owner_name)
      .doc(sub_data.token)
      .get();
    const salesLead = saleData.data();
    addSalesDatabase(salesLead, saleData.id);
    res({ status: true });
  });
}

function lead_reschedule(reschedule_Data, sub_data) {
  return new Promise(async (res, rej) => {
    console.log(reschedule_Data);
    var followDate = new Date(reschedule_Data.reshedule_date);
    var tab = "Active";
    if (followDate.toDateString() == new Date().toDateString()) {
      tab = "Assigned";
    }

    var lead_remainder = false;
    if (reschedule_Data.reminder != "") {
      lead_remainder = reschedule_Data.reminder;
    }
    await db
      .collection("sotfwares")
      .doc("active_leads_database")
      .collection(sub_data.owner_name)
      .doc(sub_data.token)
      .update({
        lead_followup_date: followDate,
        lead_client_status: reschedule_Data.reshedule_status,
        lead_card_status: "Pending",
        lead_on_tab: tab,
        delay: "",
        lead_remainder,
        lead_missed_call_details: new Array(),
        lead_worked_on: new Date(),
      });
    db.collection("sotfwares")
      .doc("active_leads_database")
      .collection(sub_data.owner_name)
      .doc(sub_data.token)
      .collection("Chat")
      .add({
        chat_send_by: sub_data.owner_name,
        chat_message: reschedule_Data.remarks,
        chat_date: new Date(),
        chat_status: "Unread",
      });
    res({ status: true });
  });
}

function lead_dead(dead_data, sub_data) {
  return new Promise(async (res, rej) => {
    await db
      .collection("sotfwares")
      .doc("active_leads_database")
      .collection(sub_data.owner_name)
      .doc(sub_data.token)
      .update({
        lead_followup_date: "Lead Dead",
        lead_client_status: "Dead",
        lead_card_status: "Closed",
        lead_worked_on: new Date(),
        lead_dead_no_of_days: 0,
        delay: "",
        lead_missed_call_details: new Array(),
        lead_dead_on: new Date(),
        lead_dead_remarks: {
          remark: dead_data.dead_remark,
          sub_remark: dead_data.location,
        },
      });
    db.collection("sotfwares")
      .doc("active_leads_database")
      .collection(sub_data.owner_name)
      .doc(sub_data.token)
      .collection("Chat")
      .add({
        chat_send_by: sub_data.owner_name,
        chat_message: dead_data.remarks,
        chat_date: new Date(),
        chat_status: "Unread",
      });
    const deadD = await db
      .collection("sotfwares")
      .doc("active_leads_database")
      .collection(sub_data.owner_name)
      .doc(sub_data.token)
      .get();
    const deadLead = deadD.data();
    addDeadLeads(deadLead, deadD.id);
    const eD = await db
      .collection("sotfwares")
      .doc("active_leads_database")
      .collection(sub_data.owner_name)
      .doc(sub_data.token);
    eD.delete();
    res({ status: true });
  });
}

function addSalesDatabase(siteVS, token) {
  db.collection("sotfwares")
    .doc("admin_sales_database")
    .collection("adminLeads")
    .doc(token)
    .set(siteVS);
}

function removeSaleDatabase(token) {
  db.collection("sotfwares")
    .doc("admin_sales_database")
    .collection("adminLeads")
    .doc(token)
    .delete();
}

function addDeadLeads(deadDe, token) {
  db.collection("sotfwares")
    .doc("dead_leads_database")
    .collection(deadDe.lead_owner)
    .doc(token)
    .set(deadDe);
}

// call record

function callrecord(callDe, subD) {
  console.log(callDe);
  return new Promise(async (res, rej) => {
    var lead_call_details = subD.lead_call_details;
    var lead_remainder = false;
    if (callDe.reminder != "") {
      lead_remainder = callDe.reminder;
    }
    lead_call_details.push({ call_status: callDe.status, call_on: new Date() });
    const call_information = await db
      .collection("sotfwares")
      .doc("active_leads_database")
      .collection(subD.lead_owner)
      .doc(subD.token)
      .update({
        lead_call_details,
        lead_worked_on: new Date(),
        lead_remainder,
        lead_missed_call_details: new Array(),
      });
    if (callDe.remark.trim() != "") {
      await db
        .collection("sotfwares")
        .doc("active_leads_database")
        .collection(subD.lead_owner)
        .doc(subD.token)
        .collection("Chat")
        .add({
          chat_send_by: subD.lead_owner,
          chat_message: callDe.remark,
          chat_date: new Date(),
          chat_status: "Unread",
        });
    }

    res({ status: true });
  });
}

async function callDashboardCount(user) {
  const leD = new Date().toDateString();
  onsnap_store_obj.lead_call_count_snap = await db
    .collection("sotfwares")
    .doc("call_Logs")
    .collection(leD)
    .where("name", "==", user)
    .onSnapshot((snap) => {
      const calE = snap.docs.map((ed) => {
        return ed.data();
      });
      call_live_count(calE);
    });
}

function siteCompleteDD(subD, selectD) {
  return new Promise(async (res, rej) => {
    await db
      .collection("sotfwares")
      .doc("active_leads_database")
      .collection(subD.lead_owner)
      .doc(subD.token)
      .update({
        lead_worked_on: new Date(),
        lead_client_status: "Site Visit Completed",
        lead_missed_call_details: new Array(),
        lead_site_visit_details: {
          lead_scheduled_on: new Date(selectD.date),
          lead_visit_time: subD.lead_site_visit_details.lead_visit_time,
          cab_details: subD.lead_site_visit_details.cab_details,
          lead_cancelled_afterVisit: false,
          sitevisit_status: "Completed",
          booked: false,
        },
      });
    if (selectD.remark != "") {
      await db
        .collection("sotfwares")
        .doc("active_leads_database")
        .collection(subD.lead_owner)
        .doc(subD.token)
        .collection("Chat")
        .add({
          chat_send_by: subD.lead_owner,
          chat_message: selectD.remark,
          chat_date: new Date(),
          chat_status: "Unread",
        });
    }

    res("success");
  });
}

function siteRescheduleDD(subD, selectD) {
  return new Promise(async (res, rej) => {
    var tab = "Active";
    if (new Date(selectD.date).toDateString() == new Date().toDateString()) {
      tab = "Assigned";
    }
    await db
      .collection("sotfwares")
      .doc("active_leads_database")
      .collection(subD.lead_owner)
      .doc(subD.token)
      .update({
        lead_worked_on: new Date(),
        lead_client_status: selectD.status,
        lead_site_visit_details: false,
        lead_on_tab: tab,
        lead_card_status: "Pending",
        lead_followup_date: new Date(selectD.date),
        lead_missed_call_details: new Array(),
      });
    if (selectD.remark != "") {
      await db
        .collection("sotfwares")
        .doc("active_leads_database")
        .collection(subD.lead_owner)
        .doc(subD.token)
        .collection("Chat")
        .add({
          chat_send_by: subD.lead_owner,
          chat_message: selectD.remark,
          chat_date: new Date(),
          chat_status: "Unread",
        });
    }
    res("success");
  });
}

function lead_dead_subD(dead_data, sub_data) {
  return new Promise(async (res, rej) => {
    await db
      .collection("sotfwares")
      .doc("active_leads_database")
      .collection(sub_data.owner_name)
      .doc(sub_data.token)
      .update({
        lead_followup_date: "Lead Dead",
        lead_client_status: "Dead",
        lead_card_status: "Closed",
        lead_worked_on: new Date(),
        lead_dead_no_of_days: 0,
        lead_missed_call_details: new Array(),
        delay: "",
        lead_dead_on: new Date(),
        lead_dead_remarks: { remark: dead_data.remark, sub_remark: "" },
      });
    db.collection("sotfwares")
      .doc("active_leads_database")
      .collection(sub_data.owner_name)
      .doc(sub_data.token)
      .collection("Chat")
      .add({
        chat_send_by: sub_data.owner_name,
        chat_message: dead_data.remark,
        chat_date: new Date(),
        chat_status: "Unread",
      });

    const deadD = await db
      .collection("sotfwares")
      .doc("active_leads_database")
      .collection(sub_data.owner_name)
      .doc(sub_data.token)
      .get();
    const deadLead = deadD.data();
    addDeadLeads(deadLead, deadD.id);
    const eD = await db
      .collection("sotfwares")
      .doc("active_leads_database")
      .collection(sub_data.owner_name)
      .doc(sub_data.token);
    eD.delete();
    res({ status: true });
  });
}

/* -------------------------------------------------------------------------- */
/*                        LEADS PAGE FIREBASE CONTAINER                       */
/* -------------------------------------------------------------------------- */

/* ------------------- LEAD FIREBASE FUNCTIONS START HERE ------------------- */

/* -------------------- LEADS FIREBASE FUNCTIONS END HERE ------------------- */

/* -------------------------------------------------------------------------- */
/*                      LOGS FUNTIONS FIREBASE CONTAINER                      */
/* -------------------------------------------------------------------------- */

/* ------------------------ LOGS FUNTIONS START HERE ------------------------ */
function addAdminLog(logInfos) {
  return new Promise(async (res, rej) => {
    const addLG = await db
      .collection("sotfwares")
      .doc("daily_logs_database")
      .collection(logInfos.username)
      .add({
        log_info: logInfos.info,
        log_add_date: new Date(),
        log_owner: logInfos.username,
      });
    const data = await addLG.get();
    const returnData = { ...data.data(), token: data.id };
    res({ status: true, data: returnData });
  });
}

function getAdminLogToday(user) {
  return new Promise(async (res, rej) => {
    const addLG = await db
      .collection("sotfwares")
      .doc("daily_logs_database")
      .collection(user)
      .orderBy("log_add_date", "asc")
      .get();
    const mappingData = addLG.docs.map((mad) => {
      return { ...mad.data(), token: mad.id };
    });
    const filterToday = mappingData.filter((filterLog) => {
      return (
        filterLog.log_add_date.toDate().toDateString() ==
        new Date().toDateString()
      );
    });
    res({ status: true, data: filterToday });
  });
}

function logViewFilter(dates, subData) {
  return new Promise(async (res, rej) => {
    const addLG = await db
      .collection("sotfwares")
      .doc("daily_logs_database")
      .collection(subData.user)
      .orderBy("log_add_date", "asc")
      .get();
    const mappingData = addLG.docs.map((mad) => {
      return { ...mad.data(), token: mad.id };
    });
    const fromDate = new Date(dates.from);
    const toDate = new Date(dates.to);
    const filterToday = mappingData.filter((filterLog) => {
      if (
        filterLog.log_add_date.toDate() >= fromDate &&
        filterLog.log_add_date.toDate() <= toDate
      ) {
        return filterLog;
      }
    });
    res({ status: true, data: filterToday });
  });
}

function logMangefilter(lD) {
  return new Promise(async (res, rej) => {
    const addLG = await db
      .collection("sotfwares")
      .doc("daily_logs_database")
      .collection(lD.selectName)
      .orderBy("log_add_date", "asc")
      .get();
    const mappingData = addLG.docs.map((mad) => {
      return { ...mad.data(), token: mad.id };
    });
    const filterToday = mappingData.filter((filterLog) => {
      return (
        filterLog.log_add_date.toDate().toDateString() ==
        new Date(lD.date).toDateString()
      );
    });
    res({ status: true, data: filterToday });
  });
}

function addleadfirebase(firebaseAr) {
  return new Promise((res, rej) => {
    console.log(firebaseAr);
    firebaseAr.forEach(async (fileFields) => {
      const leadS = fileFields[0];
      const chat = fileFields[1];
      var x = await db
        .collection("sotfwares")
        .doc("active_leads_database")
        .collection(leadS.lead_owner)
        .add(leadS);
      const id = x.id;
      console.log(x);
      chat.forEach((v) => {
        console.log(v);
        db.collection("sotfwares")
          .doc("active_leads_database")
          .collection(leadS.lead_owner)
          .doc(id)
          .collection("Chat")
          .add({
            chat_send_by: leadS.lead_owner,
            chat_message: v,
            chat_date: new Date(),
            chat_status: "read",
          });
      });
    });
    res({ status: "Success" });
  });
}

/* ------------------------- LOGS FUNCTIONS END HERE ------------------------ */
