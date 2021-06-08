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
            modelBuilder.Entity<NutritionistRate>().HasKey(nr => new {nr.UserId, nr.RateId});
            modelBuilder.Entity<Rate>().HasOne(r => r.RateType).WithMany(r => r.Rates);
            modelBuilder.Entity<Feedback>().HasOne(f => f.FeedbackFrom).WithMany(f => f.FeedbacksFrom).OnDelete(DeleteBehavior.Restrict); 
            modelBuilder.Entity<Feedback>().HasOne(f => f.FeedbackTo).WithMany(f => f.FeedbacksTo).OnDelete(DeleteBehavior.Restrict); 
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole>UserRoles { get; set; }
        public DbSet<Feedback>Feedbacks { get; set; }
        public DbSet<RateType> RateTypes { get; set; }
        public DbSet<Rate> Rates { get; set; }
        public DbSet<NutritionistRate> NutritionistRates { get; set; }
    }
}
