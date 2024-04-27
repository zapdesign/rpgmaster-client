import { axiosInstance } from "@/services/axiosInstance";
import styles from "./perImage.module.css"
import { useEffect, useState } from "react";
import { MdMore } from "react-icons/md";



export default function PerImage({cada, setGrandImage, setModal, openImage}: any) {

    const [image, setImage ] = useState(cada.name)

    

    const getImage = async () => {
        try{
            const response = await axiosInstance(`upload/get/${cada.image_name}`)
            const data = await response.data
            const novaBase64Image = Buffer.from(data.data, 'binary').toString('base64');
            setImage(novaBase64Image)
        }catch(err){
            console.error(err)
        }
    }

    useEffect(() => {
        getImage()
    },[])

    return (
        <>
            <img width="100%" height="150px" className={`${styles.image} ${cada.player_visible ? styles.hasAcess : styles.att}`} onClick={() => {
                if(cada.name === image) return
                openImage(`data:image/jpeg;base64,${image}`)
            }} src={`data:image/jpeg;base64,${image}`}/>
            <div className={styles.fundoName}>
                <p>{cada.name}</p>
                <MdMore className={styles.icon} onClick={() => {
                    setModal(true)
                    setGrandImage(cada.id)
                }}/>
            </div>
            
        </>
    )
}