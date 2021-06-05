using System;
using System.Collections.Generic;
using neutrackAPI.Models;

namespace neutrackAPI.Data
{
    public class UserRepository: IUserRepository
    {
        public UserRepository()
        {
        }

        public IEnumerable<User> GetAllUsers()
        {
            var users = new List<User>
            {
                new User{ Id = 1, FirstName = "Gardey", LastName = "Anton", Email = "test@neutrack.com", Password = "testing" },
                new User{ Id = 2, FirstName = "Gardey", LastName = "Anton", Email = "test@neutrack.com", Password = "testing" }
            };
            return users;
        }

        public User GetUserById(int id)
        {
            return new User
            {
                Id = 1,
                FirstName = "Gardey",
                LastName = "Anton",
                Email = "test@neutrack.com",
                Password = "testing"
            };
        }
    }
}
