import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { cancelScheduling, confirmScheduling, getSchedulings } from '../services/api';
import moment from "moment";
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

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
  status?: string;
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
  const confirmationHandleClick = async (id: string) => {
    const confirmed = window.confirm('Deseja confirmar o agendamento?');
    if (confirmed) {
      try {
        await confirmScheduling(id)
        const updatedSchedulings = schedulings.map((appointment) => {
          if (appointment.id === id) {
            return { ...appointment, status: 'Confirmado' };
          }
          return appointment;
        });
        setSchedulings(updatedSchedulings);
        alert('Agendamento confirmado!');
      } catch (error) {
        alert('Erro ao tentar confirmar agendamento.');
      }
    } else {
      alert('Agendamento não confirmado.');
    }
  };

  const cancelHandleClick = async (id: string) => {
    const confirmed = window.confirm('Deseja confirmar o cancelamento do agendamento?');
    if (confirmed) {
      try {
        await cancelScheduling(id)
        const updatedSchedulings = schedulings.map((appointment) => {
          if (appointment.id === id) {
            return { ...appointment, status: 'Cancelado' };
          }
          return appointment;
        });
        setSchedulings(updatedSchedulings);
        alert('Agendamento cancelado!');
      } catch (error) {
        alert('Erro ao tentar cancelar agendamento.');
      }
    } else {
      alert('Agendamento não cancelado.');
    }
  };
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
              <TableCell>{appointment.status === "Em_Aberto" ? 'Em aberto' : appointment.status}</TableCell>
              <TableCell ><CheckCircleIcon onClick={() => confirmationHandleClick(appointment.id)} width={24} title='Confirmar agendamento' style={{ cursor: 'pointer', color: "#666666", transition: "color 0.3s ease" }}></CheckCircleIcon> </TableCell>
              <TableCell><XCircleIcon onClick={() => cancelHandleClick(appointment.id)} width={24} title='Cancelar agendamento' style={{ cursor: 'pointer', color: "red", transition: "color 0.3s ease" }}></XCircleIcon></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SchedulingListWrapper>
  );
};

export default SchedulingList;
