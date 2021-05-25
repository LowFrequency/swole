import { ref } from "vue";
import { getCurrentInstance } from "vue";
import { stringToSlug } from "@/utils";
import { addSession } from "@/services/googleFit";

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
            var isAuthorized = currentUser.hasGrantedScopes('https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.activity.write');
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
            setRefs({ token: "", user: "" });
            const gapi = await root.appContext.config.globalProperties.$gapi.getGapiClient();
            const GoogleAuth = gapi.auth2.getAuthInstance();
            GoogleAuth.disconnect();
        } catch (err) {
            console.log({ err });
        }
    }

    const sendIt = async ({ start = null, finish = null, title = null } = {}) => {
        try {
            //const datasource = process.env.VUE_APP_GOOGLE_APP_DATASOURCE;
            const id = stringToSlug({ string: `swole-${title}-${start}` });
            const baseUrl = `https://www.googleapis.com/fitness/v1/users/me/`;

            //const dataResponse = await addData({ baseUrl, accessToken: accessToken.value, datasource, start, finish });
            //console.log({ dataResponse })
            //alert(`Google Fit Data ${id} added; response: ${JSON.stringify(dataResponse)}`);
            const sessionResponse = await addSession({ baseUrl, accessToken: accessToken.value, id, start, finish, title });
            console.log({ sessionResponse })
            alert(`Google Fit Session ${id} added; response: ${JSON.stringify(sessionResponse)}`);
        } catch (err) {
            alert(`Google Fit error; response: ${JSON.stringify(err)}`);
            console.log({ err });
        }
    }

    return {
        accessToken,
        googleUser,
        connect,
        disconnect,
        sendIt,
    };
}