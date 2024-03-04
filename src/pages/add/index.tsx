import { useEffect, useState } from "react"
import styles from "./add.module.css"
import { FaRegTrashAlt } from "react-icons/fa";
import { Mobs } from "@/type/mobs"
import { DELETE, GETALL, POST } from "@/function/api";
import MenuPrincipal from "@/component/menu";


export default function Add(){

    const [newMob, addNewMob ] = useState<Mobs>({
        name: "",
        nickname: '',
        group: "",
        dice: 0,
        diceNumber: 0,
        atributeLevel: 0,
        endurance: 0,
        might: 0,
        block: 0,
        hate: 0,
        armor: 0,
        combat: '',
        habilities: '',
        picture: '',
        rodada: false
    })
    const [ mobs, setMobs ] = useState([])

    const addNovoMob = async () => {
        console.log(mobs)
       for (const key in newMob) {
            if (key !== 'nickname' && newMob[key as keyof Mobs] === '') {
                alert('Por favor, preencha todos os campos, exceto o campo "Nickname".');
                return;
            }
        }
        await POST(newMob, 'mobs')
        getMobs()
    }

    const getMobs = async () => {
        const response = await GETALL('mobs')
        setMobs(response)
    }

    const excluirMob = async (id: number) => {
        const confirmarExclusao = window.confirm("Tem certeza que deseja excluir este mob?");
        if(confirmarExclusao){
            await DELETE(id, 'mobs');
            getMobs()
        }
    }

    useEffect(() => {
        getMobs()
    }, []) 

    return (
        <MenuPrincipal>
        <main style={{flexGrow: 1, margin: '25px 50px'}}>
            <h1>Adicione um novo Enemigo...</h1>

            <div className={styles.alinharTela}>

                <div  className={styles.forms}>
                    <input className={styles.inputs} type="text" placeholder="Nome" onChange={(e) => addNewMob({ ...newMob, name: e.target.value })}/>
                    <input className={styles.inputs} type="number" placeholder="Dado" onChange={(e) => addNewMob({ ...newMob, dice: Number(e.target.value) })}/>
                    <input className={styles.inputs} type="number" placeholder="Quantidade de Dados" onChange={(e) => addNewMob({ ...newMob, diceNumber: Number(e.target.value) })}/>
                    {/* APELIDO */}
                    <select className={styles.inputs} name="group" onChange={(e) => addNewMob({ ...newMob, group: e.target.value })}>
                        <option value="">Selecione o grupo</option>
                        <option value="1">Orcs</option>
                        <option value="3">Trolls</option>
                        <option value="4">Homens</option>
                        <option value="2">Lobos</option>
                        <option value="5">Mortos-vivos</option>
                    </select>
                    <input className={styles.inputs} type="text" placeholder="Nível de Atributo" onChange={(e) => addNewMob({ ...newMob, atributeLevel: Number(e.target.value) })}/>
                    <input className={styles.inputs} type="number" placeholder="Vida" onChange={(e) => addNewMob({ ...newMob, endurance: Number(e.target.value) })}/>
                    <input className={styles.inputs} type="number" placeholder="Coragem" onChange={(e) => addNewMob({ ...newMob, might: Number(e.target.value) })}/>
                    <input className={styles.inputs} type="number" placeholder="Ódio" onChange={(e) => addNewMob({ ...newMob, hate: Number(e.target.value) })}/>
                    <input className={styles.inputs} type="number" placeholder="Bloqueio" onChange={(e) => addNewMob({ ...newMob, block: Number(e.target.value) })}/>
                    <input className={styles.inputs} type="number" placeholder="Armadura" onChange={(e) => addNewMob({ ...newMob, armor: Number(e.target.value) })}/>
                    <input className={styles.inputs} type="text" placeholder="Proficiência de Combate" onChange={(e) => addNewMob({ ...newMob, combat: e.target.value })}/>
                    <input className={styles.inputs} type="text" placeholder="Habilidades" onChange={(e) => addNewMob({ ...newMob, habilities: e.target.value })}/>
                    <input className={styles.inputs} type="text" placeholder="Imagem" onChange={(e) => addNewMob({ ...newMob, picture: e.target.value })}/>
                    <button className={styles.salvar} onClick={addNovoMob}>Salvar novo</button>
                </div>

                <div className={styles.listMobs}>
                    {mobs[0] !== undefined && mobs.map((cada: Mobs) => (
                        <div className={styles.fundoMob} key={cada.id}>
                            <p>{cada.name}</p>


                            <FaRegTrashAlt className={styles.apagarButton} onClick={() => cada.id !== undefined && excluirMob(cada.id)}/>

                        </div>
                    ))}
                </div>  
                
            </div>
        </main>
    </MenuPrincipal>
    )
}