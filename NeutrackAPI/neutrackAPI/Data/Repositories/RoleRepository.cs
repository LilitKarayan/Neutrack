using System;
using System.Collections.Generic;
using System.Linq;
using NeutrackAPI.Data.IRepositories;
using NeutrackAPI.Models;

namespace NeutrackAPI.Data.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly NeutrackContext _context;
        public RoleRepository(NeutrackContext context)
        {
            _context = context;
        }

        public void CreateRole(Role role)
        {
            if (role == null)
            {
                throw new ArgumentNullException(nameof(role));
            }
            _context.Add(role);
        }

        public IEnumerable<Role> GetAllRoles()
        {
            return _context.Roles.Where(x=>x.IsActive).ToList();
        }

        public Role GetRoleById(int id)
        {
            return _context.Roles.FirstOrDefault(x => x.Id.Equals(id));
        }

        public Role GetRoleByName(string name)
        {
            return _context.Roles.FirstOrDefault(x => x.Name.Equals(name));
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}
