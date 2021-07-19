using System;
namespace NeutrackAPI.DTOs
{
    public class GenerateMealPlanDTO
    {
       public int PatientId { get; set; }
       public int DailyCalories { get; set; }
       public int NumberOfDays { get; set; }
    }
}
