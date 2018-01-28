import * as firebase from 'firebase';
import { CONFIG } from '../../CONFIG';

export const firebaseApp = firebase.initializeApp({
  apiKey: CONFIG.apiKey,
  authDomain: CONFIG.authDomain,
  databaseURL: CONFIG.databaseURL,
  projectId: CONFIG.projectId,
  storageBucket: CONFIG.storageBucket,
  messagingSenderId: CONFIG.messagingSenderId,
});

export const dbRef = firebaseApp.database().ref(CONFIG.dataBase);
export const auth = firebaseApp.auth();

export default firebase;
