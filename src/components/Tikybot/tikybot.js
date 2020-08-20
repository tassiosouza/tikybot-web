const USER_CREDENTIALS = 'tiktok-credentials'

export default class Tikybot {

    constructor(firebase) {
        this.firebase = firebase;
        this.currentUser = [];
    }

    addCredentials = (tiktok, password) => {
        this.currentUser.tiktok = tiktok;
        this.currentUser.password = password;

        return this.firebase.getCurrentUser().child(USER_CREDENTIALS)
        .set({tiktok, password});
    }
}