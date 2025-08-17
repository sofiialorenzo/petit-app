<script>
import BaseHeading1 from '../components/BaseHeading1.vue';
import CardPost from '../components/CardPost.vue';
import { subscribeToAuthState } from '../services/auth';
import { getPostById, saveComment, subscribeToComments } from '../services/post.js';

let unsubscribeAuth = () => {};

export default {
    name: 'Post',
    components: { BaseHeading1, CardPost },
    props: {
    postId: {
        type: String,
        required: true
    }
    },
    data() {
        return {
            comments: [],
            newComment: {
                content: '',
            },

            loggedUser: {
                id: null,
                email: null,
                displayName: null,
                bio: null,
                career: null,
            },
            post: {
                content: null,
                email: null,
                picture: null,
                created_at: null
            },
            showAlert: false,
            loading: false,
        };
    },
    methods: {
    async handleSubmit() {
        this.loading = true;
        try {
            await saveComment({
                postId: this.postId,
                user_id: this.loggedUser.id,
                email: this.loggedUser.email,
                content: this.newComment.content,
            });

            this.newComment.content = '';
            this.showAlert = true;
        } catch (error) {
            console.error('Error al guardar el comentario:', error);
        } finally {
            this.loading = false;
        }

    },
    async fetchPost(){
        try {
            const post = await getPostById(this.postId);
            this.post = post; 
        } catch (error) {
            console.error('Error obteniendo el post:', error);
        }
    },
        getDateAndTime(created_at) {
            if (created_at) {
                const date = created_at.toDate().toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' });
                const time = created_at.toDate().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });
                return `${time} - ${date}`;
            }
        }
},

    async mounted() {
        subscribeToComments(this.postId, newComments => {
            this.comments = newComments;
        });
        await this.fetchPost();

        unsubscribeAuth = subscribeToAuthState(newUserData => this.loggedUser = newUserData);

    },
    unmounted() {
        unsubscribeAuth();
    }
}
</script>

<template>
        <section class="w-full mb-6 max-w-screen-xl mx-auto px-4 py-12 gap-12 overflow-hidden md:px-8">
          <BaseHeading1 class="text-center mt-2 mb-8">Comentarios de la Publicación</BaseHeading1>
        <h2 class="sr-only">Publicación</h2>

        <div class="flex justify-center">
          <CardPost :post="this.post" :getDateAndTime="this.getDateAndTime" />
        </div>

        <h3 class="sr-only">Comentarios</h3>

        <div v-if="showAlert" class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
            <span class="font-medium">¡Purrfecto!</span> Tu comentario ha sido publicado con éxito.
        </div>

        <form class="relative w-full bg-violet-50 px-4 py-2 rounded-full mb-4" @submit.prevent="handleSubmit">
            <label for="post-comment" class="sr-only">Publicar un comentario</label>
            <input v-model="newComment.content" type="text" id="post-comment" placeholder="Publicar tu respuesta" class="w-full py-3 pl-4 pr-12 text-gray-500 border-none outline-none bg-transparent focus:border-none tracking-wide"/>
            <button type="submit" aria-label="Publicar comentario" class="absolute right-4 top-2/4 transform -translate-y-2/4 p-2 text-purple-primary duration-150 bg-purple-light rounded-full">
            <i class="fa-solid fa-arrow-up"></i>
            </button>
        </form>

        <div v-if="loading" class="flex items-center rounded-lg mb-3">
            <div class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 rounded-full animate-pulse">Cargando...</div>
        </div>
    
        <div class="rounded-3xl bg-purple-primary px-6 py-4 text-white">
          <ul class="flex flex-col gap-3 mb-2" v-if="comments.length > 0">
            <li v-for="comment in comments" :key="comment.id">
              <div><span class="font-semibold tracking-widest">{{ comment.email }}</span></div>
              <div class="tracking-wide">{{ comment.content }}</div>
            </li>
          </ul>
          <p v-else class="tracking-wide">Aún no hay comentarios</p>
        </div>
      </section>
</template>