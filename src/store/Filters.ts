import { action, makeObservable, observable } from "mobx";
import { DictionaryStore } from "./DictionaryStore";
import { ChartType } from "./Types";

class Filters {
    dictionary: DictionaryStore = new DictionaryStore();

    countStartLetter = 0;
    countStartLetters = 0;
    countEndLetter = 0;
    countLetterTimes = 0;
    countRepeatSymbols = 0;

    constructor() {
        makeObservable(this, {
            dictionary: observable,
            countStartLetter: observable,
            countStartLetters: observable,
            countEndLetter: observable,
            countLetterTimes: observable,
            countRepeatSymbols: observable,
            startWordLetter: action,
            startWordLetters: action,
            endWordLetter: action,
            timesLetter: action,
            repeatSymbols: action,
            setChartData: action
        });
    }

    startWordLetter (letter: string) {
        let count = 0;
        for (const word of this.dictionary.words) {
            const firstChar = word.name.substr(0, 1).toLowerCase();
            if (letter && firstChar === letter.toLowerCase()) {
                ++ count; 
            }
        }
        this.countStartLetter = count;
    }

    startWordLetters (letter: string) {
        let count = 0;
        for (const word of this.dictionary.words) {
            const firstChars = word.name.substr(0, letter.length).toLowerCase();
            if (letter && firstChars === letter.toLowerCase()) {
                ++ count;
            }
        }
        
        this.countStartLetters = count;
    }

    endWordLetter (letter: string) {

        let count = 0;
        if (letter) {
            for (const word of this.dictionary.words) {
                const search = letter.toLowerCase();
                const nameWord = word.name.toLowerCase();
                if (nameWord.endsWith(search)) {
                    ++ count;
                }
            }
        } 
        this.countEndLetter = count;

    }

    checkCharTimes = (word: string, char: string) => {
        let count = 0;
        for (let i = 0; i < word.length; i ++){
            if (word[i] === char) {
                ++count;
            }  
        }
        return count;
    } 

    timesLetter = (letter: string) => {
        let numberSymbols = 0;
        if (letter) {
            for (const word of this.dictionary.words) {
                let countLetterInWord = this.checkCharTimes(word.name.toLowerCase(), letter.toLowerCase())
                numberSymbols += countLetterInWord; 

            }
        } 
        this.countLetterTimes = numberSymbols;

    }

    repeatSymbols = (symbols: string) => {
        let number = 0;
        var regex = new RegExp('(' + symbols + ')\\1','i');
        if(symbols) {
            for (const word of this.dictionary.words) {
                if (regex.test(word.name.toLowerCase())) {
                    ++ number;
                }
            }
        } 
        this.countRepeatSymbols = number;
    }

    setChartData () {

        let data: number[] = [
            this.countStartLetter,
            this.countStartLetters,
            this.countEndLetter,
            this.countLetterTimes,
            this.countRepeatSymbols,
        ];
        console.log('generatedChartData mobx', data);

        let labels: string[] = [
            'start letter',
            'end letter',
            'letter times',
            'repeat letters',
            'start letters',
        ];
        
        let chartData: ChartType = {
            labels,
            datasets: [
                {
                label: 'Dictionary count of words',
                data,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        }

        return chartData;
    }
}

export default new Filters();