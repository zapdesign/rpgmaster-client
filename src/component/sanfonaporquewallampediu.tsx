import { useState } from "react"
import { IoMdArrowDropdownCircle } from "react-icons/io";
import styles from "@/styles/Home.module.css"
import { GETALL, POST } from "@/function/api";
import { Group, Mobs } from "@/type/mobs";
import { axiosInstance } from "@/services/axiosInstance";
import { useProjectStore } from "@/store/project";
interface SanfonaWalladaProps {
    props: Group;
    listMob: (value: boolean) => void;
    getUsado: () => Promise<void>;
  }

export default function SanfonaWallada({props, listMob, getUsado}: SanfonaWalladaProps){

    const { project } = useProjectStore()

    const [ mobs, setMobs ] = useState([])
    const [ listMobs, setListMobs ] = useState(false)

      const addNewUsado = async (item: Mobs) => {
        listMob(false)
        delete item.id;
        try{
            await axiosInstance.post(`/all-monster/master/`, {...item, project_id: project[0].id, rodada: false, nickname: ''})
            getUsado()
        }catch(err){
            return console.log(err)
        }
    }

      const getMobs = async () => {
        setListMobs(true)
        try {
            const responseR = await axiosInstance.get(`/all-monster/group/${props.name}`)
            console.log(responseR.data)
            return setMobs(responseR.data)
        } catch (err) {
            return console.log(err);
        }
    }

    

    return (
        <>
            <div>
                <div className={styles.alignFlex}>
                    <p>{props.name}</p>
                    <IoMdArrowDropdownCircle style={{cursor: 'pointer'}} onClick={getMobs}/>
                </div>
                {listMobs && (
                    <div className={styles.alinMobs}>
                        {mobs[0] !== undefined && mobs.map((cada: Mobs) => (
                            <div className={styles.fundoMobs} onClick={() => addNewUsado(cada)} key={cada.id}>
                                <p>{cada.nome}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )   
}