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
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointment _appointmentRepo;
        private readonly ApplicationDBContext _context;
        public AppointmentController(ApplicationDBContext context,IAppointment appointment)
        {
            _appointmentRepo = appointment;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
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
        public async Task<ActionResult> Create([FromBody] CreateAppointmentDto appointmentModel)
        {

            var appointment = await _appointmentRepo.CreateAsync(appointmentModel);
            if(appointment == null)
            {
                return BadRequest();
            }
            return CreatedAtAction(nameof(GetById),new {Id=appointment.AppointmentId},appointment);
        }

        
        

    }

}