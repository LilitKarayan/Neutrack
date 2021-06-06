using System;
using System.Collections.Generic;
using NeutrackAPI.Models;

namespace NeutrackAPI.DTOs
{
    public class UserReadDTO
    {

        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public double Height { get; set; }
        public double Weight { get; set; }
        public int YearsOfExperience { get; set; }
        public string Goal { get; set; }
        public int ActivityLevel { get; set; }
        public bool IsActive { get; set; }
        public string PhoneNumber { get; set; }
        public List<UserRoleDTO> UserRolesDTO { get; set; }

    }
}
