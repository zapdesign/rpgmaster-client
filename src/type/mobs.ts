export interface Mobs{
    id?: number;
    name: string;
    nickname: string;
    group: string;
    dice: number;
    diceNumber: number;
    atributeLevel: number;
    endurance: number;
    might: number;
    block: number;
    hate: number;
    armor: number;
    combat: string;
    habilities: string;
    picture: string;
    rodada: boolean
}

export interface Game{
    rodada: number;
    id: string;
}