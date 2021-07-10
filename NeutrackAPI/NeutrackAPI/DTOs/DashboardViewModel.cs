using System;
namespace NeutrackAPI.DTOs
{
    public class DashboardViewModel
    {
        public int TotalPatient { get; set; }
        public int NumberOfActivePatients { get; set; }
        public int NumberOfInActivePatients { get; set; }
        public int NumberOfMalePatients { get; set; }
        public int NumberOfFemalePatients { get; set; }
    }
}
