import store from "@/store";

export const setModalMessage = async ({ title = '', message = '', open = true } = {}) => {
    try {
        store.dispatch("setModalMessage", { title, message, open });
    } catch (err) {
        const error = `loading error: ${err.message}`;
        return Promise.reject(error);
    }
}