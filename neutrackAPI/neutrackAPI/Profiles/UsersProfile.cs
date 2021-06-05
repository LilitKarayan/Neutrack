using System;
using AutoMapper;
using NeutrackAPI.DTOs;
using NeutrackAPI.Models;

namespace NeutrackAPI.Profiles
{
    public class UsersProfile : Profile
    {
        public UsersProfile()
        {
            CreateMap<User, UserReadDTO>();
        }
    }
}
