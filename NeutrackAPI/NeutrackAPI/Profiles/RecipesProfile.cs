using System;
using System.Linq;
using AutoMapper;
using NeutrackAPI.DTOs;
using NeutrackAPI.Models;

namespace NeutrackAPI.Recipess
{
    public class RecipesProfile:Profile
    {
        public RecipesProfile()
        {
            CreateMap<Recipe, RecipeReadDTO>().ForMember(d => d.RecipeProducts, o => o.MapFrom(s => s.RecipeProducts.Select(rp => new RecipeProductReadDTO
            {
                RecipeID = rp.RecipeID,
                ProductID = rp.ProductID,
                WeightInGrams = rp.WeightInGrams,
                ProductName = rp.Product.Name,
            })));
            CreateMap<RecipeCreateDTO, Recipe>();
            CreateMap<Recipe, RecipeCreateDTO>();
        }
    }
}