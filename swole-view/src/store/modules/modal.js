const state = {
    title: '',
    message: '',
    open: false,
};

const getters = {
    modalTitle: state => state.title,
    modalMessage: state => state.message,
    modalOpen: state => state.open
};

const actions = {
    setModalMessage({ commit }, value) {
        const { title = '', message = '', open = false } = value;
        commit("SET_TITLE", title);
        commit("SET_MESSAGE", message);
        commit("SET_OPEN", open);
    },
    setModalOpen({ commit }, value) {
        commit("SET_OPEN", value);
    }
};

const mutations = {
    SET_TITLE: (state, value) => {
        state.title = value;
    },
    SET_MESSAGE: (state, value) => {
        state.message = value;
    },
    SET_OPEN: (state, value) => {
        state.open = value;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};