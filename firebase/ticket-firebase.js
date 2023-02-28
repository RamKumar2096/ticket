var ticketDB = db
  .collection("sotfwares")
  .doc("ticket_database")
  .collection("ticket_database_container");

// add ticket function
async function addticketFirebase(n, s) {
  let now = new Date();
  // console.log(n);
  // console.log(s);

  var ticket = await db
    .collection("sotfwares")
    .doc("ticket_database")
    .collection("ticket_database_container")
    .add({
      created_on: now,
      user_name: s,
      creator_department: "",
      creator_name: s,
      ticket_information: n.ticketInfo,
      card_status: "Scheduling",
      timeline: "",
      no_of_assignees: n.no_of_assignees,
      no_of_viewers: n.no_of_viewers,
      no_of_extensions: "",
      new_badge: "New",
      main_assignee_name: n.main_assignee_name,
      main_assignee_department: n.main_assignee_dept,
      main_assignee_scheduled_On: "",
      main_assignee_completed_on: "",
      main_assignee_status: "Scheduling",
      sub_assignee1_name: n.sub_assignee1_name,
      sub_assignee1_department: n.sub_assignee1_dept,
      sub_assignee1_completed_on: "",
      sub_assignee1_status: "Scheduling",
      sub_assignee2_name: n.sub_assignee2_name,
      sub_assignee2_department: n.sub_assignee2_dept,
      sub_assignee2_completed_on: "",
      sub_assignee2_status: "Scheduling",
      viewer1_name: n.viewer1_name,
      viewer1_department: n.viewer1_dept,
      viewer2_name: n.viewer2_name,
      viewer2_department: n.viewer2_dept,
      new_badge_count: "",
      notification_card: "",
      files: [],
      appoved_date: "",
      old_main_assignee: "",
      chat_notification_card: "",
      download_notification_card: "",
    })
    .then((res) => res.get());
  console.log(ticket);

  const ticketData = ticket.data();
  // console.log(ticketData);
  return ticketData;
}

// edit ticket
function editTicketFirebase(obj) {
  return new Promise(async (res, rej) => {
    await ticketDB.doc(obj.token).update({
      ticket_information: obj.newTicket,
    });
    const x = await ticketDB.doc(obj.token).get();
    res({ status: true, data: { ...x.data(), token: x.id } });
  });
}

// delete Ticket
async function deleteTicketFirebase(token) {
  console.log(token);
  const del = await ticketDB.doc(token).get();
  await ticketDB.doc(token).delete();
  console.log(del);
  return { ...del.data(), token: del.id };
}

