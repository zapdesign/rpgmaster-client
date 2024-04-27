import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaRegImage } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { FaDiceD20 } from "react-icons/fa";
import { FaFilm } from "react-icons/fa";
import { useProjectStore } from "@/store/project";
import { FaChessBoard } from "react-icons/fa6";
import { GoPeople } from "react-icons/go";


export default function MenuPrincipal({
    children,
  }: {
    children: React.ReactNode
  }) {

    const { project } = useProjectStore()

    const router = useRouter();

    // Função para verificar se a página atual corresponde à rota fornecida
    const isActive = (route: string) => router.pathname === route;

    return (
        <section style={{display: 'flex', height: '100vh'}}>
            <section style={{display: 'flex', flexDirection: 'column', width: '18%', padding: '25px 15px', background: '#101119', borderRight: 'solid 1px #141421'}}>
            <Link href="/app/"><Image width={100} height={15} src="/logo.svg" alt="Logo RPG Master"></Image></Link> 

            <Link href={`/app/${project[0].id}/scene`} style={{marginTop: '35px', fontSize: '12px', display: 'flex', gap: '10px',padding: '12px 10px', backgroundColor: isActive(`/app/[projectId]/scene`) ? "#12131D" : "none", border: isActive(`/app/[projectId]/scene`) ? "solid 1px #292943" : "none", borderRadius: '10px'}}><FaFilm/> Cena Atual</Link>
            <Link href={`/app/${project[0].id}/images`} style={{marginTop: '15px', fontSize: '12px', display: 'flex', gap: '10px',padding: '12px 10px', backgroundColor: isActive("/app/[projectId]/images") ? "#12131D" : "none", border: isActive("/app/[projectId]/images") ? "solid 1px #292943" : "none", borderRadius: '10px'}}><FaRegImage/> Imagens</Link>
            <Link href={`/app/${project[0].id}/players`} style={{marginTop: '15px', fontSize: '12px', display: 'flex', gap: '10px',padding: '12px 10px', backgroundColor: isActive(`/app/[projectId]/players`) ? "#12131D" : "none", border: isActive(`/app/[projectId]/players`) ? "solid 1px #292943" : "none", borderRadius: '10px'}}><GoPeople /> Jogadores</Link>
            {/* <Link href={`/app/${project[0].id}/add`} style={{marginTop: '15px', fontSize: '12px', display: 'flex', gap: '10px',padding: '12px 10px', backgroundColor: isActive(`/app/[projectId]/add`) ? "#12131D" : "none", border: isActive(`/app/[projectId]/add`) ? "solid 1px #292943" : "none", borderRadius: '10px'}}><IoIosSettings/> Novos Mobs</Link> */}
            {/* <Image width={82} height={82} src="/rato-pode-comer-abobrinha-6.jpg" alt="RATO COMENDO"></Image> */}
            
            </section>
            {children}
        </section>
    )
  }