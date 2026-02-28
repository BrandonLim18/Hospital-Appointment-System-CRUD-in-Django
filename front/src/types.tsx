export interface Patient {
    id: number;
    name: string;
    date_of_birth: string;
    phone: string;
    email: string;
}

export interface Doctor {
    id: number;
    name: string;
    specialization: string;
    license_number: string;
}

export interface Appointment {
    id: number;
    patient: number; // Foreign key is just a number
    doctor: number;  // Foreign key is just a number
    app_date_time: string;
    status: string;
}