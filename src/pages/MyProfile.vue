<script>
import BaseHeading1 from "../components/BaseHeading1.vue";
import BaseHeading2 from "../components/BaseHeading2.vue";
import BaseHeading3 from "../components/BaseHeading3.vue";
import CardPost from "../components/CardPost.vue";
import CustomRouterLink from "../components/CustomRouterLink.vue";
import CustomRouterLinkSecondary from "../components/CustomRouterLinkSecondary.vue";
import { subscribeToAuthState } from "../services/auth";
import { subscribeToUserPosts } from "../services/feed";

let unsubscribeAuth = () => {};
let unsubscribePosts = () => {};

export default {
  name: "MyProfile",
  components: {
    BaseHeading1,
    BaseHeading2,
    BaseHeading3,
    CardPost,
    CustomRouterLink,
    CustomRouterLinkSecondary,
  },
  data() {
    return {
      loggedUser: {
        id: null,
        email: null,
        displayName: null,
        location: null,
        petName: null,
        petSpecies: null,
        petAge: null,
        petDescription: null,
        petInterests: null,
      },
      posts: [],
    };
  },
  methods: {
    getUserPosts(userId) {
      unsubscribePosts = subscribeToUserPosts(userId, (posts) => {
        this.posts = posts;
      });
    },
    getDateAndTime(created_at) {
      if (created_at) {
        const date = created_at
          .toDate()
          .toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          });
        const time = created_at
          .toDate()
          .toLocaleTimeString("es-AR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
        return `${time} - ${date}`;
      }
    },
  },
  mounted() {
    unsubscribeAuth = subscribeToAuthState((newUserData) => {
      this.loggedUser = newUserData;
      console.log(this.loggedUser.id);

      this.getUserPosts(this.loggedUser.id);
    });
  },
  unmounted() {
    unsubscribeAuth();
    if (unsubscribePosts) {
      unsubscribePosts();
    }
  },
};
</script>

<template>
  <section
    class="max-w-screen-xl mx-auto px-4 py-12 gap-12 overflow-hidden md:px-8"
  >
    <header class="flex flex-wrap items-center justify-between mt-2 mb-8">
      <BaseHeading1>Mi Perfil</BaseHeading1>
      <CustomRouterLink
        :to="'/mi-perfil/editar'"
        class="mt-2 sm:mt-0 px-8 py-2 font-medium text-lg bg-purple-light duration-150 hover:text-purple-dark hover:bg-purple-light/75 active:bg-purple-secondary active:text-white"
      >
        Editar
      </CustomRouterLink>
    </header>

    <div
      class="w-full max-w-5xl bg-purple-light rounded-3xl shadow mb-6 flex flex-col p-5 mx-auto mt-5"
    >
      <BaseHeading2>Biografía</BaseHeading2>
      {{ loggedUser.bio || "Acá va tu biografía..." }}
    </div>

    <section
      class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 items-center justify-center"
    >
      <article
        class="max-w-sm w-full mx-auto bg-purple-secondary rounded-3xl shadow mb-6 flex flex-col p-5 min-h-full"
      >
        <BaseHeading2>Mis datos</BaseHeading2>
        <dl>
          <dt class="font-bold">Email:</dt>
          <dd class="mb-3">{{ loggedUser.email }}</dd>

          <dt class="font-bold">Nombre de Usuario:</dt>
          <dd class="mb-3">
            {{ loggedUser.displayName || "Sin especificar" }}
          </dd>

          <dt class="font-bold">Ubicación:</dt>
          <dd class="mb-3">{{ loggedUser.location || "Sin especificar" }}</dd>
        </dl>
      </article>

      <article
        class="max-w-sm w-full mx-auto bg-purple-secondary rounded-3xl shadow mb-6 flex flex-col p-5 min-h-full"
      >
        <div class="flex justify-between items-center">
          <BaseHeading2>Mi mascota</BaseHeading2>
          <div
            v-if="loggedUser.petIcon"
            class="bg-purple-light text-3xl p-2 rounded-full text-purple-dark"
          >
            <i :class="['fa', loggedUser.petIcon]"></i>
          </div>
        </div>
        <dl>
          <dt class="font-bold">Nombre:</dt>
          <dd class="mb-3">{{ loggedUser.petName || "Sin especificar" }}</dd>

          <dt class="font-bold">Especie:</dt>
          <dd class="mb-3">
            {{ loggedUser.petSpecies || "Perro, gato, ave..." }}
          </dd>

          <dt class="font-bold">Edad:</dt>
          <dd class="mb-3">{{ loggedUser.petAge || "Sin especificar" }}</dd>

          <dt class="font-bold">Descripción física de tu Mascota:</dt>
          <dd class="mb-3">
            {{ loggedUser.petDescription || "Sin especificar" }}
          </dd>

          <dt class="font-bold">Intereses de tu Mascota:</dt>
          <dd class="mb-3">
            {{ loggedUser.petInterests || "Sin especificar" }}
          </dd>
        </dl>
      </article>
    </section>

    <section class="my-12 ">
      <BaseHeading2>Mis Publicaciones</BaseHeading2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-10">
        <CardPost v-for="post in posts" :key="post.id" :post="post" :getDateAndTime="getDateAndTime">
          <template v-slot:action>
            <CustomRouterLinkSecondary :to="`/feed/posteo/${post.id}`" class="font-medium">Ver comentarios</CustomRouterLinkSecondary>
          </template>
        </CardPost>
        <p v-if="posts.length === 0">
          No has hecho ninguna publicación.
      </p>
      </div>
    </section>
    
  </section>
</template>
