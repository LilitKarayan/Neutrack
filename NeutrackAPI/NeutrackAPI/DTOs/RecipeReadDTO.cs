using System;
using NeutrackAPI.Models;
using System.Collections.Generic;

namespace NeutrackAPI.DTOs
{
    public class RecipeReadDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Instruction { get; set; }
        public string MealType { get; set; }

        public List<RecipeProductReadDTO> RecipeProducts { get; set; }
    }
}