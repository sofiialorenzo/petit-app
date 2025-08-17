<script>
import BaseHeading1 from '../components/BaseHeading1.vue';
import CustomRouterLink from '../components/CustomRouterLink.vue';
import CustomRouterLinkSecondary from '../components/CustomRouterLinkSecondary.vue';
import CardPost from '../components/CardPost.vue';
import { subscribeToAuthState } from '../services/auth';
import { saveFeedPost, subscribeToPosts } from '../services/feed';

let unsubscribeAuth = () => {};

export default {
    name: 'Feed',
    components: { BaseHeading1, CustomRouterLink, CardPost, CustomRouterLinkSecondary },
    data() {
        return {
            posts: [],
            newPost: {
                content: '',
                picture: '',
                created_at: ''
            },

            loggedUser: {
                id: null,
                email: null,
                displayName: null,
                bio: null,
                petName: null,
            },
            loading: false,
        };
    },
    methods: {
        async handleSubmit() {
            this.loading = true;


            try {
                await saveFeedPost({
                    user_id: this.loggedUser.id,
                    email: this.loggedUser.email,
                    displayName: this.loggedUser.displayName,
                    petName: this.loggedUser.petName || '',
                    content: this.newPost.content,
                    picture: this.newPost.picture,
                });

                this.newPost.content = '';
                this.newPost.picture = '';
            } catch (error) {
                console.error('Error al guardar el post:', error);
            } finally {
                this.loading = false;
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
        subscribeToPosts(newPosts => this.posts = newPosts);
        unsubscribeAuth = subscribeToAuthState(newUserData => this.loggedUser = newUserData);
    },
    unmounted() {
        unsubscribeAuth();
    }
}
</script>

<template>
    <section class="max-w-screen-xl mx-auto px-4 py-12 gap-12 overflow-hidden md:px-8">
        <header class="flex flex-wrap items-center justify-between mt-2 mb-8">
            <BaseHeading1>Publicaciones</BaseHeading1>
            <CustomRouterLink :to="'/feed/publicar'" class="px-8 py-2 font-medium text-lg bg-purple-light duration-150 hover:text-purple-dark hover:bg-purple-light/75 active:bg-purple-secondary active:text-white">Publicar</CustomRouterLink>
        </header>

        <div class="flex">
            <section class="w-full">
                <div v-if="loading" class="flex items-center rounded-lg mb-3">
                    <div class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 rounded-full animate-pulse">Cargando...</div>
                </div>
                <h2 class="sr-only">Posteos</h2>

                <p v-if="posts.length === 0" class="text-center text-gray-dark">Todavía no hay publicaciones, sé el primero en publicar.</p>

                <div v-else class="flex flex-wrap place-content-evenly">
                    <div v-for="post in posts" :key="post.id">
                        <CardPost :post="post" :getDateAndTime="getDateAndTime">
                            <template v-slot:action>
                                <CustomRouterLinkSecondary :to="`/feed/posteo/${post.id}`" class="font-medium">Ver comentarios</CustomRouterLinkSecondary>
                            </template>
                        </CardPost>
                    </div>
                </div>
            </section>
        </div>
    </section>
</template>