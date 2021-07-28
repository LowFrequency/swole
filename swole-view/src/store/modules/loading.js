const state = {
    on: false,
};

const getters = {
    loadingOn: state => state.on
};

const actions = {
    setLoading({ commit }, value) {
        commit("SET_LOADING", value);
    }
};

const mutations = {
    SET_LOADING: (state, value) => {
        state.on = value;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};