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

        public IEnumerable<User> GetAllUsers()
        {
            return _context.users.ToList();
        }

        public User GetUserById(int id)
        {
            return _context.users.FirstOrDefault(x => x.Id.Equals(id));
        }
    }
}
