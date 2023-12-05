import { auth, db } from '../../firebaseConfig';
import {
    doc, addDoc, collection, query, onSnapshot, updateDoc, deleteDoc, where
} from "firebase/firestore";

export const getTarefasFirebase = async (setListaObjetos) => {
    try {
        const q = query(collection(db, 'tarefas'))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                titulo: doc.data().titulo,
                descricao: doc.data().descricao,
                dataPrevista: doc.data().dataPrevista,
                dataAbertura: doc.data().dataAbertura,
                entregue: doc.data().entregue,
                uid: doc.data().uid
            })))
        })
    } catch (err) {
        throw err;
    }
}


export const getTarefasUIDFirebase = async (uid, setListaObjetos) => {
    try {
        const colRef = collection(db, "tarefas");
        const q = query(colRef, where("uid", "==", uid))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                titulo: doc.data().titulo,
                descricao: doc.data().descricao,
                dataPrevista: doc.data().dataPrevista,
                dataAbertura: doc.data().dataAbertura,
                entregue: doc.data().entregue,
                uid: doc.data().uid
            })))
        })
    } catch (err) {
        throw err;
    }
}

export const deleteTarefasFirebase = async objeto => {
    try {
        const tarefasDocRef = doc(db, 'tarefas', objeto.id)
        await deleteDoc(tarefasDocRef);
    } catch (err) {
        throw err;
    }
}
export const addTarefasFirebase = async objeto => {
    try {
        let ret = await addDoc(collection(db, 'tarefas'),
            {
                titulo: objeto.titulo,
                descricao: objeto.descricao,
                dataPrevista: objeto.dataPrevista,
                dataAbertura: objeto.dataAbertura,
                entregue: objeto.entregue,
                uid: objeto.uid
            }).then(function (docRef) {
                objeto = { ...objeto, id: docRef.id };
                return objeto;
            });
        return ret;
    } catch (err) {
        throw err;
    }
}

export const updateTarefasFirebase = async objeto => {
    try {
        const tarefasDocRef = doc(db, 'tarefas', objeto.id)
        await updateDoc(tarefasDocRef, {
            titulo: objeto.titulo,
            descricao: objeto.descricao,
            dataPrevista: objeto.dataPrevista,
            dataAbertura: objeto.dataAbertura,
            entregue: objeto.entregue,
            uid: objeto.uid
        })
    } catch (err) {
        throw err;
    }
}