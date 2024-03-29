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
using System.Threading.Tasks;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NeutrackAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PatientRecipesController : ControllerBase
    {
        private readonly IPatientRecipeRepository _patientRecipeRepository;
        private readonly IRecipeRepository _recipeRepository;
        private readonly IRecipeProductRepository _recipeProductRepository;
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public PatientRecipesController(IPatientRecipeRepository patientRecipeRepository, IMapper mapper, IRecipeRepository recipeRepository, IRecipeProductRepository recipeProductRepository, IProductRepository productRepository)
        {
            _patientRecipeRepository = patientRecipeRepository;
            _recipeRepository = recipeRepository;
            _recipeProductRepository = recipeProductRepository;
            _productRepository = productRepository;
            _mapper = mapper;
        }

       /// <summary>
        /// GET api/patientrecipe
        /// </summary>
        /// <returns>A list of PatientRecipe</returns>
        [HttpGet]
        public ActionResult<IEnumerable<PatientRecipeReadDTO>> GetAllPatientRecipes()
        {
            var patientRecipeItems = _patientRecipeRepository.GetAllPatientRecipes();
            return Ok(_mapper.Map<IEnumerable<PatientRecipeReadDTO>>(patientRecipeItems));
        }


        /// <summary>
        /// GET api/patientRecipes/{patientId}
        /// </summary>
        /// <param name="patientId"></param>
        /// <returns>A patientRecipe matching the patientId parameter</returns>
        [HttpGet("{patientId}", Name = "GetPatientRecipeByPatientId")]
        public ActionResult<IEnumerable<PatientRecipeReadDTO>> GetPatientRecipesByPatientId(int patientId)
        {
            try
            {
                var patientRecipeItems = _patientRecipeRepository.GetPatientRecipesByPatientId(patientId);
                // if (patientRecipeItems == null)
                if (patientRecipeItems == null)
                {
                    return NotFound(new { message = $"PatientRecipe: {patientId}  not found" });
                }
                return Ok(_mapper.Map<IEnumerable<PatientRecipeReadDTO>>(patientRecipeItems));
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        /// <summary>
        /// Create a new PatientRecipe
        /// </summary>
        /// <param name="patientRecipeCreateDTO"></param>
        /// <returns>The new created PatientRecipe</returns>
        [HttpPost, Route("newpatientrecipe")]
        public ActionResult<PatientRecipe> CreatePatientRecipe(PatientRecipe patientRecipe)
        {
            try
            {
                _patientRecipeRepository.CreatePatientRecipe(patientRecipe);
                _patientRecipeRepository.SaveChanges();
                
                return CreatedAtRoute(new { patientRecipe.RecipeID, patientRecipe.PatientID }, patientRecipe);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        /// <summary>
        /// Update Patient Recipe information
        /// </summary>
        /// <param name="patientRecipeUpdate"></param>
        /// <returns></returns>
        [HttpPut, Route("{patientId}/{recipeId}")]
        public ActionResult<PatientRecipeReadDTO> UpdatePatientRecipe(int recipeId, int patientId, PatientRecipeCreateDTO patientRecipeUpdate)
        {
            try
            {
                var patientRecipeItem = _patientRecipeRepository.GetPatientRecipeByIds(recipeId, patientId);
                if (patientRecipeItem == null)
                {
                    return NotFound(new { message = $"PatientRecipe: {patientId} with {recipeId}  not found" });
                }
                _mapper.Map(patientRecipeUpdate, patientRecipeItem);
                _patientRecipeRepository.UpdatePatientRecipe(patientRecipeItem);
                _patientRecipeRepository.SaveChanges();
                return Ok(_mapper.Map<PatientRecipeReadDTO>(patientRecipeItem));
            }
            catch(Exception ex)
            {
                return StatusCode(500, new { message = ex.Message});
            }
        }

        //DELETE api/PatientRecipes/{id}
        [HttpDelete, Route("{patientId}/{recipeId}")]
        public ActionResult DeletePatientRecipe(int recipeId, int patientId)
        {
            var patientRecipeItem = _patientRecipeRepository.GetPatientRecipeByIds(recipeId, patientId);
                if (patientRecipeItem == null)
                {
                    return NotFound(new { message = $"PatientRecipe: {patientId} with {recipeId} not found" });
                }
            _patientRecipeRepository.DeletePatientRecipe(patientRecipeItem);
            _patientRecipeRepository.SaveChanges();
            return NoContent();
        }








        /// <summary>
        /// Generate a new MealPlan for Given Number of Dates
        /// </summary>
        /// <param name=""></param>
        /// <returns></returns>
        [HttpPost, Route("generatemealplan")]
        public async Task<ActionResult> GenerateMealPlan(GenerateMealPlanDTO mealPlanDTO)
        {
            try
            {
                await _patientRecipeRepository.DeletePatientRecipes(mealPlanDTO.PatientId);
                var allRecipes = _recipeRepository.GetAllRecipes();
                var breakfastOptions = allRecipes.Where(e => e.MealType.Contains("Breakfast"));
                var lunchOptions = allRecipes.Where(e => e.MealType.Contains("Lunch"));
                var dinnerOptions = allRecipes.Where(e => e.MealType.Contains("Dinner"));
                double breakfastCalories = mealPlanDTO.DailyCalories * 0.30;
                double lunchCalories = mealPlanDTO.DailyCalories * 0.35;
                double dinnerCalories = mealPlanDTO.DailyCalories * 0.35;
                List<PatientRecipe> newPatientRecipes = new List<PatientRecipe>();
                for (int i = 0; i < mealPlanDTO.NumberOfDays; i++)
                {
                    var randomBreakfast = new Random();
                    int breakfastIndex = randomBreakfast.Next(breakfastOptions.Count());
                    Recipe theChoosenBreakfast = breakfastOptions.ElementAt(breakfastIndex);
                    PatientRecipe newPatientRecipeBreakfast = new PatientRecipe();
                    newPatientRecipeBreakfast.PatientID = mealPlanDTO.PatientId;
                    newPatientRecipeBreakfast.RecipeID = theChoosenBreakfast.Id;
                    newPatientRecipeBreakfast.Portion = Math.Round(breakfastCalories/ _recipeRepository.GetTotalCalories(theChoosenBreakfast.Id), 2);
                    newPatientRecipeBreakfast.Day = i+1;
                    newPatientRecipes.Add(newPatientRecipeBreakfast);

                    var randomLunch = new Random();
                    int lunchIndex = randomLunch.Next(lunchOptions.Count());
                    Recipe theChoosenLunch = lunchOptions.ElementAt(lunchIndex);
                    PatientRecipe newPatientRecipeLunch = new PatientRecipe();
                    newPatientRecipeLunch.PatientID = mealPlanDTO.PatientId;
                    newPatientRecipeLunch.RecipeID = theChoosenLunch.Id;
                    newPatientRecipeLunch.Portion = Math.Round(lunchCalories / _recipeRepository.GetTotalCalories(theChoosenLunch.Id), 2);
                    newPatientRecipeLunch.Day = i+1;
                    newPatientRecipes.Add(newPatientRecipeLunch);

                    var randomDinner = new Random();
                    int dinnerIndex = randomDinner.Next(dinnerOptions.Count());
                    Recipe theChoosenDinner = dinnerOptions.ElementAt(dinnerIndex);
                    PatientRecipe newPatientRecipeDinner = new PatientRecipe();
                    newPatientRecipeDinner.PatientID = mealPlanDTO.PatientId;
                    newPatientRecipeDinner.RecipeID = theChoosenDinner.Id;
                    newPatientRecipeDinner.Portion = Math.Round(dinnerCalories / _recipeRepository.GetTotalCalories(theChoosenDinner.Id),2);
                    newPatientRecipeDinner.Day = i+1;
                    newPatientRecipes.Add(newPatientRecipeDinner);
                }
                await _patientRecipeRepository.InsertPatientRecipes(newPatientRecipes);
                _patientRecipeRepository.SaveChanges();
                
                return Ok(new { message = "Meal plan generated successfully"});
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
   
    }
}