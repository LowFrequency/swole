import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
//import { firebaseMessaging } from './config/firebase';
import './registerServiceWorker';
import './assets/main.css';
import Vue3TouchEvents from "vue3-touch-events";
import VueGapi from 'vue-gapi'

/*
firebaseMessaging.getToken({ vapidKey: "BN6l0qsKOKEPADIpRiOKc257brfFzGwR2Qw3g3kgPEb8KCNKntox7UfnAy8vnYIiINxo1J46OTDpwyr9THITkDw" }).then((currentToken) => {
    if (currentToken) {
        // Send the token to your server and update the UI if necessary
        console.log(currentToken);
    } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
});
*/

const app = createApp(App);

app.use(router);
app.use(store);
app.use(Vue3TouchEvents);
app.use(VueGapi, {
    apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
    clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/fitness/v1/rest'],
    scope: 'https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.activity.write',
});
app.mount('#app');