using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;
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
            if(user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            _context.Add(user);
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _context.Users.Where(u => u.IsActive).Include(u => u.UserRoles).ThenInclude(ur => ur.Role).ToList();
        }

        public User GetUserByEmail(string email)
        {
            return _context.Users.Include(x => x.UserRoles).ThenInclude(xr => xr.Role).FirstOrDefault(x => x.Email.Equals(email));
        }

        public User GetUserById(int id)
        {
            return _context.Users.Include(x => x.UserRoles).ThenInclude(xr => xr.Role).FirstOrDefault(x => x.Id.Equals(id));
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}
