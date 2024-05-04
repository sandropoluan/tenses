'use client';
import { Word } from "../../types";
import styles from "./index.module.css";

interface props {
    selectWord: (word: Word) => void;
    words: Word[]
}

export default function Box(props: props) {
    const { words, selectWord } = props;

    return <div className={styles.selectors}>
        {
            words.map((value, index) => {
                return <span className={styles.tag} key={`${value}-${index}`} onClick={() => {
                    selectWord(value);
                }}>{value}</span>
            })
        }
    </div>
}