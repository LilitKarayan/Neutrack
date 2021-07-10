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
            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
            modelBuilder.Entity<User>().HasOne(p => p.Patient).WithOne(u => u.User).HasForeignKey<Patient>(u => u.UserId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<User>().HasOne(n => n.Nutritionist).WithOne(u => u.User).HasForeignKey<Nutritionist>(u => u.UserId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Patient>().Property(u => u.IsActive).HasDefaultValue(true);
            modelBuilder.Entity<Nutritionist>().Property(u => u.IsActive).HasDefaultValue(true);
            modelBuilder.Entity<Role>().Property(r => r.IsActive).HasDefaultValue(true);
            modelBuilder.Entity<UserRole>().HasKey(ur => new { ur.UserId, ur.RoleId });
            modelBuilder.Entity<NutritionistRate>().HasKey(nr => new {nr.NutritionistId, nr.RateId});
            modelBuilder.Entity<NutritionistPatientHistory>().HasKey(np => new { np.NutritionistId, np.PatientId });
            modelBuilder.Entity<NutritionistPatientHistory>().Property(x => x.CreatedDate).HasDefaultValueSql("getutcdate()");
            modelBuilder.Entity<Rate>().HasOne(r => r.RateType).WithMany(r => r.Rates);
            modelBuilder.Entity<Feedback>().HasOne(f => f.Nutritionist).WithMany(f => f.Feedbacks).OnDelete(DeleteBehavior.Restrict); 
            modelBuilder.Entity<Feedback>().HasOne(f => f.Patient).WithMany(f => f.Feedbacks).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<PatientActivityHistory>().HasOne(p => p.Patient).WithMany(h => h.PatientActivityHistories);
            modelBuilder.Entity<PatientActivityHistory>().Property(x => x.CreatedDate).HasDefaultValueSql("getutcdate()");
            
            modelBuilder.Entity<RecipeProduct>().HasKey(rp => new { rp.RecipeID, rp.ProductID });
            modelBuilder.Entity<RecipeProduct>().HasOne(p => p.Product).WithMany(rp => rp.RecipeProducts).HasForeignKey(pi => pi.ProductID);
            modelBuilder.Entity<RecipeProduct>().HasOne(r => r.Recipe).WithMany(rp => rp.RecipeProducts).HasForeignKey(ri => ri.RecipeID);


        }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole>UserRoles { get; set; }
        public DbSet<Feedback>Feedbacks { get; set; }
        public DbSet<RateType> RateTypes { get; set; }
        public DbSet<Rate> Rates { get; set; }
        public DbSet<NutritionistRate> NutritionistRates { get; set; }
        public DbSet<Patient>Patients { get; set; }
        public DbSet<Nutritionist> Nutritionists { get; set; }
        public DbSet<NutritionistPatientHistory> NutritionistPatientHistories { get; set; }
        public DbSet<PatientActivityHistory> PatientActivityHistories { get; set; }
        public DbSet<Product>Products { get; set; }
        public DbSet<Recipe>Recipes { get; set; }
        public DbSet<RecipeProduct>RecipeProducts { get; set; }
    }
}
