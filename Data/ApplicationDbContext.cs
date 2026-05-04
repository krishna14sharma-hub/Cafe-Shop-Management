using Microsoft.EntityFrameworkCore;
using Cafe_management_1.Models;

namespace Cafe_management_1.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<MenuItem> MenuItems { get; set; }
        public DbSet<Order> Orders { get; set; }

        public DbSet<ComboItem> ComboItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MenuItem>().ToTable("MenuItems");
            modelBuilder.Entity<ComboItem>().ToTable("ComboItems");

            // Add this line to specify precision (18 digits total, 2 after the dot)
            modelBuilder.Entity<MenuItem>()
                .Property(m => m.Price)
                .HasColumnType("decimal(18,2)");
        }

    }
}
