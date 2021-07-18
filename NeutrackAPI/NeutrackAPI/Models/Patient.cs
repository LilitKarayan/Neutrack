using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NeutrackAPI.Models
{
    public class Patient
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public bool IsActive { get; set; }
        public double? Height { get; set; }
        public double? Weight { get; set; }
        public double? Goal { get; set; }

        public int? ActivityLevel { get; set; }

        public int? NutritionistId { get; set; }

        public Nutritionist Nutritionist { get; set; }
        public List<Feedback> Feedbacks { get; set; }
        public List<NutritionistPatientHistory> NutritionistPatientHistories { get; set; }
        public List<PatientActivityHistory> PatientActivityHistories { get; set; }
        public List<PatientRecipe> PatientRecipes { get; set; }
        
    }


}
