using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppointmentBackend.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Test.Data;
using Test.Interfaces;
using Test.Mappers;
using Test.Modals;

namespace Test.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentsController : ControllerBase
    {
        private readonly IAppointment _appointment;
        private readonly ApplicationDBContext _context;
        public AppointmentsController(ApplicationDBContext context,IAppointment appointment)
        {
            _appointment = appointment;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetAppointments()
        {
            var appointments = await _appointment.GetAllAsync();
            if(appointments==null)
            {
                return NotFound();
            }
            return Ok(appointments);
        }
        



        [HttpGet("{id}")]
        public async Task<ActionResult<Appointment>> GetAppointment(int id)
        {
            var appointment = await _context.Appointments.Include(a => a.Patient).Include(a => a.Doctor).FirstOrDefaultAsync(a => a.AppointmentId == id);

            if (appointment == null)
            {
                return NotFound();
            }

            return appointment;
        }

        [HttpPost]
        public async Task<ActionResult> PostAppointment([FromBody] CreateAppointmentDto appointmentModel)
        {

            _context.Appointments.Add(appointmentModel.CreateDtoToAppointment());
            await _context.SaveChangesAsync();

            return  Ok();
        }

        

    }

}