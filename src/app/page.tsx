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
  'Did',
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
  'Not',
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
  { '[-] Past Simple': ['Subject', 'Did', 'Not', 'V1'] },
  { '[?] Past Simple': ['Did', 'Subject', 'V1'] },

  { 'Past Perfect': ['Subject', 'Had', 'V3'] },
  { '[-] Past Perfect': ['Subject', 'Had', 'Not', 'V3'] },
  { '[?] Past Perfect': ['Had', 'Subject', 'V3'] },

  { 'Past Continuous': ['Subject', 'Was/Were', 'Verb+ing'] },
  { '[-] Past Continuous': ['Subject', 'Was/Were', 'Not', 'Verb+ing'] },
  { '[?] Past Continuous': ['Was/Were', 'Subject', 'Verb+ing'] },

  { 'Past Perfect Continuous': ['Subject', 'Had', 'Been', 'Verb+ing'] },
  { '[-] Past Perfect Continuous': ['Subject', 'Had', 'Not', 'Been', 'Verb+ing'] },
  { '[?] Past Perfect Continuous': ['Had', 'Subject', 'Been', 'Verb+ing'] },

  { 'Present Simple': ['Subject', 'V1', 's/es'] },
  { '[-] Present Simple': ['Subject', 'Do/Does', 'Not', 'V1'] },
  { '[?] Present Simple': ['Do/Does', 'Subject', 'V1'] },

  { 'Present Perfect': ['Subject', 'Have/Has', 'V3'] },
  { '[-] Present Perfect': ['Subject', 'Have/Has', 'Not', 'V3'] },
  { '[?] Present Perfect': ['Have/Has', 'Subject', 'V3'] },

  { 'Present Continuous': ['Subject', 'be (Am/Is/Are)', 'Verb+ing'] },
  { '[-] Present Continuous': ['Subject', 'be (Am/Is/Are)', 'Not', 'Verb+ing'] },
  { '[?] Present Continuous': ['be (Am/Is/Are)', 'Subject', 'Verb+ing'] },

  { 'Present Perfect Continuous': ['Subject', 'Have/Has', 'Been', 'Verb+ing'] },
  { '[-] Present Perfect Continuous': ['Subject', 'Have/Has', 'Not', 'Been', 'Verb+ing'] },
  { '[?] Present Perfect Continuous': ['Have/Has', 'Subject', 'Been', 'Verb+ing'] },

  { 'Future Simple': ['Subject', 'Will/Shall', 'V1'] },
  { '[-] Future Simple': ['Subject', 'Will/Shall', 'Not', 'V1'] },
  { '[?] Future Simple': ['Will', 'Subject', 'V1'] },

  { 'Future Perfect': ['Subject', 'Will', 'Have', 'V3'] },
  { '[-] Future Perfect': ['Subject', 'Will', 'Not', 'Have', 'V3'] },
  { '[?] Future Perfect': ['Will', 'Subject', 'Have', 'V3'] },

  { 'Future Continuous': ['Subject', 'Will', 'Be', 'Verb+ing'] },
  { '[-] Future Continuous': ['Subject', 'Will', 'Not', 'Be', 'Verb+ing'] },
  { '[?] Future Continuous': ['Will', 'Subject', 'Be', 'Verb+ing'] },

  { 'Future Perfect Continuous': ['Subject', 'Will', 'Have', 'Been', 'Verb+ing'] },
  { '[-] Future Perfect Continuous': ['Subject', 'Will', 'Not', 'Have', 'Been', 'Verb+ing'] },
  { '[?] Future Perfect Continuous': ['Will', 'Subject', 'Have', 'Been', 'Verb+ing'] },

  { 'Past Future Simple': ['Subject', 'Would', 'V1'] },
  { '[-] Past Future Simple': ['Subject', 'Would', 'Not', 'V1'] },
  { '[?] Past Future Simple': ['Would', 'Subject', 'V1'] },

  { 'Past Future Perfect': ['Subject', 'Would/Should', 'Have', 'V3'] },
  { '[-] Past Future Perfect': ['Subject', 'Would/Should', 'Not', 'Have', 'V3'] },
  { '[?] Past Future Perfect': ['Would/Should', 'Subject', 'Have', 'V3'] },

  { 'Past Future Continuous': ['Subject', 'Would/Should', 'Be', 'Verb+ing'] },
  { '[-] Past Future Continuous': ['Subject', 'Would/Should', 'Not', 'Be', 'Verb+ing'] },
  { '[?] Past Future Continuous': ['Would/Should', 'Subject', 'Be', 'Verb+ing'] },

  { 'Past Future Perfect Continuous': ['Subject', 'Would', 'Have', 'Been', 'Verb+ing'] },
  { '[-] Past Future Perfect Continuous': ['Subject', 'Would', 'Not', 'Have', 'Been', 'Verb+ing'] },
  { '[?] Past Future Perfect Continuous': ['Would', 'Subject', 'Have', 'Been', 'Verb+ing'] },
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
      <span style={{fontSize: 12, marginTop: 4}}>Remaining {tenses.length}</span>
      <Box selected={selected} status={status} />
      <Selectors words={words} selectWord={selectWord} />
      <ButtonArea submit={submit} next={nextTense} clear={reset} />
    </main>
  );
}
