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
        public SalesController(ISaleRepository saleRepository)
        {
            _saleRepository = saleRepository;
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

        // POST: api/Sales
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Sale>> PostSale(Sale sale)
        {
            await _saleRepository.CreateAsync(sale);
            await _saleRepository.SaveChangesAsync();

            return CreatedAtAction("GetSale", new { id = sale.Id }, sale);
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
    }
}
