<script>
import BaseHeading1 from '../components/BaseHeading1.vue';
import ButtonPrimary from '../components/ButtonPrimary.vue';
import CustomInput from '../components/CustomInput.vue';
import CustomTextarea from '../components/CustomTextarea.vue';
import CustomLabel from '../components/CustomLabel.vue';
import { subscribeToAuthState } from '../services/auth';
import { saveFeedPost, subscribeToPosts } from '../services/feed';

let unsubscribeAuth = () => {};

export default {
    name: 'Publish',
    components: { ButtonPrimary, BaseHeading1, CustomInput, CustomTextarea, CustomLabel },
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
            showAlert: false,
        };
    },
    methods: {
        handleSubmit() {
            saveFeedPost({
                user_id: this.loggedUser.id,
                email: this.loggedUser.email,
                displayName: this.loggedUser.displayName,
                petName: this.loggedUser.petName || '',
                content: this.newPost.content,
                picture: this.newPost.picture,
            });

            this.newPost.content = '';
            this.newPost.picture = '';
            this.showAlert = true;

            setTimeout(() => {
                this.showAlert = false;
                this.$router.push('/feed');
            }, 1500);
        },
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
    <section class="w-full mb-6 max-w-screen-xl mx-auto px-4 py-12 gap-12 overflow-hidden md:px-8">
        <div v-if="showAlert" class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
            <span class="font-medium">¡Purrfecto!</span> Tu publicación ha sido creada con éxito.
        </div>

        <BaseHeading1 class="text-center mt-2 mb-8">Crear una publicación</BaseHeading1>

        <div class="flex gap-4 container">

            <section class="w-full">
                <form 
                    action="#"
                    @submit.prevent="handleSubmit"
                >
                    <div class="mb-4">
                        <p class="text-sm text-gray-dark" v-if="loggedUser.displayName">Usuario</p>
                        <p>{{ loggedUser.displayName }}</p>
                    </div>

                    <div class="mb-4">
                        <p class="text-sm text-gray-dark">Email</p>
                        <p>{{ loggedUser.email }}</p>
                    </div>

                    <div class="mb-4">
                        <CustomLabel for="picture">Imagen</CustomLabel>
                        <CustomInput type="text" id="picture" v-model="newPost.picture" class="mt-2" />
                    </div>

                    <div class="mb-4">
                        <CustomLabel for="content">Contenido</CustomLabel>
                        <CustomTextarea id="content" v-model="newPost.content" :required="true" class="mt-2" />
                        <div v-if="newPost.content == ''" class="mt-2 p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 inline-block">
                            <span>El campo "contenido" no puede estar vacío</span>
                        </div>
                    </div>
                    
                    <ButtonPrimary type="submit">Publicar</ButtonPrimary>
                </form>
            </section>
        </div>
    </section>
</template>