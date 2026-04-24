namespace Cafe_management_1.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int MenuItemId { get; set; } // foreign key to MenuItem
        public int Quantity { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.Now;


    }
}
