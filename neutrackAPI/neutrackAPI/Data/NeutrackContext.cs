using System;
using Microsoft.EntityFrameworkCore;
using neutrackAPI.Models;

namespace neutrackAPI.Data
{
    public class NeutrackContext : DbContext
    {
        public NeutrackContext(DbContextOptions<NeutrackContext> opt) : base(opt)
        {
        }

        public DbSet<User> users { get; set; }
    }
}
