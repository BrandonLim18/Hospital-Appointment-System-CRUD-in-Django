// src/components/DoctorList.tsx
import React, { useState } from "react";
import { Doctor } from "../types";

interface Props {
  doctors: Doctor[];
  onUpdate: (doctor: Doctor) => void;
  onDelete: (id: number) => void;
}

const DoctorList: React.FC<Props> = ({ doctors, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editSpecialization, setEditSpecialization] = useState("");
  const [editLicense, setEditLicense] = useState("");

  const handleEdit = (doctor: Doctor) => {
    setEditingId(doctor.id);
    setEditName(doctor.name);
    setEditSpecialization(doctor.specialization);
    setEditLicense(doctor.license_number);
  };

  const handleSave = (doctor: Doctor) => {
    onUpdate({ ...doctor, name: editName, specialization: editSpecialization, license_number: editLicense });
    setEditingId(null);
  };

  const handleCancel = () => setEditingId(null);

  return (
    <ul className="space-y-3">
      {doctors.map((doctor) => (
        <li key={doctor.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:shadow-md hover:bg-white">
          {editingId === doctor.id ? (
            /* EDIT MODE */
            <div className="flex flex-wrap items-center gap-2 w-full">
              <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="flex-1 min-w-[120px] border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" />
              <input type="text" value={editSpecialization} onChange={(e) => setEditSpecialization(e.target.value)} className="flex-1 min-w-[120px] border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" />
              <input type="text" value={editLicense} onChange={(e) => setEditLicense(e.target.value)} className="flex-1 min-w-[120px] border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" />
              <div className="flex gap-2 ml-auto">
                <button onClick={() => handleSave(doctor)} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-xl text-sm transition-colors shadow-sm">Save</button>
                <button onClick={handleCancel} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-4 rounded-xl text-sm transition-colors shadow-sm">Cancel</button>
              </div>
            </div>
          ) : (
            /* NORMAL MODE */
            <>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-slate-700">
                <div className="flex items-center gap-3">
                  <span className="bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded-lg text-xs">ID: {doctor.id}</span>
                  <strong className="text-lg">Dr. {doctor.name}</strong>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                  <span className="flex items-center gap-1">🩺 {doctor.specialization}</span>
                  <span className="flex items-center gap-1">📋 Lic: {doctor.license_number}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(doctor)} className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold py-2 px-4 rounded-xl text-sm transition-colors">Edit</button>
                <button onClick={() => onDelete(doctor.id)} className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-2 px-4 rounded-xl text-sm transition-colors">Delete</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default DoctorList;