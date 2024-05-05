import { axiosInstance } from '@/services/axiosInstance';
import styles from './chat.module.css'
import { useEffect, useState } from 'react';

export default function ImageChat({cada}: any) {

    const [ image, setImage ] = useState("")

    function getFirstLetter(name: string) {
        return name.charAt(0).toUpperCase();
    }

    const getImage = async () => {
        try{
            const novaResponse = await axiosInstance.get(`/upload/get/player-${cada.player_id}`);
            const novaBase64Image = Buffer.from(novaResponse.data, 'binary').toString('base64');
            setImage(novaBase64Image)

        }catch(err){
            console.error(err)
        }
        
    };

    useEffect(() => {
        getImage()
    }, [])

    return (
        <>
         {cada.player_id == "01" ? 
         <div className={styles.fundoFotoChat}>
             <img height="100%"  width="100%" src="/logoBranca.svg" alt='Logo chat'></img>
         </div> : 
         <div className={styles.fundoFotoChat}>
                  <p>{getFirstLetter(cada.name)}</p>
          </div> 
        //  image == "SW1hZ2Ugbm90IGZvdW5k" ? 
        //  <div className={styles.fundoFotoChat}>
        //         <p>{getFirstLetter(cada.name)}</p>
        // </div> : 
        // <div className={styles.fundoFotoChat}>
        //     <img height="100%"  width="100%" src={`data:image/jpeg;base64,${image}`} alt='Logo chat'></img>
        // </div>
         } 

        </>
    )
}