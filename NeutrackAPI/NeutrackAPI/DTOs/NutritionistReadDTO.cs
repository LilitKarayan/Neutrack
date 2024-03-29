﻿using System;
namespace NeutrackAPI.DTOs
{
    public class NutritionistReadDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int YearsOfExperience { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PhoneNumber { get; set; }
    }
}
