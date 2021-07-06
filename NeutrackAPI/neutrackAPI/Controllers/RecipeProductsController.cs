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
    public class RecipeProductsController : ControllerBase
    {
        private readonly IRecipeProductRepository _recipeProductRepository;
        private readonly IMapper _mapper;

        public RecipeProductsController(IRecipeProductRepository recipeProductRepository, IMapper mapper)
        {
            _recipeProductRepository = recipeProductRepository;
            _mapper = mapper;
        }

       /// <summary>
        /// GET api/recipes
        /// </summary>
        /// <returns>A list of Recipes</returns>
        [HttpGet]
        public ActionResult<IEnumerable<RecipeProductReadDTO>> GetAllRecipeProducts()
        {
            var recipeProductItems = _recipeProductRepository.GetAllRecipeProducts();
            return Ok(_mapper.Map<IEnumerable<RecipeProductReadDTO>>(recipeProductItems));
        }


        /// <summary>
        /// GET api/recipeProducts/{recipeId}
        /// </summary>
        /// <param name="recipeId"></param>
        /// <returns>A recipeProduct matching the recipeId parameter</returns>
        [HttpGet("{recipeId}", Name = "GetRecipeProductByRecipeId")]
        public ActionResult<IEnumerable<RecipeProductReadDTO>> GetRecipeProductsByRecipeId(int recipeId)
        {
            try
            {
                var recipeProductItems = _recipeProductRepository.GetRecipeProductsByRecipeId(recipeId);
                // if (recipeProductItems == null)
                if (recipeProductItems == null)
                {
                    return NotFound(new { message = $"RecipeProduct: {recipeId}  not found" });
                }
                return Ok(_mapper.Map<IEnumerable<RecipeProductReadDTO>>(recipeProductItems));
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        /// <summary>
        /// Create a new RecipeProduct
        /// </summary>
        /// <param name="recipeProductCreateDTO"></param>
        /// <returns>The new created Product</returns>
        [HttpPost, Route("newrecipeproduct")]
        public ActionResult<RecipeProduct> RegisterRecipeProduct(RecipeProduct recipeProduct)
        {
            try
            {
                _recipeProductRepository.CreateRecipeProduct(recipeProduct);
                _recipeProductRepository.SaveChanges();
                
                return CreatedAtRoute(new { recipeProduct.RecipeID, recipeProduct.ProductID }, recipeProduct);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        /// <summary>
        /// Update Recipe Product information
        /// </summary>
        /// <param name="recipeProductUpdate"></param>
        /// <returns></returns>
        [HttpPut, Route("{recipeId}/{productId}")]
        public ActionResult<RecipeProductReadDTO> UpdateRecipeProduct(int recipeId, int productId, RecipeProductCreateDTO recipeProductUpdate)
        {
            try
            {
                var recipeProductItem = _recipeProductRepository.GetRecipeProductByIds(recipeId, productId);
                if (recipeProductItem == null)
                {
                    return NotFound(new { message = $"RecipeProduct: {productId}  not found" });
                }
                _mapper.Map(recipeProductUpdate, recipeProductItem);
                _recipeProductRepository.UpdateRecipeProduct(recipeProductItem);
                _recipeProductRepository.SaveChanges();
                return Ok(_mapper.Map<RecipeProductReadDTO>(recipeProductItem));
            }
            catch(Exception ex)
            {
                return StatusCode(500, new { message = ex.Message});
            }
        }

        //DELETE api/RecipeProducts/{id}
        [HttpDelete, Route("{recipeId}/{productId}")]
        public ActionResult DeleteProduct(int recipeId, int productId)
        {
            var recipeProductItem = _recipeProductRepository.GetRecipeProductByIds(recipeId, productId);
                if (recipeProductItem == null)
                {
                    return NotFound(new { message = $"RecipeProduct: {productId}  not found" });
                }
            _recipeProductRepository.DeleteRecipeProduct(recipeProductItem);
            _recipeProductRepository.SaveChanges();
            return NoContent();
        }
   
    }
}