using System;
using System.ComponentModel.DataAnnotations;

namespace NeutrackAPI.DTOs
{
    public class AuthRequestDTO
    {
        [Required(ErrorMessage ="Email is required")]
        [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$",
            ErrorMessage = "Email is invalid")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [RegularExpression(@"^(?=.{8,16}$)(?=.*?[a-z])(?=.*?[0-9]).*$",
            ErrorMessage = "Password must be between 8 - 16 characters and should contain at least one digit.")]
        public string Password { get; set; }
    }
}
