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
            CreateMap<PatientRecipe, PatientRecipeReadDTO>()
                .ForMember(d => d.RecipeName, o => o.MapFrom(s => s.Recipe.Name))
                .ForMember(d => d.MealType, o => o.MapFrom(s => s.Recipe.MealType))
                ;
            CreateMap<PatientRecipeCreateDTO, PatientRecipe>();
            CreateMap<PatientRecipe, PatientRecipeCreateDTO>();
        }
    }
}