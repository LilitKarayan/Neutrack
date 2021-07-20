using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NeutrackAPI.DTOs;
using NeutrackAPI.Models;

namespace NeutrackAPI.Data
{
    public interface IUserRepository
    {
        bool SaveChanges();
        IEnumerable<User> GetAllUsers();
        Task<User> GetUserById(int id);
        User GetUserByEmail(string email);
        void CreateUser(User user);
        AuthResponseDTO AuthenticateUser(AuthRequestDTO userAuthDTO);
        void UpdateUser(User user);
        void DeactivateUser(User user);
        IEnumerable<User> SearchUser(string searchQuery, Role role);
        Task<bool> DeleteUser(int userId);
        Task<bool> DeletePatient(int userId);
        Task<Patient> GetPatient(int userId);
    }
}