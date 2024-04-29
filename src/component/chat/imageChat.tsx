import styles from './chat.module.css'

export default function ImageChat({cada}: any) {

    function getFirstLetter(name: string) {
        return name.charAt(0).toUpperCase();
    }

    return (
        <>
         {cada.player_id == "01" ? 
         <div className={styles.fundoFotoChat}>
             <img src="/public/logo.svg" alt="Profile Image" />
         </div>
         : <p className={styles.fundoFotoChat}>{getFirstLetter(cada.name)}</p>
         
         }
        </>
    )
}