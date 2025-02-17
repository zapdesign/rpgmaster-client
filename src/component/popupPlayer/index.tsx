import { axiosInstance } from '@/services/axiosInstance';
import styles from './pupupPlayer.module.css'
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';
import { toast } from 'react-toastify';

interface PopupView {
    setPopupisActive: () => void;
  }

export default function PopupPlayerAdd({setPopupisActive, projectId, searchPlayers}: any){

    const isValidEmail = (email: string): boolean => {
        // Regex para validar o formato de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

    const [ email, setEmail ] = useState('')
    const [ name, setName ] = useState('')

    const addPlayer = async () => {

        if(name === '' || name.length < 4){
            toast('O nome precisa de no mínimo 4 letras..', {
                position: "bottom-center",
                autoClose: 3000,
                type: "error",
              })
              return
        }

        if(!isValidEmail(email)){
            toast('Preencha o email.', {
              position: "bottom-center",
              autoClose: 3000,
              type: "error",
            })
      
            return
          }

        try{

            await axiosInstance.post(`player`, {
                name: name,
                email: email,
                password: "912931923912",
                project_id: projectId
            })

            toast('Criado com sucesso', {
                position: "bottom-center",
                autoClose: 3000,
                type: "success",
              })
              setEmail('')
              setName('')
            searchPlayers()

        }catch(err){
            console.error(err)
            toast('Algo deu errado...', {
                position: "bottom-center",
                autoClose: 3000,
                type: "error",
              })
        }
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <div className={styles.alinharHeader}>
                    <p style={{fontSize: '18px', fontWeight: '600'}}>Adicionar novo Jogador</p>
                    <IoMdClose style={{cursor: 'pointer'}} onClick={()=> setPopupisActive(false)}/>
                </div>

                    <input className={styles.input} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Nome do Jogador'/>
                    <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email do Jogador'/>

                    <button onClick={addPlayer} className={styles.salvar}>Adicionar Jogador</button>
            </div>

        </div>
    )

}