using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NeutrackAPI.Models
{
    public class Recipe 
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Instruction { get; set; }

        // Navigation Properties
        public List<RecipeProduct> RecipeProducts { get; set; }

    }
}
