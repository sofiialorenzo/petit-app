import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import Feed from "../pages/Feed.vue";
import Publish from "../pages/Publish.vue";
import Post from "../pages/Post.vue";
import Register from "../pages/Register.vue";
import Login from "../pages/Login.vue";
import MyProfile from "../pages/MyProfile.vue";
import MyProfileEdit from "../pages/MyProfileEdit.vue";
import { subscribeToAuthState } from "../services/auth";

const routes = [
    { path: '/',                    component: Home },
    { path: '/nosotros',                    component: About },
    { path: '/registro',            component: Register },
    { path: '/iniciar-sesion',      component: Login },
    { path: '/feed',                component: Feed,            meta: { requiresAuth: true } },
    { path: '/feed/publicar',       component: Publish,         meta: { requiresAuth: true } },
    { path: '/feed/posteo/:postId', component: Post, props: true },
    { path: '/mi-perfil',           component: MyProfile,       meta: { requiresAuth: true } },
    { path: '/mi-perfil/editar',    component: MyProfileEdit,   meta: { requiresAuth: true } },
];

const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

let loggedUser = {
    id: null,
    email: null,
    displayName: null,
    bio: null,
    career: null,
}

subscribeToAuthState(newUserData => loggedUser = newUserData);

router.beforeEach((to, from) => {
    if(to.meta.requiresAuth && loggedUser.id == null) {
        return {
            path: '/iniciar-sesion',
        }
    }
});

export default router;