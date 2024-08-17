using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Test.Modals
{
    [Table("doctors")]
    public class Doctor
    {
        [Key]
        [Column("doctor_id")]
        public int DoctorId { get; set; }

        [Column("username")]
        public string Username { get; set; }

        [Column("password_hash")]
        public string PasswordHash { get; set; }

        [Column("first_name")]
        public string FirstName { get; set; }

        [Column("last_name")]
        public string LastName { get; set; }

        [Column("specialization")]
        public string Specialization { get; set; }

        [Column("years_of_experience")]
        public int YearsOfExperience { get; set; }

        [Column("profile_picture")]
        public byte[]? ProfilePicture { get; set; }

        [Column("bio")]
        public string Bio { get; set; }
        public ICollection<Appointment> Appointments { get; set; }
    }

}