using Library_POS.Data;
using Library_POS.Models;
using Library_POS.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Library_POS.Repositories
{
    public class CartRepository : Repository<Cart>, ICartRepository
    {
        public CartRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task CheckoutCart(string userId)
        {
            // delete all items in cart for that specific user
            await _dbSet.Where(c => c.UserId == userId).ExecuteDeleteAsync();
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Cart>> GetCartByUserIdAsync(string userId)
        {
            // get all the items for that specific user
            return await _dbSet.Where(c => c.UserId == userId).ToListAsync();
        }
    }
}
