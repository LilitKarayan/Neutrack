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
        public string FullName { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PhoneNumber { get; set; }
        public List<string> Roles { get; set; }
        public int? NutritionistId { get; set; }
        public int? PatientId { get; set; }

    }
}
