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
        [Column("doctorid")]
        public int DoctorId { get; set; }

        [Required]
        [Column("username")]
        public string Username { get; set; }
        
        [Required]
        [Column("password")]
        public string PasswordHash { get; set; }

        [Required]
        [Column("firstname")]
        public string FirstName { get; set; }
        [Required]
        [Column("lastname")]
        public string LastName { get; set; }

        [Column("specialization")]
        public string Specialization { get; set; }

        [Column("yearsofexperience")]
        public string YearsOfExperience { get; set; }
        [Column("mobileno")]
        public string PhoneNumber {get;set;}

        [Column("profilepic")]
        public byte[]? ProfilePicture { get; set; }

        [Column("bio")]
        public string Bio { get; set; }
        
        [Column("starttime")]
        public TimeSpan StartTime;
         [Column("endtime")]
        public TimeSpan EndTime;
        public ICollection<Appointment> Appointments { get; set; }
    }

}