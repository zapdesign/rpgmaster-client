import { useState } from "react"
import { IoMdArrowDropdownCircle } from "react-icons/io";
import styles from "@/styles/Home.module.css"
import { GETALL, POST } from "@/function/api";
import { Mobs } from "@/type/mobs";
interface SanfonaWalladaProps {
    props: Mobs;
    listMob: (value: boolean) => void;
    getUsado: () => Promise<void>;
  }

export default function SanfonaWallada({props, listMob, getUsado}: SanfonaWalladaProps){

    const [ mobs, setMobs ] = useState([])
    const [ listMobs, setListMobs ] = useState(false)

      const get = {
          method: 'GET',
      }

      const addNewUsado = async (item: Mobs) => {
        listMob(false)
        delete item.id;
        try{
            await POST(item, 'usando')
            getUsado()
        }catch(err){
            return console.log(err)
        }
    }

      const getMobs = async () => {
        setListMobs(true)
        try {
            const responseR = await GETALL('mobs')
            const atualGroup = responseR.filter((cada: Mobs)  => Number(cada.group) === Number(props.id))
            console.log(responseR)
            return setMobs(atualGroup)
        } catch (err) {
            console.log(err);
        }
    }

    

    return (
        <>
            <div>
                <div className={styles.alignFlex}>
                    <p>{props.name}</p>
                    <IoMdArrowDropdownCircle onClick={getMobs}/>
                </div>
                {listMobs && (
                    <div className={styles.alinMobs}>
                        {mobs[0] !== undefined && mobs.map((cada: Mobs) => (
                            <div className={styles.fundoMobs} onClick={() => addNewUsado(cada)} key={cada.id}>
                                <p>{cada.name}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )   
}