// upload
function uploadTicketFirebase(file, ticket) {
  console.log(file, ticket);
  return new Promise((res, rej) => {
    const storage = firebase.storage();
    const file_doc = Array.from(file);
    const promises = [];
    file_doc.forEach((fc) => {
      const fileSize = fc.size / 1024 / 1024;
      console.log(fileSize);
      if (fileSize > 10) {
        alertify.error(
          "Message!"+
          fc.name + "  This file size greater than 10Mb"
        );
      } else {
        promises[promises.length] = new Promise((subres, subrej) => {
          const d = storage.ref(`ticket/${ticket.token}/${fc.name}`);
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
      if (ticket.files.length != 0) {
        storeFile = ticket.files.concat(e);
      } else {
        storeFile = e;
      }
      addUploadFile_ticket(
        { user: ticket.user_name, token: ticket.token },
        storeFile
      ).then((addedFile) => {
        res(addedFile);
      });
    });
  });
}
function addUploadFile_ticket(a, fileAr) {
  console.log(a,fileAr,"Syyy")
  return new Promise(async (res, rej) => {
    await db
      .collection("sotfwares")
      .doc("ticket_database")
      .collection("ticket_database_container")
      .doc(a.token)
      .update({
        files: fileAr,
      });

    res({ status: true });
  });
}

// schedule Ticket
async function scheduleTicketFirebase(sd_obj) {
  //   console.log(sd_obj);
  await ticketDB.doc(sd_obj.token).update({
    main_assignee_scheduled_On: sd_obj.schedule_date,
    main_assignee_status: "Pending",
  });
  const schedule_Date = await ticketDB.doc(sd_obj.token).get();
  //   console.log(schedule_Date);
  return { ...schedule_Date.data(), token: schedule_Date.id };
}

// complete ticket
async function completeTicketFirebase(token) {
  await ticketDB.doc(token).update({
    main_assignee_completed_on: new Date(),
  });
  const com_date = await ticketDB.doc(token).get();
  // console.log(com_date.data());
  return { ...com_date.data(), token: com_date.id };
}
// async function completeTicketFirebase(g) {
//   console.log(g);
//   var main_assignee_completed_on = [];
//   if (g.comD[0] == "empty") {
//     main_assignee_completed_on = [];
//   } else {
//     main_assignee_completed_on = g.comD;
//   }
//   var now = new Date();
//   main_assignee_completed_on.push({ status: "Completed", date: now });
//   console.log(main_assignee_completed_on);
//   await db
//     .collection("sotfwares")
//     .doc("task_database")
//     .collection("ticket_database_container")
//     .doc(g.token)
//     .update({
//       card_status: "Completed",
//       main_assignee_completed_on,
//       delay: "",
//     });
//   var comptask = await db
//     .collection("sotfwares")
//     .doc("task_database")
//     .collection("ticket_database_container")
//     .doc(g.token)
//     .get();
//   console.log(comptask);
//   var compresult = { ...comptask.data(), token: comptask.id };
//   console.log(compresult);
//   if (comptask.exists == true) {
//     console.log("Task completed successfully");
//     return {
//       status: true,
//       message: "Task completed successfully",
//       data: compresult,
//     };
//   } else {
//     console.log("Try Again");
//     return { status: false, message: "Try Again" };
//   }
// }
// remove Viewer
async function removeViewerFirebase(rmvw, token) {
  console.log(rmvw, token);
  if (rmvw.position == 1) {
    await ticketDB.doc(token).update({
      viewer1_name: "",
      viewer1_department: "",
    });
  } else if (rmvw.position == 2) {
    await ticketDB.doc(token).update({
      viewer2_name: "",
      viewer2_department: "",
    });
  } else if (rmvw.position == 3) {
    await ticketDB.doc(token).update({
      viewer1_name: "",
      viewer1_department: "",
      viewer2_name: "",
      viewer2_department: "",
    });
  }
  const rem_obj = await ticketDB.doc(token).get();
  //   console.log(rem_obj.data());
  return { ...rem_obj.data(), token: rem_obj.id };
}

// remove sub assignee
async function removeSubasgnFirebase(rmsb, token) {
  console.log(rmsb, token);
  if (rmsb.position == 1) {
    await ticketDB.doc(token).update({
      sub_assignee1_name: "",
      sub_assignee1_department: "",
    });
  } else if (rmsb.position == 2) {
    await ticketDB.doc(token).update({
      sub_assignee2_name: "",
      sub_assignee2_department: "",
    });
  } else if (rmsb.position == 3) {
    await ticketDB.doc(token).update({
      sub_assignee1_name: "",
      sub_assignee1_department: "",
      sub_assignee2_name: "",
      sub_assignee2_department: "",
    });
  }
  const remSA_obj = await ticketDB.doc(token).get();
  //   console.log(remSA_obj.data());
  return { ...remSA_obj.data(), token: remSA_obj.id };
}

// add sub asignee
async function addsubassgnFirebase(subobj, token) {
  console.log(subobj);

  if (subobj.position == 1) {
    await ticketDB.doc(token).update({
      sub_assignee1_name: subobj.addsubasgn1_name,
      sub_assignee1_department: subobj.addsubasgn1_dept,
    });
  } else if (subobj.position == 2) {
    await ticketDB.doc(token).update({
      sub_assignee1_name: subobj.subassgn1.addsubasgn1_name,
      sub_assignee1_department: subobj.subassgn1.addsubasgn1_dept,
      sub_assignee2_name: subobj.subassgn2.addsubasgn2_name,
      sub_assignee2_department: subobj.subassgn2.addsubasgn2_dept,
    });
  }
  const addSA = await ticketDB.doc(token).get();

  return { ...addSA.data(), token: addSA.id };
}

// onsnap mainassigne
async function mainassgnCheck(user) {
  return (cad = await ticketDB
    .where("main_assignee_name", "==", user)
    .onSnapshot((snap) => {
      // console.log(snap);
      // console.log(snap.docs);
      const change = snap.docChanges();
      // console.log(change);
      change.filter((d) => {
        // console.log(d);
        console.log(d.doc);
        const data = d.doc.data();
        const tdata = { ...data, token: d.doc.id };
        if (d.type == "added") {
          console.log(d.type, tdata);
          return tdata;
        } else if (d.type == "modified") {
          console.log(d.type, tdata);
          return tdata;
        } else if (d.type == "removed") {
          console.log(d.type, tdata);
          return tdata;
        }
      });
    }));
}
// mainassgnCheck("Sathyajith");

// onsnap subassgn
async function subassgnCheck(user) {
  return await ticketDB
    .where("sub_assignee1_name", "==", user)
    .onSnapshot((snap) => {
      // console.log(snap);
      // const y = snap.docs.forEach((d) => console.log(d.data()))

      // const y = snap.docs
      // console.log(y);
      const change = snap.docChanges();
      // console.log(change);
      change.filter((d) => {
        // console.log(d);
        const data = d.doc.data();
        const tdata = { ...data, token: d.doc.id, type: d.type };

        if (d.type == "added") {
          console.log(d.type, tdata);
          return tdata;
        } else if (d.type == "modified") {
          console.log(d.type, tdata);
          return tdata;
        } else if (d.type == "removed") {
          console.log(d.type, tdata);
          return tdata;
        }
      });
    });
}

/*
// var onsnap_ticketstore_obj = {};
// On snap for Viewer
// async function ticket_onsnap(user) {
//     console.log(user);
//     onsnap_ticketstore_obj = await ticketDB.where("viewer1_name", "==", user)
//         .onSnapshot((snap) => {
//             const change_new = snap.docChanges();
//             console.log(change_new);

//             const d = change_new.map((view_data) => {
//                 const store_viewer = view_data;
//                 // console.log(store_viewer.doc.data());

//                 const make_details = {
//                     ...store_viewer.doc.data(),
//                     token: store_viewer.doc.id,
//                 };
//                 return { s: store_viewer.type, data: make_details };
//             });
//             // console.log(d);// object with type

//             // settting boolean values
//             const added_data = d.every((cd) => {
//                 return cd.s == "added";
//             });
//             const modify_data = d.every((td) => {
//                 return td.s == "modified";
//             });
//             const remove_data = d.every((td) => {
//                 return td.s == "removed";
//             });
//             console.log(added_data, modify_data, remove_data, "ticv1");

//             if (added_data) {
//                 const card_values = d.map((cE) => {
//                     return cE.data;
//                 });
//                 const filter_value = card_values;
//                 console.log(filter_value);

//             } else if (modify_data) {
//                 const card_values = d.map((cE) => {
//                     return cE.data;
//                 });
//                 console.log(card_values);
//             } else if (remove_data) {
//                 d.filter((cE) => {
//                     const delData = cE.data;
//                 });
//                 console.log(card_values);
//             }
//         });

//     onsnap_ticketstore_obj.view2 = await ticketDB.where("viewer2_name", "==", user)
//         .onSnapshot((snap) => {
//             const change_new = snap.docChanges();
//             console.log(change_new);

//             const d = change_new.map((view_data) => {
//                 const store_viewer = view_data;
//                 // console.log(store_viewer.doc.data());

//                 const make_details = {
//                     ...store_viewer.doc.data(),
//                     token: store_viewer.doc.id,
//                 };
//                 return { s: store_viewer.type, data: make_details };
//             });
//             // console.log(d);// object with type

//             // settting boolean values
//             const added_data = d.every((cd) => {
//                 return cd.s == "added";
//             });
//             const modify_data = d.every((td) => {
//                 return td.s == "modified";
//             });
//             const remove_data = d.every((td) => {
//                 return td.s == "removed";
//             });
//             console.log(added_data, modify_data, remove_data, "ticv2");

//             if (added_data) {
//                 const card_values = d.map((cE) => {
//                     return cE.data;
//                 });
//                 const filter_value = card_values;
//                 console.log(filter_value);

//             } else if (modify_data) {
//                 const card_values = d.map((cE) => {
//                     return cE.data;
//                 });
//                 console.log(card_values);
//             } else if (remove_data) {
//                 d.filter((cE) => {
//                     const delData = cE.data;
//                 });
//                 console.log(card_values);
//             }
//         });

// }
*/

/*CARD FILTER FUNCTIONS START HERE*/
// Creator Card filter
function cardCreatorStatusCheck(ticStatus, user) {
  return new Promise(async (res, rej) => {
    let e = ticketDB.where("creator_name", "==", user);

    if (ticStatus.status == "Timeline") {
      
    } else if (ticStatus.status != "all") {
      e = e.where("card_status", "==", ticStatus.status);
    }
    const finalData = await e.get();
    const creat = finalData.docs.map((ld) => {
      // console.log(ld.data())
      // console.log(ld.id)
      return { ...ld.data(), token: ld.id };
    });
    res(creat);
  });
}

// Main Assignee card filter
function cardMainStatusCheck(tickStatus, user) {
  return new Promise(async (res, rej) => {
    let e = ticketDB.where("main_assignee_name", "==", user);
    if (tickStatus.status == "Timeline") {
    } else if (tickStatus.status != "all") {
      e = e.where("main_assignee_status", "==", tickStatus.status);
    }
    const finalData = await e.get();
    const main = finalData.docs.map((ld) => {
      // console.log(ld.data())
      return { ...ld.data(), token: ld.id };
    });
    res(main);
  });
}

/*// Viewer card
// async function cardViewerStatusCheck(tickStatus, user) {
//     let e = ticketDB.where("viewer1_name", "==", user)
//     let f = ticketDB.where("viewer2_name", "==", user)
//     let v1, v2;

//     await e.get().then(d => {
//         d.forEach(el => {
//             console.log(el.exists);
//             v1 = el.exists;
//         })
//     })
//     console.log(v1);
//     await f.get().then(d => {
//         d.forEach(el => {
//             console.log(el.exists);
//             v2 = el.exists;
//         })
//     })
//     console.log(v2);

//     if (v1) {
//         if (tickStatus.status == "Timeline") {

//         } else if (tickStatus.status != "all") {
//             e = e.where("card_status", "==", tickStatus.status)
//         }
//         const finalData = await e.get()
//         const me = finalData.docs.filter((ld) => {
//             console.log(ld.data())
//             return ld.data();
//         })
//     }

//     if (v2) {
//         if (tickStatus.status == "Timeline") {

//         } else if (tickStatus.status != "all") {
//             f = f.where("card_status", "==", tickStatus.status)
//         }
//         const finalData = await f.get()
//         const me = finalData.docs.filter((ld) => {
//             console.log(ld.data())
//             return ld.data();
//         })
//     }
// }*/

// Viewer card filter
function cardViewerStatusCheck(tickStatus, user) {
  return new Promise(async (res, rej) => {
    const promises = [];

    // let newArr = [];
    const arr = ["viewer1_name", "viewer2_name"];

    let allvw = arr.map(async (val) => {
      promises[promises.length] = new Promise(async (vwres, vwrej) => {
        let query = ticketDB.where(val, "==", user);

        if (tickStatus.status == "Timeline") {
        } else if (tickStatus.status != "all") {
          query = query.where("card_status", "==", tickStatus.status);
        }
        const finalData = await query.get();
        const com = finalData.docs.map((ld) => {
          return { ...ld.data(), token: ld.id };
        });
        vwres(com);
      });
    });
    // console.log(newArr);
    // console.log(allvw);
    // res(newArr);
    Promise.all(promises).then((d) => {
      console.log(d);
      const ticketvw = d[0].concat(d[1]);
      console.log(ticketvw);
      res(ticketvw);
    });
  });
}

// dummy checker
// const vo = ticketDB.where("viewer2_name", "==", "Sathyajith").get();
// console.log(vo);
// vo.then(d => {
//     console.log(d.docs);
//     d.docs.forEach(lo => console.log(lo.data()))
// })

function cardSubAssgnStatusCheck(tickStatus, user) {
  return new Promise(async (res, rej) => {
    const promises = [];
    // let newArr = [];
    const arr = ["sub_assignee1_name", "sub_assignee2_name"];

    let allsub = arr.map((val) => {
      promises[promises.length] = new Promise(async (subres, subrej) => {
        let query = ticketDB.where(val, "==", user);

        if (tickStatus.status == "Timeline") {
        } else if (tickStatus.status != "all") {
          if (val == "sub_assignee1_name") {
            query = query.where(
              "sub_assignee1_status",
              "==",
              tickStatus.status
            );
          } else if (val == "sub_assignee2_name") {
            query = query.where(
              "sub_assignee2_status",
              "==",
              tickStatus.status
            );
          }
        }
        const finalData = await query.get();
        const tickData = finalData.docs.map((ld) => {
          return { ...ld.data(), token: ld.id };
        });
        subres(tickData);
      });
    });

    // console.log(newArr);
    // console.log(allvw);
    Promise.all(promises).then((d) => {
      const ticketee = d[0].concat(d[1]);
      res(ticketee);
    });
  });
}

function modifyticketIcon(token) {
  return new Promise(async (res, rej) => {
    const ticketCollection = await ticketDB.doc(token).get();
    // console.log(ticketCollection);
    if (ticketCollection.exists == false) {
      res({ status: false });
    } else {
      const value = await {
        ...ticketCollection.data(),
        token: ticketCollection.id,
      };
      res({ status: true, data: value });
    }
  });
}