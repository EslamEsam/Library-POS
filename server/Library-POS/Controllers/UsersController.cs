using Library_POS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Library_POS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager; 

        public UsersController(SignInManager<User> signInManager, UserManager<User> userManager) 
        {
            _signInManager = signInManager;
            _userManager = userManager; 
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginRequest login)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(login.Email, login.Password, false,false);
                if (result.Succeeded)
                {
                    var user = await _userManager.FindByEmailAsync(login.Email);
                    var userId = user.Id;
                    var isAdmin = user.IsAdmin;
                    HttpContext.Session.SetString("UserId", userId);
                    HttpContext.Session.SetString("IsAdmin", isAdmin.ToString());
                    HttpContext.Session.SetString("Email", login.Email);
                    return Ok(new { userId, isAdmin, login.Email});
                }
                else
                {
                    return Unauthorized("Invalid login attempt");
                }
            }
            else
            {
                return BadRequest("Invalid login attempt");
            }
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterRequest register)
        {
            if (ModelState.IsValid)
            {
                var user = new User
                {
                    UserName = register.Email,
                    Email = register.Email,
                };
                var result = await _userManager.CreateAsync(user, register.Password);
                if (result.Succeeded)
                {
                    return Ok("User created successfully");
                }
                else
                {
                    return BadRequest(result);
                }
            }
            else
            {
                return BadRequest("Invalid registration attempt2");
            }
        }

    }

}
