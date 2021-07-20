using System;
using System.ComponentModel.DataAnnotations;

namespace NeutrackAPI.DTOs
{
    public class RecipeUpdateDTO
    {

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Cooking instruction is requird")]
        public string Instruction { get; set; }

        [Required(ErrorMessage = "Meal type is requird")]
        public string MealType { get; set; }

    }
}
