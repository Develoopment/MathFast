// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
import {getDatabase, ref, push, get} from "firebase/database"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCy3I5JGfIt2XlgrTYh0CEXT5fneVae-s",
  authDomain: "launchmathapp.firebaseapp.com",
  projectId: "launchmathapp",
  storageBucket: "launchmathapp.firebasestorage.app",
  messagingSenderId: "585567978742",
  appId: "1:585567978742:web:2aea71c6084a16dff518d7",
  measurementId: "G-CY4D0DN9Y3",

  databaseURL:"https://launchmathapp-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase()

const writeScores = (userName, score) => {
    push(ref(db, 'Scores'), {
        name: userName,
        score: score
    })
}
const fetchScores = async () => {
    
    try{
        const data = await get(ref(db, "Scores"));

        if (data.exists()) {
            const scores = data.val();
            let cleanedScores = []

            // the scores are outputed as a object like this:
            //{ "someid1":{name: "CHK", score: "4.02"}, "someid2":{...}, "someid3":{...} }
            //so by using the cleanedScores array, I'm extracting just the name score objects and putting them into an array
            //this simplifies rendering on the frontend component
            Object.keys(scores).map((key, index) => {
                cleanedScores.push(scores[key]);
            })

            // sorts the array with the lowest time scores on the top
            cleanedScores.sort((a, b)=>{return a.score - b.score})
            
            return cleanedScores;
        }else{
            console.log('Data unaviable')
        }

    }catch (error){
        console.log(error)
    }
    
}

export{
    fetchScores,
    writeScores
}