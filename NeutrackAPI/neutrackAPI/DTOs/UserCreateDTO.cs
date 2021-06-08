using System;
using System.ComponentModel.DataAnnotations;

namespace NeutrackAPI.DTOs
{
    public class UserCreateDTO
    {

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

        [Required]
        [MaxLength(50)]
        public string Gender { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }
        public string Goal { get; set; }

        public int ActivityLevel { get; set; }

        public bool IsActive { get; set; }

        public double Height { get; set; }

        public double Weight { get; set; }

        public int YearsOfExperience { get; set; }

    }
}
