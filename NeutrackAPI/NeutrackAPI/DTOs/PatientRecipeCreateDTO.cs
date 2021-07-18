using System;
using System.ComponentModel.DataAnnotations;

namespace NeutrackAPI.DTOs
{
    public class PatientRecipeCreateDTO
    {
        public int RecipeID { get; set; }

        [Required(ErrorMessage = "The Patient ID is required")]
        public int PatientID { get; set; }

        [Required(ErrorMessage = "The portion is required")]
        public double Portion { get; set; }

    }
}
