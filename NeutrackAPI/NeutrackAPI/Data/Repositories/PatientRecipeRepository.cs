using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using NeutrackAPI.DTOs;
using NeutrackAPI.Helpers;
using NeutrackAPI.Models;

namespace NeutrackAPI.Data
{
    public class PatientRecipeRepository: IPatientRecipeRepository
    {
        private readonly NeutrackContext _context;

        /// <summary>
        /// Sets the DB Context
        /// </summary>
        /// <param name="context"></param>
        /// <param name="appSettings"></param>
        public PatientRecipeRepository(NeutrackContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Gets a list of all patient recipes
        /// </summary>
        /// <returns></returns>
        public IEnumerable<PatientRecipe> GetAllPatientRecipes()
        {
            return _context.PatientRecipes.ToList();
        }


        /// <summary>
        /// Gets a PatientRecipe by Ids
        /// </summary>
        /// <param name="recipeId"></param>
        /// <param name="patientId"></param>
        /// <returns></returns>
        public PatientRecipe GetPatientRecipeByIds(int recipeId, int patientId)
        {
            return _context.PatientRecipes.FirstOrDefault(x => x.RecipeID.Equals(recipeId) && x.PatientID.Equals(patientId));
        }

        /// <summary>
        /// Gets a PatientRecipes by PatientId
        /// </summary>
        /// <param name="recipeId"></param>
        /// <returns></returns>
        public IEnumerable<PatientRecipe> GetPatientRecipesByPatientId(int patientId)
        {
            IEnumerable<PatientRecipe> query = _context.PatientRecipes.Include(x => x.Recipe);
            query = query.Where(e => e.PatientID.Equals(patientId));
            return query.ToList();


        }
        

        /// <summary>
        /// Creates a new PatientRecipe
        /// </summary>
        /// <param name="patientRecipe"></param>
        public void CreatePatientRecipe(PatientRecipe patientRecipe)
        {
            if(patientRecipe == null)
            {
                throw new ArgumentNullException(nameof(patientRecipe));
            }
            _context.Add(patientRecipe);
        }

        /// <summary>
        /// Updates PatientRecipe
        /// </summary>
        /// <param name="patientRecipe"></param>
        public void UpdatePatientRecipe(PatientRecipe patientRecipe)
        {
            if(patientRecipe == null)
            {
                throw new ArgumentNullException(nameof(patientRecipe));
            }
            _context.Update(patientRecipe);
        }

        
        /// <summary>
        /// Method to save changes to the DB
        /// </summary>
        /// <returns></returns>
        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }


        /// <summary>
        /// Delete a PatientRecipe
        /// </summary>
        /// <param name="patientRecipe"></param>
        public string DeletePatientRecipe(PatientRecipe patientRecipe)
        {
            if(patientRecipe == null)
            {
                throw new ArgumentNullException(nameof(patientRecipe));
            }
            _context.PatientRecipes.Remove(patientRecipe); 
            return "The patientRecipe is deleted successfully."; 
                      
        }
    }
}