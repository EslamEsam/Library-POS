using Library_POS.Models;
using Library_POS.Repositories.Interfaces;

namespace Library_POS.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(Data.ApplicationDbContext context) : base(context)
        {
        }
    }
}
