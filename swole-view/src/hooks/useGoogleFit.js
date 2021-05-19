import { ref } from "vue";
import { getCurrentInstance } from 'vue'

const auth = ref("");

export const useGoogleFit = () => {

    const root = getCurrentInstance();

    const connect = async () => {
        try {
            const gapi = await root.appContext.config.globalProperties.$gapi.getGapiClient();
            console.log({ gapi })
            const GoogleAuth = gapi.auth2.getAuthInstance();
            GoogleAuth.signIn();

            // gapi.sheets.spreadsheet.get(...)
            // ...
        } catch (err) {
            console.log({ err });
        }
    }

    const sendData = ({ route = '/' } = {}) => {
        console.log({ auth })
        console.log({ route })
    }

    return {
        connect,
        sendData,
    };
}