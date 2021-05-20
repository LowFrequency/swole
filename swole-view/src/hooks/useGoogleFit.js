import { ref } from "vue";
import { getCurrentInstance } from "vue";

const accessToken = ref(JSON.parse(localStorage.getItem("accessToken")));
const googleUser = ref(JSON.parse(localStorage.getItem("googleUser")));

export const useGoogleFit = () => {

    const root = getCurrentInstance();

    const setRefs = ({ token = null, user = null } = {}) => {
        accessToken.value = token;
        localStorage.setItem("accessToken", JSON.stringify(token));
        googleUser.value = user;
        localStorage.setItem("googleUser", JSON.stringify(user));
    }

    const connect = async () => {
        try {
            const gapi = await root.appContext.config.globalProperties.$gapi.getGapiClient();
            const GoogleAuth = gapi.auth2.getAuthInstance();
            var currentUser = GoogleAuth.currentUser.get();
            var isAuthorized = currentUser.hasGrantedScopes('https://www.googleapis.com/auth/fitness.activity.write');
            if (!isAuthorized) {
                await GoogleAuth.signIn();
                var newUser = GoogleAuth.currentUser.get();
                setRefs({ token: newUser.qc.access_token, user: newUser.Ft.pu });
            } else {
                setRefs({ token: currentUser.qc.access_token, user: currentUser.Ft.pu });
            }
        } catch (err) {
            console.log({ err });
        }
    }

    const disconnect = async () => {
        try {
            const gapi = await root.appContext.config.globalProperties.$gapi.getGapiClient();
            const GoogleAuth = gapi.auth2.getAuthInstance();
            GoogleAuth.disconnect();
            setRefs({ token: "", user: "" });
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
        disconnect,
        sendData,
    };
}