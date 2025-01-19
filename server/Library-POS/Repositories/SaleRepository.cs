using Library_POS.Data;
using Library_POS.Models;
using Library_POS.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Library_POS.Repositories
{
    public class SaleRepository : Repository<Sale>, ISaleRepository
    {
        public SaleRepository(ApplicationDbContext context) : base(context)
        {
        }
        
        public override async Task<IEnumerable<Sale>> GetAllAsync()
        {
            var _dbSet = await _context.sales.Include(s => s.Customer).Include(s => s.SaleDetails).ThenInclude(sd => sd.Book).ToListAsync();
            return _dbSet;
        }

        public async Task<IEnumerable<Sale>> UserPurchases(string userId)
        {
            return await _context.sales.Include(s => s.Customer).Include(s => s.SaleDetails).ThenInclude(sd => sd.Book).Where(s => s.UserId == userId).ToListAsync();
           
        }
    }
}
