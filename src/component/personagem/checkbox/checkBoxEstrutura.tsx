import { useEffect, useState } from "react"
import styles from './checkbox.module.css'
import { axiosInstance } from "@/services/axiosInstance";



export default function CheckBoxEstrutura({nome, dadoPincipal, dadosGerais, setNewCaracter, newCaracter, changedDado, caracter, haveInital, type = "caracter", number = 6, isCompany = false, hasModify = true}: any){

    const [ checkBoxGerais, setCheckBoxGerais ] = useState(Array(number).fill(false))

    const [ haveInitial, setHaveInitial ] = useState(haveInital)

    const changeBoxApi = async (data: any) => {
        try{

            await axiosInstance.patch(`player/${type}/${caracter}`, {
                ...data
            })
            
        }catch(err){
            console.error(err)
        } 
    }


    useEffect(() => {
        const updatedCheckboxes = checkBoxGerais.map((_, index) => index < dadosGerais);
        setCheckBoxGerais(updatedCheckboxes);
    }, [dadosGerais]); 

    const handleCheckboxChange = (type: boolean) => {


        if(type === false) {
            const newData = dadosGerais - 1
            if(!isCompany){
                setNewCaracter({...newCaracter, [`${changedDado}_bool`]: newData})
                changeBoxApi({[`${changedDado}_bool`]: newData})
                return
            }

            setNewCaracter({...newCaracter, [`${changedDado}`]: newData})
            changeBoxApi({[`${changedDado}`]: newData})
            return
        }

        const newData = dadosGerais + 1
        if(!isCompany){
            setNewCaracter({...newCaracter, [`${changedDado}_bool`]: newData})
            changeBoxApi({[`${changedDado}_bool`]: newData})
            return
        }
        
        setNewCaracter({...newCaracter, [`${changedDado}`]: newData})
        changeBoxApi({[`${changedDado}`]: newData})
        return
    };
    
    const changeBoxPrincipal = (type: boolean) => {
        setNewCaracter({...newCaracter, [changedDado]: type})
        changeBoxApi({[changedDado]: type})
        return
    };

    return (
        <div className={styles.fundo}>
            {haveInital && <input 
                type="checkbox"  
                checked={dadoPincipal}
                className={styles.checked}
                onChange={(e) => changeBoxPrincipal(e.target.checked)}
            />}
            <div className={styles.fundoFont}>
                <p className={styles.font}>{nome}</p>
            </div>

            {checkBoxGerais.map((cada, i) => (
                <div key={i} className={styles.fundo}>
                    <input type="checkbox"
                    id={`checkbox${i + 1}`}
                    checked={cada}
                    onChange={(e) => {
                        if(hasModify){
                            handleCheckboxChange(e.target.checked)
                        }
                    }}
                     />
                </div>
            ))}
        </div>
    )
}