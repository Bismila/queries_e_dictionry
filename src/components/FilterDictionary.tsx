import { Observer } from 'mobx-react-lite';
import * as React from 'react';
import { useCallback, useEffect } from 'react';
import filters from '../store/Filters';
import styled from '@emotion/styled';
import { css } from '@emotion/react'
import InputLabel from './InputLabel';
import Chart from './Chart';

const filter = filters;

const Title = styled.h1`
    margin: 0;
    padding: 1rem 0 0;
    text-align: center;
    color: #535c53;
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 2rem;
    border-radius: .15rem;
    justify-content: space-evenly;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: .5rem;
    margin: .5rem .25rem;
    align-items: center;
    justify-content: space-between;
    max-width: fit-content;
    background-color: #d4cdc0;
    border: 1px solid #535c53;
    transition: all .4s;

    &:hover {
        transform: scale(1.05);
        transition: all .4s;
    }
`;

const Counter = styled.span`
    color: #535c53;
    font-size: 1.5rem;
    padding: 0.5rem 0;
`;

const ChartContainer = styled.div`
${() => css`
        @media (max-width: 600px) {
            position: fixed;
            bottom: 0;
            background-color: white;
        }
    `
};`;

const FilterDictionary: React.FC = () => {
  
    useEffect(() => {
        if (filter.dictionary.words.length === 0) {
            filter.dictionary.loadWords();
        } 
    }, []);

    const onStartWordLetter = useCallback(
      (letter: string) => {
        filter.startWordLetter(letter);
      },[]);

    const onStartWordLetters = useCallback(
    (letter: string) => {
        filter.startWordLetters(letter);
    },[]);

    const onEndWordLetter = useCallback(
    (letter: string) => {
        filter.endWordLetter(letter);
    },[]);

    const onTimesLetter = useCallback(
        (letter: string) => {
            filter.timesLetter(letter);
    },[]);

    const onRepeatLetter = useCallback(
        (letter: string) => {
            filter.repeatSymbols(letter);
    },[]);


    
    return (<>
        <Title>Dictionary Search</Title>
        <Container>
            <InputWrapper>
               <InputLabel 
                    name="startWordLetter" 
                    id="startWordLetter" 
                    label="How many words with start letter: "
                    searchFilter={onStartWordLetter}
                    maxLenght={1}
                />
                <Observer>{ () => (<Counter>{ filter.countStartLetter }</Counter>) }</Observer> 
            </InputWrapper>
            
            <InputWrapper>
               <InputLabel 
                    name="startWordLetters" 
                    id="startWordLetters" 
                    label="How many words with start letters: "
                    searchFilter={onStartWordLetters}
                />
                <Observer>
                    {
                        () => {
                            return (<Counter>{ filter.countStartLetters }</Counter> )
                        }
                    }
                </Observer> 
            </InputWrapper>

            <InputWrapper>
               <InputLabel 
                    name="endLetter" 
                    id="endLetter" 
                    label="How many words end with the letter: "
                    searchFilter={onEndWordLetter}
                />
                <Observer>
                    {
                        () => {
                            return (<Counter>{ filter.countEndLetter }</Counter> )
                        }
                    }
                </Observer> 
            </InputWrapper>
            
            <InputWrapper>
               <InputLabel 
                    name="letterTimes" 
                    id="letterTimes" 
                    label="How many times does the letter appears: "
                    searchFilter={onTimesLetter}
                    maxLenght={1}
                />
                <Observer>
                    {
                        () => {
                            return (<Counter>{ filter.countLetterTimes }</Counter> )
                        }
                    }
                </Observer> 
            </InputWrapper>

            <InputWrapper>
               <InputLabel 
                    name="repeatSymbols" 
                    id="repeatSymbols" 
                    label="How many words have the same letter repeated in conjunction: "
                    searchFilter={onRepeatLetter}
                    maxLenght={1}
                />
                <Observer>
                    {
                        () => {
                            return (<Counter>{ filter.countRepeatSymbols }</Counter> )
                        }
                    }
                </Observer> 
            </InputWrapper>
        </Container> 
        
        <ChartContainer>
            <hr />
            <Observer>
                { () => 
                <Chart data={[
                    filter.countStartLetter,
                    filter.countStartLetters,
                    filter.countEndLetter,
                    filter.countLetterTimes,
                    filter.countRepeatSymbols
                ]} />
                }
            </Observer>
        </ChartContainer>
    </>
    )
}

export default FilterDictionary;