using MessageBoardBackend.Models;
using MessageBoardBackend.Models.Infrastructure;
using System.Collections.Generic;
using System.Linq;

namespace MessageBoardBackend.Concreate
{
    public class MessagesRepository : IMessagesRepository
    {
        readonly APIContext Context;
        public MessagesRepository(APIContext context)
        {
            Context = context;
        }

        public Message AddMessage(Message message)
        {
            if (string.IsNullOrEmpty(message.Owner) && string.IsNullOrEmpty(message.Text))
            {
                return null;
            }
            var dbMessage = Context.Messages.Add(message).Entity;
            Context.SaveChanges();
            return dbMessage;
        }

        public IEnumerable<Message> GetMessage(string Owner)
        {
            return Context.Messages.Where(x => x.Owner == Owner);
        }

        public IEnumerable<Message> GetMessages()
        {
            return Context.Messages;
        }

        public bool RemoveMessage(string Id)
        {
            if (string.IsNullOrEmpty(Id))
            {
                return false;
            }
            var Message = Context.Messages.SingleOrDefault(x => x.Id == Id);
            Context.Messages.Remove(Message);
            Context.SaveChanges();
            return true;
        }

    }
}
