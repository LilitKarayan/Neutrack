using System;
namespace NeutrackAPI.DTOs
{
    public class RecipeProductReadDTO
    {
        public int RecipeID { get; set; }

        public int ProductID { get; set; }

        public string ProductName { get; set; }

        public double WeightInGrams { get; set; }
    }
}