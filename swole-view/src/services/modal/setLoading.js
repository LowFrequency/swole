import store from "@/store";

export const setLoading = ({ open = true } = {}) => {
    try {
        store.dispatch("setLoading", open);
    } catch (err) {
        const error = `loading error: ${err.message}`;
        return Promise.reject(error);
    }
}