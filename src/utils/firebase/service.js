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
            posts.push(doc.data())
        });
    })
    console.log('posts = ', posts)
    return posts
}

const GetUsers = async () => {

     const users = []  
    await firebase.firestore().collection('registeredUsers').get().then(snapshot => {
         snapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            users.push(doc.data())
        });
    })
    console.log('users = ', users)
    return users
}

const SavePost = async (postTxt) => {
   console.log('uuid = ', );
   const userDetails = GetLocalStorage('userDetails');
    const postData  = {
        postID: uuidv4(),
        postTxt: postTxt,
        postBy: userDetails.displaName || userDetails.email.split('@')[0]
    }
    const savePostToDB =  await firebase.firestore().collection('savedPosts').add(postData)
//    then(snapshot => {
//         snapshot.forEach((doc) => {
//            // doc.data() is never undefined for query doc snapshots
//            // console.log(doc.id, " => ", doc.data());
//            users.push(doc.data())
//        });
//    })
   console.log('savePostToDB = ', savePostToDB)
//    return savePostToDB
    if(savePostToDB) {
        return postData
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
    SavePost
    }