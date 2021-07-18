using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NeutrackAPI.Models
{
    public class PatientRecipe
    {
        public int RecipeID { get; set; }

        public Recipe Recipe { get; set; }

        public int PatientID { get; set; }

        public Patient Patient { get; set; }

        [Required]
        public double Portion { get; set; }
    }
}