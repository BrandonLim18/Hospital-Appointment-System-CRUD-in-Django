from django.db import models

class Doctor(models.Model):
    # Django automatically creates 'id' which acts as Doctor_ID
    name = models.CharField(max_length=99)
    specialization = models.CharField(max_length=99)
    license_number = models.CharField(max_length=99)

    def __str__(self):
        return f"Dr. {self.name} - {self.specialization}"

class Patient(models.Model):
    # Django automatically creates 'id' which acts as Patient_ID
    name = models.CharField(max_length=99)
    date_of_birth = models.DateField()
    phone = models.CharField(max_length=99)
    email = models.CharField(max_length=99)

    def __str__(self):
        return self.name

class Appointment(models.Model):
    # Django automatically creates 'id' which acts as Appointment_ID
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    app_date_time = models.DateTimeField()
    status = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.patient.name} with Dr. {self.doctor.name} ({self.status})"