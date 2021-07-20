using System;
using System.Collections.Generic;
using NeutrackAPI.DTOs;
using NeutrackAPI.Models;

namespace NeutrackAPI.Data
{
    public interface IPatientRecipeRepository
    {
        bool SaveChanges();
        IEnumerable<PatientRecipe> GetAllPatientRecipes();
        IEnumerable<PatientRecipe> GetPatientRecipesByPatientId(int patientId);
        PatientRecipe GetPatientRecipeByIds(int recipeId, int patientId);
        void CreatePatientRecipe(PatientRecipe patientRecipe);
        void UpdatePatientRecipe(PatientRecipe patientRecipe);
        string DeletePatientRecipe(PatientRecipe patientRecipe);
    }
}