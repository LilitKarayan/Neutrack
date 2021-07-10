using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NeutrackAPI.Data.IRepositories;
using NeutrackAPI.DTOs;
using NeutrackAPI.Models;

namespace NeutrackAPI.Data.Repositories
{
    public class NutritionistRepository : INutritionistRepository
    {
        private readonly NeutrackContext _context;

        public NutritionistRepository(NeutrackContext context)
        {
            _context = context;
        }

        public void AddNewPatientActivityHistory(PatientActivityHistory activityHistory)
        {
            _context.Add(activityHistory);
        }

        public void DeactivateNutritionist(Nutritionist nutritionist)
        {
            _context.Nutritionists.RemoveRange();
        }

        public IEnumerable<Nutritionist> GetAllNutritionist()
        {
            return _context.Nutritionists.Where(x=>x.IsActive).Include(u => u.User).ToList();
        }

        public IEnumerable<Patient> GetAllNutritionistPatients(int nutritionistId)
        {
            return _context.Patients.Where(x => x.NutritionistId == nutritionistId)
                .Include(u => u.User)
                .Include(u => u.PatientActivityHistories)
                .ToList();
        }

        public Nutritionist GetNutritionistById(int id)
        {
            return _context.Nutritionists.Include(u => u.User).FirstOrDefault(x => x.Id == id);
        }

        public DashboardViewModel GetNutritionistDashboardData(int nutritionistId)
        {
            DashboardViewModel dashboardData = new DashboardViewModel();
            var nutritionistPatients = _context.Patients.Where(x => x.NutritionistId == nutritionistId)
                .Include(u => u.User).AsQueryable();
            dashboardData.TotalPatient = nutritionistPatients.Count();
            dashboardData.NumberOfActivePatients = nutritionistPatients.Where(x => x.IsActive).Count();
            dashboardData.NumberOfInActivePatients = dashboardData.TotalPatient - dashboardData.NumberOfActivePatients;
            dashboardData.NumberOfMalePatients = nutritionistPatients.Where(x => x.User.Gender.ToLower() == "male" || x.User.Gender.ToLower() == "m").Count();
            dashboardData.NumberOfFemalePatients = dashboardData.TotalPatient - dashboardData.NumberOfMalePatients;
            return dashboardData;

        }

        public Patient GetNutritionistPatientById(int patientId, int nutritionistId)
        {
            return _context.Patients
                .Include(u => u.User)
                .Include(u => u.PatientActivityHistories)
                .FirstOrDefault(x => x.Id == patientId && x.NutritionistId == nutritionistId);
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
        public async Task<IEnumerable<Patient>> SearchPatient(string query)
        {
            var results = await _context.Patients
                .Include(u => u.User)
                .Include(u => u.PatientActivityHistories)
                .Where(x => x.User.FirstName.ToLower().Contains(query.ToLower()) ||
                x.User.LastName.ToLower().Contains(query.ToLower()) ||
                x.User.Email.ToLower().Contains(query.ToLower())).ToListAsync();
            return results;
        }
        public void UpdateNutritionist(User user)
        {
            throw new NotImplementedException();
        }

    }
}
