// src/components/AppointmentList.tsx
import React, { useState } from "react";
import { Appointment, Patient, Doctor } from "../types";

interface Props {
  appointments: Appointment[];
  patients: Patient[];
  doctors: Doctor[];
  onUpdate: (appointment: Appointment) => void;
  onDelete: (id: number) => void;
}

const AppointmentList: React.FC<Props> = ({ appointments, patients, doctors, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editPatientId, setEditPatientId] = useState<number>(0);
  const [editDoctorId, setEditDoctorId] = useState<number>(0);
  const [editDateTime, setEditDateTime] = useState<string>("");
  const [editStatus, setEditStatus] = useState<string>("");

  const handleEdit = (app: Appointment) => {
    setEditingId(app.id);
    setEditPatientId(app.patient);
    setEditDoctorId(app.doctor);
    setEditDateTime(app.app_date_time.slice(0, 16)); 
    setEditStatus(app.status);
  };

  const handleSave = (app: Appointment) => {
    onUpdate({
      ...app,
      patient: editPatientId,
      doctor: editDoctorId,
      app_date_time: new Date(editDateTime).toISOString(), 
      status: editStatus,
    });
    setEditingId(null);
  };

  const handleCancel = () => setEditingId(null);

  const getPatientName = (id: number) => patients.find(p => p.id === id)?.name || "Unknown";
  const getDoctorName = (id: number) => doctors.find(d => d.id === id)?.name || "Unknown";

  return (
    <ul className="space-y-3">
      {appointments.map((app) => (
        <li key={app.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:shadow-md hover:bg-white">
          {editingId === app.id ? (
            /* EDIT MODE */
            <div className="flex flex-wrap items-center gap-2 w-full">
              <select value={editPatientId} onChange={(e) => setEditPatientId(Number(e.target.value))} className="flex-1 min-w-[120px] border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none bg-white">
                <option value={0} disabled>Select Patient</option>
                {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>

              <select value={editDoctorId} onChange={(e) => setEditDoctorId(Number(e.target.value))} className="flex-1 min-w-[120px] border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none bg-white">
                <option value={0} disabled>Select Doctor</option>
                {doctors.map(d => <option key={d.id} value={d.id}>Dr. {d.name}</option>)}
              </select>

              <input type="datetime-local" value={editDateTime} onChange={(e) => setEditDateTime(e.target.value)} className="flex-1 min-w-[150px] border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none" />
              <input type="text" value={editStatus} onChange={(e) => setEditStatus(e.target.value)} className="w-28 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none" />
              
              <div className="flex gap-2 ml-auto">
                <button onClick={() => handleSave(app)} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-xl text-sm transition-colors shadow-sm">Save</button>
                <button onClick={handleCancel} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-4 rounded-xl text-sm transition-colors shadow-sm">Cancel</button>
              </div>
            </div>
          ) : (
            /* NORMAL MODE */
            <>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-slate-700 w-full">
                <div className="flex items-center gap-3 min-w-[120px]">
                  <span className="bg-purple-100 text-purple-700 font-bold px-2 py-1 rounded-lg text-xs">Appt: {app.id}</span>
                </div>
                
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600 font-medium">
                  <span className="flex items-center gap-1 text-emerald-700">🤒 {getPatientName(app.patient)}</span>
                  <span className="flex items-center gap-1 text-blue-700">👨‍⚕️ Dr. {getDoctorName(app.doctor)}</span>
                  <span className="flex items-center gap-1">🕒 {new Date(app.app_date_time).toLocaleString(undefined, {dateStyle: 'short', timeStyle: 'short'})}</span>
                  <span className="flex items-center gap-1">
                    <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${app.status.toLowerCase() === 'completed' ? 'bg-green-100 text-green-700' : app.status.toLowerCase() === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {app.status}
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mt-2 md:mt-0">
                <button onClick={() => handleEdit(app)} className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold py-2 px-4 rounded-xl text-sm transition-colors">Edit</button>
                <button onClick={() => onDelete(app.id)} className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-2 px-4 rounded-xl text-sm transition-colors">Delete</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default AppointmentList;