using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace Library_POS.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public int NumberOfPurchases { get; set; }

        [ValidateNever]
        [JsonIgnore]
        public virtual List<Sale> Sales { get; set; }
    }
}
