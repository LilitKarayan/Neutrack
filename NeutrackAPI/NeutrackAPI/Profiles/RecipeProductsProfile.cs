using System;
using AutoMapper;
using NeutrackAPI.DTOs;
using NeutrackAPI.Models;

namespace NeutrackAPI.Profiles
{
    public class RecipeProductsProfile:Profile
    {
        public RecipeProductsProfile()
        {
            CreateMap<RecipeProduct, RecipeProductReadDTO>();
            CreateMap<RecipeProductCreateDTO, RecipeProduct>();
            CreateMap<RecipeProduct, RecipeProductCreateDTO>();
        }
    }
}