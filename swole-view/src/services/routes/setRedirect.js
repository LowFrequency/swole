import router from "@/router";

export const setRedirect = ({ route = null } = {}) => {
    try {
        router.push(route);
    } catch (err) {
        const error = `loading error: ${err.message}`;
        return Promise.reject(error);
    }
}