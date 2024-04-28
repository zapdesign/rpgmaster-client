import MenuPrincipal from "@/component/menu";
import styles from "@/styles/Home.module.css"
import Image from "next/image";
import { useState } from "react";
import ProjectContext from "@/Context/projectContext";
import AuthContent from "@/Context/AuthContext";

interface Dados{
    d6: number
    d12: number
}

interface Result{
    d6: {
        "1": number
    }
}

export default function Dice(){

    const [ dados, setDados ] = useState<Dados>({
        d6: 0,
        d12: 0
    })

    const [ listResult, setListResult ] = useState(false)
    const [ result, setResult ]  = useState({})

    const rollDices = () => {
        if(dados.d6 === 0 && dados.d12 === 0){
            return
        }
        if(dados.d6 > 15 || dados.d12 > 15){
            window.alert('Seu número de tentativas é muito grande...')
            return
        }
        setListResult(false)
        
        console.log('rodou')
        
        const resultados = {
            d6: [],
            d12: [],
            d6Conta: 0,
            d12Conta: 0,
            menorD12: 0,
            maiorD12: 0,
            temMais: false
        };
        resultados.temMais = false
        
        let totalD6 = 0; 
        let totalD12 = 0;

        for (let i = 1; i <= dados.d6; i++){
            const response = Math.floor( 1 + 6*Math.random());
            resultados.d6.push({"r": response})
            resultados.d6Conta += response;
        }
        for (let i = 1; i <= dados.d12; i++){
            const response = Math.floor( 1 + 12*Math.random());
            resultados.d12.push({"r": response})
            resultados.d12Conta += response;
        }

        if (resultados.d12.length >= 2 && dados.d6 !== 0) {
            resultados.temMais = true
            resultados.menorD12 = Math.min(...resultados.d12.map(dado => dado.r));
            resultados.maiorD12 = Math.max(...resultados.d12.map(dado => dado.r));
        }

        console.log(resultados.temMais)
        setResult(resultados)
        setListResult(true)
    }

    return (
        <AuthContent>
            <ProjectContext>
                <MenuPrincipal>
                    <main className={styles.main} style={{flexGrow: 1, display: 'flex', flexDirection: 'row'}}>

                        <div style={{width: '25%'}}>
                            <h1>Role seu destino</h1>

                            <div style={{display: 'flex', marginTop: '25px', alignItems: 'center', gap: '25px'}}>
                                <input className={styles.inputFundo} type="number" onChange={(e)=> setDados({...dados, d6: e.target.value})} />
                                <Image width={35} height={35} src="/d6.svg" alt="Dado de 6 faces"></Image>
                            </div>

                            <div style={{display: 'flex', marginTop: '10px', alignItems: 'center', gap: '25px'}}>
                                <input className={styles.inputFundo} type="number" onChange={(e)=> setDados({...dados, d12: e.target.value})} />
                                <Image width={38} height={38} src="/d12.svg" alt="Dado de 12 faces"></Image>                           
                            </div>
                            <button className={styles.salvar} onClick={rollDices}>Rodar dados</button>
                        </div>

                        <div style={{margin: '25px 55px'}}>
                            {listResult && (
                                <>  
                                    <p>Seus Resultados:</p>
                                    <div style={{marginTop: '25px'}}>
                                    {result.d6[0] !== undefined && (
                                        <div style={{display: "flex", gap: '15px', alignItems: 'center'}}>
                                            <Image width={35} height={35} src="/d6.svg" alt="Dado de 6 faces"></Image>
                                            {result.d6.map(cada => (
                                                <p>{cada.r}</p>
                                            ))}
                                        </div>
                                    )}
                                    {result.d12[0] !== undefined && (
                                        <div style={{display: "flex",marginTop:'15px', gap: '15px', alignItems: 'center'}}>
                                            <Image width={35} height={38} src="/d12.svg" alt="Dado de 12 faces"></Image>
                                            {result.d12.map(cada => (
                                                <p>{cada.r}</p>
                                            ))}
                                        </div>
                                    )}
                                    <div style={{marginTop: '35px', display: 'flex', gap: '25px'}}>
                                        {result.d6Conta !== 0 && (
                                            <div className={styles.resultadoContaFundo}>
                                                <Image width={25} height={25} src="/d6.svg" alt="Dado de 6 faces"></Image>
                                                <p style={{fontSize: '25px', fontWeight: 700}}>{result.d6Conta}</p>
                                            </div>
                                        )}

                                    </div>
                                        {result.temMais && <p style={{marginTop: '35px'}}>Resultados Totais:</p>}
                                        {!result.temMais && <p style={{marginTop: '35px'}}>Resultados Totais:</p>}

                                    <div style={{marginTop: '25px', display: 'flex',flexDirection: '', gap: '25px'}}>
                                        {result.temMais && (
                                            <>
                                                
                                                <div className={styles.resultadoContaFundo} style={{border: 'solid 1px red'}}>
                                                    <Image width={25} height={28} src="/d20.svg" alt="Dado de 12 faces"></Image>
                                                    <p style={{fontSize: '25px', fontWeight: 700}}> {result.menorD12 + result.d6Conta}</p>
                                                </div>
                                                <div className={styles.resultadoContaFundo} style={{border: 'solid 1px blue'}}>
                                                    <Image width={25} height={28} src="/d20.svg" alt="Dado de 12 faces"></Image>
                                                    <p style={{fontSize: '25px', fontWeight: 700}}> {result.maiorD12 + result.d6Conta}</p>
                                                </div>
                                            </>
                                        )}
                                        {!result.temMais && (
                                            <>
                                                <div className={styles.resultadoContaFundo} style={{border: 'solid 1px green'}}>
                                                    <Image width={25} height={28} src="/d20.svg" alt="Dado de 12 faces"></Image>
                                                    <p style={{fontSize: '25px', fontWeight: 700}}> {result.d12Conta + result.d6Conta}</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </main>
                </MenuPrincipal>
            </ProjectContext>
        </AuthContent>
        )
}