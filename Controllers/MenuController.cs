using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cafe_management_1.Controllers
{
    [Route("api/[controller]")] // street address 
    [ApiController] // checking if the data is valid and converting JSON into C# objects
    public class MenuController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetMenu()
        {
            var menu = new List<object>
            {
                new {Id = 1 , Name = "Coppuccino" , Price = 120 },
                new { Id = 2 , Name = "Latte " , Price = 150} ,
                new {Id = 3 , Name = "Espresso " , Price = 100}
            };
            return Ok(menu);
        }
    }
}
