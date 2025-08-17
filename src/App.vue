<script>
import BaseNav from './components/BaseNav.vue';
import BaseFooter from './components/BaseFooter.vue';
import { logout, subscribeToAuthState } from './services/auth';

export default {
    name: 'App',
    components: {BaseNav, BaseFooter},
    data() {
        return {
            loggedUser: {
                id: null,
                email: null,
            },
        }
    },
    methods: {
        handleLogout() {
            logout();
            this.$router.push('/iniciar-sesion');
        },
    },
    mounted() {
        subscribeToAuthState(newUserData => this.loggedUser = newUserData);
    }
}
</script>

<template>
    <BaseNav :loggedUser="loggedUser" @logout="handleLogout" />

    <main class="">
        <router-view />
    </main>

    <BaseFooter class="mt-5" :loggedUser="loggedUser" @logout="handleLogout" />
</template>