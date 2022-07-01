import { Word } from "../store/Types";

export const DOMAIN = 'http://localhost:3001/words';

export const getWords = async(): Promise<Word[]> => {
    const res = await fetch(DOMAIN).then((res) => {
        if (!res.ok) {
            return Promise.reject(res);
        }
        return res.json();
    })
    return res;
}