import { ref } from "vue";
import { getCurrentInstance } from "vue";
import { stringToSlug, checkArrayOfObjectsByKey } from "@/utils";
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
            //Check auth and ask if needed
            await connect();

            //Next steps are based on https://developers.google.com/fit/rest/v1/workout
            const baseUrl = `https://www.googleapis.com/fitness/v1/users/me/`;

            //First we need to check that the data source is avialable to this person
            const dataSourceResponse = await getDataSource({ baseUrl, accessToken: accessToken.value });
            console.log({ dataSourceResponse })
            const dataSourceCheck = checkArrayOfObjectsByKey({ checkArray: dataSourceResponse.dataSource, key: 'dataStreamId', value: dataStreamId.value });
            console.log({ dataSourceCheck })

            //If not avalable then we add a new one and update internal data sourcce
            if (dataSourceCheck === undefined) {
                const newdataSourceResponse = await addDataSource({ baseUrl, accessToken: accessToken.value });
                dataStreamId.value = newdataSourceResponse.dataStreamId;
            }

            //Now we create the actual data points
            const id = stringToSlug({ string: `swole-${title}-${start}` });
            const dataResponse = await addData({ baseUrl, accessToken: accessToken.value, datasource: dataStreamId.value, start, finish });
            console.log({ dataResponse })
            alert(`Google Fit Data ${id} added; response: ${JSON.stringify(dataResponse)}`);

            //Then as long as no issue adding the above data point we add the session
            if (!dataResponse?.error) {
                const sessionResponse = await addSession({ baseUrl, accessToken: accessToken.value, id, start, finish, title });
                console.log({ sessionResponse })
                alert(`Google Fit Session ${id} added; response: ${JSON.stringify(sessionResponse)}`);
            }

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