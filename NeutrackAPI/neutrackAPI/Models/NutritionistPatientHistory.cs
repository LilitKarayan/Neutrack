using System;
namespace NeutrackAPI.Models
{
    public class NutritionistPatientHistory
    {
        public int NutritionistId { get; set; }
        public Nutritionist Nutritionist { get; set; }
        public int PatientId { get; set; }
        public Patient Patient { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
