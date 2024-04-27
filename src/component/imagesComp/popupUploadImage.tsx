import { axiosInstance } from '@/services/axiosInstance';
import styles from './popupimage.module.css'
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';
import { toast } from 'react-toastify';
const MAX_FILE_SIZE = 1 * 1024 * 1024;


interface PopupView {
    setPopupisActive: () => void;
}

export default function PopUpImage({ setPupUp, projectId, setPupEditUpImage, editImage = false, grandImage }: any) {

    const [file, setFile] = useState<File | null>(null)
    const [fileName, setFileName] = useState("")
    const [fileType, setFileType] = useState("lugares") 
    const [playerAcess, setPlayerAcess] = useState("false") 

    const handleFileChange = (evento: any) => {
        const arquivo = evento.target.files[0];
        if (arquivo) {
            if (arquivo.size > MAX_FILE_SIZE) {
                alert('O tamanho do arquivo excede o limite permitido.');
                return
            }

            setFile(arquivo)
        }
    }

    const addImage = () => {

        if(file === null || fileName === ""){
            return
        }

        const formData = new FormData();
        formData.append('name', fileName);
        formData.append('type', fileType);
        formData.append('player_visible', playerAcess)
        formData.append('project_id', projectId)
        formData.append('file', file); 

        try{

            axiosInstance.post(`upload/master-image/`, formData)
            setFile(null)
            setFileName("")
        }catch(err){

            console.error(`Algo deu errado: ${err}`)
        }
    }

    const attImage = async () => {
        if(fileName === ''){
            return
        }
        try{
            const newBody = {
                name: fileName,
                type: fileType
            }
            await axiosInstance.patch(`images/update-master-project/${grandImage}`, {...newBody})
            setFileName("")
            setPupEditUpImage(false)
        }catch(err){

            console.error(`Algo deu errado: ${err}`)
        }
    }

    if(editImage){
        return (
            <div className={styles.overlay}>
            <div className={styles.popup}>
                <div className={styles.alinharHeader}>
                    <p style={{ fontSize: '18px', fontWeight: '600' }}>Atualizar Imagem</p>
                    <IoMdClose style={{ cursor: 'pointer' }} onClick={() => {
                        setPupEditUpImage(false)
                    }} />
                </div>

                <input className={styles.input} type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} placeholder='Nome da Imagem' />

                <select name="type" id="tipo-da-imagem" className={styles.input} onChange={(e) => setFileType(e.target.value)}>
                    <option value="lugares">Lugar</option>
                    <option value="pessoas">Pessoa</option>
                    <option value="criaturas">Criatura</option>
                    <option value="mapa">Mapa</option>
                </select>

                <button className={styles.salvar} onClick={attImage}>Atualizar</button>
            </div>

        </div>
        )
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <div className={styles.alinharHeader}>
                    <p style={{ fontSize: '18px', fontWeight: '600' }}>Adicionar Imagem</p>
                    <IoMdClose style={{ cursor: 'pointer' }} onClick={() => {
                        setPupUp(false)
                    }} />
                </div>

                <input className={styles.input} type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} placeholder='Nome da Imagem' />

                <select name="type" id="tipo-da-imagem" className={styles.input} onChange={(e) => setFileType(e.target.value)}>
                    <option value="lugares">Lugar</option>
                    <option value="pessoas">Pessoa</option>
                    <option value="criaturas">Criatura</option>
                    <option value="mapa">Mapa</option>
                </select>
                <label htmlFor="player">Visível para o player</label>
                <select name="player" id="playerAcess" className={styles.input} onChange={(e) => setPlayerAcess(e.target.value)}>
                    <option value="false">Não</option>
                    <option value="true">Sim</option>
                </select>
                <input type="file" style={{ cursor: 'pointer' }} accept="image/png, image/jpeg" placeholder='Nome da Imagem' onChange={handleFileChange} />

                <button className={styles.salvar} onClick={addImage}>Adicionar Imagem</button>
            </div>

        </div>
    )

}