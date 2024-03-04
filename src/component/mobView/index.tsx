import { useState } from 'react'
import styles from './mobview.module.css'
import { DELETE, PUT } from '@/function/api';
import { FaUserAstronaut } from 'react-icons/fa';

export default function MobView({props, getUsado, setViewMob}: any){

    const [ mob, setMob ] = useState(props)
    const [ dano, setDano ] = useState(0)

    const handleKeyPress = async (event: any) => {
        if (event.key === 'Enter') {
            console.log(mob)
            await PUT(mob, 'usando', mob.id)
            getUsado()
        }
    };

    const damage = async () => {
        const danoAtual = dano
        setDano(0)
        const newLife = mob.endurance - danoAtual
        if(newLife <= 0){
            const confirmarExclusao = window.confirm("Tem certeza que deseja excluir este mob?");
            if(confirmarExclusao){
                await DELETE(mob.id, 'usando')
                getUsado()
                setViewMob(false)
                return
            }
            return
        }
        const attMob = {...mob, endurance: newLife}

        setMob(attMob)

        await PUT(attMob, 'usando', mob.id)
        getUsado()
        return
    }

    return (
        <>
            <div style={{display: 'flex', gap: '25px'}} >
                <p style={{fontSize: '25px', fontWeight: '700'}}>{props.name}</p>
                <input className={styles.inputNicks} name='nick'placeholder='Nickname' value={mob.nickname} type="text" onChange={(e) => setMob({...mob, nickname: e.target.value})} onKeyDown={handleKeyPress}/>
            </div>

            <div style={{display: 'flex', padding: '15px 0px'}}>
                <div style={{display: 'flex', gap: '10px'}}>
                    <img src="/raio.svg" alt="Heart Logo" />
                    <input className={styles.inputFundo} type="number" value={mob.endurance} />
                </div>
                <div style={{display: 'flex', gap: '10px'}}>
                    <img src="/health.svg" alt="Sword Logo" />
                    <input className={styles.inputFundo} type="number" value={mob.endurance} />
                </div>
                <div style={{display: 'flex', gap: '10px'}}>
                    <img src="/sword.svg" alt="Sword Logo" />
                    <input className={styles.inputFundo} type="number" value={mob.dice} />
                </div>
                <div style={{display: 'flex', gap: '10px'}}>
                    <img src="/Vector.svg" alt="Shield Logo" />
                    <input className={styles.inputFundo} type="number" value={mob.endurance} />
                </div>
            </div>

            <table style={{padding: '25px 0px'}}>
                <tbody>
                    <tr style={{display: 'flex'}}>
                        <th className={styles.cedulaTableName}>Nível de Proeficiênca </th>
                        <th className={styles.cedulaTableR}> {props.atributeLevel}</th>
                    </tr>
                    <tr style={{display: 'flex'}}>
                        <th className={styles.cedulaTableName}>Ataques</th>
                        <th className={styles.cedulaTableR}> {props.might}</th>
                    </tr>
                    
                </tbody>
            </table>


            <div style={{fontSize: '20px', fontWeight: '700', padding:'15px 0px'}}>
                <div style={{display: 'flex'}}>
                    <div style={{padding:'25px 0px'}}>

                        <label style={{display: 'flex',flexDirection: 'column', fontWeight: '300',fontSize: '17px'}} htmlFor="dano">Dano</label>
                        <input className={styles.inputRetirar} name='dano' type="number" value={dano} onChange={(e) => setDano(e.target.value)}/>

                        <div style={{marginTop: '15px'}}>
                            <button onClick={damage} className={styles.botaoCalcular}>Calcular</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}