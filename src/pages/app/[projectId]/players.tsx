import AuthContent from "@/Context/AuthContext";
import ProjectContext from "@/Context/projectContext";
import MenuPrincipal from "@/component/menu";
import { axiosInstance } from "@/services/axiosInstance";
import { URLplayer } from "@/services/baseURL";
import { useProjectStore } from "@/store/project";
import styles from "@/styles/Home.module.css"
import { useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa6";
import PopupPlayerAdd from "@/component/popupPlayer";
import { useQuery } from "react-query";
import { IoTrashOutline } from "react-icons/io5";
import Link from "next/link";


interface Player{
    id: string
    name: string
    email: string
    project_id: string
}


export default function Players(){

    const { project } = useProjectStore()

    const [ newPass, setNewPass ] = useState('')
    const [ popupIsActive, setPopupisActive ] = useState(false)

    const [ players, setPlayers ] = useState([])

    const handleCopyClick = () => {
        navigator.clipboard.writeText(`${URLplayer}/login/${project[0].id}`)
            .then(() =>  toast('Copiado com sucesso', {
                position: "bottom-center",
                autoClose: 3000,
                type: "success",
              }));
    };


    const changePass = async () => {

        if(newPass === '' || newPass.length < 4){
            toast('Sua senha é muito curta', {
                position: "bottom-center",
                autoClose: 3000,
                type: "success",
              })
            return
        }
        try{  
    
            await axiosInstance.patch(`player/pass/${project[0].id}`, {
                password: newPass
            })
            toast('Alterado com sucesso', {
                position: "bottom-center",
                autoClose: 3000,
                type: "success",
              })

              setNewPass('')

        }catch(err: any){
            console.log(err)
        }   
    }

    const searchPlayers = async () => {
        try{
            const response = await axiosInstance.get(`player/all/${project[0].id}`)
            const data = await response.data
            setPlayers(data)

        }catch(err){
            console.error(err)
        }
    }

    const delPlayer = async (id: string) => {
        const confirmarExclusao = window.confirm("Tem certeza que deseja excluir este usuário?");
            if(confirmarExclusao){
                await axiosInstance.delete(`/player/pass/${id}`)
                searchPlayers()
                return
            }
        return
    }

    const { data, isLoading, isError } = useQuery('players', async () => {
        await searchPlayers()
    }, {
        enabled: !!project[0]
    })
    
    return (
        <AuthContent>
            <ProjectContext>
                <MenuPrincipal>
                    <main className={styles.main} style={{flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '35px'}}>
                        <h1>Seus Jogadores</h1>

                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            {players[0] !== undefined && (
                                <div style={{display: 'flex', alignItems: 'center', gap: '25px'}}>
                                    <Link href={`${URLplayer}/login/${project[0].id}`} target="_blank">Compartilhe seu Link</Link>
                                    <FaRegCopy style={{cursor: 'pointer'}} onClick={handleCopyClick}/>
                                </div>
                            )}

                            <div style={{display: 'flex', alignItems: 'center', gap: '25px'}}>
                                <input type="text" placeholder="Sua senha aqui" value={newPass} onChange={e => setNewPass(e.target.value)} style={{padding: '5px 15px'}}/>
                                <button className={styles.salvar} onClick={changePass} style={{margin: '0'}}>Alterar Senha</button>
                            </div>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <button className={styles.salvar} onClick={() => setPopupisActive(true)} style={{padding: '10px 10px', margin: '0', borderRadius: '100px', alignItems: 'center', display: "flex"}}><FaPlus/></button>
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column', gap: '25px'}}>
                            {players[0] !== undefined && players.map((cada: Player) => (
                                <div key={cada.id} style={{display: 'flex', alignItems: 'center', justifyContent: "space-between"}}>
                                    <div style={{width: "80%", display: "flex"}}>
                                        <Link href={`/app/${project[0].id}/${cada.id}/player`} target="_blank" style={{width: "30%"}}><p>{cada.name}</p></Link>
                                        <p>{cada.email}</p>
                                    </div>
                                    <IoTrashOutline onClick={() => delPlayer(cada.id)}  style={{cursor: "pointer"}}/>
                                </div>
                            ))}
                        </div>

                        {popupIsActive && <PopupPlayerAdd setPopupisActive={setPopupisActive} projectId={project[0].id} searchPlayers={searchPlayers}></PopupPlayerAdd>}

                    </main>
                </MenuPrincipal>
            </ProjectContext>
        </AuthContent>
    )
}