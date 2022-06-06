import { getFirebaseConfig, checkActiveUser } from "../../firebase/firebaseInit.js";


// Eto maaccess mo ung mga firebase elements
const firebase = getFirebaseConfig();
// Eto ung top node sa firebase
const node = "/MoodEntry";

/**
 * @description Collect Mood Entries
 */
export async function collectMoodEntries() {
    const user = await checkActiveUser();
    const reference = await firebase.ref(firebase.database, 'users/' + user.uid + node);
    const snapshot = await firebase.get(reference);

    console.log('users/' + user.uid + node)
    // Pag may MoodEntry na ung user
    if (snapshot.exists()) { 
        snapshot.forEach(dataSnapshot => {
            console.log(dataSnapshot)
        })
    }

    // Wala pang mood entry ung user
    if (!snapshot.exists()) {
        return null;
    }

}

// Ayan eto yung function na nagwowork para magadd ng data sa database
export async function addMoodEntry(date, time, moodLevel) {
    const user = await checkActiveUser(); // Eto kinukuha yung user data
    const reference = firebase.ref(firebase.database, 'users/' + user.uid + node);
    const newPostRef = await firebase.push(reference);
    const postID = newPostRef.key;

    // Ask mo lang me kung may magulong part
    // Yan nalang for now ahahaha
    
    return firebase.set(newPostRef, {
                date: date,
                time: time,
                moodLevel: moodLevel,
                postID: postID
            });
}

