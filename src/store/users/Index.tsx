import { create } from 'zustand'

type User = {
    email: string,
    id: string,
    name: string
}

type ActionsProps = {
    addUser: (atualUser: User) => void;
}

type UserProps = {

    users: User[],
    actions: ActionsProps
}


export const useUsersStore = create<UserProps>((set) => ({
    users: [],
    actions: {
        addUser: (atualUser) =>
            set(() => ({
                users: [atualUser]
            }))
    }
}))