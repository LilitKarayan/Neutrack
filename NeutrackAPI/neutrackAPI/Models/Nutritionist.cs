using System;
using System.Collections.Generic;

namespace NeutrackAPI.Models
{
    public class Nutritionist
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public bool IsActive { get; set; }
        public int YearsOfExperience { get; set; }
        public List<Patient> Patients { get; set; }
        public List<NutritionistRate> NutritionistRates { get; set; }
        public List<Feedback> Feedbacks { get; set; }
        public List<NutritionistPatientHistory> NutritionistPatientHistories { get; set; }
    }
}
