import { FaPlay } from "react-icons/fa";
import styles from "@/styles/Home.module.css"
import { IoIosSettings } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import { useState } from "react";
import SanfonaWallada from "@/component/sanfonaporquewallampediu";
import { Mobs, Game } from "@/type/mobs"
import { GETALL, GETONE, POST, PUT } from "@/function/api";
import { useQuery } from 'react-query';
import Image from "next/image";
import MenuPrincipal from "@/component/menu";
import MobView from "@/component/mobView";
import ListMobs from "@/component/listUsandoMobs";

export default function Home() {

  const [ listMobs, setListMobs ] = useState(false)
  const [ group, setGroup ] = useState([])
  
  const [ listUsando, setListUsando ] = useState(true)
  const [ usando, setUsando ] = useState([])
  
  const [ viewMob, setViewMob ] = useState(false)
  const [ atualMob, setAtualMob ] = useState<Mobs>()

  const [selectedMobId, setSelectedMobId] = useState(0);

  const [ atualGame, setAtualGame ] = useState<Game>({
    id: '0001',
    rodada: 0
  })

  const getGroup = async () => {
    setViewMob(false)
    setListMobs(true)
    const response = await GETALL('group')
    setGroup(response)
  }

  const getUsado = async () => {
    const response = await GETALL('usando')
    setUsando(response)
  } 

  const pegarMob = async (id: number) => {
    setSelectedMobId(id)
    setListMobs(false)
    setViewMob(true)

    const response = await GETONE('usando', id)
    setAtualMob(response)
  }

  const getGame = async () => {
      try{
        const response = await GETALL('game')
        console.log(response)
        setAtualGame(response)
        return
      }catch(err){
        return console.log(err)
      }
  }

  const runGame = async () => {  
      setListUsando(false)

      const newRodada = atualGame[0].rodada + 1;

      await PUT({rodada: newRodada}, 'game', "0001");
      
      usando.map( async (mobs: Mobs) => {
        const newMob = {...mobs, rodada: false}
        try{
          await PUT(newMob, 'usando', mobs.id)
          
        }catch(err){
          return console.log(err)
        }
      })
      
      getUsado()
      getGame();
      setListUsando(true)
  }

  const { data, isLoading, isError } = useQuery('usando', async () => {
    await getUsado()
    await getGame()
  });

  if(isLoading){
    return <h1>CARREGANDO</h1>
  }

  if(isError){
    return <h1>Ativou o BACKEND?</h1>
  }

  return (
    <MenuPrincipal>
      <main className={styles.main} style={{flexGrow: 1}}>
        <menu className={styles.menuRodada}>
          <div className={styles.alignFlex} style={{gap: '25px', alignItems: 'center'}}>
            <FaPlay style={{cursor: 'pointer'}} onClick={runGame}/>
            <p style={{fontSize: '15x'}}>Rodada {atualGame[0] !== undefined && atualGame[0].rodada}</p>
          </div>
          
        </menu>

        <div className={styles.alignFlex} style={{marginTop: '55px'}}>


          <div className={styles.ladoMobs}>
            <div className={styles.alignFlex}>
              <p>Mobs</p>
              <FaPlay onClick={() => getGroup()}/>
            </div>

            <div>
                <div>

                  {listUsando && (
                    <div className={styles.fundoListaUsando} style={{margin: '25px 0px'}}>
                        {usando[0] !== undefined && usando.map((cada: Mobs) => (
                            <div key={cada.id} className={`${styles.fundoUsando} ${cada.id === selectedMobId ? styles.selectedMob : ''}`}  style={{padding: '15px 15px', borderRadius: '10px'}}>
                              <ListMobs cada={cada} pegarMob={pegarMob} red={cada.rodada}></ListMobs>
                            </div>
                        ))}
                    </div>
                  )}

                </div>
            </div>
          </div>


          <div className={styles.ladoInfo}>
              {listMobs && (
                <>
                  <div className={styles.alignFlex}>
                    <h1>Categorias</h1>
                    <IoMdClose onClick={() => setListMobs(false)}/>
                  </div>
                  <div className={styles.alinharGroup}>
                    {group[0] !== undefined && group.map((cada: Mobs) => (
                      <div key={cada.id}>
                        <SanfonaWallada props={cada} getUsado={getUsado} listMob={setListMobs}/>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {viewMob && (
                <>
                  <div className={styles.alignFlex}>
                      <h1 style={{fontSize: "25px"}}>Detalhe do Mob</h1>
                      <IoMdClose style={{cursor: 'pointer'}} onClick={() => {
                              setViewMob(false)
                              setSelectedMobId(0);
                          }
                      }/>
                  </div>

                  {atualMob !== undefined && (
                    <div key={atualMob.id} style={{padding: '25px 0px'}}>
                        <MobView props={atualMob} getUsado={getUsado} setViewMob={setViewMob}/>
                    </div>
                  )}
                </>
              )}
          </div>
          
        </div>

        <Image width={82} height={82} src="/rato-pode-comer-abobrinha-6.jpg" alt="RATO COMENDO"></Image>

      </main>
     </MenuPrincipal>
  );
}
