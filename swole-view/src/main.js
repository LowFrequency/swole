import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import { firebaseMessaging } from './config/firebase';
import './registerServiceWorker';
import './assets/main.css';
import Vue3TouchEvents from "vue3-touch-events";

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

const app = createApp(App);

app.use(router);
app.use(store);
app.use(Vue3TouchEvents);
app.mount('#app');