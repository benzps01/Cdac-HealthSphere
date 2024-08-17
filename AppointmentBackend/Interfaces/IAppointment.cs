using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Test.Modals;

namespace Test.Interfaces
{
    public interface IAppointment
    {
        Task<List<Appointment>> GetAllAsync();
        Task<Appointment?> GetByIdAsync();
        Task<Appointment?> CreateAsync();
        Task<Appointment?> UpdateAsync();
        Task<Appointment?> Update();
       
    }
}