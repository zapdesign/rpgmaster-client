import { useState } from 'react'
import styles from './ladoDireto.module.css'
import { axiosInstance } from '@/services/axiosInstance'
import { useQuery } from 'react-query'
import { useProjectStore } from '@/store/project';
import { useRouter } from 'next/router';
const MAX_FILE_SIZE = 1 * 1024 * 1024;

export default function LadoDireito({ changePlayer, newCaracter, setNewCaracter }: any) {

    const { project } = useProjectStore()

    const router = useRouter();
    const { playerId } = router.query;

    const [ imagePlayer, setImagePlayer ] = useState("")


    const changeBoxApi = async (data: any) => {

        try {

            await axiosInstance.patch(`player/caracter/${newCaracter.id}`, {
                ...data
            })

        } catch (err) {
            console.error(err)
        }
    }

    const getImage = async () => {
        try{
            const response = await axiosInstance.get(`/upload/get/player-${newCaracter.id}`);
            const data = await response.data
            setImagePlayer(data)

        }catch(err){
            console.error(err)
        }
        
    };

    const changeCheckBox = (type: boolean, name: string) => {
        setNewCaracter({ ...newCaracter, [name]: type })
        changeBoxApi({ [name]: type })
        return
    };

    const { data, isLoading, isError } = useQuery('caracterImage', async () => {
        getImage()
        
    },{
        enabled: newCaracter.id !== undefined
    })



    return (
        <div className={styles.fundoDireito}>
            {playerId !== undefined && (
                <div className={styles.fundoFoto}>
                    <div className={styles.fundoFoto}>
                        <img height="100%"  width="100%" style={{cursor: 'pointer'}} className={styles.imagePlayer} src={`${imagePlayer}`}></img>
                    </div>
                </div>
            )}

            <div className={styles.fundoFlex}>
                <div className={styles.fundoLosanguloInicial}>
                    <p className={styles.textoPrincipal}>Pontos de <br></br>aventura</p>
                    <div className={styles.losanguloPequeno2}>
                        <input type="number" value={newCaracter.pontos_de_aventura} onChange={(e) => {
                        }} className={styles.inputLosangulo} />
                    </div>
                </div>
                <div className={styles.fundoLosanguloInicial}>
                    <p className={styles.textoPrincipal}>Pontos de <br></br>perícia</p>
                    <div className={styles.losanguloPequeno2}>
                        <input type="number" value={newCaracter.pontos_de_pericia} onChange={(e) => {
                        }} className={styles.inputLosangulo} />
                    </div>
                </div>
                <div className={styles.fundoLosanguloInicial}>
                    <p className={styles.textoPrincipal}>Pontos de <br></br>sociedade</p>
                    <div className={styles.losanguloPequeno2}>
                        <input type="number" value={newCaracter.pontos_de_sociedade} onChange={(e) => {
                        }} className={styles.inputLosangulo} />
                    </div>
                </div>
            </div>

            <div className={styles.fundoFlex}>
                <div className={styles.fundoColunm}>
                    <div>
                        <p className={styles.textoEsquerda}>Carga <br></br>atual</p>
                    </div>
                    <div className={styles.fundoLosanguloPoint}>
                        <div className={styles.ajeitarNA}>
                            <div className={styles.losanguloGrande}>
                                <input type="number" value={newCaracter.carga_atual} onChange={(e) => {
                                }} className={styles.inputLosangulo} style={{ fontSize: '35px' }} />
                            </div>
                        </div>
                        <div className={styles.ajeitarCima}>
                            <div className={styles.losanguloPequeno} >
                                <input type="number" value={newCaracter.carga} onChange={(e) => {
                                }} className={styles.inputLosanguloPequeno} />
                            </div>
                            <p className={styles.textosMenores}>Carga</p>
                        </div>
                        <div className={styles.ajeitarBaixo}>
                            <div className={styles.losanguloPequeno}>
                                <input type="number" value={newCaracter.fadiga} onChange={(e) => {
                                }} className={styles.inputLosanguloPequeno} />
                            </div>
                            <p className={styles.textosMenores}>Fadiga</p>
                        </div>
                    </div>
                </div>
                <div className={styles.fundoColunm}>
                    <div>
                        <p className={styles.textoEsquerda}>Esperança <br></br>atual</p>
                    </div>
                    <div className={styles.fundoLosanguloPoint}>
                        <div className={styles.ajeitarNA}>
                            <div className={styles.losanguloGrande}>
                                <input type="text" value={newCaracter.esperanca_atual} onKeyDown={changePlayer} onChange={(e) => {}} className={styles.inputLosangulo} style={{ fontSize: '35px' }} />
                            </div>
                        </div>
                        <div className={styles.ajeitarCima}>
                            <div className={styles.losanguloPequeno} >
                                <input type="text" value={newCaracter.sombra} onKeyDown={changePlayer} onChange={(e) =>{}} className={styles.inputLosanguloPequeno} />
                            </div>
                            <p className={styles.textosMenores}>Sombra</p>
                        </div>
                        <div className={styles.ajeitarBaixo}>
                            <div className={styles.losanguloPequeno}>
                                <input type="text" value={newCaracter.cicatrizes_sombra} onKeyDown={changePlayer} onChange={(e) => {}} className={styles.inputLosanguloPequeno} />
                            </div>
                            <p className={styles.textosMenores}>Cicatrizes <br></br> de sombra</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.barra}></div>

            <div className={styles.organizarCondicoes}>
                <p className={styles.textoPrincipal}>Condições</p>

                <div className={styles.fundoFlex} style={{ gap: '30px' }}>
                    <div>
                        <div className={styles.fundoFlex} style={{ gap: '10px' }}>
                            <input type="checkbox" checked={newCaracter.exausto} />
                            <p>Exausto</p>
                        </div>
                        <div className={styles.fundoFlex} style={{ gap: '10px' }}>
                            <input type="checkbox" checked={newCaracter.arrasado} />
                            <p>Arrasado</p>
                        </div>
                        <div className={styles.fundoFlex} style={{ gap: '10px' }}>
                            <input type="checkbox" checked={newCaracter.ferido} onChange={(e) => {}} />
                            <p>Ferido</p>
                        </div>
                    </div>

                    <div className={styles.ferimento}>
                        <p>Ferimento</p>
                        <input type="text" name='ferimento' placeholder='Digite aqui...' value={newCaracter.ferimento} onChange={(e) => {
                        }} className={styles.input} />
                    </div>
                </div>

            </div>

            <div className={styles.barra}></div>

            <div className={styles.organizarCondicoes} style={{ flex: '1 0 ' }}>
                <p className={styles.textoPrincipal}>Equipamento de Viagem</p>
                <textarea placeholder='Digite aqui...' value={newCaracter.equipamento_de_viagem} onChange={(e) => {
                }} className={styles.inputRecompensa}></textarea>
            </div>
        </div>
    )
}