# 🏥 Doctor-Patient Appointment System

A simple RESTful API built using **Django** and **Django Rest Framework (DRF)**. This system allows users to manage records for doctors, patients, and their appointments.


## ✨ Features
* **CRUD Operations:** Create, Read, Update, and Delete records.
* **Doctor Management:** Track doctors by Name, Specialization, and License Number.
* **Patient Management:** Manage patient details including DOB, Phone, and Email.
* **Appointment Scheduling:** Link doctors and patients with specific appointment dates and statuses.
* **API Browseable Interface:** Uses DRF's built-in web interface for easy testing.
  
##   Screenshots
<img width="1913" height="945" alt="image" src="https://github.com/user-attachments/assets/f935050e-27ce-4c25-9439-8be09b0b9764" />
<img width="1907" height="948" alt="image" src="https://github.com/user-attachments/assets/68e347b0-f5ca-4c90-8f75-8e1f70198d8a" />
<img width="1910" height="951" alt="image" src="https://github.com/user-attachments/assets/067ffebb-4763-4e49-a78a-29abc0607ce4" />
<img width="1905" height="956" alt="image" src="https://github.com/user-attachments/assets/7342a0e4-cdd2-4bb7-a452-f9c1fd499f69" />

## 🛠️ Tech Stack
* **Language:** Python 3.x
* **Framework:** Django 5.x
* **API Toolkit:** Django Rest Framework
* **Database:** SQLite (default)

## 🚀 How to Run
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YOUR-USERNAME/AppointmentSystem.git](https://github.com/YOUR-USERNAME/AppointmentSystem.git)
    c AppointmentSystem
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv venv
    # Windows
    .\venv\Scripts\activate
    # Mac/Linux
    source venv/bin/activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install django djangorestframework
    ```

4.  **Run migrations:**
    ```bash
    python manage.py migrate
    ```

5.  **Start the server:**
    ```bash
    python manage.py runserver
    ```

## 🔗 API Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET / POST` | `/api/doctors/` | List all doctors or add a new one |
| `GET / PUT / DELETE` | `/api/doctors/<id>/` | Retrieve, update, or delete a specific doctor |
| `GET / POST` | `/api/patients/` | List all patients or add a new one |
| `GET / PUT / DELETE` | `/api/patients/<id>/` | Retrieve, update, or delete a specific patient |
| `GET / POST` | `/api/appointments/` | List all appointments or book a new one |
| `GET / PUT / DELETE` | `/api/appointments/<id>/` | Retrieve, update, or delete an appointment |
