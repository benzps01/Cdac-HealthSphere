using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Test.Data;
using Test.Interfaces;
using Test.Modals;

namespace Test.Repository
{
    public class AppointmentRepository : IAppointment
    {
        private readonly ApplicationDBContext _context;
        public AppointmentRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        

        public Task<Appointment> CreateAsync()
        {
            throw new NotImplementedException();
        }

       
        public async Task<List<Appointment>> GetAllAsync()
        {
            var appointments = await _context.Appointments.Include(x=>x.Patient).ToListAsync();
            return appointments;
        }

        public async Task<Appointment?> GetByIdAsync(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id); // search using primary key

            if(appointment == null)
            {
                return null;
            }
            return appointment;
        }

        public Task<Appointment> Update()
        {
            throw new NotImplementedException();
        }

        public Task<Appointment> UpdateAsync()
        {
            throw new NotImplementedException();
        }
    }
}