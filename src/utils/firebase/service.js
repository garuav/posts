import firebase from 'firebase';
import { FIREBASEREFS } from '../common/common.constant'
import { v4 as uuidv4 } from 'uuid';

const SetLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

const GetLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

const GeneratePushNotification =  async () => {
    // Notification.requestPermission().then(res => {
        // messaging.usePublicVapidKey(FIREBASEREFS.WEBPushCertificate);
       return firebase.messaging().getToken({vapidKey: FIREBASEREFS.WEBPushCertificate})
    // }).catch(error => {
    //     console.log('error on permission = ',error)
    // });
}

const LoginUser = async ({email, password}) => {
    console.log('userData = ',email, ' password = ', password)
  const loginUser =  await firebase.auth().signInWithEmailAndPassword(email, password)
  console.log('loginUser = ', loginUser);
  if(loginUser && loginUser.user) {
    const userData = {
        email: loginUser.user.email,
        displaName: loginUser.user.displayName,
        UID: loginUser.user.uid,
        token: GetLocalStorage('device_token') || ''
    }
    SetLocalStorage('userDetails', userData)
  }
}

const RegisterUser = async ({email, password}) => {
    console.log('userData = ',email, ' password = ', password)
      const createUser = await  firebase.auth().createUserWithEmailAndPassword(email, password)
       console.log('createUser = ', createUser);
       if(createUser && createUser.additionalUserInfo.isNewUser) {
       const userData = {
                        email: createUser.user.email,
                        displaName: createUser.user.displayName,
                        UID: createUser.user.uid,
                        token: GetLocalStorage('device_token') || ''
                    }
                    SetLocalStorage('userDetails', userData)
       const saveUserToDB = await firebase.firestore().collection('registeredUsers').add(userData)
       console.log('saveUserToDB = ',saveUserToDB)
       if(saveUserToDB) {
           return saveUserToDB
       }
    }
}

// Get Post

const GetPosts = async () => {
    const posts = []  
    await firebase.firestore().collection('savedPosts').get().then(snapshot => {
         snapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            posts.push({...doc.data() , docID: doc.id, replyTxtValue: ''})
        });
    })
    return posts
}

const GetUsers = async () => {

     const users = []  
    await firebase.firestore().collection('registeredUsers').get().then(snapshot => {
         snapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            users.push({...doc.data(), docID: doc.id})
        });
    })
    return users
}

const SavePost = async (postTxt) => {
   const userDetails = GetLocalStorage('userDetails');
    const postData  = {
        postID: uuidv4(),
        postTxt: postTxt,
        postBy: userDetails.displaName || userDetails.email.split('@')[0],
        createdDate: new Date().toLocaleString(),
        reply: []
    }
    const savePostToDB =  await firebase.firestore().collection('savedPosts').add(postData)
    if(savePostToDB) {
        return {...postData, docID: savePostToDB.id}
    }
}

const SaveReplyINPost = async (docID, replyTxt) => {
    console.log('docID = ', docID);
    const userDetails = GetLocalStorage('userDetails');
    const replyData  = {
        replyID: uuidv4(),
        replyTxt: replyTxt,
        replyBy: userDetails.displaName || userDetails.email.split('@')[0],
        replyTime: new Date().toLocaleString()
    }
     
     try  {
          await firebase.firestore().collection('savedPosts').doc(docID).update({
            reply: firebase.firestore.FieldValue.arrayUnion(replyData)
        })
        return replyData
     } catch (error) {

     }
 }

 const SendNotification = async (payloadData) => {
    const userDetails = GetLocalStorage('userDetails');
    const payload = {
        registration_ids: [payloadData.token],
        data: {
          title: payloadData.title,
          body: payloadData.body,
          object_id: Math.round(Math.random() * (99999 - 0 + 1)) + 0,
          icon: '../../favicon.ico',
          objectType: payloadData.objectType,
          UID: userDetails.UID,
        //   registration_token: data.registration_token || '',
          dateTime: new Date()
        },
        content_available: true
    }
    try {
       const notificationResponse =  await fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'post',
            headers: {'Content-Type':'application/json' ,  'Authorization': `key=${FIREBASEREFS.serverKey}`},
               body: JSON.stringify({...payload})
           }).then(res => res.json())
         console.log('notificationResponse = ',notificationResponse)
         if(notificationResponse && notificationResponse.success) {
            //  SaveMessageToDB()
            // const messageData = {
            //     senderUID: userDetails.UID,
            //     receiverUID: payloadData.UID,
            //     dateTime: payload.data.dateTime,
            //     message: payload.data.body,
            //     chatID: uuidv4()
            // }
            // const chatMessageResponse =   await firebase.firestore().collection('chatMessages').add({})
            // console.log('chatMessageResponse = ',chatMessageResponse)
            // if(payloadData.docID) {
            //     const chatMessageResponse =   await firebase.firestore().collection('chatMessages').doc(payloadData.docID).add(messageData)
            //     console.log('chatMessageResponse = ',chatMessageResponse)
            // } else {
            //     const chatMessageResponse =   await firebase.firestore().collection('chatMessages').add(messageData)
            //     const chatMessageResponse =   await firebase.firestore().collection('chatMessages').doc(payloadData.docID).add(messageData)
            //     console.log('chatMessageResponse = ',chatMessageResponse)
            //     console.log('chatMessageResponse = ',chatMessageResponse)
            // }
          
         }

     } catch (err) {
         console.log('error = ',err)
     }
    }
   
const DeletePosts = async (docID) => {
        try {
          const deletePost =   await firebase.firestore().collection('savedPosts').doc(docID).get();
          console.log('delete  Post = ', deletePost)
         await deletePost.ref.delete()
         return deletePost.ref
          
        }catch(err) {
            console.log(err)
        }
    }

export {
    LoginUser,
    RegisterUser,
    SetLocalStorage,
    GetLocalStorage,
    GeneratePushNotification,
    GetUsers,
    GetPosts,
    SavePost,
    SaveReplyINPost,
    SendNotification,
    DeletePosts
    }