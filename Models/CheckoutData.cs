namespace Cafe_management_1.Models
{
    public class CheckoutData
    {
        public required string CustomerName { get; set; }
        public List<CartItem> Items { get; set; } = new();
    }

    public class CartItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
    }
}