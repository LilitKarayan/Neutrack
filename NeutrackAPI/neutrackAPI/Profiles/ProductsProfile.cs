using System;
using AutoMapper;
using NeutrackAPI.DTOs;
using NeutrackAPI.Models;

namespace NeutrackAPI.Profiles
{
    public class ProductsProfile:Profile
    {
        public ProductsProfile()
        {
            CreateMap<Product, ProductReadDTO>();
            CreateMap<ProductCreateDTO, Product>();
        }
    }
}