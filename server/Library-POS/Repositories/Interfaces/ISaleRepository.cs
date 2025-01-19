using Library_POS.Models;

namespace Library_POS.Repositories.Interfaces
{
    public interface ISaleRepository : IRepository<Sale>
    {
        public Task<IEnumerable<Sale>> UserPurchases(string userId);
    }
}
