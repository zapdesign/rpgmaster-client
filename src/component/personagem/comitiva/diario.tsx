import styles from "./comitiva.module.css"

export default function Diario({comitiva, setNewComitiva, setChanges}: any) {


    return (
        <div className={styles.companhia}> 
            <p className={styles.nameFont}>Diário</p>
            <textarea placeholder='Digite aqui...' value={comitiva.diario} onChange={(e) => {
            setChanges(true)
            setNewComitiva({ ...comitiva, diario: e.target.value })
        }} className={styles.inputDiario}></textarea>
        </div>

    )
}