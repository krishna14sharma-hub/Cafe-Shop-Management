using Microsoft.AspNetCore.Mvc;
using Cafe_management_1.Models;
using Cafe_management_1.Data;
using Microsoft.EntityFrameworkCore;

namespace Cafe_management_1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetOrder()
        {
            // Retrieve all orders from the database
            var orders = _context.Orders.ToList();

            var result = orders.Select(o => {
                // Look for the item in the MenuItems table first
                var menuItem = _context.MenuItems.FirstOrDefault(m => m.Id == o.MenuItemId);

                // Look for the item in the ComboItems table. 
                // CHANGE: Use 'id' (lowercase) or 'Id' based on your ComboItem class definition.
                var comboItem = _context.ComboItems.FirstOrDefault(c => c.id == o.MenuItemId);

                return new
                {
                    id = o.Id,
                    // If menuItem isn't null, use its name; otherwise try comboItem
                    itemName = menuItem != null ? menuItem.ItemName : (comboItem != null ? comboItem.itemsName : "Unknown"),
                    price = menuItem != null ? menuItem.Price : (comboItem != null ? comboItem.Price : 0),
                    quantity = o.Quantity,
                    date = o.OrderDate
                };
            }).ToList();

            return Ok(result);
        }

        [HttpPost]
        public IActionResult PostOrder([FromBody] CheckoutData data)
        {
            try
            {
                if (data == null || data.Items == null) return BadRequest("Packet is empty");

                foreach (var item in data.Items)
                {
                    var newOrder = new Order
                    {
                        // Logic: Ensure 'id' from JS matches 'MenuItemId' in DB
                        MenuItemId = item.Id,
                        Quantity = item.Quantity,
                        OrderDate = DateTime.Now,
                        CustomerName = data.CustomerName ?? "Guest"
                    };
                    _context.Orders.Add(newOrder);
                }

                _context.SaveChanges();
                return Ok(new { message = "Success" });
            }
            catch (Exception ex)
            {
                // Check the 'Output' window in Visual Studio to see this message
                return StatusCode(500, $"Database Error: {ex.Message}");
            }
        }
    }
}