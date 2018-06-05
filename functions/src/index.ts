import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

admin.initializeApp();


interface User {
    github: string;
}
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

interface DBObjects {
    [key: string]: User
}


export const users = functions.https.onRequest((request, response) => {
    const ref = admin.database().ref('users');
    ref.on("value", (snapshot) => {
        const db: DBObjects = snapshot.toJSON() as DBObjects;
        const signedUsers = Object.keys(db).map(a => db[a]).map(u => u.github)
        response.send(signedUsers);
     }, function (errorObject) {
        response.status(500);
        response.send({
            errorObject,
        });
        
        response.send
     });
     
});
