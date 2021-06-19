using System;
using System.ComponentModel.DataAnnotations;

namespace NeutrackAPI.DTOs
{
    public class PatientCreateDTO
    {
        [Required(ErrorMessage = "Email is required")]
        [MaxLength(60)]
        [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$",
            ErrorMessage = "Email is invalid")]
        public string Email { get; set; }

        [RegularExpression(@"^(?=.{8,16}$)(?=.*?[a-z])(?=.*?[0-9]).*$",
            ErrorMessage = "Password must be between 8 - 16 characters, should contain at least one digit and a lower case.")]
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

        [Required]
        public string Goal { get; set; }

        [Required]
        public int ActivityLevel { get; set; }

        [Required]
        public double Height { get; set; }

        [Required]
        public double Weight { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

    }
}
