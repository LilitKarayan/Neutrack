using System;
using AutoMapper;
using NeutrackAPI.DTOs;
using NeutrackAPI.Models;

namespace NeutrackAPI.Recipess
{
    public class RecipesProfile:Profile
    {
        public RecipesProfile()
        {
            CreateMap<Recipe, RecipeReadDTO>();
            CreateMap<RecipeCreateDTO, Recipe>();
            CreateMap<Recipe, RecipeCreateDTO>();
        }
    }
}