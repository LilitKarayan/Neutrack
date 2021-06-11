﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NeutrackAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(60)]
        public string Email { get; set; }

        [MaxLength(256)]
        public string Password { get; set; }

        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(100)]
        public string LastName { get; set; }

        [MaxLength(200)]
        public string FullName { get; set; }

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

        public bool IsActive { get; set; }

        public List<UserRole> UserRoles { get; set; }

        [InverseProperty("FeedbackTo")]
        public List<Feedback> FeedbacksTo { get; set; }

        [InverseProperty("FeedbackFrom")]
        public List<Feedback> FeedbacksFrom { get; set; }

        public List<NutritionistRate> NutritionistRates { get; set; }
    }
}
