using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Library_POS.Data;
using Library_POS.Models;
using Library_POS.Repositories.Interfaces;

namespace Library_POS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly ISaleRepository _saleRepository;
        private readonly ISaleDetailRepository _saleDetailRepository;
        private readonly IBookRepository _bookRepository;
        private readonly ICartRepository _cartRepository;
        private readonly ICustomerRepository _customerRepository;
        public SalesController(ISaleRepository saleRepository, ISaleDetailRepository saleDetailsRepository, IBookRepository bookRepository, ICartRepository cartRepository, ICustomerRepository customerRepository)
        {
            _saleRepository = saleRepository;
            _saleDetailRepository = saleDetailsRepository;
            _bookRepository = bookRepository;
            _cartRepository = cartRepository;
            _customerRepository = customerRepository;
        }

        // GET: api/Sales
        [HttpGet]
        public async Task<IEnumerable<Sale>> Getsales()
        {
            return await _saleRepository.GetAllAsync();
        }

        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sale>> GetSale(int id)
        {
            var sale = await _saleRepository.GetByIdAsync(id);

            if (sale == null)
            {
                return NotFound();
            }

            return sale;
        }

        // GET : api/Sales/User/5
        [HttpGet("User/{userId}")]
        public async Task<IEnumerable<Sale>> GetSalesByUser(string userId)
        {
            return await _saleRepository.UserPurchases(userId);
        }


        // PUT: api/Sales/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSale(int id, Sale sale)
        {
            if (id != sale.Id)
            {
                return BadRequest();
            }

            await _saleRepository.UpdateAsync(sale);

            try
            {
                await _saleRepository.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SaleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Sales/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSale(int id)
        {
            var sale = await _saleRepository.GetByIdAsync(id);
            if (sale == null)
            {
                return NotFound();
            }

            await _saleRepository.DeleteAsync(id);
            await _saleRepository.SaveChangesAsync();

            return NoContent();
        }

        private bool SaleExists(int id)
        {
            var sale = _saleRepository.GetByIdAsync(id);
            return sale != null;
        }

        [HttpPost("checkout")]
        public async Task<ActionResult> Checkout([FromBody] CheckoutRequest checkout)
        {

            var saleDetails = checkout.SaleDetails;
            var sale = new Sale
            {
                UserId = checkout.UserId,
                CustomerId = checkout.CustomerId,
                TotalPrice = await GetTotalPrice(saleDetails),
            };
            if (!await RemoveBooks(saleDetails))
            {
                return BadRequest("The quantity of the books is not enough");
            }
            await _saleRepository.CreateAsync(sale);
            await _saleRepository.SaveChangesAsync();
            saleDetails.ForEach(s => s.SaleId = sale.Id);
            await _saleDetailRepository.CreateAllAsync(saleDetails);
            await _saleDetailRepository.SaveChangesAsync();
            await _cartRepository.CheckoutCart(checkout.UserId);
            await _customerRepository.AddPurchase(checkout.CustomerId);
            return Ok("Sale created successfully");
        }

        private async Task<int> GetTotalPrice(List<SaleDetail> saleDetails )
        {
            // get the prices of the books from the database 
            var totalPrice = 0;
            foreach (var item in saleDetails)
            {
                var book = await _bookRepository.GetByIdAsync(item.BookId);
                item.Price = book.price;
                totalPrice += (book.price * item.Quantity);
            }
            return totalPrice;
        }

        private async Task<bool> RemoveBooks(List<SaleDetail> saleDetails)
        {
            // remove the books from the database if the quantity is available
            foreach (var item in saleDetails)
            {
                var book = await _bookRepository.GetByIdAsync(item.BookId);
                if(item.Quantity <= book.Quantity)
                {
                    book.Quantity -= item.Quantity;
                    await _bookRepository.UpdateAsync(book);
                }
                else
                {
                    return false;

                }
            }
            await _bookRepository.SaveChangesAsync();
            return true;
        }
    }

    
}
