using System.Collections.Generic;

namespace MessageBoardBackend.Models.Infrastructure
{
    public interface IMessagesRepository
    {
        IEnumerable<Message> GetMessages();
        IEnumerable<Message> GetMessage(string Owner);
        Message AddMessage(Message message);
        bool RemoveMessage(string Id);
    }
}
