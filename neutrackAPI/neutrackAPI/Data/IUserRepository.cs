using System;
using System.Collections.Generic;
using neutrackAPI.Models;

namespace neutrackAPI.Data
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAllUsers();
        User GetUserById(int id);
        
    }
}