<template>
  <Spinnier v-if="loading" />
  <Login v-else-if="!loggedIn" @login="loggedIn = true" />
  <SelectSociete
    v-else-if="loggedIn && !select"
    @selectSociete="select = true" />

  <v-layout v-if="!loading && loggedIn && select" class="rounded rounded-md">
    <SideBar />
    <v-main class="align-center justify-center bg-slate-100">
      <AppBar />
      <div class="p-3">
        <Transition>
          <router-view></router-view>
        </Transition>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import Spinnier from "./components/Spinnier.vue";
import SideBar from "./components/SideBar.vue";
import AppBar from "./components/Appbar.vue";
import Login from "./views/Login.vue";
import SelectSociete from "./views/SelectSociete.vue";

import { onMounted, ref } from "vue";

export default {
  name: "App",
  components: { Spinnier, SideBar, AppBar, Login, SelectSociete },
  setup() {
    const loading = ref(true);
    const isShowing = ref(true);
    const loggedIn = ref(false);
    const select = ref(false);

    onMounted(() => {
      setTimeout(function () {
        loading.value = false;
      }, 1000);
    });

    return { loading, isShowing, loggedIn, select };
  },
};
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

input:focus,
textarea:focus,
select:focus,
a:focus {
  outline: none !important;
}
</style>
