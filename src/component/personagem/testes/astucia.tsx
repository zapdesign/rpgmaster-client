import styles from './forca.module.css'
import CheckBoxEstrutura from "../checkbox/checkBoxEstrutura"
import { useProjectStore } from "@/store/project"
import { useRouter } from 'next/router';



export default function Persuasao({changePlayer, newCaracter, setNewCaracter}: any){

    const router = useRouter();
    const { playerId } = router.query;

    return (
        <>
        {playerId && (
            <div className={styles.fundoForca}>

                <p className={styles.titulo}>Astúcia</p>

                <div className={styles.fundoLosanguloPoint}>
                    <div className={styles.ajeitarNA}>
                        <div className={styles.losanguloGrande} style={{marginLeft: '-55px'}}>
                            <input type="number" value={newCaracter.astucia_na} onChange={(e) => {
                            }} className={styles.inputLosangulo} style={{fontSize: '35px'}}/>
                        </div>
                        <p className={styles.textNA}>NA</p>
                    </div>
                    <div className={styles.ajeitarCima}>
                        <div className={styles.losanguloPequeno} >
                            <input type="number" value={newCaracter.astucia_nivel} onChange={(e) => {
                            }} className={styles.inputLosangulo}/>
                        </div>
                        <p className={styles.textosMenores}>Nível</p>
                    </div>
                    <div className={styles.ajeitarBaixo}>
                        <div className={styles.losanguloPequeno}>
                            <input type="number" value={newCaracter.astucia_resistencia} onChange={(e) => {
                            }} className={styles.inputLosangulo}/>
                        </div>
                            <p className={styles.textosMenores}>Bloqueio</p>
                    </div>
                </div>

                <div className={styles.barra}></div>

                <div className={styles.alinharCheckbox}>
                    <CheckBoxEstrutura nome={'Persuasão'} dadoPincipal={newCaracter.persuasao} dadosGerais={newCaracter.persuasao_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={playerId} haveInital={true}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Furtividade'} dadoPincipal={newCaracter.furtividade} dadosGerais={newCaracter.furtividade_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={playerId} haveInital={true}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Busca'} dadoPincipal={newCaracter.busca} dadosGerais={newCaracter.busca_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={playerId} haveInital={true}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Exploração'} dadoPincipal={newCaracter.exploracao} dadosGerais={newCaracter.exploracao_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={playerId} haveInital={true}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Enigma'} dadoPincipal={newCaracter.enigma} dadosGerais={newCaracter.enigma_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={playerId} haveInital={true}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'História'} dadoPincipal={newCaracter.historia} dadosGerais={newCaracter.historia_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={playerId} haveInital={true}></CheckBoxEstrutura>
                </div>

                <div className={styles.barraAbaixo}></div>

                <p className={styles.titulo2}>Virtudes</p>

                <div className={styles.alinharCheckbox}>

                    <div className={styles.ajeitarLosanguloBaixo}>
                            <p className={styles.textosBaixo}>Sabedoria</p>

                            <div className={styles.losanguloPequenoBaixo}>
                                <input type="text" value={newCaracter.virtudes_sabedoria} onChange={(e) => {
                            }} className={styles.inputLosangulo}/>
                            </div>

                    </div>
                </div>

                <textarea placeholder='Digite aqui...' value={newCaracter.virtudes} onChange={(e) => {
                            }} className={styles.inputRecompensa}></textarea>
                
            </div>
        )}
        </>
    )
    
}
