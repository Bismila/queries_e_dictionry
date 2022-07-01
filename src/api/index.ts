import { Word } from "../store/Types";

export const DOMAIN = 'http://localhost:3001/words';

export const getWords = async(): Promise<Word[]> => {
    const res: Word[] = await fetch(DOMAIN).then((res) => res.json());
    return res;
}