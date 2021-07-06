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
   public class RecipeRepository: IRecipeRepository
    {
        private readonly NeutrackContext _context;

        /// <summary>
        /// Sets the DB Context
        /// </summary>
        /// <param name="context"></param>
        /// <param name="appSettings"></param>
        public RecipeRepository(NeutrackContext context)
        {
            _context = context;
        }

         /// <summary>
        /// Gets a list of all recipes
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Recipe> GetAllRecipes()
        {
            return _context.Recipes.ToList();
        }

        /// <summary>
        /// Gets a Recipe by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Recipe GetRecipeById(int id)
        {
            return _context.Recipes.Include(r => r.RecipeProducts).ThenInclude(p => p.Product).FirstOrDefault(x => x.Id.Equals(id));
        }

        /// <summary>
        /// Creates a new Recipe
        /// </summary>
        /// <param name="recipe"></param>
        public void CreateRecipe(Recipe recipe)
        {
            if(recipe == null)
            {
                throw new ArgumentNullException(nameof(recipe));
            }
            _context.Add(recipe);
        }

        /// <summary>
        /// Updates a new Recipe
        /// </summary>
        /// <param name="recipe"></param>
        public void UpdateRecipe(Recipe recipe)
        {
            if(recipe == null)
            {
                throw new ArgumentNullException(nameof(recipe));
            }
            _context.Update(recipe);
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
        /// Delete a Recipe
        /// </summary>
        /// <param name="recipe"></param>
        public string DeleteRecipe(Recipe recipe)
        {
            if(recipe == null)
            {
                throw new ArgumentNullException(nameof(recipe));
            }
            _context.Recipes.Remove(recipe); 
            return "The recipe is deleted successfully."; 
        }

        /// <summary>
        /// Search a Recipe
        /// </summary>
        /// <param name="recipe"></param>
        public IEnumerable<Recipe> SearchRecipe(string searchQuery)
        {
            IQueryable<Recipe> query = _context.Recipes;
            if (!string.IsNullOrEmpty(searchQuery))
            {
                query = query.Where(e => e.Name.Contains(searchQuery));
            }
            return query.ToList();


        }






    }
}
