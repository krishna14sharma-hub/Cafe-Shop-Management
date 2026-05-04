using Cafe_management_1.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Cafe_management_1.Models;

namespace Cafe_management_1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]  
    public class MenuController : ControllerBase
    {
        private readonly ApplicationDbContext  _context;

        public MenuController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetMenu()
        {
            //  use .Select to force the property names to be exactly what JS wants
            var menu = _context.MenuItems
                .Select(m => new {
                    id = m.Id,
                    itemName = m.ItemName, 
                    price = m.Price       
                }).ToList();

            return Ok(menu);
        }
        [HttpGet ("combos")]
        public async Task<IActionResult> GetCombo()
        {
            var combos = _context.ComboItems
                .Select(m => new {
                    comboId = m.id,
                    comboName = m.itemsName,
                    comboPrice = m.Price,
                   // comboQuantity = m.quantity,
                    comboDescription = m.Discription
                }).ToList();

            return Ok(combos);
        }
    }
}
