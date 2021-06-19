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
            CreateMap<PatientCreateDTO, User>();
            CreateMap<NutritionistCreateDTO, User>();
            CreateMap<Patient, PatientReadDTO>()
                .ForMember(d => d.DateOfBirth, o => o.MapFrom(c => c.User.DateOfBirth))
                .ForMember(d => d.Email, o => o.MapFrom(c => c.User.Email))
                .ForMember(d => d.FirstName, o => o.MapFrom(c => c.User.FirstName))
                .ForMember(d => d.LastName, o => o.MapFrom(c => c.User.LastName))
                .ForMember(d => d.FullName, o => o.MapFrom(c => c.User.FullName))
                .ForMember(d => d.Gender, o => o.MapFrom(c => c.User.Gender))
                .ForMember(d => d.PhoneNumber, o => o.MapFrom(c => c.User.PhoneNumber));
            CreateMap<Nutritionist, NutritionistReadDTO>()
                .ForMember(d => d.DateOfBirth, o => o.MapFrom(c => c.User.DateOfBirth))
                .ForMember(d => d.Email, o => o.MapFrom(c => c.User.Email))
                .ForMember(d => d.FirstName, o => o.MapFrom(c => c.User.FirstName))
                .ForMember(d => d.LastName, o => o.MapFrom(c => c.User.LastName))
                .ForMember(d => d.FullName, o => o.MapFrom(c => c.User.FullName))
                .ForMember(d => d.Gender, o => o.MapFrom(c => c.User.Gender))
                .ForMember(d => d.PhoneNumber, o => o.MapFrom(c => c.User.PhoneNumber));
            CreateMap<PatientCreateDTO, Patient>();
            CreateMap<NutritionistCreateDTO, Nutritionist>();
            CreateMap<User, PatientReadDTO>()
                .ForMember(d => d.DateOfBirth, o => o.MapFrom(c => c.DateOfBirth))
                .ForMember(d => d.Email, o => o.MapFrom(c => c.Email))
                .ForMember(d => d.FirstName, o => o.MapFrom(c => c.FirstName))
                .ForMember(d => d.LastName, o => o.MapFrom(c => c.LastName))
                .ForMember(d => d.FullName, o => o.MapFrom(c => c.FullName))
                .ForMember(d => d.Gender, o => o.MapFrom(c => c.Gender))
                .ForMember(d => d.PhoneNumber, o => o.MapFrom(c => c.PhoneNumber));
            CreateMap<User, NutritionistReadDTO>()
                .ForMember(d => d.DateOfBirth, o => o.MapFrom(c => c.DateOfBirth))
                .ForMember(d => d.Email, o => o.MapFrom(c => c.Email))
                .ForMember(d => d.FirstName, o => o.MapFrom(c => c.FirstName))
                .ForMember(d => d.LastName, o => o.MapFrom(c => c.LastName))
                .ForMember(d => d.FullName, o => o.MapFrom(c => c.FullName))
                .ForMember(d => d.Gender, o => o.MapFrom(c => c.Gender))
                .ForMember(d => d.PhoneNumber, o => o.MapFrom(c => c.PhoneNumber));
        }
    }
}
