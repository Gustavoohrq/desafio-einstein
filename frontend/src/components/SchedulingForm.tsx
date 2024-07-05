import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { createScheduling, getSlots } from '../services/api';
import { AxiosError } from 'axios';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  background-color: white;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Input = styled.input`
  margin-bottom: 5px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Select = styled.select`
  margin-bottom: 10px;
  color: white;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  background-color: white;
  color: #d9534f;
  margin-bottom: 5px;
  font-size: 14px;
`;

const validationSchema = Yup.object({
  licensePlate: Yup.string()
    .matches(/^[A-Z]{3}[0-9][A-Z][0-9]{2}$/, 'Formato da placa inválido (ABC1D34)')
    .required('Placa do veículo é obrigatória'),
  date: Yup.date().required('Data é obrigatória'),
  time: Yup.string().required('Hora é obrigatória'),
  type: Yup.string().oneOf(['simples', 'completa']).required('Tipo de lavagem é obrigatório'),
});


const SchedulingForm = () => {
  const [slots, setSlots] = useState<Array<string>>([]);

  useEffect(() => {
    const fetchSchedulings = async () => {
      try {
        const response = await getSlots();
        setSlots(response.data);
      } catch (error) {
        console.error('Error fetching scheduling', error);
      }
    };

    fetchSchedulings();
  }, [])
  const formik = useFormik({
    initialValues: {
      licensePlate: '',
      date: '',
      time: '',
      type: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await createScheduling(values);
        alert(result.data.message);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error.response?.data.message);
          alert(error.response?.data.message);
        } else {
          console.error('Erro inesperado:', error);
          alert('Ocorreu um erro inesperado');
        }
      }
      
    },
  });

  return (
    <Container>
      <FormWrapper>
        <Title> Criar agendamento</Title>
        <Form onSubmit={formik.handleSubmit}>
          <Input
            id="licensePlate"
            name="licensePlate"
            type="text"
            placeholder="Placa"
            onChange={formik.handleChange}
            value={formik.values.licensePlate}
          />
          {formik.errors.licensePlate && formik.touched.licensePlate && (
            <ErrorMessage>{formik.errors.licensePlate}</ErrorMessage>
          )}
          <Input
            id="date"
            name="date"
            type="date"
            onChange={formik.handleChange}
            value={formik.values.date}
          />
          {formik.errors.date && formik.touched.date && (
            <ErrorMessage>{formik.errors.date}</ErrorMessage>
          )}



          <Select
            id="time"
            name="time"
            onChange={formik.handleChange}
            value={formik.values.time}
          >
            {slots.map((slot) => (
              <option value={slot} label={slot} />
            ))}

          </Select>
          {formik.errors.time && formik.touched.time && (
            <ErrorMessage>{formik.errors.time}</ErrorMessage>
          )}

          <Select
            id="type"
            name="type"
            onChange={formik.handleChange}
            value={formik.values.type}
          >
            <option value="" label="Selecionar tipo de lavagem" />
            <option value="simples" label="Simples" />
            <option value="completa" label="Completa" />
          </Select>


          {formik.errors.type && formik.touched.type && (
            <ErrorMessage>{formik.errors.type}</ErrorMessage>
          )}

          <Button type="submit">Criar</Button>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default SchedulingForm;
