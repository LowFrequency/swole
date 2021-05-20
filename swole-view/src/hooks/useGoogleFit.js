import { ref } from "vue";
import { getCurrentInstance } from "vue";
import { stringToSlug } from "@/utils";

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

    const sendIt = async ({ start = null, finish = null, title = null } = {}) => {
        try {
            const id = stringToSlug({ string: `swole-${title}-${start}` });
            const url = `https://www.googleapis.com/fitness/v1/users/me/sessions/${id}`;
            const body = {
                "id": id,
                "name": `Swole: ${title}`,
                "description": "",
                "startTimeMillis": start,
                "endTimeMillis": finish,
                "version": 1,
                "lastModifiedToken": "exampleToken",
                "application": {
                    "detailsUrl": "http://swole.lowfrequency.co.nz",
                    "name": "Swole",
                    "version": "1.0"
                },
                "activityType": 114
            };

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer  ${accessToken.value}`,
                },
                body: JSON.stringify(body)
            });
            return response.json();
        } catch (err) {
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