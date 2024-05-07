import { FaPlay } from "react-icons/fa";
import styles from "@/styles/Home.module.css"
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import SanfonaWallada from "@/component/sanfonaporquewallampediu";
import { Mobs, Group } from "@/type/mobs"
import { useQuery } from 'react-query';
import MenuPrincipal from "@/component/menu";
import MobView from "@/component/mobView";
import AuthContent from "@/Context/AuthContext";

import { axiosInstance } from "@/services/axiosInstance";
import { useUsersStore } from "@/store/users/Index";
import ProjectContext from "@/Context/projectContext";
import { useProjectStore } from "@/store/project";
import { BsFillDice5Fill } from "react-icons/bs";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Column } from "@/component/listUsandoMobs/Column";
import Dice from "@/component/dicePopup/dice";

export default function Home() {

  const { users } = useUsersStore();
  const { project } = useProjectStore();

  const [ changeProject, setChangeProject ] = useState({
    name: '',
    rodada: 0
  })

  const [ roll, setRoll ] = useState('')
  const [ rollResult, setRollResult ] = useState('')
  
  const [ listMobs, setListMobs ] = useState(false)
  const [ group, setGroup ] = useState([{id: 1, name: "Orc"}, {id: 2, name: "Lobos"}, {id: 3, name: "Homens do Mal"}, {id: 4, name: "Trolls"}, {id: 5, name: "Mortos Vivos"}])
  
  const [ listUsando, setListUsando ] = useState(true)
  const [ usando, setUsando ] = useState<Mobs[]>([])
  
  const [ selectedMob, setSelectedMobId] = useState("")
  
  const [ viewMob, setViewMob ] = useState(false)
  const [ atualMob, setAtualMob ] = useState<Mobs>()
  
  const [ popUpDice, setPopUpDice ] = useState(false)

  const getGroup = async () => {
    setViewMob(false)
    setListMobs(true)
  }

  const getUsado = async () => {
    const response = await axiosInstance(`all-monster/master/${project[0].id}/`);
    if(response.data[0] === undefined){
      setUsando([])
      return
    }
    
    setUsando(response.data);
  };

  const pegarMob = async (id: string) => {
    setSelectedMobId(id)
    setListMobs(false)
    setViewMob(true)

    const response = await axiosInstance.get(`all-monster/master/unique/${id}`)
    setAtualMob({...response.data})
  }

  const changeRodada = async (event: any) => {
    if (event.key === 'Enter') {
        try{
          await axiosInstance.patch(`/project/${project[0].id}`, {
            name: changeProject.name,
            rodada: changeProject.rodada
        })          
        }catch(err){
          return console.error(err)
        }
    }
  }

  const runGame = async () => {  

      changeProject.rodada++

      await axiosInstance.patch(`/project/${project[0].id}`, {
        rodada: changeProject.rodada
      })
      
      await axiosInstance.patch(`/all-monster/reset-rodada/${project[0].id}`, {
        rodada: false
      })
      setUsando([])
      await getUsado()
    }

  const { data, isLoading, isError } = useQuery('usando', async () => {
      await getUsado()
      setChangeProject({
        name: project[0].name,
        rodada: project[0].rodada
      })
  }, {
    enabled: !!project[0]
  });

  // const sensors = useSensors(
  //   useSensor(PointerSensor),
  //   useSensor(KeyboardSensor, {
  //     coordinateGetter: sortableKeyboardCoordinates,
  //   })
  // );


  // const getMobsId = (id) => usando.findIndex((mobs) => mobs.id === id);

  // const handleDragEnd = (event) => {
  //   const { active, over } = event;
  //   console.log(active, over)
  //   if (active.id === over.id) return;

  //   setUsando((mobs) => {
  //     const originalPos = getMobsId(active.id);
  //     const newPos = getMobsId(over.id);

  //     return arrayMove(mobs, originalPos, newPos);
  //   });
  // };


  if(isLoading){
    return (
      <AuthContent>
            <main className={styles.main} style={{flexGrow: 1, height: '100vh'}}>
                <h1>Carregando</h1>
            </main>
      </AuthContent>
    )
  }

  return (
    <AuthContent>
      <ProjectContext>
        <MenuPrincipal>
          <main className={styles.main} style={{flexGrow: 1, height: '100vh'}}>
            <div className={styles.menuRodada}>
              <div className={styles.alignFlex} style={{gap: '25px', alignItems: 'center'}}>
                <FaPlay style={{cursor: 'pointer'}} onClick={runGame}/>
                <p style={{fontSize: '15x'}}>Rodada {project[0] && <input type="number" style={{border: 'none', background: 'none', marginLeft:'15px'}} onChange={(e) => setChangeProject({...changeProject, rodada: Number(e.target.value)})} onKeyDown={changeRodada} value={changeProject.rodada}/>}</p>
              </div>
                {project[0] && <input type="text" style={{border: 'none', background: 'none'}} onChange={(e) => setChangeProject({...changeProject, name: e.target.value})} onKeyDown={changeRodada} value={changeProject.name}/>}
              
            </div>

            <div className={styles.alignFlex} style={{marginTop: '55px', height: '90%'}}>


              <div className={styles.ladoMobs} >
                <div style={{height: '100%', overflowY: "auto", overflowX: "hidden"}}>

                  <div className={styles.alignFlex} style={{padding: '0px 15px'}}>
                    <p>Mobs</p>
                    <FaPlay onClick={() => getGroup()} style={{cursor: 'pointer'}}/>
                  </div>


                  {usando[0] && (
                    //     

                    // <DndContext
                    //   sensors={sensors}
                    //   collisionDetection={closestCorners}
                    //   onDragEnd={handleDragEnd}
                    // >
                    <div style={{margin: '25px 0px'}}>
                    {/* id="listMonster" */}
                      <Column  mobs={usando} pegarMob={pegarMob}/>
                    </div>

                    // </DndContext>
                  )}
                </div>
                <div className={styles.fundoDice} onClick={() => setPopUpDice(!popUpDice)}>
                  <BsFillDice5Fill  className={styles.dice}/>
                </div>
              </div>


              <div className={styles.ladoInfo} style={{display: 'flex', flexDirection: 'column'}}>
                  {listMobs && (
                    <>
                      <div className={styles.alignFlex}>
                        <h1>Categorias</h1>
                        <IoMdClose onClick={() => setListMobs(false)}/>
                      </div>
                      <div className={styles.alinharGroup}>
                        {group[0] !== undefined && group.map((cada: Group) => (
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
                                  setSelectedMobId("");
                              }
                          }/>
                      </div>  

                      {atualMob !== undefined && (
                        <div key={atualMob.id} className={styles.MobScroll} style={{padding: '45px 25px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '25px', background: '#11121B', marginTop: '15px', overflow: 'auto', height: '100%'}}>
                            <MobView props={atualMob} getUsado={getUsado} setUsando={setUsando} setViewMob={setViewMob}/>
                        </div>
                      )}
                    </>
                  )}
              </div>
              
            </div>

            {popUpDice && (
              <div className={styles.backgroundRoll}>
                <Dice setPopUpDice={setPopUpDice}></Dice>
              </div>
            )}


          </main>
        </MenuPrincipal>
      </ProjectContext>
    </AuthContent>
  );
}
