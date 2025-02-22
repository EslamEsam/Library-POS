﻿using Library_POS.Data;
using Library_POS.Models;
using Library_POS.Repositories.Interfaces;

namespace Library_POS.Repositories
{
    public class CustomerRepository : Repository<Customer>, ICustomerRepository
    {
        public CustomerRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task AddPurchase(int customerId)
        {
            var customer = await _dbSet.FindAsync(customerId);
            customer.NumberOfPurchases++;
            await _context.SaveChangesAsync();
        }
    }
}
