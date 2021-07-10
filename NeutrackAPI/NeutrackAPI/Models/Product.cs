using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NeutrackAPI.Models
{
    public class Product 
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public double CaloriesPerGram { get; set; }
        
        public double ProteinInGrams { get; set; }
        public double FatInGrams { get; set; }
        public double CarbInGrams { get; set; }

        // Navigation Properties
        public List<RecipeProduct> RecipeProducts { get; set; }
    }
}