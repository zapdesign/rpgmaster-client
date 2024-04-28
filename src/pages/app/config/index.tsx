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
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { useRouter } from "next/router";
//@ts-ignore
import cookieCutter from 'cookie-cutter'; 

export default function ConfigPage() {

    const { pathname, push, replace } = useRouter();

    function setCookie(
        key: any,
        value: any,
        expireDays: any,
        expireHours: any,
        expireMinutes: any,
        expireSeconds: any
      ) {
        var expireDate = new Date();
        if (expireDays) {
          expireDate.setDate(expireDate.getDate() + expireDays);
        }
        if (expireHours) {
          expireDate.setHours(expireDate.getHours() + expireHours);
        }
        if (expireMinutes) {
          expireDate.setMinutes(expireDate.getMinutes() + expireMinutes);
        }
        if (expireSeconds) {
          expireDate.setSeconds(expireDate.getSeconds() + expireSeconds);
        }
        document.cookie =
          key +
          "=" +
          escape(value) +
          ";domain=" +
          window.location.hostname +
          ";path=/" +
          ";expires=" +
          expireDate.toUTCString();
      }
    
      function deleteCookie(name: any) {
        setCookie(name, "", null, null, null, 1);
      }
    
      const exit = async () => {
        cookieCutter.set("@access_token", "", {
          expires: new Date(-1),
        });
        deleteCookie("@access_token");
        replace("/");
      };


    return (
        <AuthContent>
            <main style={{width: "100%", height:'100vh'}}>
                <menu style={{width: "100%", padding: '20px 50px', display: 'flex', justifyContent: 'space-between',alignItems: 'center', background: '#11121B'}}>
                    <Image width="150" height="50" src="/logo.svg" alt="Logo nosso app"></Image>    
                    <Link href={`/app`} style={{cursor: "pointer"}}><IoMdArrowDropleftCircle /></Link>
                </menu>                

                <section style={{width: "100%", padding: '20px 50px', flex: '1'}}>

                    <button style={{background: "red"}} onClick={exit}>Deslogar</button>
                </section>
            </main>
        </AuthContent>
    )
}