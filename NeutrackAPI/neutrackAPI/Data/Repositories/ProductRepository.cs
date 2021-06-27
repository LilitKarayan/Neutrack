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
    public class ProductRepository: IProductRepository
    {
        private readonly NeutrackContext _context;

        /// <summary>
        /// Sets the DB Context
        /// </summary>
        /// <param name="context"></param>
        /// <param name="appSettings"></param>
        public ProductRepository(NeutrackContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Gets a list of all products
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Product> GetAllProducts()
        {
            return _context.Products.ToList();
            // return _context.Products
            //     .Include(rp => rp.RecipeProducts).ThenInclude(r => r.Recipe).ToList();
        }

        /// <summary>
        /// Gets a Product by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Product GetProductById(int id)
        {
            return _context.Products.FirstOrDefault(x => x.Id.Equals(id));
            // return _context.Products.Include(x => x.RecipeProducts).ThenInclude(xr => xr.Recipe).FirstOrDefault(x => x.Id.Equals(id));
        }


        /// <summary>
        /// Creates a new Product
        /// </summary>
        /// <param name="product"></param>
        public void CreateProduct(Product product)
        {
            if(product == null)
            {
                throw new ArgumentNullException(nameof(product));
            }
            _context.Add(product);
        }

        
        /// <summary>
        /// Method to save changes to the DB
        /// </summary>
        /// <returns></returns>
        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

        // public void UpdateProduct(Product product)
        // {
        //     // do nothing
        // }

        // public void DeleteProduct(Product product)
        // {
        //     _context.RecipeProducts.RemoveRange(product.RecipeProducts);
        // }

        // public IEnumerable<Product> SearchProduct(string searchQuery)
        // {
        //     return null;
        // }
    }
}