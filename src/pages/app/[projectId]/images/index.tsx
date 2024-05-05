import MenuPrincipal from "@/component/menu";
import AuthContent from "@/Context/AuthContext";
import ProjectContext from "@/Context/projectContext";
import styles from "./images.module.css"
import { io } from 'socket.io-client';
import { token } from '@/services/takeToken';
import { URL } from '@/services/baseURL';
import { FaRegFileImage } from "react-icons/fa6";
import { useProjectStore } from "@/store/project";
import { useEffect, useState } from "react";
import PopUpImage from "@/component/imagesComp/popupUploadImage";
import { axiosInstance } from "@/services/axiosInstance";
import PerImage from "@/component/imagesComp/perImage";
import { text } from "stream/consumers";

export interface MasterImage{
    id: string
    name: string
    type: string
    image_name: string
    project_id: string
    player_visible: boolean 
    is_active: boolean
    created_at: string
}

const socket = io(URL, {
    auth: {
        token: token
    }
})

interface Payload {
    id?: string
    text: string
    room: string
}

export default function ImagesMaster(){

    const { project } = useProjectStore();
    const [ pupUp, setPupUp ] = useState(false)

    const [ pupUpEditImage, setPupEditUpImage ] = useState(false)
    const [ grandImage, setGrandImage ] = useState("")

    const [ typeImage, setTypeImage ] = useState("")
    const [ imagesPerType, setImagesPerType ] = useState<MasterImage[]>([])

    const [ modalImagem, setModalImagem ] = useState(false)
    const [ imagemGrande, setImagemGrande ] = useState("")

    const [ modal, setModal ] = useState(false)

    const getImageType = async (type: string) => {
        if(project[0] === undefined || type === ""){
            return
        }
        try{
            const response = await axiosInstance(`images/master-project/${project[0].id}/${type}`)
            const data = await response.data
            setImagesPerType(data)
        }catch(err){
            console.error(err)
        }
    }

    const removeImage =  async (id: string, index: number, type: string) => {
        try{
            await axiosInstance.delete(`images/delete-master-project/${id}`)
            getImageType(type)
        }catch(err){
            console.error(err)
        }
    }

    const openImage = async (image: string) => {
        setModalImagem(true)
        setImagemGrande(image)
    }

    const addPlayer = async (att: boolean, type: string) => {
        try{
            await axiosInstance.patch(`images/update-master-project/${grandImage}`, {"player_visible": att})
            setModal(false)
            getImageType(type)
        }catch(err){

            console.error(`Algo deu errado: ${err}`)
        }
    }

    const attImage = async (id: string, type: boolean) => {
        try{
            const newBody = {
                is_active: type,
            }
            await axiosInstance.patch(`images/update-master-project/${id}`, {...newBody})
        }catch(err){

            console.error(`Algo deu errado: ${err}`)
        }
    }

    async function sendImage(name: string, id: string, type: boolean, typeSearch: string) {
        let message: Payload = {
            room: project[0].id,
            text: name
        };
        socket.emit('msgChangeImage', message); 
        await attImage(id, type)
        setModal(false)
        getImageType(typeSearch)
    }


    useEffect(() => {
        async function joinChatRoom() {
            if (project[0] && project[0].id) {
                socket.emit('joinRoom', project[0].id);
            } else {
            }
        }
    
        async function setupSocket() {
            socket.connect();
            socket.on('connect', joinChatRoom);
        }
    
        setupSocket();
    
        return () => {
            socket.disconnect();
            socket.off('connect', joinChatRoom);
        };
    }, [socket, project]);

    return (
        <AuthContent>
          <ProjectContext>
              <MenuPrincipal>
                  <main className={styles.main} style={{flexGrow: 1}}>

                        <div className={styles.headerImageJust}>
                            <div className={styles.headerImage}>
                                <p className={`${styles.headerText} ${typeImage === "lugares" ? styles.choose : styles.att}`} onClick={() => {
                                    getImageType("lugares")
                                    setTypeImage("lugares")
                                }}>Lugares</p>
                                <p className={`${styles.headerText} ${typeImage === "pessoas" ? styles.choose : styles.att}`} onClick={() => {
                                    getImageType("pessoas")
                                    setTypeImage("pessoas")
                                }}>Pessoas</p>
                                <p className={`${styles.headerText} ${typeImage === "criaturas" ? styles.choose : styles.att}`} onClick={() => {
                                    getImageType("criaturas")
                                    setTypeImage("criaturas")
                                }}>Criaturas</p>
                                <p className={`${styles.headerText} ${typeImage === "mapa" ? styles.choose : styles.att}`} onClick={() => {
                                    getImageType("mapa")
                                    setTypeImage("mapa")
                                }}>Mapa</p>
                            </div>

                            <FaRegFileImage onClick={() => setPupUp(true)} className={styles.cursor}/>
                        </div>

                        <div className={styles.backgroundImage}>
                            {imagesPerType[0] !== undefined ? (imagesPerType.map((cada, index) => (
                                <div key={cada.id} className={styles.ImageBlock}>
                                    <PerImage cada={cada} setGrandImage={setGrandImage} setModal={setModal} modal={modal} openImage={openImage}></PerImage>
                                    {modal && grandImage === cada.id && (
                                        <div className={styles.modal}>
                                            {cada.is_active ? <p className={styles.selectModal} onClick={() => sendImage("", cada.id, false, cada.type)}>Desativar</p> : <p className={styles.selectModal} onClick={() => sendImage(cada.image_name, cada.id, true, cada.type)}>Tornar Ativa</p> }
                                            {cada.player_visible ? <p className={styles.selectModal} onClick={() => addPlayer(false, cada.type)}>Retirar do player</p> : <p className={styles.selectModal} onClick={() => addPlayer(true, cada.type)}>Adicionar para o player</p>}
                                            
                                            <p className={styles.selectModal} onClick={() => {
                                                setPupEditUpImage(true)
                                                setModal(false)
                                            }}>Editar Imagem</p>
                                            <p className={styles.selectModal} onClick={() => {
                                                removeImage(cada.id, index, cada.type)
                                                setModal(false)
                                            }}>Apagar Imagem</p>
                                            <p className={styles.selectModal} onClick={() => setModal(false)}>Fechar</p>
                                        </div>
                                    )}
                                </div>
                            ))
                            ) : (
                                <p>Nenhuma imagem encontrada</p>
                            )}
                        </div>
                        
                        {pupUp && <PopUpImage projectId={project[0].id} setPupUp={setPupUp}></PopUpImage>}
                        {pupUpEditImage && <PopUpImage projectId={project[0].id} setPupEditUpImage={setPupEditUpImage} setPupUp={setPupUp} editImage={true} grandImage={grandImage}></PopUpImage>}
                        {modalImagem && <div className={styles.fundoImagemGrande} onClick={() => setModalImagem(false)}><img src={imagemGrande} className={styles.imagemGrande} alt="Image em grande tamanho" /></div>}
                  </main>
              </MenuPrincipal>
          </ProjectContext>
        </AuthContent>
    )
}