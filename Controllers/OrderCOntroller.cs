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
            var result = _context.Orders
                .Select(o => new {
                    id = o.Id,
                    itemData = _context.MenuItems.FirstOrDefault(m => m.Id == o.MenuItemId),
                    quantity = o.Quantity,
                    date = o.OrderDate
                })
                .Select(x => new {
                    x.id,
                    itemName = x.itemData != null ? x.itemData.ItemName : "Not-Defined",
                    price = x.itemData != null ? x.itemData.Price : 0,
                    x.quantity,
                    x.date
                }).ToList();

            return Ok(result);
        }


        [HttpPost]
        public IActionResult PostOrder(Order order)
        {
            if (order == null) return BadRequest("It's a empty order");
            if (order.Quantity <= 0) return BadRequest("It's a empty order");

            _context.Orders.Add(order); // waiting room 
        //    order.OrderDate = DateTime.Now; 
            _context.SaveChanges(); // trigger room 
            return Ok(new { message = "Order added successfully!" });
        
        }
    }
}