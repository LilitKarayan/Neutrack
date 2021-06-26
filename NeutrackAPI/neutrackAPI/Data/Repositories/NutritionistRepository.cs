using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using NeutrackAPI.Data.IRepositories;
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
            return _context.Patients.Where(x => x.IsActive && x.NutritionistId == nutritionistId)
                .Include(u => u.User)
                .Include(u => u.PatientActivityHistories)
                .ToList();
        }

        public Nutritionist GetNutritionistById(int id)
        {
            return _context.Nutritionists.Include(u => u.User).FirstOrDefault(x => x.Id == id);
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

        public void UpdateNutritionist(User user)
        {
            throw new NotImplementedException();
        }

    }
}
