import AuthContent from "@/Context/AuthContext";
import MenuPrincipal from "@/component/menu";
import { fabric } from 'fabric';
import { useEffect, useState } from "react";
import ProjectContext from "@/Context/projectContext";
import styles from "@/styles/Home.module.css"
import { axiosInstance } from "@/services/axiosInstance";
import { useQuery } from "react-query";
import { useProjectStore } from "@/store/project";
import { ImageCanva } from "@/type/mobs";

export default function Map(){

  const { project } = useProjectStore()

  const [ images, setImages ] = useState([])

  const [ canva, setCanva ] = useState([])

  const handleFileChange = (evento: any) => {
    const arquivo = evento.target.files[0];
    if (arquivo) {
      enviarArquivo(arquivo);
    }
  };

  const enviarArquivo = async (arquivo: any) => {
    const formData = new FormData();
    formData.append('file', arquivo);
  
    try {
      const resposta = await axiosInstance.post(`/upload/${project[0].id}`, formData);
      console.log('Resposta:', resposta.data);
    } catch (erro) {
      console.error('Erro ao enviar o arquivo:', erro);
    }
  };

    const handleObjectModified = (event: any) => {
      const modifiedObject = event.target;
      if (modifiedObject.type === 'image') {
          console.log('Uma imagem foi modificada:', modifiedObject);
          // Execute sua lógica aqui sempre que uma imagem for modificada
      }
    }
    

    useEffect(() => {
        const canvas = new fabric.Canvas('whiteboard-canvas', {
          backgroundColor: 'white',
          width: window.innerWidth *  0.8,
          height: window.innerHeight *  0.8,
        });

        setCanva(canvas)

        // Atualize as dimensões do canvas quando o tamanho da janela for alterado
        const resizeCanvas = () => {
          canvas.setDimensions({
            width: window.innerWidth * 0.8,
            height: window.innerHeight * 0.8,
          });
        };

        window.addEventListener('resize', resizeCanvas);
        canvas.on('object:modified', handleObjectModified);

        // Remova o ouvinte de evento de redimensionamento quando o componente for desmontado
        return () => {
          window.removeEventListener('resize', resizeCanvas);
        };
      }, []);


      const buscarImages = async () =>{
        images.map(async (cada: ImageCanva) => {
          try{
            const response = await axiosInstance.get(`/upload/get/${cada.imageName}`)
            const base64Image = Buffer.from(response.data, 'binary').toString('base64');
            fabric.Image.fromURL(`data:image/jpeg;base64,${base64Image}`, function(img) {
              img.set({
                left: Number(cada.left),
                top:  Number(cada.top),
                width:  Number(cada.width),
                height:  Number(cada.height),
                selectable: true, // Torna a imagem selecionável
                hasControls: true
              });
              canva.add(img);
            })

          }catch(err){
            return console.error(err)
          }
        })
      }

      const imageProps = async () => {
        try{

          const response = await axiosInstance.get(`/images/${project[0].id}`)
          setImages(response.data)

          buscarImages()
        }catch(err){
          return console.error(err)
        }
      }

      const { data, isLoading, isError} = useQuery('images', async () => {  
        await imageProps()
      },{
        enabled: !!project[0]
      })

    
    return (
        <AuthContent>
          <ProjectContext>
              <MenuPrincipal>
                  <main className={styles.main} style={{flexGrow: 1}}>
                    <div>
                      <h1>É o mapa!</h1>
                      <form action="" style={{display: 'flex', gap: '10px', alignItems: 'center', marginTop: '25px'}}>
                        <input type="file" style={{cursor: 'pointer'}} onChange={handleFileChange}/>
                        <button className={styles.salvar} style={{margin: '0'}}>Adicionar imagem</button>
                      </form>
                    </div>
                      <canvas style={{marginTop: '25px'}} id="whiteboard-canvas"></canvas>
                  </main>
              </MenuPrincipal>
          </ProjectContext>
        </AuthContent>
    )
}