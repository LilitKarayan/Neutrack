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



namespace NeutrackAPI.Controllers
{
    [Authorize(Roles = Roles.Admin + "," + Roles.Nutritionist)]
    [Route("api/[controller]")]
    [ApiController]

    public class RecipesController : ControllerBase
    {
        private readonly IRecipeRepository _recipeRepository;
        private readonly IMapper _mapper;

        public RecipesController(IRecipeRepository recipeRepository, IMapper mapper)
        {
            _recipeRepository = recipeRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// GET api/recipes
        /// </summary>
        /// <returns>A list of Recipes</returns>
        [HttpGet]
        public ActionResult<IEnumerable<RecipeReadDTO>> GetRecipes()
        {
            var recipeItems = _recipeRepository.GetAllRecipes();
            return Ok(_mapper.Map<IEnumerable<RecipeReadDTO>>(recipeItems));
        }

        /// <summary>
        /// GET api/recipes/{id}
        /// </summary>
        /// <param name="id"></param>
        /// <returns>A recipe matching the id parameter</returns>
        [HttpGet("{id}", Name = "GetRecipeById")]
        public ActionResult<RecipeReadDTO> GetRecipeById(int id)
        {
            try
            {
                var recipeItem = _recipeRepository.GetRecipeById(id);
                if (recipeItem == null)
                {
                    return NotFound(new { message = $"Recipe: {id}  not found" });
                }
                return Ok(_mapper.Map<RecipeReadDTO>(recipeItem));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message});
            }
        }

        /// <summary>
        /// Create a new Recipe
        /// </summary>
        /// <param name="recipeCreateDTO"></param>
        /// <returns>The new created Recipe</returns>
        [HttpPost, Route("newrecipe")]
        public ActionResult<RecipeReadDTO> RegisterRecipe(RecipeCreateDTO recipeCreateDto)
        {
            try
            {
                var recipeModel = _mapper.Map<Recipe>(recipeCreateDto);
                if (recipeCreateDto.RecipeProducts.Any())
                {
                    recipeModel.RecipeProducts = new List<RecipeProduct>();
                    foreach (var recipeProduct in recipeCreateDto.RecipeProducts)
                    {
                        recipeModel.RecipeProducts.Add(new RecipeProduct
                        {
                            ProductID = recipeProduct.ProductID,
                            WeightInGrams = recipeProduct.WeightInGrams,
                            Recipe = recipeModel
                        });
                    }
                }
                _recipeRepository.CreateRecipe(recipeModel);
                _recipeRepository.SaveChanges();

                var recipeReadDto = new RecipeReadDTO()
                {
                    Id = recipeModel.Id,
                    Instruction = recipeModel.Instruction,
                    Name = recipeModel.Name
                };
                return CreatedAtRoute(nameof(GetRecipeById), new { recipeReadDto.Id }, recipeReadDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        /// <summary>
        /// Update Recipe information
        /// </summary>
        /// <param name="recipeUpdate"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public ActionResult<RecipeReadDTO> UpdateRecipe(int id, RecipeCreateDTO recipeUpdate)
        {
            try
            {
                var recipeItem = _recipeRepository.GetRecipeById(id);
                if (recipeItem == null)
                {
                    return NotFound(new { message = $"Recipe: {id}  not found" });
                }
                if (!recipeItem.Name.Equals(recipeUpdate.Name, StringComparison.InvariantCultureIgnoreCase))
                {
                    recipeItem.Name = recipeUpdate.Name;
                }
                if( !recipeItem.Instruction.Equals(recipeUpdate.Instruction, StringComparison.InvariantCultureIgnoreCase))
                {
                    recipeItem.Name = recipeUpdate.Name;
                }
                //_mapper.Map(recipeUpdate, recipeItem);
                recipeItem.RecipeProducts = _mapper.Map(recipeUpdate.RecipeProducts, recipeItem.RecipeProducts);
                _recipeRepository.UpdateRecipe(recipeItem);
                _recipeRepository.SaveChanges();
           
                return NoContent();
            }
            catch(Exception ex)
            {
                if (ex.Message.Contains("another instance with the same key value"))
                {
                    return BadRequest(new { message = "You cannot add duplicate products to this recipe"});
                }
                return StatusCode(500, new { message = ex.Message});
            }
        }

        //DELETE api/Recipes/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteRecipe(int id)
        {
            var recipeItem = _recipeRepository.GetRecipeById(id);
            if (recipeItem == null)
            {
                return NotFound(new { message = $"Recipe: {id}  not found" });
            }
            _recipeRepository.DeleteRecipe(recipeItem);
            _recipeRepository.SaveChanges();
            return NoContent();
        }

        /// Search Recipe by name
        [HttpGet("search/{name}")]
        public ActionResult<IEnumerable<Recipe>> SearchRecipe(string name)
        {
            try
            {
                var result = _recipeRepository.SearchRecipe(name);

                if (result.Any())
                {
                    return Ok(result);
                }

                return NotFound(new { message = $"Recipe: {name}  not found" });
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        
        /// <summary>
        /// GET api/recipes
        /// </summary>
        /// <returns>A list of Recipes</returns>
        [HttpGet, Route("calories/{recipeId}")]
        
        public double GetTotalCalories(int recipeId)
        {
            return _recipeRepository.GetTotalCalories(recipeId);
        }

    }
}