// function makeTaskCard(taskData,tab){
//     let create_date = taskData.created_on.toDate();
//     create_date = new Date(create_date).toDateString();
 
//     let schedule_date;
//     if(taskData.card_status != "Scheduling"){
//         schedule_date = taskData.scheduled_On.toDate();
//         schedule_date = new Date(schedule_date).toDateString();
//     }
//     let extend_date;
//     if(taskData.card_status == "Approved"){
//         extend_date = new Date(taskData.extended_on[taskData.extended_on.length - 1].date.toDate()).toDateString();
//     }
    
//     let completed_date;
//     if(taskData.card_status == "Completed"){
//         completed_date = new Date(taskData.completed_on[taskData.completed_on.length - 1].date.toDate()).toDateString()
//     }

//    let sub_s = taskData.sub_status;
   
   
//    let noOfEx = false;
//    if(taskData.extended_on[0] != "empty"){
//     noOfEx = taskData.extended_on.length;
//    }

//    let delayBg = false;
//    if(taskData.delay != ""){
//     delayBg = "Delayed Task"
//    }

//     let chat = false;
//     let task= false;
//     chat = notification_data_ar.some((eR)=>{return eR.icon == 'Chat' && eR.doc_id == taskData.token});
//     task = notification_data_ar.some((eR)=>{return eR.icon != 'Chat' && eR.doc_id == taskData.token});

//    var task_card = ` <li class=" card-box mb-2   border-bottom card_template_main" data-card-container-${tab}="${taskData.token}" >
//   <div class="d-flex align-items-center justify-content-between"> <div class="name-avatar d-flex align-items-center ml-2">
//   <div>
//        <div>
//            <div  data-modify="${taskData.token}" data-tab="${tab}" data-card-owner="${taskData.user_name}">
//                <span class="menu_tag_class" onclick="task_menu_icons(this)" data-modify="${taskData.token}" data-tab="${tab}" data-card-owner="${taskData.user_name}" >
//                <i class="dw dw-down-arrow-4"></i>`;
//                    if(task == true){
//                     task_card +=  `<div class="red_dt_cls" style="transform: translate(15px, -20px);"></div>`
//                    }else{
//                     task_card +=  `<div class="red_dt_cls d-none" style="transform: translate(15px, -20px);"></div>`
//                    }
//       task_card +=  `</span>
              
//            </div>
//        </div>
//        <div class="cta flex-shrink-0 mx-3 chat_menu_cls" data-modify="Chat" data-chat-token="${taskData.token}"  >`;
//            if(chat == true){
//             task_card +=  `<div class="red_dt_cls bg-success" style="transform: translate(0px, -20px);"></div>`
//            }else{
//             task_card +=  `<div class="red_dt_cls d-none bg-success" style="transform: translate(0px, -20px);"></div>`
//            }
//      task_card += `</div>
//       </div>
//        <div class="txt">
//            <div>
//                <span class="badge badge-pill badge ${taskData.card_status.toLowerCase().replaceAll(" ","_")}_badge_cls" style=" background-color: rgb(231, 235, 245);">${taskData.card_status}</span>
//                <span class="badge badge-pill badge ${taskData.card_type.toLowerCase().replaceAll(" ","_")}_badge_cls mx-1" style=" background-color: rgb(231, 235, 245);">${taskData.card_type}</span>`;
//             //    if(taskData.badge != ""){
//             //     task_card +=`<span class="badge badge-pill badge text-danger new_badge_tag" style=" background-color: rgb(231, 235, 245);">New</span>`
//             //    }

//                if(tab == "managing" || tab == "approval" || tab == "manage"){
//                 task_card +=`<span class="badge badge-pill badge text-dark ml-1" style=" background-color: rgb(231, 235, 245);">${taskData.user_name}</span>`
//                }
//                if(sub_s ==  'Rejected'){
//                 task_card +=`<span class="badge badge-pill badge text-danger ml-1" style=" background-color: rgb(231, 235, 245);">${sub_s}</span>`
//                }
//                if(delayBg != false){
//                 task_card +=`<span class="badge badge-pill badge text-danger ml-1" style=" background-color: rgb(231, 235, 245);">${delayBg}</span>`
//                }
//                if(noOfEx !=  false){
//                 task_card +=`<span class="badge badge-pill badge text-danger ml-1" style=" background-color: rgb(231, 235, 245);">No.of.extension ${noOfEx}</span>`
//                }
//                task_card += `</div>
//            <div class=" weight-600 card_info_text my-1">${taskData.task_description}</div>`;
//            if(taskData.card_status == 'Scheduling'){
//              task_card += `<div class="font-12 weight-500 card_schedule_date"  style="color: rgb(79 78 82);">
//                                  <span><span><b class="text-success">Created Date</b> :${create_date}</span></span>
//                          </div>`;
//            }else if(taskData.card_status == "Approved"){
//             task_card +=  `<div class="font-12 weight-500 card_schedule_date"  style="color: rgb(79 78 82);">
//                          <span><span><b class="text-success">Extended Date</b> : ${extend_date}</span></span>
//                  </div>`;
//            }else if(taskData.card_status == "Completed"){
//             task_card +=  `<div class="font-12 weight-500 card_schedule_date"  style="color: rgb(79 78 82);">
//                          <span><span><b class="text-success">Completed Date</b> : ${completed_date}</span></span>
//                  </div>`;
//            }else{
//             task_card +=  `<div class="font-12 weight-500 card_schedule_date"  style="color: rgb(79 78 82);">
//                          <span><span><b class="text-success">Scheduled Date</b> : ${schedule_date}</span></span>
//                  </div>`;
//            }
//            task_card += `</div>
//    </div>

//    </div>
//    <div class="options_append_tab"></div>
// </li>`

// return task_card;
// }