using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NeutrackAPI.Data;
using NeutrackAPI.DTOs;
using NeutrackAPI.Models;
using NeutrackAPI.Helpers;
using NeutrackAPI.Data.IRepositories;
using Microsoft.AspNetCore.Authorization;
using System.Net;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NeutrackAPI.Controllers
{
    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductsController(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// GET api/products
        /// </summary>
        /// <returns>A list of Products</returns>
        [HttpGet]
        public ActionResult<IEnumerable<ProductReadDTO>> GetProducts()
        {
            var productItems = _productRepository.GetAllProducts();
            return Ok(_mapper.Map<IEnumerable<ProductReadDTO>>(productItems));
        }

        /// <summary>
        /// GET api/products/{id}
        /// </summary>
        /// <param name="id"></param>
        /// <returns>A product matching the id parameter</returns>
        [HttpGet("{id}", Name = "GetProductById")]
        public ActionResult<ProductReadDTO> GetProductById(int id)
        {
            try
            {
                var productItem = _productRepository.GetProductById(id);
                if (productItem == null)
                {
                    return NotFound();
                }
                return Ok(_mapper.Map<ProductReadDTO>(productItem));
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        /// <summary>
        /// Register a new Product
        /// </summary>
        /// <param name="productCreateDTO"></param>
        /// <returns>The new created Product</returns>
        [HttpPost, Route("newproduct")]
        public ActionResult<Product> RegisterProduct(Product product)
        {
            try
            {
                _productRepository.CreateProduct(product);
                _productRepository.SaveChanges();
                
                return CreatedAtRoute(nameof(GetProductById), new { product.Id }, product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        /// <summary>
        /// Update Product information
        /// </summary>
        /// <param name="productUpdate"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public ActionResult<ProductReadDTO> UpdateProduct(int id, ProductCreateDTO productUpdate)
        {
            try
            {
                var productItem = _productRepository.GetProductById(id);
                if (productItem == null)
                {
                    return NotFound();
                }
                _mapper.Map(productUpdate, productItem);
                _productRepository.UpdateProduct(productItem);
                _productRepository.SaveChanges();
                return Ok(_mapper.Map<ProductReadDTO>(productItem));
            }
            catch(Exception ex)
            {
                return StatusCode(500, new { message = ex.Message});
            }
        }

        //DELETE api/Products/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteProduct(int id)
        {
            var productItem = _productRepository.GetProductById(id);
            if (productItem == null)
            {
                return NotFound();
            }
            _productRepository.DeleteProduct(productItem);
            _productRepository.SaveChanges();
            return NoContent();
        }

        
        /// Search Product by name
        [HttpGet("search/{name}")]
        public ActionResult<IEnumerable<Product>> SearchProduct(string name)
        {
            try
            {
                var result = _productRepository.SearchProduct(name);

                if (result.Any())
                {
                    return Ok(result);
                }

                return NotFound(new { message = $"Product: {name}  not found" });
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
   
    }
}