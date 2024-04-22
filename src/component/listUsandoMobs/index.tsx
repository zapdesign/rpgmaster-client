import { POST, PUT } from "@/function/api";
import { axiosInstance } from "@/services/axiosInstance";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ListMobs({cada, pegarMob, red}: any){

    const [selectedMobId, setSelectedMobId] = useState(red);

    const handleCheckboxChange = async () => {

        if(selectedMobId){
            setSelectedMobId(false)
            try{
                await axiosInstance.patch(`/all-monster/${cada.id}`, {
                    rodada: false
                })
                return
            }catch(err){
                return console.log(err)
            }
        }

        setSelectedMobId(true)

        try{
            await axiosInstance.patch(`/all-monster/${cada.id}`, {
                    rodada: true
                })
            return
        }catch(err){
            return console.log(err)
        }
      };

    return (
        <>
            <Image width={80} height={80} alt="Foto Mobs" src={cada.image_monster} onClick={() => cada.id !== undefined && pegarMob(cada.id)} style={{objectFit: 'cover', border: selectedMobId ? 'solid 3px red' : 'solid 3px #282741', borderRadius: '10px', cursor: 'pointer'}} />
                <div style={{display: "flex", flexDirection: 'column', gap: '10px'}}>
                    <div style={{display: "flex", alignItems: 'center'}}>
                        <p style={{fontSize:'17px', fontWeight: '700'}} >{cada.nome}</p>
                        <p style={{fontSize:'15px', fontWeight: '300', paddingLeft: '10px'}}>{cada.nickname}</p>
                    </div>

                    <p style={{fontSize:'14px'}}>NdA: {cada.nivel_de_atributo} | Res: {cada.resistencia} | Pod: {cada.poder}</p>
                    <div style={{display: "flex", alignItems: 'center', gap: '12px'}}>
                        <input type="checkbox" checked={selectedMobId} onChange={() => handleCheckboxChange()} style={{cursor: 'pointer'}} /> <p style={{fontSize:'12px', fontWeight: '300'}}>Rodada Atual</p>
                </div>
            </div>
        </>
    )
}