import * as Yup from 'yup';

export const appointmentSchema = Yup.object({
  licensePlate: Yup.string()
    .matches(/^[A-Z]{3}[0-9][A-Z][0-9]{2}$/, 'Formato da placa inválido (ABC1D34)')
    .required('Placa do veículo é obrigatória'),
  date: Yup.date().required('Data é obrigatória'),
  time: Yup.string().required('Hora é obrigatória'),
  type: Yup.string().oneOf(['simples', 'completa']).required('Tipo de lavagem é obrigatório'),
});