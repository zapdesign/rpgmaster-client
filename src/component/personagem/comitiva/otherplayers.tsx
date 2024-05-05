import { axiosInstance } from "@/services/axiosInstance";
import styles from "./comitiva.module.css"
import CheckBoxEstrutura from "../checkbox/checkBoxEstrutura";
import { useEffect, useState } from "react";


export default function OtherPlayers({cada}: any) {

    const [ myImage, setMyImage ] = useState('')
    const isName = false

    const getImage = async () => {
        try{
            const novaResponse = await axiosInstance.get(`/upload/get/player-${cada.player_id}`);
            if(novaResponse.data === "Image not found"){
                setMyImage("")
                return
            }
            const novaBase64Image = Buffer.from(novaResponse.data, 'binary').toString('base64');
            setMyImage(novaBase64Image)
    
        }catch(err){
            console.error(err)
        }
        
    }

    useEffect(() => {
        getImage()
    },[])

    return (
        <div className={styles.alignImage}>
            <div className={styles.image}>
            <img className={styles.image} src={`data:image/jpeg;base64,${myImage}`}></img>
            </div>
            <div className={styles.labelInput} style={{width: "30%"}}>
                <label htmlFor="nome" className={styles.label}>Nome</label>
                <input type="text" name='nome' placeholder='Digite aqui...' value={cada.nome} onChange={(e) => {
                        if(isName){
                            return
                        }
                    }} className={styles.input} />
            </div>
            <div className={styles.labelInput} style={{width: "30%"}}>
                <label htmlFor="papel" className={styles.label}>Papel de Jornada</label>
                <input type="text" name='papel' placeholder='Digite aqui...' value={cada.papel} onChange={(e) => {
                        if(isName){
                            return
                        }
                    }} className={styles.input} />
            </div>

            <CheckBoxEstrutura dadosGerais={cada.fadiga_da_viagem} number={7} hasModify={false}></CheckBoxEstrutura>
        </div>
    )
}