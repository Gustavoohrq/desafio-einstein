import React from 'react';
import styled from 'styled-components';
import SchedulingForm from './components/SchedulingForm';
import SchedulingList from './components/SchedulingList';

const Container = styled.div`
   display: flex;
  justify-content: center;
  align-items: center;
  grid-column-gap: 90px;
  min-height: 100vh;
`;

const App = () => {
  return (
    <Container>
      <SchedulingForm />
      <SchedulingList />
    </Container>
  );
};

export default App;
