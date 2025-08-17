import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Guarda un nuevo comentario en Firestore.
 * @param {{ postId: string, user_id: string, email: string, content: string }} comment - El comentario a guardar.
 * @returns {Promise} - Promesa que se resuelve con la referencia del documento creado.
 */
export function saveComment({ postId, user_id, email, content }) {
    
    const commentsRef = collection(db, `post/${postId}/comments`);

    return addDoc(commentsRef, {
        user_id,
        email,
        content,
        created_at: serverTimestamp(),
    });
}

/**
 * Obtiene los detalles de un post por su ID.
 * @param {string} postId - El ID del post que se quiere obtener.
 * @returns {Promise<{content:string, picture:string, email:string}>} - Promesa que se resuelve con los datos del post.
 * @throws {Error} Si el post no existe.
 */
export async function getPostById(postId){
    const postRef = doc(db, `post/${postId}`);

    const postSnapshot = await getDoc(postRef);

    if (postSnapshot.exists()) {
        return {
            content: postSnapshot.data().content,
            picture: postSnapshot.data().picture,
            email: postSnapshot.data().email,
            created_at: postSnapshot.data().created_at,
        };
    } else {
        throw new Error('No existe el post!');
    }
}

/**
 * Obtener los comentarios de un post específico.
 * @param {string} postId - El ID del post.
 * @param {function} callback - El callback con el código que se quiere ejecutar cada vez que cambien los comentarios.
 */
export function subscribeToComments(postId, callback) {
    const commentsRef = collection(db, `post/${postId}/comments`);
    const q = query(commentsRef, orderBy('created_at', 'desc'));

    onSnapshot(q, snapshot => {
        const comments = snapshot.docs.map(doc => ({
            id: doc.id,
            user_id: doc.data().user_id,
            email: doc.data().email,
            content: doc.data().content,
            created_at: doc.data().created_at,
        }));
        callback(comments);
    });
}
