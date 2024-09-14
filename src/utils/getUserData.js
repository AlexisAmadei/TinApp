import { doc, getDoc } from "firebase/firestore";
import { db } from "../.config/firebaseConfig";

async function getUserData(userAuth) {
    const userRef = doc(db, "users", userAuth.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
        return userDoc.data();
    } else {
        return null;
    }
}

export default getUserData;