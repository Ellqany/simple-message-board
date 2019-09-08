using MessageBoardBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace MessageBoardBackend
{
    public class APIContext : DbContext
    {
        public APIContext(DbContextOptions<APIContext> options) :
            base(options)
        { }

        public DbSet<Message> Messages { get; set; }
        public DbSet<User> Users { get; set; }

    }
}
