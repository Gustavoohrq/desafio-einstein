import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getSchedulings } from '../services/api';
import moment from "moment";

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;

const SchedulingListWrapper = styled.div`
  width: 100%;
  max-width: 800px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #444;
  border-radius: 10px;
  box-shadow: 0 29px 20px rgba(0, 0, 0, 0.1);
`;

const TableHead = styled.thead`
  background-color: #333 ;
  color: white;
`;

const TableBody = styled.tbody`
  color: white;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #555;
  }
`;

const TableHeaderCell = styled.th`
  padding: 15px;
  text-align: left;
      background-color: #555;

`;

const TableCell = styled.td`
  padding: 15px;

`;

interface Scheduling {
  id: string;
  licensePlate: string;
  date: string;
  time: string;
  type: string;
  confirmed?: boolean;
}

const SchedulingList = () => {
  const [schedulings, setSchedulings] = useState<Scheduling[]>([]);

  useEffect(() => {
    const fetchSchedulings = async () => {
      try {
        const response = await getSchedulings();
        setSchedulings(response.data);
      } catch (error) {
        console.error('Error fetching scheduling', error);
      }
    };

    fetchSchedulings();
  }, []);

  return (
    <SchedulingListWrapper>
      <Title>Agendamentos</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Placa</TableHeaderCell>
            <TableHeaderCell>Data</TableHeaderCell>
            <TableHeaderCell>Hora</TableHeaderCell>
            <TableHeaderCell>Tipo</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedulings.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.licensePlate}</TableCell>
              <TableCell>{moment(appointment.date, 'YYYY-MM-DD').format('DD/MM/YYYY')}</TableCell>
              <TableCell>{appointment.time}</TableCell>
              <TableCell>{appointment.type}</TableCell>
              <TableCell>{!appointment.confirmed ? 'Não confirmado' : 'Confirmado' }</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SchedulingListWrapper>
  );
};

export default SchedulingList;
