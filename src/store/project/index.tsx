import { create } from 'zustand'

type Project = {
    id_user: string,
    id: string,
    name: string,
    rodada: number
}

type ActionsProps = {
    addProject: (atualProject: Project) => void;
}

type ProjectProps = {

    project: Project[],
    actions: ActionsProps
}


export const useProjectStore = create<ProjectProps>((set) => ({
    project: [],
    actions: {
        addProject: (atualProject) =>
            set(() => ({
                project: [atualProject]
            }))
    }
}))