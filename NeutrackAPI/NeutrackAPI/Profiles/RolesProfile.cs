using System;
using AutoMapper;
using NeutrackAPI.DTOs;
using NeutrackAPI.Models;

namespace NeutrackAPI.Profiles
{
    public class RolesProfile:Profile
    {
        public RolesProfile()
        {
            CreateMap<Role, RoleReadDTO>();
        }
    }
}
