export interface Mobs{
    id?: string;
    image_monster: string
    project_id: string
    nome: string
    caracteristicas: string
    nivel_de_atributo: string
    resistencia: string
    poder: string
    odio: string
    bloqueio: string
    armadura: string
    proeficiencia_de_combate: string
    habilidades_mortais: string
    descricao: string
    grupo: string
    rpg: string
    rodada: boolean
    index: number
}

export interface Game{
    rodada: number;
    id: string;
}

export interface ImageCanva{
    imageName: string
    id_project: string
    height: string
    width: string
    left: string
    top: string
}

export interface Group{
    id: number,
    name: string
  }
  