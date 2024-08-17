using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    }
}