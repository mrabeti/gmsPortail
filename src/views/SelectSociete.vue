<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-2 py-0 mx-auto md:h-screen lg:py-0">
      <a
        href="#"
        class="flex items-center mb-6 mt-8 pt-8 px-8 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-15" src="../assets/images/Logo.png" alt="OMAG" />
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Liste Des Sociétés
          </h1>
          <v-virtual-scroll
            v-if="listSocietes.length > 0"
            :items="listSocietes"
            height="260"
            :item-height="listSocietes.length">
            <template v-slot:default="{ item }">
              <v-list-item
                class="text-left"
                :title="item.nom"
                @click="handleItemClick(item)">
                <template v-slot:append>
                  <v-btn
                    icon="mdi-chevron-right"
                    size="x-small"
                    variant="plain"></v-btn>
                </template>
              </v-list-item>
            </template>
          </v-virtual-scroll>
          <div v-else class="text-center font-weight-regular">
            <v-progress-circular
              :size="40"
              :width="3"
              indeterminate></v-progress-circular>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";

export default {
  data() {
    return {
      listSocietes: [],
      IdClients: null,
      lienAPIRoot: this.$store.state.lienAPI,
    };
  },
  computed: {
    ...mapGetters["isLoggedIn"],
  },
  created() {
    if (this.$store.state.utilisateur !== null) {
      this.IdClients = this.$store.state.utilisateur.IdClients;
      this.getSocietes();
    } else {
      this.$router.push("/");
    }
  },

  methods: {
    async getSocietes() {
      const url = `${this.lienAPIRoot}/societes/${this.IdClients}`;
      const options = { method: "GET" };

      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        this.listSocietes = [...responseData];
      } catch (error) {
        alert(error);
      }
    },

    togglePassword() {
      this.showPassword = !this.showPassword;
    },

    async handleItemClick(item) {
      store.state.nomBase = item.code;
      store.state.nomSociete = item.nom;

      this.$emit("login");
      this.$emit("selectSociete");
    },
  },
};
</script>

<style scoped>
.hero {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-size: cover;
  height: 100vh;
  width: 100% !important;
}

.bg-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 80%;
  text-align: center;
}

.v-virtual-scroll {
  border: 1px 1px solid #e4e4e4 !important;
}

.cart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.logo {
  max-width: 100px;
  margin-bottom: 20px;
}

.cart-items {
  max-width: 300px;
  max-height: 300px;
}

.list-group-item {
  cursor: pointer;
}
</style>
