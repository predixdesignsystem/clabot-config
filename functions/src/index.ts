import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

admin.initializeApp();

export const contributor = functions.https.onRequest(async (request, response) => {
    let isContributor: boolean = false
    const contributorID = request.query.checkContributor || ''
    if(contributorID ===undefined || contributorID===''){
        response.send({isContributor});
        return;
    }
    console.log(`Checking the Contributor ${contributorID}`)
    await admin
        .database().ref('users')
        .orderByChild('github')
        .equalTo(contributorID)
        .once("value", (snapshot) => {
            isContributor = snapshot.exists()
            response.send({isContributor});
        }, function (errorObject) {
            response.send({isContributor});
        });
});
