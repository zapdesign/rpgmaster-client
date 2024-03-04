import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoIosSettings } from "react-icons/io";
import { FaDiceD20 } from "react-icons/fa";
import { FaFilm } from "react-icons/fa";

export default function MenuPrincipal({
    children,
  }: {
    children: React.ReactNode
  }) {

    const router = useRouter();

    // Função para verificar se a página atual corresponde à rota fornecida
    const isActive = (route: string) => router.pathname === route;

    return (
        <section style={{display: 'flex', height: '100vh'}}>
            <section style={{display: 'flex', flexDirection: 'column', width: '18%', padding: '25px 15px', background: '#101119', borderRight: 'solid 1px #141421'}}>
                <Image width={100} height={15} src="/logo.svg" alt="Logo RPG Master"></Image>

            <Link href="/" style={{marginTop: '35px', fontSize: '12px', display: 'flex', gap: '10px',padding: '12px 10px', backgroundColor: isActive("/") ? "#12131D" : "none", border: isActive("/") ? "solid 1px #292943" : "none", borderRadius: '10px'}}><FaFilm/> Cena Atual</Link>
            <Link href="/dice" style={{marginTop: '15px', fontSize: '12px', display: 'flex', gap: '10px',padding: '12px 10px', backgroundColor: isActive("/dice") ? "#12131D" : "none", border: isActive("/dice") ? "solid 1px #292943" : "none", borderRadius: '10px'}}><FaDiceD20 /> Dados</Link>
            <Link href="/add" style={{marginTop: '15px', fontSize: '12px', display: 'flex', gap: '10px',padding: '12px 10px', backgroundColor: isActive("/add") ? "#12131D" : "none", border: isActive("/add") ? "solid 1px #292943" : "none", borderRadius: '10px'}}><IoIosSettings/> Novos Mobs</Link>
            </section>
            {children}
        </section>
    )
  }