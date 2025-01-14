using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace Library_POS.Models
{
    public class SaleDetail
    {
        public int Id { get; set; }
        public int SaleId { get; set; }
        public int BookId { get; set; }
        public int Quantity { get; set; }
        public int Price { get; set; }

        // Add the missing Sale property
        [ValidateNever]
        [JsonIgnore]
        public virtual Sale Sale { get; set; }
        [ValidateNever]
        public virtual Book Book { get; set; }

    }
}
