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
    public class RecipeProductRepository: IRecipeProductRepository
    {
        private readonly NeutrackContext _context;

        /// <summary>
        /// Sets the DB Context
        /// </summary>
        /// <param name="context"></param>
        /// <param name="appSettings"></param>
        public RecipeProductRepository(NeutrackContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Gets a list of all recipe products
        /// </summary>
        /// <returns></returns>
        public IEnumerable<RecipeProduct> GetAllRecipeProducts()
        {
            return _context.RecipeProducts.ToList();
        }


        /// <summary>
        /// Gets a RecipeProduct by Ids
        /// </summary>
        /// <param name="recipeId"></param>
        /// <param name="productId"></param>
        /// <returns></returns>
        public RecipeProduct GetRecipeProductByIds(int recipeId, int productId)
        {
            return _context.RecipeProducts.FirstOrDefault(x => x.RecipeID.Equals(recipeId) && x.ProductID.Equals(productId));
        }

        /// <summary>
        /// Gets a RecipeProducts by RecipeId
        /// </summary>
        /// <param name="recipeId"></param>
        /// <returns></returns>
        public IEnumerable<RecipeProduct> GetRecipeProductsByRecipeId(int recipeId)
        {
            IEnumerable<RecipeProduct> query = _context.RecipeProducts;
            query = query.Where(e => e.RecipeID.Equals(recipeId));
            return query.ToList();


        }
        

        /// <summary>
        /// Creates a new RecipeProduct
        /// </summary>
        /// <param name="recipeProduct"></param>
        public void CreateRecipeProduct(RecipeProduct recipeProduct)
        {
            if(recipeProduct == null)
            {
                throw new ArgumentNullException(nameof(recipeProduct));
            }
            _context.Add(recipeProduct);
        }

        /// <summary>
        /// Updates a new RecipeProduct
        /// </summary>
        /// <param name="recipeProduct"></param>
        public void UpdateRecipeProduct(RecipeProduct recipeProduct)
        {
            if(recipeProduct == null)
            {
                throw new ArgumentNullException(nameof(recipeProduct));
            }
            _context.Update(recipeProduct);
        }

        
        /// <summary>
        /// Method to save changes to the DB
        /// </summary>
        /// <returns></returns>
        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

        // string DeleteRecipeProduct(RecipeProduct recipeProduct);

        /// <summary>
        /// Delete a Product
        /// </summary>
        /// <param name="product"></param>
        public string DeleteRecipeProduct(RecipeProduct recipeProduct)
        {
            if(recipeProduct == null)
            {
                throw new ArgumentNullException(nameof(recipeProduct));
            }
            _context.RecipeProducts.Remove(recipeProduct); 
            return "The recipeProduct is deleted successfully."; 
                      
        }
    }
}