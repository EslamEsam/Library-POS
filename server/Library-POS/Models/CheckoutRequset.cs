namespace Library_POS.Models
{
    public class CheckoutRequest
    {
        public string UserId { get;  set; }
        public int CustomerId { get;  set; }
        public virtual List<SaleDetail> SaleDetails { get; set; }
    }
}
