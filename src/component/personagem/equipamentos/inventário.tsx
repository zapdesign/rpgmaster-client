import styles from './equipamentos.module.css'
import { axiosInstance } from '@/services/axiosInstance'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { FaPlus } from "react-icons/fa6";
import { IoTrashOutline } from "react-icons/io5";
import { useProjectStore } from '@/store/project';
import { useRouter } from 'next/router';

export interface PlayerInventory {
    id: string
    player_id: string
    equipamento_de_guerra: string
    dano: number
    ferimento: number
    carga: number
    anotacao_equipamento: string
    created_at: Date
}

export default function Inventario(){

    const { project } = useProjectStore()

    const [ equipamento, setEquipamento ] = useState<PlayerInventory[]>([])

    const router = useRouter();
    const { playerId } = router.query;

    const searchEquipament = async () => {  

        try{
            const response = await axiosInstance.get(`/player/equipament/${playerId}`)
            const data = await response.data
            setEquipamento(data)

        }catch(err){
            console.error(err)
        }
    }


    const { data, isLoading, isError } = useQuery('equipament', async () => {
        await searchEquipament()
    },{
        enabled: !!playerId
    })


    return (
        <>
            {equipamento && (

                <div className={styles.fundoEquipamento}>
                    <div className={styles.fundoFlex}>
                        <div className={styles.fundoFlex30}>
                            <p className={styles.nameFont}>Equipamento de guerra</p>
                        </div>
                        <div className={styles.fundoFlex13}>
                            <p className={styles.label}>Dano</p>
                        </div>
                        <div className={styles.fundoFlex13}>
                            <p className={styles.label}>Ferimento</p>
                        </div>
                        <div className={styles.fundoFlex13}>
                            <p className={styles.label}>Carga</p>
                        </div>
                        <div className={styles.fundoFlex30}>
                            <p className={styles.label}>Anotações</p>
                        </div>
                    </div>

                    {equipamento[0] !== undefined && equipamento.map(cada => (
                        <div key={cada.id} className={styles.fundoFlexInput}>
                            <div className={styles.fundoFlex30}>
                                <input type="text" name='escudo' placeholder='Digite aqui...' value={cada.equipamento_de_guerra} onChange={(e) => {}} className={styles.inputGuerra}/>
                            </div>
                            <div className={styles.fundoFlex13}>
                                <input type="text" name='escudo' placeholder='Digite aqui...' value={cada.dano} onChange={(e) => {}} className={styles.inputGuerra}/>
                            </div>
                            <div className={styles.fundoFlex13}>
                                <input type="text" name='escudo' placeholder='Digite aqui...' value={cada.ferimento} onChange={(e) =>  {}} className={styles.inputGuerra}/>
                            </div>
                            <div className={styles.fundoFlex13}>
                                <input type="text" name='escudo' placeholder='Digite aqui...' value={cada.carga} onChange={(e) => {}} className={styles.inputGuerra}/>
                            </div>
                            <div className={styles.fundoFlex30}>
                                <input type="text" name='escudo' placeholder='Digite aqui...' value={cada.anotacao_equipamento} onChange={(e) => {}} className={styles.inputGuerra}/>
                            </div>



                        </div>  
                    ))}

                </div>
            )}
        
        </>
    )
}