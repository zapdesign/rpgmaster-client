import styles from "./comitiva.module.css"

export default function Cavalaria({comitiva, setNewComitiva, setChanges}: any) {


    return (
        <div className={styles.registro}> 
            <p className={styles.nameFont}>Pôneis e Cavalos</p>
            <div className={styles.alignImage}>
                <div className={styles.labelInput}>
                    <label htmlFor="ponei" className={styles.label}>Nome</label>
                    <input type="text" name='ponei' placeholder='Digite aqui...' value={comitiva.ponei_1} onChange={(e) => {
                        setNewComitiva({...comitiva, ponei_1: e.target.value})
                        setChanges(true)
                        }} className={styles.input} />
                </div>
                <div className={styles.labelInput} style={{width: "30%"}}>
                    <label htmlFor="vigor" className={styles.label}>Vigor</label>
                    <input type="text" name='vigor' placeholder='Digite aqui...' value={comitiva.p1_vigor} onChange={(e) => {
                        setNewComitiva({...comitiva, p1_vigor: Number(e.target.value)})
                        setChanges(true)
                        }} className={styles.input} />
                </div>
            </div>
        </div>

    )
}