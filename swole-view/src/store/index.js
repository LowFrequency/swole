import { createStore } from "vuex";
import modal from './modules/modal'
import loading from './modules/loading'

export default createStore({
  modules: {
    modal,
    loading,
  }
});
