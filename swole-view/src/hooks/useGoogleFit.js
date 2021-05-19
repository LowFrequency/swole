import { ref } from "vue";

const auth = ref("");

export const useGoogleFit = () => {

    const connect = ({ route = '/' } = {}) => {
        console.log({ auth })
        console.log({ route })
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