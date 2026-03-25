//using Microsoft.AspNetCore.Mvc;
//using Cafe_management_1.Models;

//namespace Cafe_management_1.Controllers
//{
//    [ApiController] // this is a web ready brain
//    [Route("api/[controller]")] // set the URl address to api/order
//    public class OrderCOntroller : ControllerBase
//    {
//        private static List<Order> Orders = new List<Order>();
//        // this is an endpoint using POST
//        [HttpPost]
//        public IActionResult PlaceOrder(Order order)
//            /* This is the "Receptionist." When a POST request arrives, this function catches
//             * the data (Order order), saves it to your Orders list, and sends back a "Thumbs Up" (Ok). */
//        {
//            int nextId = Orders.Count == 0 ? 101 : Orders.Max(o => o.Id) + 1;

//            order.Id = nextId; // asign the new ID 
//            Orders.Add(order); // send the data back to your js 

//            return Ok("Order Placed Successfully");
//        }
//        // thsi is the endpoint using GET 
//        [HttpGet]
//        public IActionResult GetOrders()
//        {
//            return Ok(Orders);
//        }
//    }
//}
