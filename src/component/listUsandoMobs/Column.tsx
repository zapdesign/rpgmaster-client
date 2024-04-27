import {
    SortableContext,
    verticalListSortingStrategy,
  } from "@dnd-kit/sortable";
  
import { MobsItem } from "./Mobs";
import { Mobs } from "@/type/mobs";
import styles from "@/styles/Home.module.css"
import { useState } from "react";
  
  
  export const Column = ({ mobs, pegarMob }) => {

    const [selectedMobId, setSelectedMobId] = useState(0);

    return (
      <div style={{maxWidth: "100%"}}>
        <SortableContext items={mobs} strategy={verticalListSortingStrategy}>
          {mobs.map((cada: Mobs) => (  
            <div key={cada.index} className={`${styles.fundoUsando} ${cada.id ===  String(selectedMobId)  ? styles.selectedMob : ''}`}  style={{padding: '15px 15px', borderRadius: '10px'}}>
              <MobsItem pegarMob={pegarMob} key={cada.index} id={cada.id} cada={cada} />
            </div>
          ))}
        </SortableContext>
      </div>
    );
  };