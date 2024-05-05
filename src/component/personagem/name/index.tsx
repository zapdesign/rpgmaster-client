import styles from "./nameInput.module.css"
import Image from "next/image"

export function NameInput({changePlayer,newCaracter, changes, changePlayer2, setNewCaracter}: any){

    return (
        <>
            {newCaracter !== undefined && (
            <div className={styles.labelCheck}>
                <div className={styles.labelInput}>
                    <p className={styles.nameFont}>Nome</p>
                    <input type="text" placeholder='Seu nome aqui...' value={newCaracter.name} onChange={(e) => {
                    }} style={{fontSize: '17px', textAlign: 'center', width: '450px'}} className={styles.input}/>
                </div>

                <div className={styles.fundoCheck}>

                </div>
            </div>

            )}
        </>
    )
}