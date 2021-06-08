using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using NeutrackAPI.DTOs;
using NeutrackAPI.Models;

namespace NeutrackAPI.Profiles
{
    public class UsersProfile : Profile
    {
        public UsersProfile()
        {
            CreateMap<User, UserReadDTO>().ForMember(dest => dest.Roles, o => o.MapFrom(x => x.UserRoles.Select(x=>x.Role.Name)));
            CreateMap<UserRole, UserRoleDTO>();
            CreateMap<UserCreateDTO, User>();
        }
    }
}
