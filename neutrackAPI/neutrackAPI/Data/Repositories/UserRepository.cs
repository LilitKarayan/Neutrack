using System;
using System.Collections.Generic;
using System.Linq;
using NeutrackAPI.Models;

namespace NeutrackAPI.Data
{
    public class UserRepository: IUserRepository
    {
        private readonly NeutrackContext _context;

        public UserRepository(NeutrackContext context)
        {
            _context = context;
        }

        public void CreateUser(User user)
        {
            if(user != null)
            {
                _context.Add(user);
            }
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _context.Users.ToList();
        }

        public User GetUserById(int id)
        {
            return _context.Users.FirstOrDefault(x => x.Id.Equals(id));
        }
    }
}
