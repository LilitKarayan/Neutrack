using System;
namespace NeutrackAPI.Models
{
    public class NutritionistRate
    {
        public int Id { get; set; }
        public int NutritionistId { get; set; }
        public Nutritionist Nutritionist { get; set; }
        public int RateId { get; set; }
        public Rate Rate { get; set; }
    }
}
