using System;
using System.ComponentModel.DataAnnotations;

namespace NeutrackAPI.DTOs
{
    public class RecipeProductCreateDTO
    {
        [Required(ErrorMessage = "The Recipe ID is required")]
        public int RecipeID { get; set; }

        [Required(ErrorMessage = "The Product ID is required")]
        public int ProductID { get; set; }

        [Required(ErrorMessage = "The weight is required")]
        public double WeightInGrams { get; set; }

    }
}
