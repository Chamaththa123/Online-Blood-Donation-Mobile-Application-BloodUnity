import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyCIEKcaDICQ6yPWF2qwpqiDy7gk55pTSpA",
    authDomain: "blooddonation-15d06.firebaseapp.com",
    projectId: "blooddonation-15d06",
    storageBucket: "blooddonation-15d06.appspot.com",
    messagingSenderId: "512295152517",
    appId: "1:512295152517:web:ba7ce1de35429fc5ee32ec"
  };

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);