using System;
using System.Collections.Generic;
using NeutrackAPI.DTOs;
using NeutrackAPI.Models;

namespace NeutrackAPI.Data
{
    public interface IRecipeRepository
    {
        bool SaveChanges();
        IEnumerable<Recipe> GetAllRecipes();
        Recipe GetRecipeById(int id);
        void CreateRecipe(Recipe recipe);
        void UpdateRecipe(Recipe recipe);
        string DeleteRecipe(Recipe recipe);
        IEnumerable<Recipe> SearchRecipe(string searchQuery);

        double GetTotalCalories(int recipeID);
    }
}