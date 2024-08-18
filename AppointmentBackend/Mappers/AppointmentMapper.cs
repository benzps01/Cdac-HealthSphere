using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppointmentBackend.Dtos;
using Test.Dtos;
using Test.Modals;

namespace Test.Mappers
{
    public static class AppointmentMapper
    {
        public static AppointmentDateTimeDto ToDateAndTimeDto(this Appointment appointmentModel)
        {
            return new AppointmentDateTimeDto
            {
              AppointmentDate = appointmentModel.AppointmentDate,

              AppointmentTime = appointmentModel.AppointmentTime
            };
        }
        public static DoctorCardDto ToDoctorCardDto(this Appointment appointmentModel)
        {
            return new DoctorCardDto
            {
                patientid = appointmentModel.PatientId,
                patient_name = appointmentModel.Patient.Name,
                patient_gender = appointmentModel.Patient.gender,
                 patient_BGroup = appointmentModel.Patient.bloodgroup,
                 patient_notes = appointmentModel.Notes
            };

        }
    }
}