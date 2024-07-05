import * as Yup from 'yup';

export const appointmentSchema = Yup.object().shape({
  licensePlate: Yup.string()
    .matches(/^[A-Z]{3}[0-9][A-Z][0-9]{2}$/, 'Invalid plate format (ABC1D34)')
    .required('License plate is required'),
  date: Yup.date().required('Date is required'),
  time: Yup.string().required('Time is required'),
  type: Yup.string().oneOf(['simples', 'completa']).required('Wash type is required'),
});
