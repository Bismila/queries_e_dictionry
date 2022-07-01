import { flow, makeObservable, observable } from 'mobx';
import { getWords } from '../api';
import { Word } from './Types';

export class DictionaryStore {
    words = observable.array<Word>([]);
    inProgress: boolean = false;

    constructor() {
        makeObservable(this, {
            words: observable,
            loadWords: flow,
        });
    }

    *loadWords() {
        if(this.inProgress === true) {
            return;
        }
        try{
            this.inProgress = true;
            const resp: Word[] = yield getWords();

            this.fillWords(resp);
            this.inProgress = false;
        } catch (err) {
            console.error(err);
            this.inProgress = false;
        }
    }

    fillWords(data: Word[]) {
        data.forEach(element => {
            this.words.push(element);
        });
    }
}
