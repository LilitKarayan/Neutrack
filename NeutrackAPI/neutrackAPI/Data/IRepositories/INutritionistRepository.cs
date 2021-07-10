using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NeutrackAPI.DTOs;
using NeutrackAPI.Models;
namespace NeutrackAPI.Data.IRepositories
{
    public interface INutritionistRepository
    {
        bool SaveChanges();
        IEnumerable<Nutritionist> GetAllNutritionist();
        Nutritionist GetNutritionistById(int id);
        void UpdateNutritionist(User user);
        void DeactivateNutritionist(Nutritionist nutritionist);
        Patient GetNutritionistPatientById(int patientId, int nutritionistId);
        IEnumerable<Patient> GetAllNutritionistPatients(int nutritionistId);
        void AddNewPatientActivityHistory(PatientActivityHistory activityHistory);
        DashboardViewModel GetNutritionistDashboardData(int nutritionistId);
        Task<IEnumerable<Patient>> SearchPatient(string query);
    }
}
