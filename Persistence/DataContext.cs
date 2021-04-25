using Microsoft.EntityFrameworkCore;
using Domain;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        // 'Activities' reflects the name of the table
        public DbSet<Activity> Activities { get; set; }
    }
}