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
        public IActionResult GetMenu()
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
    }
}
