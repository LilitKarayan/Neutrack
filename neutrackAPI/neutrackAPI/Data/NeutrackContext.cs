using System;
using Microsoft.EntityFrameworkCore;
using NeutrackAPI.Models;

namespace NeutrackAPI.Data
{
    public class NeutrackContext : DbContext
    {
        public NeutrackContext(DbContextOptions<NeutrackContext> opt) : base(opt)
        {
        }

        public DbSet<User> users { get; set; }
    }
}
