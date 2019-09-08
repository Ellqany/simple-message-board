using MessageBoardBackend.Models;
using MessageBoardBackend.Models.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MessageBoardBackend.Controllers
{
    [Produces("application/json")]
    [Route("auth")]
    public class AuthController : Controller
    {
        readonly IUsersRepository UsersRepository;
        public AuthController(IUsersRepository usersRepository)
        {
            UsersRepository = usersRepository;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginData loginData)
        {
            var user = UsersRepository.Login(loginData);
            if (user is null)
            {
                return NotFound("Email or Password is wrong");
            }
            return Ok(CreateJwrPackage(user));
        }

        [HttpPost("register")]
        public JwtPacket Register([FromBody] User user)
        {
            UsersRepository.AddUser(user);
            return CreateJwrPackage(user);
        }

        public IEnumerable<User> Users()
        {
            return UsersRepository.GetUsers();
        }

        JwtPacket CreateJwrPackage(User user)
        {
            var SigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("This is the secret phase"));
            var SigningCridantioal = new SigningCredentials(SigningKey, SecurityAlgorithms.HmacSha256);
            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id)
            };

            var jwt = new JwtSecurityToken(claims: claims, signingCredentials: SigningCridantioal);

            var encodedjwt = new JwtSecurityTokenHandler()
                .WriteToken(jwt);

            return new JwtPacket() { Token = encodedjwt, FirstName = user.FirstName };
        }

    }
}