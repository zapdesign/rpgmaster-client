import styles from './forca.module.css'
import CheckBoxEstrutura from "../checkbox/checkBoxEstrutura"
import { useRouter } from 'next/router';



export default function Forca({changePlayer, newCaracter, setNewCaracter}: any){

    const router = useRouter();
    const { playerId } = router.query;

    return (
        <>
        {playerId && (
            <div className={styles.fundoForca}>

                <p className={styles.titulo}>Força</p>

                <div className={styles.fundoLosanguloPoint}>
                    <div className={styles.ajeitarNA}>
                        <div className={styles.losanguloGrande} style={{marginLeft: '-55px'}}>
                            <input type="number" value={newCaracter.forca_na} onChange={(e) => {
                            }} className={styles.inputLosangulo} style={{fontSize: '35px'}}/>
                        </div>
                        <p className={styles.textNA}>NA</p>
                    </div>
                    <div className={styles.ajeitarCima}>
                        <div className={styles.losanguloPequeno} >
                            <input type="number" value={newCaracter.forca_nivel} onChange={(e) => {
                            }} className={styles.inputLosangulo}/>
                        </div>
                        <p className={styles.textosMenores}>Nível</p>
                    </div>
                    <div className={styles.ajeitarBaixo}>
                        <div className={styles.losanguloPequeno}>
                            <input type="number" value={newCaracter.forca_resistencia} onChange={(e) => {
                            }} className={styles.inputLosangulo}/>
                        </div>
                            <p className={styles.textosMenores}>Resistência</p>
                    </div>
                </div>

                <div className={styles.barra}></div>

                <div className={styles.alinharCheckbox}>
                    <CheckBoxEstrutura nome={'Fascínio'} dadoPincipal={newCaracter.fascinio} dadosGerais={newCaracter.fascinio_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={playerId} haveInital={true}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Atletismo'} dadoPincipal={newCaracter.atletismo} dadosGerais={newCaracter.atletismo_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={playerId} haveInital={true}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Vigilância'}  dadoPincipal={newCaracter.vigilancia} dadosGerais={newCaracter.vigilancia_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={playerId} haveInital={true}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Caçada'} dadoPincipal={newCaracter.cacada} dadosGerais={newCaracter.cacada_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={playerId} haveInital={true}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Música'} dadoPincipal={newCaracter.musica} dadosGerais={newCaracter.musica_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={playerId} haveInital={true}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Ofício'} dadoPincipal={newCaracter.oficio} dadosGerais={newCaracter.oficio_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={playerId} haveInital={true}></CheckBoxEstrutura>
                </div>

                <div className={styles.barraAbaixo}></div>

                <p className={styles.titulo2}>Proeficiências de combate</p>

                <div className={styles.alinharCheckbox}>
                    <CheckBoxEstrutura nome={'Machados'} dadoPincipal={newCaracter.machados_bool} dadosGerais={newCaracter.machados_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={playerId} haveInital={false}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Arcos'} dadoPincipal={newCaracter.arcos_bool} dadosGerais={newCaracter.arcos_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={playerId} haveInital={false}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Lanças'} dadoPincipal={newCaracter.lancas_bool} dadosGerais={newCaracter.lancas_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={playerId} haveInital={false}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Espadas'} dadoPincipal={newCaracter.espadas_bool} dadosGerais={newCaracter.espadas_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={playerId} haveInital={false}></CheckBoxEstrutura>
                </div>
            </div>
        )}
        </>
    )
    
}
