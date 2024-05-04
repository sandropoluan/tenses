'use client';
import { Statuses, Word } from "../../types";
import styles from "./index.module.css";

interface Props {
    selected: Word[];
    status: Statuses;
}

export default function Box(props: Props) {
    const { selected, status } = props;

    return <div className={`${styles.box} ${styles[status]}`}>
        {
            selected.map((value, index) => {
                return <span className={styles.tag} key={`${value}-${index}`} >{value}</span>
            })
        }


    </div>
}