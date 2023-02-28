var ticketDB = db.collection("sotfwares")
    .doc("ticket_database")
    .collection("ticket_database_container")


// add ticket function
async function addticketFirebase(n, s) {
    // console.log(n);
    // console.log(s);

    var ticket = await db
        .collection("sotfwares")
        .doc("ticket_database")
        .collection("ticket_database_container")
        .add({
            created_on: new Date(),
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

        }).then(res => res.get())
    // console.log(ticket);


    const ticketData = ticket.data();
    console.log(ticketData.card_status);
    console.log(ticketData.created_on);
    return (ticketData);
}

function editTicketFirebase(nw_ticket, token, user) {
    console.log(nw_ticket);
    const x = ticketDB.doc(token).update({
        ticket_information: nw_ticket
    })
    console.log(x);
}

// function editTicketFirebase(g) {
//     return new Promise(async (res, rej) => {
//       await db
//         .collection("sotfwares")
//         .doc("ticket_database")
//         .collection(g.user)
//         .doc(g.token)
//         .update({
//             ticket_information: g.newTicket,
//         });
//       const eT = await db
//         .collection("sotfwares")
//         .doc("task_database")
//         .collection(g.user)
//         .doc(g.token)
//         .get();
//       res({ status: true, data: { ...eT.data(), token: eT.id } });
//     });
//   }

// function deleteTicketFirebase(token) {
//     console.log(token);
//     const x = ticketDB.doc(token).delete()
//     console.log(x);
// }

async function deleteTicketFirebase(d) {
  await db
    .collection("sotfwares")
    .doc("ticket_database")
    .collection(d.ticket_database_container)
    .doc(d.token)
    .delete();
}




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

function scheduleTicketFirebase(newdate, token) {
    console.log(newdate, token);
    const schedule_Date = ticketDB.doc(token).update({
        main_assignee_scheduled_On: new Date(newdate),
        main_assignee_status: "Pending",
    })
    console.log(schedule_Date);
}

function completeTicketFirebase(token) {
    const com = ticketDB.doc(token).update({
        main_assignee_completed_on: new Date(),
    })
    console.log(com);
}

function removeViewerFirebase(rmvw, token) {
    console.log(rmvw, token);
    if (rmvw.position == 1) {
        ticketDB.doc(token).update({
            viewer1_name: "",
            viewer1_department: "",
        })
    } else if (rmvw.position == 2) {
        ticketDB.doc(token).update({
            viewer2_name: "",
            viewer2_department: "",
        })
    } else if (rmvw.position == 3) {
        ticketDB.doc(token).update({
            viewer1_name: "",
            viewer1_department: "",
            viewer2_name: "",
            viewer2_department: "",
        })
    }
}


function removeSubasgnFirebase(rmvw, token) {
    console.log(rmvw, token);
    if (rmvw.position == 1) {
        ticketDB.doc(token).update({
            viewer1_name: "",
            viewer1_department: "",
        })
    } else if (rmvw.position == 2) {
        ticketDB.doc(token).update({
            viewer2_name: "",
            viewer2_department: "",
        })
    } else if (rmvw.position == 3) {
        ticketDB.doc(token).update({
            viewer1_name: "",
            viewer1_department: "",
            viewer2_name: "",
            viewer2_department: "",
        })
    }
}

async function addsubassgnFirebase(subobj) {
    console.log(subobj);
    const token = "tFO2BWSMHbgvriWcv9nG";
    // const tdata = await ticketDB.doc("tFO2BWSMHbgvriWcv9nG").get().then((d) => d.data())
    // console.log(tdata);

    if (subobj.position == 1) {
        ticketDB.doc(token).update({
            sub_assignee1_name: subobj.addsubasgn1_name,
            sub_assignee1_department: subobj.addsubasgn1_dept,
        })
    } else if (subobj.position == 2) {
        ticketDB.doc(token).update({
            sub_assignee1_name: subobj.subassgn1.addsubasgn1_name,
            sub_assignee1_department: subobj.subassgn1.addsubasgn1_dept,
            sub_assignee2_name: subobj.subassgn2.addsubasgn2_name,
            sub_assignee2_department: subobj.subassgn2.addsubasgn2_dept,
        })
    }

}


async function mainassgnCheck(user) {

    return (cad = await ticketDB.where("main_assignee_name", "==", user)
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
                   return tdata;
                    console.log(d.type, tdata);
                }
                else if (d.type == "modified") {
                    return tdata;
                    console.log(d.type, tdata);
                }
                else if (d.type == "removed") {
                    return tdata;
                    console.log(d.type, tdata);
                }
            })
        }))

}
mainassgnCheck("Sathyajith");

//
// async function cardCreatorStatusChecker(ticStatus, user) {

//     let e = ticketDB.where("creator_name", "==", user)

//     if (ticStatus.status == "Timeline") {

//     } else if (ticStatus.status != "all") {
//         e = e.where("card_status", "==", ticStatus.status)
//     }
//     const finalData = await e.get()
//     const me = finalData.docs.filter((ld) => {
//         console.log(ld.data())
//         return ld.data();
//     })
//     return me;
// }
// const y = cardCreatorStatusChecker({ status: "Scheduling" }, "sathyajith N B");

// console.log(y
//     );
// Creator Card filter
function cardCreatorStatusCheck(ticStatus, user) {
    return new Promise(async (res, rej) => {
        let e = ticketDB.where("creator_name", "==", user)

        if (ticStatus.status == "Timeline") {


        } else if (ticStatus.status != "all") {
            e = e.where("card_status", "==", ticStatus.status)
        }
        const finalData = await e.get()
        const creat = finalData.docs.map((ld) => {
            // console.log(ld.data())
            // console.log(ld.id)
            return { ...ld.data(), token: ld.id };
        })
        res(creat);
    })
}




function cardMainStatusCheck(tickStatus, user) {
    return new Promise(async (res, rej) => {
        let e = ticketDB.where("main_assignee_name", "==", user)
        if (tickStatus.status == "Timeline") {


        } else if (tickStatus.status != "all") {
            e = e.where("main_assignee_status", "==", tickStatus.status)
        }
        const finalData = await e.get()
        const main = finalData.docs.map((ld) => {
            // console.log(ld.data())
            return { ...ld.data(), token: ld.id };
        })
        res(main);
    })
}
