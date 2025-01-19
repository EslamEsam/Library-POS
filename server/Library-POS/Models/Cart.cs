using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace Library_POS.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int BookId { get; set; }
        public int BookQuantity { get; set; }
        public string BookTitle { get; set; }
        public int BookPrice { get; set; }



        [ValidateNever]
        [JsonIgnore]
        public virtual User User { get; set; }

        [ValidateNever]
        [JsonIgnore]
        public virtual Book Book { get; set; }



    }
}
