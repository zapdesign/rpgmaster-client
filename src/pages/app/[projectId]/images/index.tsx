import MenuPrincipal from "@/component/menu";
import AuthContent from "@/Context/AuthContext";
import ProjectContext from "@/Context/projectContext";
import styles from "./images.module.css"
import { FaRegFileImage } from "react-icons/fa6";
import { useProjectStore } from "@/store/project";
import { useEffect, useState } from "react";
import PopUpImage from "@/component/imagesComp/popupUploadImage";
import { axiosInstance } from "@/services/axiosInstance";
import PerImage from "@/component/imagesComp/perImage";

export interface MasterImage{
    id: string
    name: string
    type: string
    image_name: string
    project_id: string
    player_visible: string 
    created_at: string
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

    useEffect(() => {
        getImageType("lugares")
        setTypeImage("lugares")
    }, [])


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
                                            <p className={styles.selectModal}>Tornar Ativa</p> 
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