import firebase from 'firebase';


const addUploadPhoto = () => {
const config = {
  apiKey: "<API_KEY>",
  authDomain: "<PROJECT_ID>.firebaseapp.com",
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
  storageBucket: "<BUCKET>.appspot.com",
  };
  firebase.initializeApp(config);
} 

 export default addUploadPhoto;