using System;
using System.Collections.Generic;
using NeutrackAPI.DTOs;
using NeutrackAPI.Models;

namespace NeutrackAPI.Data
{
    public interface IRecipeProductRepository
    {
        bool SaveChanges();
        IEnumerable<RecipeProduct> GetAllRecipeProducts();
        IEnumerable<RecipeProduct> GetRecipeProductsByRecipeId(int recipeId);
        RecipeProduct GetRecipeProductByIds(int recipeId, int productId);
        void CreateRecipeProduct(RecipeProduct recipeProduct);
        void UpdateRecipeProduct(RecipeProduct recipeProduct);
        string DeleteRecipeProduct(RecipeProduct recipeProduct);
    }
}