using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    // Attributes in [] attach metadata to the declaration immediately below them.
    [Route("api/stock")]
    [ApiController] //type: Enables API-specific controller behavior.
                    // Attribute   → tells ASP.NET Core when/how something is accessed
                    // Declaration → defines what that class or method actually does

    // : means inheritance
    public class StockController : ControllerBase
    {
        //_variable: naming convention for private
        private readonly ApplicationDBContext _context;
        public StockController(ApplicationDBContext context)
        {
            _context = context;
        }
        // the method attributes do not become attributes of the class. 
        // They remain attached to their individual methods, while 
        // ASP.NET Core combines the class-level route with each method-level 
        // attribute to create the final endpoints.
        [HttpGet]
        public IActionResult GetAll()
        {
            var stocks = _context.Stocks
                .Select(s => s.ToStockDto())
                .ToList();

            return Ok(stocks);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var stock = _context.Stocks.Find(id);

            if (stock == null)
            {
                return NotFound();
            }
            return Ok(stock.ToStockDto());
        }
    }
}