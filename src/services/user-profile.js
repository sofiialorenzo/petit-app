/*
    Acá manejamos los documentos de la collection "users" que representan y extienden los datos
    de los usuarios de Authentication.
*/
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Obtiene los datos del perfil del usuario por su ID.
 * @param {string} id - El ID del usuario cuya información se desea obtener.
 * @returns {Promise<{id: string, email: string, displayName: string|null, bio: string|null, location: string|null, petName: string|null,petSpecies: string|null,petAge: string|null, petDescription: string|null, petInterests: string|null, petIcon: string|null}>} Promesa que se resuelve con los datos del perfil del usuario.
 * @throws {Error} Si no se encuentra el documento del usuario.
 */
export async function getUserProfileById(id) {
    const userRef = doc(db, `users/${id}`);

    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
        throw new Error('No se encontró el perfil del usuario');
    }

    return {
        id: userSnapshot.id,
        email: userSnapshot.data().email,
        displayName: userSnapshot.data().displayName,
        bio: userSnapshot.data().bio,
        location: userSnapshot.data().location,
        petName: userSnapshot.data().petName,
        petSpecies: userSnapshot.data().petSpecies,
        petAge: userSnapshot.data().petAge,
        petDescription: userSnapshot.data().petDescription,
        petInterests: userSnapshot.data().petInterests,
        petIcon: userSnapshot.data().petIcon,
    }
}

/**
 * Crea un perfil de usuario en Firestore.
 * @param {string} id - El ID del usuario para el que se crea el perfil.
 * @param {{email: string}} data - Datos del usuario, debe incluir el campo email.
 * @returns {Promise<void>} Promesa que se resuelve al completar la creación del perfil.
 */
export async function createUserProfile(id, { email }) {
    const userRef = doc(db, `users/${id}`);

    await setDoc(userRef, { email});
}

/**
 * Edita el documento del perfil del usuario.
 * 
 * @param {string} id 
 * @param {{displayName: string, bio: string, location: string, petName: string, petSpecies: string, petAge: string, petDescription: string, petInterests: string, petIcon: string}} data - Datos a actualizar en el perfil del usuario.
 * @returns {Promise<void>} Promesa que se resuelve al completar la actualización del perfil.
 */
export async function editUserProfile(id, {displayName, bio, location, petName, petSpecies, petAge, petDescription, petInterests, petIcon}) {
    // doc() genera la referencia a un documento específico, así como collection() lo hace
    // con una colección.
    const userRef = doc(db, `users/${id}`);

    // Usamos la función updateDoc() para actualizar el documento.
    await updateDoc(userRef, {
        displayName,
        bio,
        location,
        petName,
        petSpecies,
        petAge,
        petDescription,
        petInterests,
        petIcon,
    });
}