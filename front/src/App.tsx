// src/App.tsx
import React, { useState, useEffect } from "react";
import { Patient, Doctor, Appointment } from "./types";
import {
  getPatients, createPatient, updatePatient, deletePatient,
  getDoctors, createDoctor, updateDoctor, deleteDoctor,
  getAppointments, createAppointment, updateAppointment, deleteAppointment
} from "./api";

import PatientList from "./components/PatientList";
import DoctorList from "./components/DoctorList";
import AppointmentList from "./components/AppointmentList";

function App() {
  // 1. State for our data
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // State for new item forms (Create)
  const [newPatient, setNewPatient] = useState({ name: "", date_of_birth: "", phone: "", email: "" });
  const [newDoctor, setNewDoctor] = useState({ name: "", specialization: "", license_number: "" });
  const [newAppointment, setNewAppointment] = useState({ patient: 0, doctor: 0, app_date_time: "", status: "Scheduled" });

  // 2. Fetch all data on load
  const loadData = async () => {
    try {
      const pData = await getPatients();
      setPatients(pData);
      
      const dData = await getDoctors();
      setDoctors(dData);

      const aData = await getAppointments();
      setAppointments(aData);
    } catch (error) {
      console.error("Failed to load data", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 3. DOCTOR HANDLERS
  const handleAddDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    await createDoctor(newDoctor);
    setNewDoctor({ name: "", specialization: "", license_number: "" });
    loadData();
  };
  const handleUpdateDoctor = async (doctor: Doctor) => {
    await updateDoctor(doctor.id, doctor);
    loadData();
  };
  const handleDeleteDoctor = async (id: number) => {
    await deleteDoctor(id);
    loadData();
  };

  // 4. PATIENT HANDLERS
  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPatient(newPatient);
    setNewPatient({ name: "", date_of_birth: "", phone: "", email: "" });
    loadData();
  };
  const handleUpdatePatient = async (patient: Patient) => {
    await updatePatient(patient.id, patient);
    loadData();
  };
  const handleDeletePatient = async (id: number) => {
    await deletePatient(id);
    loadData();
  };

  // 5. APPOINTMENT HANDLERS
  const handleAddAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    await createAppointment({
      ...newAppointment,
      app_date_time: new Date(newAppointment.app_date_time).toISOString()
    });
    setNewAppointment({ patient: 0, doctor: 0, app_date_time: "", status: "Scheduled" });
    loadData();
  };
  const handleUpdateAppointment = async (appointment: Appointment) => {
    await updateAppointment(appointment.id, appointment);
    loadData();
  };
  const handleDeleteAppointment = async (id: number) => {
    await deleteAppointment(id);
    loadData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4 font-sans text-gray-800 selection:bg-blue-200">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* --- HEADER --- */}
        <div className="text-center space-y-3 mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 drop-shadow-sm tracking-tight">
            🏥 Clinic Dashboard
          </h1>
          <p className="text-indigo-400 font-medium tracking-wide uppercase text-sm letter-spacing-2">
            Modern Patient & Doctor Management System
          </p>
        </div>

        {/* --- DOCTORS SECTION --- */}
        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/80 relative overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-400 to-blue-600"></div>
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            👨‍⚕️ Doctors Directory
          </h2>
          <form onSubmit={handleAddDoctor} className="flex flex-wrap gap-4 mb-6">
            <input type="text" placeholder="Dr. Name" value={newDoctor.name} onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})} required className="flex-1 min-w-[200px] bg-slate-50/50 border border-slate-200 text-slate-700 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-200 shadow-inner" />
            <input type="text" placeholder="Specialization" value={newDoctor.specialization} onChange={(e) => setNewDoctor({...newDoctor, specialization: e.target.value})} required className="flex-1 min-w-[200px] bg-slate-50/50 border border-slate-200 text-slate-700 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-200 shadow-inner" />
            <input type="text" placeholder="License #" value={newDoctor.license_number} onChange={(e) => setNewDoctor({...newDoctor, license_number: e.target.value})} required className="flex-1 min-w-[200px] bg-slate-50/50 border border-slate-200 text-slate-700 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-200 shadow-inner" />
            <button type="submit" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 active:scale-95">Add Doctor</button>
          </form>
          <DoctorList doctors={doctors} onUpdate={handleUpdateDoctor} onDelete={handleDeleteDoctor} />
        </div>

        {/* --- PATIENTS SECTION --- */}
        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/80 relative overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-emerald-400 to-teal-500"></div>
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            🤒 Patient Records
          </h2>
          <form onSubmit={handleAddPatient} className="flex flex-wrap gap-4 mb-6">
            <input type="text" placeholder="Full Name" value={newPatient.name} onChange={(e) => setNewPatient({...newPatient, name: e.target.value})} required className="flex-1 min-w-[200px] bg-slate-50/50 border border-slate-200 text-slate-700 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition-all duration-200 shadow-inner" />
            <input type="date" value={newPatient.date_of_birth} onChange={(e) => setNewPatient({...newPatient, date_of_birth: e.target.value})} required className="flex-1 min-w-[200px] bg-slate-50/50 border border-slate-200 text-slate-500 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition-all duration-200 shadow-inner" />
            <input type="text" placeholder="Phone Number" value={newPatient.phone} onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})} required className="flex-1 min-w-[200px] bg-slate-50/50 border border-slate-200 text-slate-700 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition-all duration-200 shadow-inner" />
            <input type="email" placeholder="Email Address" value={newPatient.email} onChange={(e) => setNewPatient({...newPatient, email: e.target.value})} required className="flex-1 min-w-[200px] bg-slate-50/50 border border-slate-200 text-slate-700 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition-all duration-200 shadow-inner" />
            <button type="submit" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 active:scale-95">Add Patient</button>
          </form>
          <PatientList patients={patients} onUpdate={handleUpdatePatient} onDelete={handleDeletePatient} />
        </div>

        {/* --- APPOINTMENTS SECTION --- */}
        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/80 relative overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-400 to-fuchsia-500"></div>
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            📅 Scheduling
          </h2>
          <form onSubmit={handleAddAppointment} className="flex flex-wrap gap-4 mb-6">
            
            <select 
              value={newAppointment.patient || 0} 
              onChange={(e) => setNewAppointment({...newAppointment, patient: Number(e.target.value)})} 
              required 
              className="flex-1 min-w-[200px] bg-slate-50/50 border border-slate-200 text-slate-700 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all duration-200 shadow-inner"
            >
              <option value={0} disabled>Select Patient...</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>

            <select 
              value={newAppointment.doctor || 0} 
              onChange={(e) => setNewAppointment({...newAppointment, doctor: Number(e.target.value)})} 
              required 
              className="flex-1 min-w-[200px] bg-slate-50/50 border border-slate-200 text-slate-700 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all duration-200 shadow-inner"
            >
              <option value={0} disabled>Select Doctor...</option>
              {doctors.map(d => (
                <option key={d.id} value={d.id}>Dr. {d.name}</option>
              ))}
            </select>

            <input type="datetime-local" value={newAppointment.app_date_time} onChange={(e) => setNewAppointment({...newAppointment, app_date_time: e.target.value})} required className="flex-1 min-w-[200px] bg-slate-50/50 border border-slate-200 text-slate-500 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all duration-200 shadow-inner" />
            <input type="text" placeholder="Status (e.g. Scheduled)" value={newAppointment.status} onChange={(e) => setNewAppointment({...newAppointment, status: e.target.value})} required className="w-40 bg-slate-50/50 border border-slate-200 text-slate-700 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all duration-200 shadow-inner" />
            <button type="submit" className="bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:from-purple-600 hover:to-fuchsia-700 text-white font-bold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 active:scale-95">Book It</button>
          </form>

          <AppointmentList 
            appointments={appointments} 
            patients={patients} 
            doctors={doctors} 
            onUpdate={handleUpdateAppointment} 
            onDelete={handleDeleteAppointment} 
          />
        </div>

      </div>
    </div>
  );
}

export default App;