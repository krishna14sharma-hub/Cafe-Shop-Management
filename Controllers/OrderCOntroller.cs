using Microsoft.AspNetCore.Mvc;
using Cafe_management_1.Models;

namespace Cafe_management_1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderCOntroller : ControllerBase
    {
        private static List<Order> Orders = new List<Order>();

        [HttpPost]
        public IActionResult PlaceOrder(Order order)
        {
            Orders.Add(order);
            return Ok("Order Placed Successfully");
        }

        [HttpGet]
        public IActionResult GetOrders()
        {
            return Ok(Orders);
        }
    }
}
