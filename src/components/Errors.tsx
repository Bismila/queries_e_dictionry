import React from 'react'
import styled from '@emotion/styled';

const ErrorContainer = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   flex-grow: 1;
`;

const ErrorTitle = styled.p`
    max-width: 42rem;
    text-align: center;
    margin: 0 auto;
    padding: 2rem;
    font-size: 2rem;
    color: #535c53;
`;

const Errors: React.FC = () => {
    return (
        <ErrorContainer>
            <ErrorTitle>
                Oops... something went wrong... No data came in... Please try again later.
            </ErrorTitle>
        </ErrorContainer>
    )
                    
}

export default Errors;
