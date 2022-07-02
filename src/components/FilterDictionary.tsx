import { observer, Observer } from 'mobx-react-lite';
import * as React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import filters from '../store/FiltersStore';
import styled from '@emotion/styled';
import { css } from '@emotion/react'
import InputLabel from './InputLabel';
import Chart from './Chart';
import Errors from './Errors';

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
    border-radius: 3px;
    -webkit-box-shadow: 1px 3px 12px 1px rgba(0,0,0,0.28); 
    box-shadow: 1px 3px 12px 1px rgba(0,0,0,0.28);
    transition: all .4s;

    &:hover {
        -webkit-box-shadow: 1px 3px 12px 1px rgba(0,0,0,0.47); 
        box-shadow: 1px 3px 12px 1px rgba(0,0,0,0.47);
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
       
    }
`
};`;

const FilterDictionary: React.FC = () => {
    const chartRef = useRef(null);
    useEffect(() => {
        filter.dictionary.loadWords();
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
   
    if (filter.dictionary.isError) {
        return <Errors />
    }
    
    return !filter.dictionary.isLoadingData && (<>
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
                <Observer>{() => (<Counter>{ filter.countStartLetter }</Counter> )}</Observer> 
            </InputWrapper>
            
            <InputWrapper>
               <InputLabel 
                    name="startWordLetters" 
                    id="startWordLetters" 
                    label="How many words with start letters: "
                    searchFilter={onStartWordLetters}
                />
                <Observer>{() => (<Counter>{ filter.countStartLetters }</Counter> )}</Observer> 
            </InputWrapper>

            <InputWrapper>
               <InputLabel 
                    name="endLetter" 
                    id="endLetter" 
                    label="How many words end with the letter: "
                    searchFilter={onEndWordLetter}
                />
                <Observer>{() => (<Counter>{ filter.countEndLetter }</Counter> )}</Observer> 
            </InputWrapper>
            
            <InputWrapper>
               <InputLabel 
                    name="letterTimes" 
                    id="letterTimes" 
                    label="How many times does the letter appears: "
                    searchFilter={onTimesLetter}
                    maxLenght={1}
                />
                <Observer>{() => (<Counter>{ filter.countLetterTimes }</Counter> )}</Observer> 
            </InputWrapper>

            <InputWrapper>
               <InputLabel 
                    name="repeatSymbols" 
                    id="repeatSymbols" 
                    label="How many words have the same letter repeated: "
                    searchFilter={onRepeatLetter}
                    maxLenght={1}
                />
                <Observer>{() => (<Counter>{ filter.countRepeatSymbols }</Counter> )}</Observer> 
            </InputWrapper>
        </Container> 
        
        <ChartContainer ref={chartRef}>
            <hr />
            <Observer>
                { () => (
                    <Chart data={[
                        filter.countStartLetter,
                        filter.countStartLetters,
                        filter.countEndLetter,
                        filter.countLetterTimes,
                        filter.countRepeatSymbols
                    ]} />
                )}
            </Observer>
        </ChartContainer>
    </>
    )
}

export default observer( FilterDictionary);

