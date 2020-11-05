using Microsoft.EntityFrameworkCore;
using Models;

namespace Context
{
    public class DefaultContext : DbContext
    {
        public DefaultContext(DbContextOptions<DefaultContext> options)
            : base(options)
        {
        }


        public DbSet<Incident> Incidents {get;set;}


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Incident>(db =>
                {
                    db.HasKey(i=>i.Id)
                    .HasName("Id");
                    db.Property("Id")
                    .ValueGeneratedOnAdd();
                    db.Property(i=>i.Vin);
                    db.Property(i=>i.VinYear);
                    db.Property(i=>i.IncidentDate);
                    db.Property(i=>i.MakeModel);
                    db.Property(i=>i.Note);
                });
        }
    }
}