using Library_POS.Data;
using Library_POS.Models;
using Library_POS.Repositories.Interfaces;

namespace Library_POS.Repositories
{
    public class SaleDetailRepository : Repository<SaleDetail>, ISaleDetailRepository
    {
        public SaleDetailRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
