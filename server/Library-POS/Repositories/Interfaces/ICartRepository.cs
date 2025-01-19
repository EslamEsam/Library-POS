using Library_POS.Models;

namespace Library_POS.Repositories.Interfaces
{
    public interface ICartRepository : IRepository<Cart>
    {
       Task<IEnumerable<Cart>> GetCartByUserIdAsync(string userId);
        Task CheckoutCart(string userId);
    }

}
