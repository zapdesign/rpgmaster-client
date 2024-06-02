import { axiosInstance } from '@/services/axiosInstance';
import styles from './pupupPlayer.module.css'
import { IoMdClose, IoMdPlay } from "react-icons/io";
import { useState } from 'react';
import { toast } from 'react-toastify';
import PlayerMusicYT from '@/pages/app/[projectId]/music copy';
import { IoClose } from "react-icons/io5";

interface PopupView {
    setPopupisActive: () => void;
  }

export default function PopUpSongAdd({setPopupisActive, projectId, searchMusic}: any){

    const [ name, setName ] = useState('')
    const [ url, setUrl ] = useState('')
    const [ volume, setVolume ] = useState(1)
    const [ testAudio, setTestAudio ] = useState(false)

    const addMusic = async () => {

        if(name === '' || name.length < 4){
            toast('O nome precisa de no mínimo 4 letras..', {
                position: "bottom-center",
                autoClose: 3000,
                type: "error",
              })
              return
        }
        
        if(volume < 0 || volume > 1){
            toast('O Volume precisa ser entre 0 e 1...', {
                position: "bottom-center",
                autoClose: 3000,
                type: "error",
              })
            return
        }


        try{
            await axiosInstance.post(`songs`, {
                name: name,
                url: url,
                volume: volume,
                project_id: projectId
              })

              searchMusic()
            }catch(err: any){
            console.error(err)
        }
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <div className={styles.alinharHeader}>
                    <p style={{fontSize: '18px', fontWeight: '600'}}>Adicionar novo som</p>
                    <IoMdClose style={{cursor: 'pointer'}} onClick={()=> setPopupisActive(false)}/>
                </div>

                    <input className={styles.input} type="text" value={name} onChange={(e) => {
                      setName(e.target.value)
                      }} placeholder='Nome do Som'/>
                    <input className={styles.input} type="text" value={url} onChange={(e) => {
                      setUrl(e.target.value)
                      }} placeholder='URL do Som'/>
                    <input className={styles.input} type="number" value={volume} onChange={(e) => {
                      setVolume(Number(e.target.value))
                      }} placeholder='Volume do Som'/>
                      <div style={{display: 'flex', gap: 15}}>
                        {testAudio ? <IoClose style={{color: "white",cursor: "pointer"}} onClick={() => setTestAudio(false)}/> : <IoMdPlay style={{color: "white",cursor: "pointer"}} onClick={() => setTestAudio(true)}></IoMdPlay>} <p>Testar Som</p>
                      </div>
                    <button onClick={addMusic} className={styles.salvar}>Adicionar</button>

                    {testAudio && (
                      <div style={{display: "none"}}>
                        <PlayerMusicYT url={url} volume={volume}></PlayerMusicYT>
                      </div>
                    )}
            </div>

        </div>
    )

}