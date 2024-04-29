import { useEffect, useRef, useState } from 'react';
import styles from './chat.module.css'
import { IoChatbubblesOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { URL } from '@/services/baseURL';
import { io } from 'socket.io-client';
import { token } from '@/services/takeToken';
import { v4 as uuidv4 } from 'uuid';
import { axiosInstance } from '@/services/axiosInstance';
import { useProjectStore } from '@/store/project';

interface Message {
    id: string
    name: string
    text: string
    player_id: string
    isMine: boolean

}

interface Payload {
    id?: string
    name: string
    text: string
    player_id: string
    room: string
}

const socket = io(URL, {
    auth: {
        token: token
    }
})


export default function Chat() {

    const containerRef = useRef(null);

    const { project } = useProjectStore();

    const [text, setText] = useState('')

    const [msg, setMsg] = useState<Message[]>([])
    const [isVisible, setIsVisible] = useState(false);

    function scroll(): void {
        const currentRef = containerRef.current;
        if (currentRef && 'scrollTop' in currentRef) {
            (currentRef as HTMLElement).scrollTop = (currentRef as HTMLElement).scrollHeight;
        }
    }

    useEffect(() => {
        async function receivedMessage(message: Payload) {
            setMsg(prevMsg => [
                ...prevMsg,
                {
                    id: uuidv4(),
                    name: message.name,
                    text: message.text,
                    player_id: message.player_id,
                    isMine: message.player_id === "1111111"
                }
            ]);
            await new Promise(resolve => setTimeout(resolve, 10));
            scroll()
        }
    
        async function joinChatRoom() {
            if (project[0] && project[0].id) {
                socket.emit('joinRoom', project[0].id);
                getOldMessages()
            } else {
            }
        }
    
        async function setupSocket() {
            socket.connect();
    
            socket.on('msgToClient', receivedMessage);
    
            socket.on('connect', joinChatRoom);
        }
    
        setupSocket();
    
        return () => {
            socket.disconnect();
            socket.off('msgToClient', receivedMessage);
            socket.off('connect', joinChatRoom);
        };
    }, [socket, project]);

    const getOldMessages = async () => {

        try {

            const response = await axiosInstance.get(`/chat/${project[0].id}`)
            const data = await response.data
            const novo = data.map((cada: Payload) => ({
                id: cada.id,
                name: cada.name,
                text: cada.text,
                isMine: cada.player_id === "11111111111111"
            }))
            setMsg(novo)

        } catch (err) {
            console.error(err)
        }
    } 

    function getFirstLetter(name: string) {
        return name.charAt(0).toUpperCase();
    }

    return (
        <>
            {!isVisible && (
                <button className={styles.botaoAbrir} onClick={() => {
                    setIsVisible(true)
                    scroll()
                }
                }>
                    <IoChatbubblesOutline />
                </button>
            )}

            <div className={`${styles.chatContainer} ${isVisible ? styles.visible : ''}`}>
                <div className={styles.headerChat}>
                    <IoMdClose onClick={() => setIsVisible(false)} style={{ cursor: 'pointer' }}></IoMdClose>
                    <p className={styles.textoPrincipal}>Chat Geral</p>
                    <div></div>
                </div>

                <div className={styles.fundoHistorico} ref={containerRef}>
                    {msg && msg.map((cada: Message) => (
                        <div key={cada.id} className={`${cada.isMine ? styles.alignRight : styles.alignLeft}`}>
                            {cada.isMine ? (
                                <div className={styles.fundoBubble}>
                                    <p className={styles.msgText}>{cada.text}</p>
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <p className={styles.fundoFotoChat}>{getFirstLetter(cada.name)}</p>
                                    </div>
                                    <div className={styles.fundoBubble}>
                                        <p className={styles.msgText}>{cada.text}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}