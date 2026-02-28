// src/components/PatientList.tsx
import React, { useState } from "react";
import { Patient } from "../types";

interface Props {
  patients: Patient[];
  onUpdate: (patient: Patient) => void;
  onDelete: (id: number) => void;
}

const PatientList: React.FC<Props> = ({ patients, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDob, setEditDob] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const handleEdit = (patient: Patient) => {
    setEditingId(patient.id);
    setEditName(patient.name);
    setEditDob(patient.date_of_birth);
    setEditPhone(patient.phone);
    setEditEmail(patient.email);
  };

  const handleSave = (patient: Patient) => {
    onUpdate({ ...patient, name: editName, date_of_birth: editDob, phone: editPhone, email: editEmail });
    setEditingId(null);
  };

  const handleCancel = () => setEditingId(null);

  return (
    <ul className="space-y-3">
      {patients.map((patient) => (
        <li key={patient.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:shadow-md hover:bg-white">
          {editingId === patient.id ? (
            /* EDIT MODE */
            <div className="flex flex-wrap items-center gap-2 w-full">
              <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="flex-1 min-w-[120px] border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 focus:outline-none" />
              <input type="date" value={editDob} onChange={(e) => setEditDob(e.target.value)} className="flex-1 min-w-[120px] border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 focus:outline-none" />
              <input type="text" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="flex-1 min-w-[120px] border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 focus:outline-none" />
              <input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="flex-1 min-w-[120px] border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 focus:outline-none" />
              <div className="flex gap-2 ml-auto">
                <button onClick={() => handleSave(patient)} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-xl text-sm transition-colors shadow-sm">Save</button>
                <button onClick={handleCancel} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-4 rounded-xl text-sm transition-colors shadow-sm">Cancel</button>
              </div>
            </div>
          ) : (
            /* NORMAL MODE */
            <>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-slate-700">
                <div className="flex items-center gap-3">
                  <span className="bg-emerald-100 text-emerald-700 font-bold px-2 py-1 rounded-lg text-xs">ID: {patient.id}</span>
                  <strong className="text-lg">{patient.name}</strong>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                  <span className="flex items-center gap-1">🎂 {patient.date_of_birth}</span>
                  <span className="flex items-center gap-1">📞 {patient.phone}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(patient)} className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold py-2 px-4 rounded-xl text-sm transition-colors">Edit</button>
                <button onClick={() => onDelete(patient.id)} className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-2 px-4 rounded-xl text-sm transition-colors">Delete</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default PatientList;