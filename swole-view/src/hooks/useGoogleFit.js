import { ref } from "vue";
import { getCurrentInstance } from "vue";
import { log, stringToSlug, checkArrayOfObjectsByKey } from "@/utils";
import { setLoading, setModalMessage } from "@/services/modal";
import { setRedirect } from "@/services/routes";
import { addSession, addData, getDataSource, addDataSource } from "@/services/googleFit";

const accessToken = ref(JSON.parse(localStorage.getItem("accessToken")));
const googleUser = ref(JSON.parse(localStorage.getItem("googleUser")));
const dataStreamId = ref("derived:com.google.activity.segment:257811618614:Swole");

export const useGoogleFit = () => {

    const root = getCurrentInstance();

    const setRefs = ({ token = null, user = null } = {}) => {
        accessToken.value = token;
        localStorage.setItem("accessToken", JSON.stringify(token));
        googleUser.value = user;
        localStorage.setItem("googleUser", JSON.stringify(user));
    }

    const connect = async () => {
        setLoading();
        try {
            const gapi = await root.appContext.config.globalProperties.$gapi.getGapiClient();
            const GoogleAuth = gapi.auth2.getAuthInstance();
            const currentUser = GoogleAuth.currentUser.get();
            const isAuthorized = currentUser.hasGrantedScopes('https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.activity.write');
            if (!isAuthorized) {
                await GoogleAuth.signIn();
                const newUser = GoogleAuth.currentUser.get();
                const newUserName = newUser.getBasicProfile().getName();
                const newUserNameToken = newUser.getAuthResponse().access_token;
                setRefs({ token: newUserNameToken, user: newUserName });
            } else {
                const currentUserName = GoogleAuth.currentUser.get().getBasicProfile().getName();
                const currentUserNameToken = currentUser.getAuthResponse().access_token;
                setRefs({ token: currentUserNameToken, user: currentUserName });
            }
            setModalMessage({
                title: 'Google account connected',
                message: '',
                open: true
            });
        } catch (err) {
            setModalMessage({
                title: 'Google connect error',
                message: JSON.stringify(err),
                open: true
            });
            log({ message: "Google connect error;", data: err, level: "error" });
        }
        setLoading({ open: false });
    }

    const disconnect = async () => {
        setLoading();
        try {
            setRefs({ token: "", user: "" });
            const gapi = await root.appContext.config.globalProperties.$gapi.getGapiClient();
            const GoogleAuth = gapi.auth2.getAuthInstance();
            GoogleAuth.disconnect();
        } catch (err) {
            setModalMessage({
                title: 'Google disconnect error',
                message: JSON.stringify(err),
                open: true
            });
            log({ message: "Google disconnect error;", data: err, level: "error" });
        }
        setLoading({ open: false });
    }

    const sendIt = async ({ start = null, finish = null, title = null } = {}) => {
        setLoading();
        try {
            //Check auth and ask if needed
            await connect();

            //Next steps are based on https://developers.google.com/fit/rest/v1/workout
            const baseUrl = `https://www.googleapis.com/fitness/v1/users/me/`;

            //First we need to check that the data source is avialable to this person
            const dataSourceResponse = await getDataSource({ baseUrl, accessToken: accessToken.value });
            log({ message: "Get data source response", data: dataSourceResponse });

            const dataSourceCheck = checkArrayOfObjectsByKey({ checkArray: dataSourceResponse.dataSource, key: 'dataStreamId', value: dataStreamId.value });
            log({ message: "Check data source is in response", data: dataSourceCheck });

            //If not avalable then we add a new one and update internal data sourcce
            if (dataSourceCheck === undefined) {
                const newdataSourceResponse = await addDataSource({ baseUrl, accessToken: accessToken.value });
                dataStreamId.value = newdataSourceResponse.dataStreamId;
                log({ message: "Create data source", data: newdataSourceResponse });
            }

            //Now we create the actual data points
            const id = stringToSlug({ string: `swole-${title}-${start}` });
            const dataResponse = await addData({ baseUrl, accessToken: accessToken.value, datasource: dataStreamId.value, start, finish });
            // fake response for testing // const dataResponse = { error: "test" };
            log({ message: "Create data points", data: dataResponse });

            //Then as long as no issue adding the above data point we add the session
            if (!dataResponse?.error) {
                const sessionResponse = await addSession({ baseUrl, accessToken: accessToken.value, id, start, finish, title });
                log({ message: "Create session", data: sessionResponse });
            }

            setModalMessage({
                title: 'Google Fit Data added',
                message: `Session Id  ${id}`,
                open: true
            });

            setRedirect({ route: "/" });

        } catch (err) {
            setModalMessage({
                title: 'Google Fit error',
                message: JSON.stringify(err),
                open: true
            });
            log({ message: "Google Fit error;", data: err, level: "error" });
        }
        setLoading({ open: false });
    }

    return {
        accessToken,
        googleUser,
        connect,
        disconnect,
        sendIt,
    };
}