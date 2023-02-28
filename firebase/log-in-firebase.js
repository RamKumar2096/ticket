// connnecting my CDN code from firebase
const webapp = firebase.initializeApp({
    apiKey: "AIzaSyC2zOtfXmU2ZRS88GVfVf-i9EV214Gk7WY",
    authDomain: "working-on-ticket.firebaseapp.com",
    projectId: "working-on-ticket",
    storageBucket: "working-on-ticket.appspot.com",
    messagingSenderId: "1044551955464",
    appId: "1:1044551955464:web:017c34f77eba9171b54dbd"
  });

// firestore servise
var db = firebase.firestore();





// user login funtion
function loginchek(log) {
    return new Promise(async (res, rej) => {
        var matchKey;
        var code = await db.collection("employee_database").doc("employee_list").collection("Namelist")
            .where('emp_code', "==", log.user).get();
        var mail = await db.collection("employee_database").doc("employee_list").collection("Namelist")
            .where('mail_id', "==", log.user).get();
        if (code.size == 0 && mail.size == 0) res({ status: false, message: "Please check the employee code/mail" })
        if (code.size != 0) {
            matchKey = 'emp_code'
        } else {
            matchKey = 'mail_id'
        }
        const getUser = await db.collection("employee_database").doc("employee_list").collection("Namelist")
            .where(matchKey, "==", log.user)
            .where("password", "==", log.pass)
            .get();
        if (getUser.size == 0) return  res({ status: false, message: "Please check password" });
        const useData = getUser.docs[0].data();
         res({ status: true, data: useData })
    })

}




 // user forget pass funtions 

async function forgotPassword(log) {
    const credential = await db.collection("employee_database").doc("employee_list").collection("Namelist")
        .where('mail_id', "==", log.email)
        .where('emp_code', "==", log.code)
        .get();
    if (credential.size == 0) return { status: false, message: "Email/employee code Invalid" };
    var ds = credential.docs[0].data();
    var pass = ds.Password;
    var user = ds.employee;
    return { status: true, message: "Kindly check Your mail to retrieve Your password", data: ds }
}
