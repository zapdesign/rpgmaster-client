import BlocoPrincipal from "@/component/personagem/blocoPrincipal";
import { axiosInstance } from "@/services/axiosInstance";
import styles from "./section.module.css"
import { useQuery } from "react-query";
import Forca from "@/component/personagem/testes/forca";
import Coracao from "@/component/personagem/testes/coracao";
import Persuasao from "@/component/personagem/testes/astucia";
import Inventario from "@/component/personagem/equipamentos/inventário";
import Armadura from "@/component/personagem/equipamentos/armadura";
import LadoDireito from "@/component/personagem/ladoDireito";
import { useState } from "react"; 
import { NameInput } from "@/component/personagem/name";
import AuthContent from "@/Context/AuthContext";
import { useRouter } from "next/router";
import { useProjectStore } from "@/store/project";

export interface Comitiva {
    player_id: string;
    project_id: string;
    ano: string;
    estacao: string;
    jornada_de: string;
    destino: string;
    dias_de_viagem: string;
    nome: string;
    papel: string;
    fadiga_da_viagem: string;
    ponei_1: string;
    p1_vigor: string;
    ponei_2: string;
    p2_vigor: string;
    ponei_3: string;
    p3_vigor: string;
    diario: string;
}
  
export default function SectionApp(){


    const [ newCaracter, setNewCaracter ] = useState({})

    const { project } = useProjectStore()

    const router = useRouter();
    const { playerId } = router.query;

    const [ comitiva, setNewComitiva ] = useState<Comitiva>({
        player_id: '',
        project_id: '',
        ano: '',
        estacao: '',
        jornada_de: '',
        destino: '',
        dias_de_viagem: '',
        nome: '',
        papel: '',
        fadiga_da_viagem: '',
        ponei_1: '',
        p1_vigor: '',
        ponei_2: '',
        p2_vigor: '',
        ponei_3: '',
        p3_vigor: '',
        diario: ''
      })
    
    const [ changes, setChanges ] = useState(false)

    const searchCaracter = async () => {
        try{
            const response = await axiosInstance.get(`/player/caracter/${playerId}`)
            const data = await response.data
            setNewCaracter({...data})
            searchComitiva(data.id)

        }catch(err){
            console.error(err)
        }
    }

    const searchComitiva = async (id: string) => {
        try{
            const response = await axiosInstance.get(`/player/comitiva/${id}`)
            const data = await response.data
            setNewComitiva({...data})

        }catch(err){
            console.error(err)
        }
    }

    const changePlayer2 = async (data: any) => {

    }
    
    const changePlayer = () => setChanges(true)

    const { data, isLoading, isError } = useQuery('caracter', async () => {
        searchCaracter()
    },{
        enabled: !!playerId
    })

    return (
        <AuthContent>
            {newCaracter !== undefined && (
            <main className={styles.main}>

                <NameInput newCaracter={newCaracter} changePlayer={changePlayer} changes={changes} changePlayer2={changePlayer2} setNewCaracter={setNewCaracter}></NameInput>

                <div className={styles.alignFlex}>
                    <div className={styles.fundoEsquerdo}>

                        <BlocoPrincipal changePlayer={changePlayer} newCaracter={newCaracter} setNewCaracter={setNewCaracter}></BlocoPrincipal>

                        <div className={styles.testesOrganizacao}>
                            <Forca changePlayer={changePlayer} newCaracter={newCaracter} setNewCaracter={setNewCaracter}></Forca>
                            <Coracao changePlayer={changePlayer} newCaracter={newCaracter} setNewCaracter={setNewCaracter}></Coracao>
                            <Persuasao changePlayer={changePlayer} newCaracter={newCaracter} setNewCaracter={setNewCaracter}></Persuasao>
                        </div>

                        <div className={styles.barra}></div>

                        <div className={styles.inventarioOrganizacao}>
                            <Inventario></Inventario>

                            <div className={styles.barraVertical}></div>

                            <Armadura changePlayer={changePlayer} newCaracter={newCaracter} setNewCaracter={setNewCaracter}></Armadura>
                        </div>

                    </div>
                    <div className={styles.fundoDireito}>

                        <LadoDireito changePlayer={changePlayer} newCaracter={newCaracter} setNewCaracter={setNewCaracter}></LadoDireito>
                    </div>

                </div>

                <div className={styles.barraInicial}></div>


            </main>
            )}
        </AuthContent>
    )
}