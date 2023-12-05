import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { getTarefasFirebase } from '../../servicos/TarefasService';

function Home() {

    const [listaObjetos, setListaObjetos] = useState([
        {
            id: '1xxx',
            titulo: 'Usando Firebase',
            texto: 'Como usar o Firebase',
            url: 'https://firebase.google.com/docs/guides?hl=pt-br',
            tipo: 'Documentação',
            usuario: 'Jorge',
            email: 'jlbavaresco@gmail.com',
            uid: 'jj123'
        },
        {
            id: '2xxx',
            titulo: 'Analysis of Component Libraries for React JS',
            texto: 'Analysis of Component Libraries for React JS',
            url: 'https://iarjset.com/wp-content/uploads/2021/06/IARJSET.2021.8607.pdf',
            tipo: 'Artigo',
            usuario: 'Jorge',
            email: 'jlbavaresco@gmail.com',
            uid: 'jj123'
        }
    ]);

    useEffect(() => {
        getTarefasFirebase(setListaObjetos);
        }, []);
    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h5" component="div">
                Tarefas Desenvolvedor
            </Typography>
            {listaObjetos.length === 0 && <Typography variant="h5" component="div">
                Nenhum registro encontrado
            </Typography>}

            {listaObjetos.length === 0 && <h2>Nenhum registro encontrado</h2>}

            <Grid container spacing={2}>
                {listaObjetos.length > 0 && (
                    listaObjetos.map(objeto => (
                        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}
                            key={objeto.id}>
                            <Card sx={{ minWidth: 50 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {objeto.tipo}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {objeto.titulo}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {objeto.descricao}
                                    </Typography>
                                
                                    <Typography variant="h7" component="div">
                                        Data Abertura:
                                        {objeto.dataAbertura}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} >
                                        Data Prevista:
                                        {objeto.dataPrevista}
                                    </Typography>
                                    <Typography variant="h7" component="div">   
                                       Entregue: 
                                        {objeto.entregue == true ? " Sim" : " Não"}
                                    </Typography>

                                </CardContent>
                            </Card>
                        </Grid>
                    ))

                )}
            </Grid>

        </div>
    )
}

export default Home;