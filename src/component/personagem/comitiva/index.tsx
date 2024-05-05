import Cavalaria from "./cavalaria"
import styles from "./comitiva.module.css"
import Companhia from "./companhia"
import Diario from "./diario"
import Registro from "./registro"

export default function Comitiva({comitiva, setNewComitiva, setChanges}: any) {


    return (
        <div className={styles.align}>
            <Registro comitiva={comitiva} setNewComitiva={setNewComitiva} setChanges={setChanges}></Registro>
            <div className={styles.barraLateral}></div>
            <Companhia comitiva={comitiva} setNewComitiva={setNewComitiva} setChanges={setChanges}></Companhia>
            <div className={styles.barraLateral}></div>
            <Cavalaria comitiva={comitiva} setNewComitiva={setNewComitiva} setChanges={setChanges}></Cavalaria>
            <div className={styles.barraLateral}></div>
            <Diario comitiva={comitiva} setNewComitiva={setNewComitiva} setChanges={setChanges}></Diario>
        </div>
    )
}