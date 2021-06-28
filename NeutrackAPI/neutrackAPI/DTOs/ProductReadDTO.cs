using System;
namespace NeutrackAPI.DTOs
{
    public class ProductReadDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public double CaloriesPerGram { get; set; }
        
        public double ProteinInGrams { get; set; }
        public double FatInGrams { get; set; }
        public double CarbInGrams { get; set; }
    }
}