import { axiosInstance } from "@/services/axiosInstance";
import { useProjectStore } from "@/store/project";
import { useUsersStore } from "@/store/users/Index";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";

export default function ProjectContext({children}: {children: React.ReactNode}){

    const { project, actions: { addProject } } = useProjectStore()
    const { users } = useUsersStore()

    const [ existPage, setExistPage ] = useState(true)

    const router = useRouter();
    const { projectId } = router.query;

    const seachProject = async () => {

        if(projectId){
            try{  
    
                const response = await axiosInstance.get(`project/${projectId}`)
                if(users[0].id !== response.data.id_user){
                    router.push("/app")
                    return
                }   
                addProject(response.data)
    
            }catch(err: any){
    
                console.log(err)
                setExistPage(false)
            }                
        }
    }

    const goApp = () =>{
        router.push("/app")
    }

    const { data, isLoading, isError } = useQuery('project', async () => {
        seachProject()        
    },{
        enabled: !!projectId && users[0] !== undefined
    })

    if(isLoading){
        return <h1>loading</h1>
    }

    if(!existPage){
        return (
            <main style={{height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column', gap: '25px'}}>
                <h1>Essa sessão não existe..</h1>
                <p onClick={goApp} style={{color: 'blue', cursor: 'pointer'}}>Minhas sessões</p>
            </main> 
        )
    }

    return (
        <>
            {project[0] !== undefined && children}
        </>
        )
}




