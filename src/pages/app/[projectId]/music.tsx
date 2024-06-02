import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube'
import PlayerMusicYT from './music copy';
import { io } from 'socket.io-client';
import { token } from '@/services/takeToken';
import { URL } from '@/services/baseURL';
import { useProjectStore } from '@/store/project';
import AuthContent from '@/Context/AuthContext';
import ProjectContext from '@/Context/projectContext';
import styles from "@/styles/Home.module.css"
import MenuPrincipal from '@/component/menu';
import PopUpSongAdd from '@/component/popupMusic';
import { useQuery } from 'react-query';
import { axiosInstance } from '@/services/axiosInstance';
import { FaPlus } from "react-icons/fa6";
import { IoTrashOutline } from "react-icons/io5";
import { IoMdPlay } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { MdOutlineAudiotrack } from "react-icons/md";

const socket = io(URL, {
  auth: {
      token: token
  }
})

interface Payload {
  id?: string
  text: string
  room: string
}

interface Songs{
  id: string;
  name: string;
  url: string;
  loop: string;
  isActive: boolean;
  volume: number;
  project_id: string;
  created_at?: string
}

interface RunSong{
  id: string;
  name?: string;
  url: string;
  loop?: string;
  isActive?: boolean;
  volume?: number;
  project_id?: string;
  created_at?: string
}

export default function MusicPage() {
  const [ run, setRun ] = useState(false)
  
  const [ mutedAudio, setMutedAudio ] = useState(true)
  
  const [ popupIsActive, setPopupisActive ] = useState(false)
  const [ songs, setSongs ] = useState([])
  const [url, setUrl] = useState<RunSong[]>([]);
  
  const { project } = useProjectStore();

  const searchMusic = async () => {
    try{
        const response = await axiosInstance.get(`songs/${project[0].id}`)
        const data = await response.data
        setSongs(data)
        const active = data.filter((cada: Songs) => cada.isActive)
        setUrl(active)
    }catch(err){
        console.error(err)
    }
  }

  const delMusic = async (id: string) =>{
    const confirmarExclusao = window.confirm("Tem certeza que deseja excluir esta música?");

    if(confirmarExclusao){
        await axiosInstance.delete(`/songs/${id}`)
        searchMusic()
        return
    }

    return
  }

  const changeSong = async (id: string, data: any, url: string) => {
    try{
      await axiosInstance.put(`songs/${id}`, {
        ...data
      })

      if(data.isActive === true){
        sendURL(id, url)
      }
      
    }catch(err){
        console.error(err)
    }
  }

  async function sendURL(id: string, url: string) {
    let message: Payload = {
        id: id,
        room: "0bb02f5f-af3c-4826-8f63-6f4b97713211",
        text: url
    };
    socket.emit('msgPlayAudio', message); 
  }

  
  useEffect(() => {
    async function handleRunAudio(message: Payload) {
        setUrl([...url, {id: message.id, url: message.text}])
        setRun(true)
    }

    async function joinChatRoom() {
    socket.emit('joinRoom', "0bb02f5f-af3c-4826-8f63-6f4b97713211");
    }

    async function setupSocket() {
        socket.connect();

        socket.on('msgPlayAudio', handleRunAudio);

        socket.on('connect', joinChatRoom);
    }

    setupSocket();

    return () => {
        socket.disconnect();
        socket.off('msgToClient', handleRunAudio);
        socket.off('connect', joinChatRoom);
    };
  }, [socket, project]);

  const {  } = useQuery('music', async () => {
    await searchMusic()
  }, {
    enabled: !!project[0]
  })

  return (
    <AuthContent>
      <ProjectContext>
        <MenuPrincipal>
          <main className={styles.main} style={{flexGrow: 1}}>
            <h1 onClick={() => setMutedAudio(!mutedAudio)}>Suas Músicas</h1>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 25}}>
                <button className={styles.salvar} onClick={() => setPopupisActive(true)} style={{padding: '10px 10px', margin: '0', borderRadius: '100px', alignItems: 'center', display: "flex"}}><FaPlus/></button>
            </div>
            <div style={{width: "100%", marginTop: 25}}>
              {songs[0] !== undefined && songs.map((cada: Songs) => (
                <div key={cada.id} style={{display: 'flex', alignItems: 'center', justifyContent: "space-between", marginTop: 15}}>
                  <IoClose style={{color: "white",cursor: "pointer"}}/>
                  <IoMdPlay style={{cursor: 'pointer', color: "white"}} onClick={() => {
                    changeSong(cada.id, {isActive: true}, cada.url);
                  }}/>
                  <div style={{width: "80%", display: "flex"}}>
                      <p>{cada.name}</p>
                  </div>
                  <IoTrashOutline onClick={() => delMusic(cada.id)}  style={{cursor: "pointer"}}/>
                  </div>
              ))}
            </div>

            {url[0] && url.map(cada => (
              <div key={cada.id}>
                <PlayerMusicYT mutedAudio={mutedAudio} url={cada.url} ></PlayerMusicYT>
              </div>
            ))}
            {popupIsActive && <PopUpSongAdd setPopupisActive={setPopupisActive} projectId={project[0].id} searchMusic={searchMusic}></PopUpSongAdd>}
            {!run && <div className={styles.popupOverlay}>
              <MdOutlineAudiotrack style={{color: "white",cursor: "pointer"}} onClick={() => {
                setRun(true)
                setMutedAudio(false)
              }} />
            </div>}
          </main>
        </MenuPrincipal>
      </ProjectContext>
    </AuthContent>
  );
}