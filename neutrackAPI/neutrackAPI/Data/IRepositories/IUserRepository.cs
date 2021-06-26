using System;
using System.Collections.Generic;
using NeutrackAPI.DTOs;
using NeutrackAPI.Models;

namespace NeutrackAPI.Data
{
    public interface IUserRepository
    {
        bool SaveChanges();
        IEnumerable<User> GetAllUsers();
        User GetUserById(int id);
        User GetUserByEmail(string email);
        void CreateUser(User user);
        AuthResponseDTO AuthenticateUser(AuthRequestDTO userAuthDTO);
        void UpdateUser(User user);
        void DeactivateUser(User user);
        IEnumerable<User> SearchUser(string searchQuery, Role role);
    }
}