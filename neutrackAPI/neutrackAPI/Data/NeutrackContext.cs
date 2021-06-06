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
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().Property(u => u.FullName).HasComputedColumnSql("[FirstName] + ' ' + [LastName]");
            modelBuilder.Entity<User>().Property(u => u.IsActive).HasDefaultValue(true);
            modelBuilder.Entity<Role>().Property(r => r.IsActive).HasDefaultValue(true);
            modelBuilder.Entity<UserRole>().HasKey(ur => new { ur.UserId, ur.RoleId });
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole>UserRoles { get; set; }
    }
}
