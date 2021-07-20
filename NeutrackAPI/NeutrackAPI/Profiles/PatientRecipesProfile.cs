using System;
using AutoMapper;
using NeutrackAPI.DTOs;
using NeutrackAPI.Models;

namespace NeutrackAPI.Profiles
{
    public class PatientRecipesProfile:Profile
    {
        public PatientRecipesProfile()
        {
            CreateMap<PatientRecipe, PatientRecipeReadDTO>();
            CreateMap<PatientRecipeCreateDTO, PatientRecipe>();
            CreateMap<PatientRecipe, PatientRecipeCreateDTO>();
        }
    }
}