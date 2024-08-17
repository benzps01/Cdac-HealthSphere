using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Test.Modals
{
    [Table("patients")]
    public class Patient
    {
        [Key]
        [Column("patient_id")]
        public int PatientId { get; set; }

        [Column("username")]
        public string Username { get; set; }

        [Column("password_hash")]
        public string PasswordHash { get; set; }

        [Column("first_name")]
        public string FirstName { get; set; }

        [Column("last_name")]
        public string LastName { get; set; }

        [Column("date_of_birth")]
        public DateTime DateOfBirth { get; set; }

        [Column("phone_number")]
        public string PhoneNumber { get; set; }

        [Column("address")]
        public string Address { get; set; }

        [Column("emergency_contact")]
        public string EmergencyContact { get; set; }

        public ICollection<Appointment> Appointments { get; set; }
    }

}