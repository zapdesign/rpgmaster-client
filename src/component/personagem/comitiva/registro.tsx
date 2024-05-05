import styles from "./comitiva.module.css"

export default function Registro({comitiva, setNewComitiva, setChanges}: any) {


    return (
        <div className={styles.registro}> 
            <p className={styles.nameFont}>Registro de Jornada</p>
            
            <div className={styles.labelInput}>
                <label htmlFor="ano" className={styles.label}>Ano</label>
                <input type="text" name='ano' placeholder='Digite aqui...' value={comitiva.ano} onChange={(e) => {
                    setNewComitiva({...comitiva, ano: e.target.value})
                    setChanges(true)
                    }} className={styles.input} />
            </div>
            <div className={styles.labelInput}>
                <label htmlFor="estacao" className={styles.label}>Estação</label>
                <input type="text" name='estacao' placeholder='Digite aqui...' value={comitiva.estacao} onChange={(e) => {
                    setNewComitiva({...comitiva, estacao: e.target.value})
                    setChanges(true)
                    }} className={styles.input} />
            </div>
            <div className={styles.labelInput}>
                <label htmlFor="jornada_de" className={styles.label}>Jornada de</label>
                <input type="text" name='jornada_de' placeholder='Digite aqui...' value={comitiva.jornada_de} onChange={(e) => {
                    setNewComitiva({...comitiva, jornada_de: e.target.value})
                    setChanges(true)
            }} className={styles.input} />
            </div>
            <div className={styles.labelInput}>
                <label htmlFor="destino" className={styles.label}>Destino</label>
                <input type="text" name='destino' placeholder='Digite aqui...' value={comitiva.destino} onChange={(e) => {
                    setNewComitiva({...comitiva, destino: e.target.value})
                    setChanges(true)
                    }} className={styles.input} />
            </div>
            <div className={styles.labelInput}>
                <label htmlFor="dias_de_viagem" className={styles.label}>Dias de Viagem</label>
                <input type="text" name='dias_de_viagem' placeholder='Digite aqui...' value={comitiva.dias_de_viagem} onChange={(e) => {
                    setNewComitiva({...comitiva, dias_de_viagem: e.target.value})
                    setChanges(true)
                    }} className={styles.input} />
            </div>
        </div>
    )
}