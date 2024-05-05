import { axiosInstance } from "@/services/axiosInstance";
import styles from "./comitiva.module.css"
import { useCaracterStore } from "@/store/caracter";
import { useState } from "react";
import { useQuery } from "react-query";
import CheckBoxEstrutura from "../checkbox/checkBoxEstrutura";
import { useUsersStore } from "@/store/users/Index";
import { Comitiva } from "@/pages/section";
import OtherPlayers from "./otherplayers";

export default function Companhia({comitiva, setNewComitiva, setChanges}: any) {

    const { caracter } = useCaracterStore()
    const { users } = useUsersStore()
    const [ myImage, setMyImage ] = useState('')

    const isName = false

    const [ otherPlayers, setOtherPlayers ] = useState([])

    const getImage = async () => {
        try{
            const novaResponse = await axiosInstance.get(`/upload/get/player-${caracter[0].id}`);
            const novaBase64Image = Buffer.from(novaResponse.data, 'binary').toString('base64');
            setMyImage(novaBase64Image)

        }catch(err){
            console.error(err)
        }
        
    };

    const getAllComitiva = async () => {
        try{
            const response = await axiosInstance.get(`/player/all-comitiva/${users[0].project_id}`);
            const responseData = await response.data
            const data = responseData.filter((cada: Comitiva) => cada.player_id !== caracter[0].id)
            setOtherPlayers(data)

        }catch(err){
            console.error(err)
        }
        
    };

    const { data, isLoading } = useQuery("myImagee", () => {
        getImage()
        getAllComitiva()
    },{
        enabled: caracter[0] !== undefined
    })

    if(isLoading){
        return <p>Carregando...</p>
    }

    return (
        <div className={styles.companhia}>
            <p className={styles.nameFont}>A Companhia</p>

            <div className={styles.alignImage}>
                <div className={styles.image}>
                <img className={styles.image} src={`data:image/jpeg;base64,${myImage}`}></img>
                </div>
                <div className={styles.labelInput} style={{width: "30%"}}>
                    <label htmlFor="nome" className={styles.label}>Nome</label>
                    <input type="text" name='nome' placeholder='Digite aqui...' value={comitiva.nome} onChange={(e) => {
                        if(isName){
                            return
                        }
                    }} className={styles.input} />
                </div>
                <div className={styles.labelInput} style={{width: "30%"}}>
                    <label htmlFor="papel" className={styles.label}>Papel de Jornada</label>
                    <input type="text" name='papel' placeholder='Digite aqui...' value={comitiva.papel} onChange={(e) => {
                        setNewComitiva({...comitiva, papel: e.target.value})
                        setChanges(true)
                    }} className={styles.input} />
                </div>
                
                {caracter[0] !== undefined && (
                    <CheckBoxEstrutura dadosGerais={comitiva.fadiga_da_viagem} setNewCaracter={setNewComitiva} changedDado={"fadiga_da_viagem"} newCaracter={comitiva} caracter={caracter[0].id} type={"comitiva"} number={7} isCompany={true}></CheckBoxEstrutura>
                )}
            </div>

            {otherPlayers[0] !== undefined && otherPlayers.map((cada: Comitiva) => (
                <div key={cada.id}>
                    <OtherPlayers cada={cada}></OtherPlayers>
                </div>
            ))}
                
        </div>
    )
}