using System;
using System.Collections.Generic;
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
        
    }
}