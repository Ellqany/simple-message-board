using MessageBoardBackend.Models;
using MessageBoardBackend.Models.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace MessageBoardBackend.Controllers
{
    [Produces("application/json")]
    [Route("api/Messages")]
    public class MessagesController : Controller
    {
        readonly IMessagesRepository MessagesRepository;
        public MessagesController(IMessagesRepository messagesRepository)
        {
            MessagesRepository = messagesRepository;
        }

        [HttpGet]
        public IEnumerable<Message> GetAll()
        {
            return MessagesRepository.GetMessages();
        }

        [HttpGet("{Owner}")]
        public IEnumerable<Message> Get(string Owner)
        {
            return MessagesRepository.GetMessage(Owner);
        }

        [HttpPost]
        public IActionResult AddMessage([FromBody]  Message message)
        {
            var Message = MessagesRepository.AddMessage(message);
            if (Message is null)
            {
                return NotFound();
            }
            else
            {
                return Ok(Message);
            }

        }

    }
}