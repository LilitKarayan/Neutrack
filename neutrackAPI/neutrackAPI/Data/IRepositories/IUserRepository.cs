using System;
using System.Collections.Generic;
using NeutrackAPI.Models;

namespace NeutrackAPI.Data
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAllUsers();
        User GetUserById(int id);
        void CreateUser(User user);
        
    }
}