using System;
using System.ComponentModel.DataAnnotations;
using NeutrackAPI.Models;
using System.Collections.Generic;

namespace NeutrackAPI.DTOs
{
    public class RecipeCreateDTO
    {

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Cooking instruction is requird")]
        public string Instruction { get; set; }


    }
}
