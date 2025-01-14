using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace Library_POS.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int PhoneNumber { get; set; }
        public bool IsAdmin { get; set; }
        [ValidateNever]
        [JsonIgnore]
        public virtual List<Sale> Sales { get; set; }
    }
}
