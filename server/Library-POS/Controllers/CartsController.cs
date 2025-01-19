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
    public class CartsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ICartRepository _cartRepository;
        private readonly IBookRepository _bookRepository;

        public CartsController( ICartRepository cartRepository,IBookRepository bookRepository )
        {
            _cartRepository = cartRepository;
            _bookRepository = bookRepository;
        }

        // GET: api/Carts
        [HttpGet]
        public async Task<IEnumerable<Cart>> Getcarts()
        {
            var carts = await _cartRepository.GetAllAsync();
            return carts;
        }

        // GET: api/Carts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cart>> GetCart(int id)
        {
            var cart = await _cartRepository.GetByIdAsync(id);

            if (cart == null)
            {
                return NotFound();
            }

            return cart;
        }

        // PUT: api/Carts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart(int id, Cart cart)
        {
            if (id != cart.Id)
            {
                return BadRequest();
            }

            await _cartRepository.UpdateAsync(cart);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await CartExists(id))
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

        // POST: api/Carts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Cart>> PostCart(Cart cart)
        {
            await _cartRepository.CreateAsync(cart);
            await _cartRepository.SaveChangesAsync();

            return CreatedAtAction("GetCart", new { id = cart.Id }, cart);
        }

        // DELETE: api/Carts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            var cart = await _cartRepository.GetByIdAsync(id);
            if (cart == null)
            {
                return NotFound();
            }

            await _cartRepository.DeleteAsync(id);
            await _cartRepository.SaveChangesAsync();

            return NoContent();
        }

        // Get: api/Carts/GetCartByUserId/5
        [HttpGet("GetCartByUserId/{userId}")]
        public async Task<IEnumerable<Cart>> GetCartByUserId(string userId)
        {
            var carts = await _cartRepository.GetCartByUserIdAsync(userId);
        
            return carts;
        }

        private async Task<bool> CartExists(int id)
        {
            var cart = await _cartRepository.GetByIdAsync(id);
            return cart != null;
        }
    }
}
