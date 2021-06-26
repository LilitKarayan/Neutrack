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
            CreateMap<User, UserReadDTO>()
                .ForMember(dest => dest.NutritionistId, o => o.MapFrom(x => x.Nutritionist.Id))
                .ForMember(dest => dest.PatientId, o => o.MapFrom(x => x.Patient.Id))
                .ForMember(dest => dest.Roles, o => o.MapFrom(x => x.UserRoles.Select(x=>x.Role.Name)));
            CreateMap<UserRole, UserRoleDTO>();
            CreateMap<UserCreateDTO, User>();
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

            CreateMap<PatientCreateDTO, User>();
            CreateMap<Patient, PatientReadDTO>()
                .ForMember(d => d.InitialWeight, o => o.MapFrom(c => c.PatientActivityHistories.OrderByDescending(x => x.CreatedDate).FirstOrDefault().Weight))
                .ForMember(d => d.DateOfBirth, o => o.MapFrom(c => c.User.DateOfBirth))
                .ForMember(d => d.Email, o => o.MapFrom(c => c.User.Email))
                .ForMember(d => d.FirstName, o => o.MapFrom(c => c.User.FirstName))
                .ForMember(d => d.LastName, o => o.MapFrom(c => c.User.LastName))
                .ForMember(d => d.FullName, o => o.MapFrom(c => c.User.FullName))
                .ForMember(d => d.Gender, o => o.MapFrom(c => c.User.Gender))
                .ForMember(d => d.PhoneNumber, o => o.MapFrom(c => c.User.PhoneNumber));
            CreateMap<PatientCreateDTO, Patient>().ReverseMap();
            CreateMap<Patient, UserPatchDTO>();
            CreateMap<UserPatchDTO, Patient>();

            CreateMap<NutritionistCreateDTO, User>();
            CreateMap<Nutritionist, NutritionistReadDTO>()
                .ForMember(d => d.DateOfBirth, o => o.MapFrom(c => c.User.DateOfBirth))
                .ForMember(d => d.Email, o => o.MapFrom(c => c.User.Email))
                .ForMember(d => d.FirstName, o => o.MapFrom(c => c.User.FirstName))
                .ForMember(d => d.LastName, o => o.MapFrom(c => c.User.LastName))
                .ForMember(d => d.FullName, o => o.MapFrom(c => c.User.FullName))
                .ForMember(d => d.Gender, o => o.MapFrom(c => c.User.Gender))
                .ForMember(d => d.PhoneNumber, o => o.MapFrom(c => c.User.PhoneNumber));
            CreateMap<NutritionistCreateDTO, Nutritionist>();
            
            
        }
    }
}
