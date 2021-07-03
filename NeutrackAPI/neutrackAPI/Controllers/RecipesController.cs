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
    // [Authorize]
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
                    return NotFound();
                }
                return Ok(_mapper.Map<RecipeReadDTO>(recipeItem));
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        /// <summary>
        /// Create a new Recipe
        /// </summary>
        /// <param name="recipeCreateDTO"></param>
        /// <returns>The new created Recipe</returns>
        [HttpPost, Route("newrecipe")]
        public ActionResult<Recipe> RegisterRecipe(Recipe recipe)
        {
            try
            {
                _recipeRepository.CreateRecipe(recipe);
                _recipeRepository.SaveChanges();
                
                return CreatedAtRoute(nameof(GetRecipeById), new { recipe.Id }, recipe);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
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
                    return NotFound();
                }
                _mapper.Map(recipeUpdate, recipeItem);
                _recipeRepository.UpdateRecipe(recipeItem);
                _recipeRepository.SaveChanges();
                return Ok(_mapper.Map<RecipeReadDTO>(recipeItem));
            }
            catch(Exception ex)
            {
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
                return NotFound();
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

                return NotFound();
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

    }
}