using MessageBoardBackend.Models;
using MessageBoardBackend.Models.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace MessageBoardBackend.Concreate
{
    [Produces("application/json")]
    [Route("api/Users")]
    public class UsersController : Controller
    {
        readonly IUsersRepository UsersRepository;
        public UsersController(IUsersRepository usersRepository)
        {
            UsersRepository = usersRepository;
        }
        [HttpGet("{Id}")]
        public ActionResult Get(string Id)
        {
            var user = UsersRepository.GetUser(Id);
            if (user is null)
            {
                return NotFound("User not found");
            }
            return Ok(user);
        }

        [Authorize]
        [HttpGet("me")]
        public ActionResult GetUser()
        {
            return Ok(GetSecureUser());
        }

        [Authorize]
        [HttpPost("me")]
        public ActionResult Update([FromBody] EditProfile profile)
        {
            UsersRepository.UpdateUser(GetSecureUser(), profile);
            return Ok();
        }

        User GetSecureUser()
        {
            var id = HttpContext.User.Claims.First().Value;
            return UsersRepository.GetUser(id);
        }

    }
}