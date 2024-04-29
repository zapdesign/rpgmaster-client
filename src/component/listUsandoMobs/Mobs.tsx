import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ListMobs from ".";
import styles from "./dnd.module.css"


export const MobsItem = ({ cada, id, pegarMob }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={styles.alignItens}
    >
      <ListMobs cada={cada} pegarMob={pegarMob} red={cada.rodada}></ListMobs>
    </div>
  );
};