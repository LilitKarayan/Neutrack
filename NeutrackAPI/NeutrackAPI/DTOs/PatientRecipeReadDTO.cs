using System;
namespace NeutrackAPI.DTOs
{
    public class PatientRecipeReadDTO
    {
        public int RecipeID { get; set; }

        public int PatientID { get; set; }

        public double Portion { get; set; }

        public int Day { get; set; }
    }
}