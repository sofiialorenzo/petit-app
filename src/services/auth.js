import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "./firebase";
import { createUserProfile, editUserProfile, getUserProfileById } from "./user-profile";

let userData = {
    id: null,
    email: null,
    displayName: null,
    bio: null,
    location: null,
    petName: null,
    petSpecies: null,
    petAge: null,
    petDescription: null,
    petInterests: null,
    petIcon: null,
}

let observers = [];

onAuthStateChanged(auth, user => {
    if(user) {
        userData = {
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
        }

        getUserProfileById(user.uid)
            .then(profile => {
                
                userData = {
                    ...userData,
                    bio: profile.bio,
                    location: profile.location,
                    petName: profile.petName,
                    petSpecies: profile.petSpecies,
                    petAge: profile.petAge,
                    petDescription: profile.petDescription,
                    petInterests: profile.petInterests,
                    petIcon: profile.petIcon,
                }

                notifyAll();
            });
    } else {
        userData = {
            id: null,
            email: null,
            displayName: null,
            bio: null,
            location: null,
            petName: null,
            petSpecies: null,
            petAge: null,
            petDescription: null,
            petInterests: null,
            petIcon: null,
        }
    }

    notifyAll();
});

/**
 * Iniciar sesión de un usuario existente en Firebase Authentication con sus credenciales
 * @param {{email: string, password: string}} data - Datos del usuario que se desea autenticar.
 * @returns {Promise<true>} - Promesa que se resuelve con true si la autenticación es exitosa.
 * @throws {Error} - Lanza error si la autenticación falla.
 */
export async function login({email, password}) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return true;
    } catch (error) {
        console.error('[auth.js login] Error al iniciar sesión: ', error);
        throw error;
    }
}

/**
 * Registra un nuevo usuario en Firebase Authentication y guarda su perfil en Firestore con sus credenciales.
 * @param {{email: string, password: string}} data - Datos del usuario a registrar.
 * @returns {Promise<void>} - Promesa que se resuelve al completar el registro.
 * @throws {Error} - Lanza error si el registro falla.
 */
export async function register({email, password}) {
    try {
        const credentials = await createUserWithEmailAndPassword(auth, email, password);
        await createUserProfile(credentials.user.uid, {email});
    } catch (error) {
        console.error('[auth.js register] Error al registrar el usuario: ', error);
        throw error;
    }
}

/**
 * Edita los datos del perfil de usuario en Firestore y actualiza el perfil en Firebase Authentication.
 * @param {{displayName: string, bio: string, location: string, petName: string, petSpecies: string, petAge: string, petDescription: string, petInterests: string, petIcon: string}} data - Datos del usuario a editar. 
 * @return {Promise<void>} - Promesa que se resuelve al completar la edición del perfil.
 * @throws {Error} - Lanza un error si la edición falla.
 */
export async function editMyProfile({displayName, bio, location, petName, petSpecies, petAge, petDescription, petInterests, petIcon}) {
    try {
        const promiseAuth = updateProfile(auth.currentUser, {displayName});
        const promiseProfile = editUserProfile(userData.id, {displayName, bio, location, petName, petSpecies, petAge, petDescription, petInterests, petIcon});

        await Promise.all([promiseAuth, promiseProfile]);

        userData = {
            ...userData,
            displayName,
            bio,
            location,
            petName,
            petSpecies,
            petAge,
            petDescription,
            petInterests,
            petIcon,
        }

    } catch (error) {
        console.error('[auth.js editMyProfile] Error al editar los datos del perfil: ', error);
        throw error;
    }
}

/**
 * Cierra la sesión del usuario autenticado en Firebase Authentication.
 * @returns {Promise<void>} - Promesa que se resuelve al cerrar sesión.
 * @throws {error} - Lanza error si falla al cerrar sesión.
 */
export async function logout() {
    try {
        return await signOut(auth);
    } catch (error) {
        console.error('[auth.js logout] Error al cerrar sesión: ', error);
        throw error;
    }
}

/**
 * Agrega un observer para ser notificado de los cambios en el
 * estado de autenticación.
 * Retorna una función para cancelar la suscripción.
 * 
 * @param {Function} callback - Función que será llamada cuando se produzca un cambio en el estado de autenticación.
 * @returns {Function} - Función para cancelar la suscripción al observer.
 */
export function subscribeToAuthState(callback) {
    observers.push(callback);

    notify(callback);

    return () => observers = observers.filter(obs => obs != callback);
}

/**
 * Notifica a un observer de los datos actuales de la autenticación.
 * 
 * @param {Function} callback - Función que será llamada con los datos actuales del usuario.
 */
function notify(callback) {
    callback({...userData});
}

/**
 * Recorre todos los observers y los notifica con los datos actuales de autenticación.
 */
function notifyAll() {
    observers.forEach(observer => notify(observer));
}