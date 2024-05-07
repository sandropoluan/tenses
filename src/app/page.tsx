'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Box from "./components/Box";
import Selectors from "./components/Selectors";
import ButtonArea from "./components/ButtonArea";
import styles from "./page.module.css";
import { Word, Statuses } from './types';
import Title from './components/Title';

const words: Word[] = [
  'Subject',
  'Do/Does',
  'Would',
  'Will',
  'Will/Shall',
  'Would',
  'Should',
  'Would/Should',
  'be (Am/Is/Are)',
  'Was/Were',
  'Had',
  'Has',
  'Have',
  'Have/Has',
  'Be',
  'Been',
  'V1',
  'V2',
  'V3',
  's/es',
  'Verb+ing',
  'Object',
]

const allTenses: Record<string, Word[]>[] = [
  { 'Past Simple': ['Subject', 'V2'] },
  { 'Past Perfect': ['Subject', 'Had', 'V3'] },
  { 'Past Continuous': ['Subject', 'Was/Were', 'Verb+ing'] },
  { 'Past Perfect Continuous': ['Subject', 'Had', 'Been', 'Verb+ing'] },

  { 'Present Simple': ['Subject', 'V1', 's/es'] },
  { 'Present Perfect': ['Subject', 'Have/Has', 'V3'] },
  { 'Present Continuous': ['Subject', 'be (Am/Is/Are)', 'Verb+ing'] },
  { 'Present Perfect Continuous': ['Subject', 'Have/Has', 'Been', 'Verb+ing'] },

  { 'Future Simple': ['Subject', 'Will/Shall', 'V1'] },
  { 'Future Perfect': ['Subject', 'Will', 'Have', 'V3'] },
  { 'Future Continuous': ['Subject', 'Will', 'Be', 'Verb+ing'] },
  { 'Future Perfect Continuous': ['Subject', 'Will', 'Have', 'Been', 'Verb+ing'] },

  { 'Past Future Simple': ['Subject', 'Would', 'V1'] },
  { 'Past Future Perfect': ['Subject', 'Would/Should', 'Have', 'V3'] },
  { 'Past Future Continuous': ['Subject', 'Would/Should', 'Be', 'Verb+ing'] },
  { 'Past Future Perfect Continuous': ['Subject', 'Would', 'Have', 'Been', 'Verb+ing'] },
]

export default function Home() {
  const [tenses, setTenses] = useState<Record<string, Word[]>[]>([...allTenses]);
  const [selected, setSelected] = useState<Word[]>([]);

  const [status, setStatus] = useState<Statuses>('');

  const randomTenseIndex = useMemo(() => {
    return Math.floor(Math.random() * tenses.length);
  }, [tenses]);

  const nextTense = useCallback(() => {
    setSelected([]);
    setTenses(prev => {
      prev = [...prev];
      prev.splice(randomTenseIndex, 1);
      if (prev.length === 0) return [...allTenses];
      return prev;
    });
  }, [tenses, randomTenseIndex, setTenses]);

  const tenseNameKey = useMemo(() => {
    const currTenseObj = tenses[randomTenseIndex];

    return Object.keys(currTenseObj)[0];

  }, [randomTenseIndex, tenses]);


  const reset = useCallback(() => {
    setSelected([]);
  }, [setSelected]);


  const submit = useCallback(() => {
    const values = tenses[randomTenseIndex][tenseNameKey];

    let correct = false;
    if (values.length !== selected.length) {
      correct = false;
    } else {
      correct = true;
      for (let i = 0; i < selected.length; i++) {
        const a = selected[i];
        const b = values[i];
        if (a !== b) {
          correct = false;
          break;
        }
      }
    }

    if (correct) {
      setStatus('correct');
    } else {
      setStatus('fail');
    }
  }, [randomTenseIndex, tenseNameKey, tenses, selected]);


  const selectWord = useCallback((word: Word) => {
    console.log('word', word)
    setSelected(prev => {
      prev = [...prev];
      prev.push(word);
      return prev;
    })
  }, [setSelected]);

  useEffect(() => {
    if (status !== '') {
      setTimeout(() => {
        setStatus('');
      }, 1000)
    }
  }, [status, setStatus]);

  return (
    <main className={styles.main}>
      <Title title={tenseNameKey} />
      <Box selected={selected} status={status} />
      <Selectors words={words} selectWord={selectWord} />
      <ButtonArea submit={submit} next={nextTense} clear={reset} />
    </main>
  );
}
