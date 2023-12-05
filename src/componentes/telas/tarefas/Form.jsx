import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import TarefasContext from "./TarefasContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import CampoSelect from "../../comuns/CampoSelect";
import CampoEntradaTexto from "../../comuns/CampoEntradaTexto";
import Dialogo from "../../comuns/Dialogo";
import { MenuItem } from "@mui/material";
import DataTimeInput from "../../comuns/DataTimeInput";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, abreDialogo, setAbreDialogo } =
        useContext(TarefasContext);

    return (
        <>
            <Dialogo id="modalEdicao" titulo="Organização"
                open={abreDialogo} setOpen={setAbreDialogo}
                acaoCadastrar={acaoCadastrar} idform="formulario"
                maxWidth="sm">
                <Alerta alerta={alerta} />
                <CampoEntrada id="txtID" label="ID"
                    tipo="text" name="id" value={objeto.id}
                    onchange={handleChange} requerido={false}
                    readonly={true} />
                <CampoEntrada id="txtTitulo" label="Título"
                    tipo="text" name="titulo" value={objeto.titulo}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={50}
                    msgvalido="Titulo OK"
                    msginvalido="Informe o título" />
                <CampoEntradaTexto id="txtDescricao" label="Descrição"
                    rows={5}
                    tipo="text" name="descricao"
                    value={objeto.descricao}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={100}
                    msgvalido="Descricao OK"
                    msginvalido="Informe o Descricao" />

                <DataTimeInput id="txtDataAbertura" label="Data Abertura"
                    tipo="text" name="dataAbertura"
                    value={objeto.dataAbertura}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={100}
                    msgvalido="Data Abertura OK"
                    msginvalido="Informe a Data Abertura" />

                <DataTimeInput id="txtDataPrevista" label="Data Prevista"
                    tipo="text" name="dataPrevista"
                    value={objeto.dataPrevista}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={100}
                    msgvalido="Data Prevista OK"
                    msginvalido="Informe a Data Prevista" />
                <CampoSelect
                    id="selectEntrgue" label="Entregue"
                    idLabel="labelEntregue"
                    tipo="text" name="entregue" value={objeto.entregue}
                    onchange={handleChange} requerido={false}
                    msgvalido="Entregue OK"
                    msginvalido="Informe o Entregue">
                    <MenuItem value="true">Sim</MenuItem>
                    <MenuItem value='false'>Não</MenuItem>
                </CampoSelect>
            </Dialogo>
        </>
    )

}

export default Form;