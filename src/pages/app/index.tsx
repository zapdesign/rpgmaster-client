import AuthContent from "@/Context/AuthContext";
import Image from "next/image";
import { IoMdSettings } from "react-icons/io";
import styles from "@/styles/Home.module.css"
import { useState } from "react";
import { useQuery } from "react-query";
import { useUsersStore } from "@/store/users/Index";
import { axiosInstance } from "@/services/axiosInstance";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";
import { useProjectStore } from "@/store/project";


interface Sections{
    id: string
    id_user: string
    created_at: string
    name: string
}


export default function Sessoes(){

    const { users } = useUsersStore();

    const { actions: { addProject }} = useProjectStore()


    const [ sectionExist, setSectionExist ] = useState(false)
    const [ sections, setSections ] = useState([])


    const searchProjects = async () => {
        try{
            const response = await axiosInstance.get(`/project/all/${users[0].id}`)
            setSections(response.data)
            setSectionExist(true)
            addProject([])
            return

        }catch(err){
            return console.error(err)
        }
    }

    const newProject = async () => {
        setSectionExist(false)

        try{

            const body = {
                "name": "Nova Sessão",
                "id_user": `${users[0].id}`,
                "rodada": 1
            }
            await axiosInstance.post(`/project/`, body)
            searchProjects()
            return

        }catch(err){
            setSectionExist(true)
            return console.error(err)
        }
    }

    const apagarSection = async (id: string) => {

        const confirmDelete = window.confirm("Tem certeza de que deseja excluir esta sessão?");

        if(!confirmDelete){
            return
        }

        setSectionExist(false)


        try{

            await axiosInstance.delete(`/project/${id}`)
            searchProjects()
            return

        }catch(err){
            setSectionExist(true)
            return console.error(err)
        }
    }


    const { data, isLoading, isError } = useQuery('projects', () => {
        searchProjects()
    }, {
        enabled: users[0] !== undefined
    })

    if(isLoading){
        return (
            <AuthContent>
            <main style={{width: "100%", height:'100vh'}}>
                <menu style={{width: "100%", padding: '20px 50px', display: 'flex', justifyContent: 'space-between',alignItems: 'center', background: '#11121B'}}>
                    <Image width="150" height="50" src="/logo.svg" alt="Logo nosso app"></Image>    
                    <IoMdSettings />

                </menu>                

                <section style={{width: "100%", padding: '20px 50px', flex: '1'}}>
                    <p>Carregando...</p>
                </section>
            </main>
        </AuthContent>
        )
    }

    if(isError){
        return (
            <AuthContent>
            <main style={{width: "100%", height:'100vh'}}>
                <menu style={{width: "100%", padding: '20px 50px', display: 'flex', justifyContent: 'space-between',alignItems: 'center', background: '#11121B'}}>
                    <Image width="150" height="50" src="/logo.svg" alt="Logo nosso app"></Image>    
                    <IoMdSettings />

                </menu>                

                <section style={{width: "100%", padding: '20px 50px', flex: '1'}}>
                    <p>Algo deu errado...</p>
                </section>
            </main>
        </AuthContent>
        )
    }

    return (
        <AuthContent>
            <main style={{width: "100%", height:'100vh'}}>
                <menu style={{width: "100%", padding: '20px 50px', display: 'flex', justifyContent: 'space-between',alignItems: 'center', background: '#11121B'}}>
                    <Image width="150" height="50" src="/logo.svg" alt="Logo nosso app"></Image>    
                    <Link href={`/app/config`} style={{cursor: "pointer"}}><IoMdSettings /></Link>

                </menu>                

                <section style={{width: "100%", padding: '20px 50px', flex: '1'}}>
                    <div>
                        <button style={{margin:'10px 10px 0px'}} className={styles.salvar} onClick={newProject}>Nova Sessão</button>
                    </div>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        {sectionExist && sections.map((cada: Sections) => (
                            <div key={cada.id} style={{margin:'35px 10px 0px', width:'23%', border: '2px solid #282742', borderRadius: '0.25rem',background:'#282742', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box'}}>
                                <Link href={`/app/${cada.id}/scene`}><p style={{padding: '25px 15px 25px 15px', fontSize: '18px'}}>{cada.name}</p></Link>
                                <div style={{background: '#0D0D13', padding: '10px 15px', display: 'flex', justifyContent: 'space-between'}}> 
                                    <p style={{fontSize: '12px'}}>{cada.created_at.substring(0, 10)}</p>
                                    <FaTrash style={{cursor: 'pointer'}} onClick={() => apagarSection(cada.id)}/>

                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </AuthContent>
    )
}