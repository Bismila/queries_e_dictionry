import { flow, makeObservable, observable } from 'mobx';
import { getWords } from '../api';
import { Word } from './Types';

export class DictionaryStore {
    words = observable.array<Word>([]);
    inProgress: boolean = false;
    isError: boolean = false;
    isLoadingData: boolean = true;

    constructor() {
        makeObservable(this, {
            words: observable,
            isLoadingData: observable,
            isError: observable,
            loadWords: flow,
        });
    }

    *loadWords() {
        if(this.inProgress === true) {
            this.isLoadingData = true;
            return;
        }
        try{
            this.inProgress = true;
            const resp = yield getWords();
            if (resp.length === 0) {
                throw new Error("No Data in the dictionary")
            }
            this.fillWords(resp);
             
            this.inProgress = false;
        } catch (err) {
            this.isError = true;
            console.warn(err);
            this.inProgress = false;
        }
    }

    fillWords(data: Word[]) {
        if (data && data.length) {
            data.forEach(element => {
                this.words.push(element);
            });
            this.isLoadingData = false;
        }
    }
}
