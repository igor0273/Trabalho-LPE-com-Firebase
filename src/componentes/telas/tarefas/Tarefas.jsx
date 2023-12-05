import { useState, useEffect } from "react";
import TarefasContext from "./TarefasContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import { auth } from '../../../firebaseConfig';
import { useAuthState } from "react-firebase-hooks/auth";
import {
    deleteTarefasFirebase, addTarefasFirebase, updateTarefasFirebase,
    getTarefasUIDFirebase
} from '../../servicos/TarefasService';
import { Navigate } from "react-router-dom";


function Tarefas() {

    const [user, loading, error] = useAuthState(auth);
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        id: "", titulo: "", texto: "", tipo: "", url: "",
        uid: user?.uid, usuario: user?.displayName, email: user?.email
    });
    const [carregando, setCarregando] = useState(true);
    const [abreDialogo, setAbreDialogo] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            id: "", titulo: "", descricao: "", entregue: "", dataAbertura: "", dataPrevista: "",
            uid: user?.uid, usuario: user?.displayName, email: user?.email
        });
        setAbreDialogo(true)
    }

    const editarObjeto = async (objeto) => {
        setObjeto(objeto);
        setAbreDialogo(true);
        setEditar(true);
        setAlerta({ status: "", message: "" });
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (editar) {
            try {
                await updateTarefasFirebase(objeto);
                setAlerta({
                    status: "success", message: "Tarefa atualizado com sucesso"
                });
            } catch (err) {
                setAlerta({
                    status: "error", message: "Erro ao atualizar o Tarefa:"
                        + err
                });
            }
        } else { // novo
            try {
                setObjeto(await addTarefasFirebase(objeto));
                setEditar(true);
                setAlerta({
                    status: "success", message: "Tarefa criado com sucesso"
                });
            } catch (err) {
                setAlerta({
                    status: "error", message: "Erro ao criar o Tarefa:" +
                        err
                });
            }
        }
    }



    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const remover = async (objeto) => {
        if (window.confirm("Remover este objeto?")) {
            try {
                deleteTarefasFirebase(objeto);
                setAlerta({ status: "success", message: "Tarefa removido com sucesso!" });
            } catch (err) {
                setAlerta({
                    status: "error", message: "Erro ao remover: " + err
                });
            }
        }
    }


    useEffect(() => {
        setCarregando(true);
        if (user?.uid != null) {
            const uid = user?.uid;
            getTarefasUIDFirebase(uid, setListaObjetos);
        }
        setCarregando(false);
    }, [user]);



    if (user) {
        return (
            <TarefasContext.Provider value={{
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                remover,
                objeto, setObjeto,
                editarObjeto, novoObjeto, acaoCadastrar,
                handleChange, abreDialogo, setAbreDialogo
            }}>
                <Carregando carregando={carregando}>
                    <Tabela />
                </Carregando>
                <Form />
            </TarefasContext.Provider>
        )
    } else {
        return <Navigate to="/" />;
    }



}

export default Tarefas;