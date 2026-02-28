// src/api.ts
import axios from "axios";
import { Patient, Doctor, Appointment } from "./types";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// ==========================================
// PATIENT API CALLS
// ==========================================
export const getPatients = async (): Promise<Patient[]> => {
  const response = await API.get<Patient[]>('patients/');
  return response.data;
};

export const createPatient = async (data: {
  name: string;
  date_of_birth: string;
  phone: string;
  email: string;
}): Promise<Patient> => {
  const response = await API.post<Patient>('patients/', data);
  return response.data;
};

// Partial<Patient> is a cool trick your teacher used! 
// It means "you don't have to send every single field to update it."
export const updatePatient = async (id: number, data: Partial<Patient>): Promise<Patient> => {
  const response = await API.put<Patient>(`patients/${id}/`, data);
  return response.data;
};

export const deletePatient = async (id: number): Promise<void> => {
  await API.delete(`patients/${id}/`);
};

// ==========================================
// DOCTOR API CALLS
// ==========================================
export const getDoctors = async (): Promise<Doctor[]> => {
  const response = await API.get<Doctor[]>('doctors/');
  return response.data;
};

export const createDoctor = async (data: {
  name: string;
  specialization: string;
  license_number: string;
}): Promise<Doctor> => {
  const response = await API.post<Doctor>('doctors/', data);
  return response.data;
};

export const updateDoctor = async (id: number, data: Partial<Doctor>): Promise<Doctor> => {
  const response = await API.put<Doctor>(`doctors/${id}/`, data);
  return response.data;
};

export const deleteDoctor = async (id: number): Promise<void> => {
  await API.delete(`doctors/${id}/`);
};

// ==========================================
// APPOINTMENT API CALLS
// ==========================================
export const getAppointments = async (): Promise<Appointment[]> => {
  const response = await API.get<Appointment[]>('appointments/');
  return response.data;
};

export const createAppointment = async (data: {
  patient: number;
  doctor: number;
  app_date_time: string;
  status: string;
}): Promise<Appointment> => {
  const response = await API.post<Appointment>('appointments/', data);
  return response.data;
};

export const updateAppointment = async (id: number, data: Partial<Appointment>): Promise<Appointment> => {
  const response = await API.put<Appointment>(`appointments/${id}/`, data);
  return response.data;
};

export const deleteAppointment = async (id: number): Promise<void> => {
  await API.delete(`appointments/${id}/`);
};