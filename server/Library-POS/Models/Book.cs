using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace Library_POS.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public int Year { get; set; }
        public string Genre { get; set; }
        public int Quantity { get; set; }
        public int price { get; set; }

        [ValidateNever]
        [JsonIgnore]
        public virtual List<SaleDetail> SaleDetails { get; set; }

        [ValidateNever]
        [JsonIgnore]
        public virtual List<Cart> Carts { get; set; }

    }
}
