using System;
using System.Collections.Generic;
using NeutrackAPI.DTOs;
using NeutrackAPI.Models;

namespace NeutrackAPI.Data
{
    public interface IProductRepository
    {
        bool SaveChanges();
        IEnumerable<Product> GetAllProducts();
        Product GetProductById(int id);
        void CreateProduct(Product product);
        void UpdateProduct(Product product);
        string DeleteProduct(Product product);
        // IEnumerable<Product> SearchProduct(string searchQuery);
    }
}