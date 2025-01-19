using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace Library_POS.Models
{
    public class Sale
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int TotalPrice { get; set; }
        public int CustomerId { get; set; }
        public DateOnly Date { get; set; } = DateOnly.FromDateTime(DateTime.Now);

        // Add the missing User property
        [ValidateNever]
        [JsonIgnore]
        public virtual User User { get; set; }
        [ValidateNever]
        public virtual List<SaleDetail> SaleDetails { get; set; }
        [ValidateNever]
        public virtual Customer Customer { get; set; }

        
    }
}
