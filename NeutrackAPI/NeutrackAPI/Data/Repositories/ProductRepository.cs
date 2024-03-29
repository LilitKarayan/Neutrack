using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
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
            return _context.Products.OrderBy(x => x.Name).ToList();
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
        /// Updates a new Product
        /// </summary>
        /// <param name="product"></param>
        public void UpdateProduct(Product product)
        {
            if(product == null)
            {
                throw new ArgumentNullException(nameof(product));
            }
            _context.Update(product);
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
        /// Delete a Product
        /// </summary>
        /// <param name="product"></param>
        public string DeleteProduct(Product product)
        {
            if(product == null)
            {
                throw new ArgumentNullException(nameof(product));
            }
            if (product.RecipeProducts == null){
                _context.Products.Remove(product); 
                return "The product is deleted successfully."; 
            } else {
                return "The product can not be deleted as it is in a recipe.";
            }            
            // _context.RecipeProducts.RemoveRange(product.RecipeProducts);
        }

        /// <summary>
        /// Search a Product
        /// </summary>
        /// <param name="product"></param>
        public IEnumerable<Product> SearchProduct(string searchQuery)
        {
            IQueryable<Product> query = _context.Products;
            if (!string.IsNullOrEmpty(searchQuery))
            {
                query = query.Where(e => e.Name.Contains(searchQuery));
            }
            return query.ToList();


        }

        public async Task<IEnumerable<Product>> GetProductsPagination(PagingQueryParams pagingQueryParams)
        {
            return await _context.Products
                .OrderBy(p => p.Name)
                .Skip((pagingQueryParams.PageNumber - 1) * pagingQueryParams.PageSize)
                .Take(pagingQueryParams.PageSize)
                .ToListAsync();
        }

        public int TotalProductCount()
        {
            return _context.Products.Count();
        }
    }
}