using System;
namespace NeutrackAPI.Models
{
    public class NutritionistRate
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public int RateId { get; set; }
        public Rate Rate { get; set; }
    }
}
