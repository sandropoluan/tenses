'use client';
import styles from "./index.module.css";

interface Props {
    submit: () => void;
    next: () => void;
    clear: () => void;
}

export default function Box(props: Props) {
    const { submit, next, clear } = props;

    return <div className={styles.button_area}>
        <span className={`${styles.button} ${styles.submit}`} onClick={submit}>Submit</span>
        <span className={`${styles.button} ${styles.next}`} onClick={next}>Next</span>
        <span className={`${styles.button} ${styles.clear}`} onClick={clear}>Clear</span>
    </div>
}