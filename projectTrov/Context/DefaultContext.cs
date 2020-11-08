using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using AppModels;

namespace Context
{
    public class DefaultContext : DbContext
    {
        public DefaultContext(DbContextOptions<DefaultContext> options)
            : base(options)
        {
        }


        public DbSet<Incident> Incidents {get;set;}
        public DbSet<VIN> Vins {get;set;}


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Incident>(db =>
                {
                    db.HasKey(i=>i.Id)
                    .HasName("Id");
                    db.Property("Id")
                    .ValueGeneratedOnAdd();

                    db.Property(i=>i.IncidentDate);

                    db.Property(i=>i.Note);

                    db.HasOne(v => v.Vin).WithMany(i => i.Incidents).HasForeignKey(i=> i.VinNumber);

                });           

                modelBuilder
                .Entity<VIN>(db =>
                {
                    db.HasKey(i=>i.VinNumber)
                    .HasName("VinNumber");
                    db.Property("VinNumber");
                    db.Property(i=>i.Make);
                    db.Property(i=>i.Model);
                    db.Property(i=>i.VinYear);
                });

            // modelBuilder.Entity<Incident>().HasData(
            //     new Incident {Id = 1, Vin = "JTKDE177160124954", VinYear = "2006", MakeModel = "TOYOTA", Note = "Bumper crash"},
            //     new Incident {Id = 2, Vin = "2GCEK13TX51128592", VinYear = "2005", MakeModel = "CHEVROLET", Note = "Rear end crash"},
            //     new Incident {Id = 3, Vin = "3B6MC3667XM554105", VinYear = "1999", MakeModel = "DODGE", Note = "Broken window"},
            //     new Incident {Id = 4, Vin = "5J8TB4H52FL000489", VinYear = "2015", MakeModel = "ACURA", Note = "Stolen"},
            //     new Incident {Id = 5, Vin = "1GNEC13V44R194325", VinYear = "2004", MakeModel = "CHEVROLET", Note = "Fell off a bridge"}
            //     );

        }
    }
}