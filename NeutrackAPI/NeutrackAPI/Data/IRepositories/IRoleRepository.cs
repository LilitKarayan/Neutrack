using System;
using System.Collections.Generic;
using NeutrackAPI.Models;

namespace NeutrackAPI.Data.IRepositories
{
    public interface IRoleRepository
    {
        bool SaveChanges();
        IEnumerable<Role> GetAllRoles();
        Role GetRoleById(int id);
        Role GetRoleByName(string name);
        void CreateRole(Role role);
    }
}
