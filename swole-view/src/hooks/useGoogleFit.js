import { ref } from "vue";
import { getCurrentInstance } from "vue";

const accessToken = ref("");
const googleUser = ref("");

export const useGoogleFit = () => {

    const root = getCurrentInstance();

    const connect = async () => {
        try {
            const gapi = await root.appContext.config.globalProperties.$gapi.getGapiClient();
            const GoogleAuth = gapi.auth2.getAuthInstance();
            var user = GoogleAuth.currentUser.get();
            console.log({ user });
            var isAuthorized = user.hasGrantedScopes('https://www.googleapis.com/auth/fitness.activity.write');
            if (!isAuthorized) {
                const response = GoogleAuth.signIn();
                console.log({ response });
            } else {
                accessToken.value = user.qc.access_token;
                googleUser.value = user.Ft.pu;
            }
        } catch (err) {
            console.log({ err });
        }
    }

    const sendData = ({ route = '/' } = {}) => {
        console.log({ accessToken })
        console.log({ route })
    }

    return {
        accessToken,
        googleUser,
        connect,
        sendData,
    };
}