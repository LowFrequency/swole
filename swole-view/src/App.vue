<template>
  <div>
    <router-view />
    <swole-modal v-if="open" />
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import SwoleModal from "@/components/SwoleModal";

export default {
  name: "App",
  components: {
    SwoleModal,
  },
  setup() {
    const store = useStore();
    return {
      open: computed(() => store.state.modal.open),
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
