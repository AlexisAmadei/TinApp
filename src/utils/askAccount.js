import { addDoc, collection } from 'firebase/firestore';
import { db } from '../.config/firebaseConfig';

export default async function askAccountCreate(email) {
    const usersRef = collection(db, 'awaitingUsers');
    const querySnapshot = await addDoc(usersRef, {
        email: email,
        askDate: new Date()
    })
    return querySnapshot;
}