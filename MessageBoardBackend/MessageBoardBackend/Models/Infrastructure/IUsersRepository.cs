using System.Collections.Generic;

namespace MessageBoardBackend.Models.Infrastructure
{
    public interface IUsersRepository
    {
        IEnumerable<User> GetUsers();
        User GetUser(string ID);
        User Login(LoginData loginData);
        User AddUser(User user);
        bool RemoveUser(string Id);
        User UpdateUser(User user, EditProfile profile);
    }
}
