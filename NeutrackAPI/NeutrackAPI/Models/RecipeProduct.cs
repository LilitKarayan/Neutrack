using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NeutrackAPI.Models
{
    public class RecipeProduct 
    {
        public int RecipeID { get; set; }

        public Recipe Recipe { get; set; }

        public int ProductID { get; set; }

        public Product Product { get; set; }

        [Required]
        public double WeightInGrams { get; set; }


    }
}