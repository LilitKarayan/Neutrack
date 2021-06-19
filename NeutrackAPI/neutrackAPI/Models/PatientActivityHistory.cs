using System;
namespace NeutrackAPI.Models
{
    public class PatientActivityHistory
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public Patient Patient { get; set; }
        public double Weight { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}
