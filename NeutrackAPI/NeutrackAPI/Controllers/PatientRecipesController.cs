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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PatientRecipesController : ControllerBase
    {
        private readonly IPatientRecipeRepository _patientRecipeRepository;
        private readonly IMapper _mapper;

        public PatientRecipesController(IPatientRecipeRepository patientRecipeRepository, IMapper mapper)
        {
            _patientRecipeRepository = patientRecipeRepository;
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
   
    }
}