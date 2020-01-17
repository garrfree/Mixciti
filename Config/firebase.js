
import firebase from 'firebase'
import '@firebase/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyBG50TJsYPigJpiQEUuNYdTkF6t2EcY0Jk",
    authDomain: "emixer-47f73.firebaseapp.com",
    databaseURL: "https://emixer-47f73.firebaseio.com",
    projectId: "emixer-47f73",
    storageBucket: "emixer-47f73.appspot.com",
    messagingSenderId: "914484872356",
    appId: "1:914484872356:web:4a4bd75301dbf769181231",
    measurementId: "G-JRQ3C4TVZ9"
  };


 firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
var auth = firebase.auth();

function Facebooklogin(token) {
    const credential = firebase.auth.FacebookAuthProvider.credential(token);

    // Sign in with credential from the Facebook user.
    return firebase.auth().signInWithCredential(credential);
}

function register(email, password, name,category,location,status) {
    
    return new Promise((resolve, reject) => {
        return auth.createUserWithEmailAndPassword(email, password).then((res) => {
            db.collection("users").doc(res.user.uid).set({ id:res.user.uid,name,location, password,email,category,status,createdAt: Date.now() }).then((user) => {
                console.log("User Registered Successfull!", res.user.uid);
                //   alert("Successfully Created New User!");
                resolve("Registerd Successfully!")
            }).catch(e => {
                //   alert(e.message);
                console.log("Error in Database ==>", e.message);
                reject({ message: e.message });
            })
        }).catch(e => {
            console.log("Error in Registration==>", e.message);
            reject({ message: e.message });
        })
    })
}
function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
    
}

function getAllUsers() {
    return new Promise((resolve, reject) => {
      db.collection("users").get().then(snapshot => {
            const users = [];

             snapshot.forEach(elem => {
                console.log("email.id==>", elem.name)
                if (elem.data().email)
                    users.push({ name: elem.data().name, email: elem.data().email, status: elem.data().status,category:elem.data().category,location:elem.data().location ,id: elem.id,})
            })
            console.log("users==>", users.name);
            resolve(users)
        })
    })
}




function createRoom(friendId) {

    const userId = firebase.auth().currentUser.uid;
    let chatExists = false;

    return new Promise((resolve, reject) => {

        db.collection("chatrooms")
            .where('users.' + userId, "==", true)
            .where('users.' + friendId, "==", true)
            .get().then(snapshot => {

                snapshot.forEach(elem => {
                    chatExists = { data: elem.data(), id: elem.id }
                })
                console.log("Chat Exists==>", chatExists)
                if (!chatExists) {
                    const obj = {
                        createdAt: Date.now(),
                        users: {
                            [friendId]: true,
                            [firebase.auth().currentUser.uid]: true
                        }
                    }
                    db.collection("chatrooms").add(obj).then(snapshot => {
                        resolve({ data: obj, id: snapshot.id });
                    })
                }
                else {
                    resolve(chatExists);
                }
            })
    })
}
function sendMessageToDb(roomId, message) {
    const sender = firebase.auth().currentUser.uid;
    let timestamp =Date.now()
    // let today = new Date()
    // let timestamp = today.getHours() + ":" + today.getMinutes() + ',' + today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    const obj = {
        timestamp,
        Isread:"No",
        message,
        userId: sender,
        type:'text'
    }
    return db.collection("chatrooms").doc(roomId).collection("messages").add(obj);
}

export {
    register,
    login,
    getAllUsers,
    Facebooklogin,
    createRoom,
    sendMessageToDb
}
export default firebase;


