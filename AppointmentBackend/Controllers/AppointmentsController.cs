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
        private readonly IAppointment _appointmentRepo;
        private readonly ApplicationDBContext _context;
        public AppointmentsController(ApplicationDBContext context,IAppointment appointment)
        {
            _appointmentRepo = appointment;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetAppointments()
        {
            var appointments = await _appointmentRepo.GetAllAsync();
            if(appointments==null)
            {
                return NotFound();
            }
            return Ok(appointments);
        }
        



        [HttpGet("{id:int}")]
        public async Task<ActionResult<Appointment>> GetById(int id)
        {
                Appointment? appointmentModel = await _appointmentRepo.GetByIdAsync(id);
            if (appointmentModel == null)
            {
                return NotFound();
            }

            return appointmentModel;
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