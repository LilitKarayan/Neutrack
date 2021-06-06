using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NeutrackAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(60)]
        public string Email { get; set; }

        [Required]
        [MaxLength(256)]
        public string Password { get; set; }

        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(100)]
        public string LastName { get; set; }

        [MaxLength(15)]
        public string PhoneNumber { get; set; }

        [Required]
        [MaxLength(50)]
        public string Gender { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        public double Height {get; set;}
        public double Weight {get; set;}

        public int YearsOfExperience {get; set;}
        
        [MaxLength(250)]
        public string Goal {get; set;}

        public int ActivityLevel {get; set;}
        public List<Role> Roles { get; set; }
    }
}
