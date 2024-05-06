import { useEffect, useState } from 'react'
import styles from './mobview.module.css'
import Image from 'next/image';
import { Mobs } from '@/type/mobs';
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoMdArrowDropupCircle } from "react-icons/io";
import { axiosInstance } from '@/services/axiosInstance';
import { FaRegTrashAlt } from "react-icons/fa";


interface MobView {
    props: Mobs;
    setViewMob: (value: boolean) => void;
    getUsado: () => Promise<void>;
}

export default function MobView({ props, getUsado, setViewMob, setUsando }: any) {

    const [ image, setImage ] = useState("")

    const [newStats, setNew] = useState({
        resistencia: props.resistencia,
        poder: props.poder,
        nickname: props.nickname
    })

    const [descricao, setDescricao] = useState(false)

    const handleKeyPress = async (event: any) => {
        if (event.key === 'Enter') {
            console.log(newStats)
            await axiosInstance.patch(`/all-monster/${props.id}`, {
                resistencia: newStats.resistencia,
                poder: newStats.poder,
                nickname: newStats.nickname
            })
            getUsado()
        }
    };

    const deleteMonster = async () => {
        const confirmarExclusao = window.confirm("Tem certeza que deseja excluir este mob?");
        if (confirmarExclusao) {
            setUsando([])
            await axiosInstance.delete(`/all-monster/${props.id}`)
            setViewMob(false)
            getUsado()
            return
        }
        return
    }

    const getImage = async () => {
        try{
            const response = await axiosInstance(`upload/get/${props.image_monster}`)
            setImage(response.data)
        }catch(err){
            console.error(err)
        }
    }

    useEffect(() => {
        getImage()
    },[])

    return (
        <>
            <div className={styles.diamond}>
                <img width={100} height={100} src={image} style={{ objectFit: 'cover', border: 'solid 3px #282741', borderRadius: '10px', cursor: 'pointer' }} alt={props.nome}></img>
            </div>

            <div style={{ display: 'flex', gap: '25px', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <p style={{ fontSize: '25px', fontWeight: '700' }}>{props.nome}</p>
                |
                <p style={{ fontSize: '25px', fontWeight: '700' }}>{props.caracteristicas}</p>
                <FaRegTrashAlt style={{ cursor: 'pointer' }} onClick={deleteMonster} />
            </div>

            <input style={{ fontSize: '15px', border: 'none', background: 'none', width: '100%', textAlign: 'center' }} name='nick' placeholder='Nickname' value={newStats.nickname} type="text" onChange={(e) => setNew({ ...newStats, nickname: e.target.value })} onKeyDown={handleKeyPress} />



            <div style={{ display: 'flex', padding: '15px 0px', alignItems: 'end', gap: '25px', flexWrap: 'wrap' }}>
                <div className={styles.fundoLosanguloPoint}>
                    <div className={styles.losanguloGrande}>
                        <p style={{ transform: 'rotate(-45deg)', fontSize: '25px' }}>{props.nivel_de_atributo}</p>
                    </div>
                    <p className={styles.textLosangulo}>Nível de Atributo</p>
                </div>
                <div className={styles.fundoLosanguloPoint}>
                    <div className={styles.losanguloPequeno}>
                        <input style={{ transform: 'rotate(-45deg)', fontSize: '15px', border: 'none', background: 'none', width: '100%', textAlign: 'center' }} value={newStats.resistencia} onChange={(e) => setNew({ ...newStats, resistencia: e.target.value })} onKeyDown={handleKeyPress} />

                    </div>
                    <p className={styles.textLosangulo}>Resistência</p>
                </div>
                <div className={styles.fundoLosanguloPoint}>
                    <div className={styles.losanguloPequeno}>
                        <input style={{ transform: 'rotate(-45deg)', fontSize: '15px', border: 'none', background: 'none', width: '100%', textAlign: 'center' }} value={newStats.poder} onChange={(e) => setNew({ ...newStats, poder: e.target.value })} onKeyDown={handleKeyPress} />
                    </div>
                    <p className={styles.textLosangulo}>Poder</p>
                </div>
                <div className={styles.fundoLosanguloPoint}>
                    <div className={styles.losanguloPequeno}>
                        <p style={{ transform: 'rotate(-45deg)', fontSize: '15px' }}>{props.odio}</p>
                    </div>
                    <p className={styles.textLosangulo}>Ódio</p>
                </div>
                <div className={styles.fundoLosanguloPoint}>
                    <div className={styles.losanguloPequeno}>
                        <p style={{ transform: 'rotate(-45deg)', fontSize: '15px' }}>{props.bloqueio}</p>
                    </div>
                    <p className={styles.textLosangulo}>Bloqueio</p>
                </div>
                <div className={styles.fundoLosanguloPoint}>
                    <div className={styles.losanguloPequeno}>
                        <p style={{ transform: 'rotate(-45deg)', fontSize: '15px' }}>{props.armadura}</p>
                    </div>
                    <p className={styles.textLosangulo}>Armadura</p>
                </div>
            </div>

            <div style={{ width: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'column', gap: '05px' }}>
                <p>Proeficiência em combate</p>
                <p style={{ fontSize: '15px', fontWeight: '300' }}>{props.proeficiencia_de_combate}</p>
            </div>
            <div style={{ width: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'column', gap: '05px' }}>
                <p>Habilidades mortais</p>
                <p style={{ fontSize: '15px', fontWeight: '300' }}>{props.habilidades_mortais}</p>
            </div>
            <div style={{ width: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'column', gap: '05px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><p>Descrição/ História</p> {!descricao && <IoMdArrowDropdownCircle style={{ cursor: 'pointer' }} onClick={() => setDescricao(true)} />}{descricao && <IoMdArrowDropupCircle style={{ cursor: 'pointer' }} onClick={() => setDescricao(false)} />}</div>
                {descricao && <p style={{ fontSize: '15px', fontWeight: '300', width: '550px' }}>{props.descricao}</p>}
            </div>


        </>
    )
}