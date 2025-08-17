<script>
export default {
  props: {
    loggedUser: {
      type: Object,
      required: true,
      default: () => ({ id: null, email: '' }),
    },
  },
  methods: {
    handleLogout() {
      this.$emit('logout');
    },
    isCurrentRoute(route) {
      return this.$route.path === route;
    },
  },
};
</script>


<template>
    <footer class="">
    <div class="mx-auto w-fullz max-w-screen-xl p-4 py-6 lg:py-8">
        <div class="md:flex md:justify-between">
          <header class="mb-6 md:mb-0">
            <router-link to="/" class="text-xl font-bold text-purple-primary">Petit</router-link>
          </header>
          <ul class="grid grid-cols-2 gap-8 sm:gap-6">
              <li>
                  <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">Links</h2>
                  <ul class="text-gray-dark font-medium">
                      <li class="mb-4">
                        <router-link
                            to="/"
                            class="transition-all block hover:text-purple-primary"
                            v-bind:aria-current="isCurrentRoute('/') ? 'page' : undefined"
                            >
                            Home
                        </router-link>
                      </li>
                      <li>
                        <router-link
                        to="/nosotros"
                        class="transition-all block hover:text-purple-primary"
                        v-bind:aria-current="isCurrentRoute('/nosotros') ? 'page' : undefined"
                        >
                        Nosotros
                        </router-link>
                      </li>
                  </ul>
              </li>
              <li>
                  <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase ">Perfil</h2>
                  <ul class="text-gray-dark font-medium" v-if="!loggedUser.id">
                      <li class="mb-4">
                        <router-link to="/registro" class="transition-all block hover:text-purple-primary">Registrarse</router-link>
                      </li>
                      <li>
                          <router-link to="/iniciar-sesion" class="transition-all block hover:text-purple-primary">Iniciar sesión</router-link>
                      </li>
                  </ul>
                  <ul class="text-gray-dark font-medium" v-if="loggedUser.id">
                      <li class="mb-4">
                        <router-link to="/mi-perfil" class="transition-all block hover:text-purple-primary">Tu perfil</router-link>
                      </li>
                      <li>
                          <router-link to="/feed" class="transition-all block hover:text-purple-primary">Feed</router-link>
                      </li>
                      <li>
                        <button @click="handleLogout" class="transition-all block hover:text-purple-primary pt-4 text-left">
                            Cerrar sesión
                        </button>
                      </li>
                  </ul>
              </li>
          </ul>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
      <div class="">
          <span class="text-sm text-gray-dark sm:text-center">© 2024 <router-link to="/" class="hover:underline">Petit</router-link>. Contenido con Fines educativos.
          </span>
      </div>
    </div>
</footer>
</template>