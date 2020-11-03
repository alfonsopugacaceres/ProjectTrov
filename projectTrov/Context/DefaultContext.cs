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

    }
}