import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where  } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Graba mensaje del post en Firestore.
 * Retorna una promesa que se resuelve al completarse la escritura.
 * @param {{user_id: string, email: string, displayName: string, petName: string, content: string, picture: string}} message - El mensaje a guardar.
 * @returns {Promise} - Promesa que se resuelve con la referencia del documento creado.
 */
export function saveFeedPost({ user_id, email, displayName, petName, content, picture }) {
    const postRef = collection(db, 'post');

    return addDoc(postRef, {
        user_id,
        email,
        displayName,
        petName,
        content,
        picture,
        created_at: serverTimestamp(),
    });
}

/**
 * Obtiene todos los documentos del post en Firestore.
 * @param {function(Array<{id: string, email: string, displayName: string|null, petName: string|null, content: string, picture: string|null, created_at: import('firebase/firestore').Timestamp}>): void} callback - Callback que recibe los posts.
 */
export function subscribeToPosts(callback) {
    const postRef = collection(db, 'post');
    const q = query(postRef, orderBy('created_at', 'desc'));

    onSnapshot(q, snapshot => {
        const posts = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                email: doc.data().email,
                displayName: doc.data().displayName,
                petName: doc.data().petName,
                content: doc.data().content,
                picture: doc.data().picture,
                created_at: doc.data().created_at,
            }
        });
        callback(posts);
    });
}


/**
 * Obtiene los posts por id de un usuario
 * @param {string} user_id - El ID del usuario.
 * @param {function(Array<{id: string, email: string, displayName: string|null, content: string, picture: string|null, created_at: import('firebase/firestore').Timestamp}>): void} callback - Callback que recibe los posts del usuario.
 */
export function subscribeToUserPosts(user_id, callback) {
    const postRef = collection(db, 'post');
    const q = query(
        postRef,
        where('user_id', '==', user_id),
    );

    onSnapshot(q, snapshot => {
        const posts = snapshot.docs.map(doc => ({
            id: doc.id,
            email: doc.data().email,
            displayName: doc.data().displayName,
            content: doc.data().content,
            picture: doc.data().picture,
            created_at: doc.data().created_at,
        }));

        callback(posts);
    });
}