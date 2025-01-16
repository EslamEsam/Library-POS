using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace Library_POS.Models
{
    public class User : IdentityUser
    {

        public bool IsAdmin { get; set; }
        [ValidateNever]
        [JsonIgnore]
        public virtual List<Sale> Sales { get; set; }
        [ValidateNever]
        [JsonIgnore]
        public virtual List<Cart> Carts { get; set; }

    }
}
