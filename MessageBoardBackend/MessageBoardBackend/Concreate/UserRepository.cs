using MessageBoardBackend.Models;
using MessageBoardBackend.Models.Infrastructure;
using System.Collections.Generic;
using System.Linq;

namespace MessageBoardBackend.Concreate
{
    public class UserRepository : IUsersRepository
    {
        readonly APIContext Context;
        public UserRepository(APIContext context)
        {
            Context = context;
        }

        public User AddUser(User User)
        {
            if (Validate(User.FirstName) || Validate(User.LastName) || Validate(User.Email) || Validate(User.Password))
            {
                return null;
            }
            var existed = Context.Users.SingleOrDefault(x => x.Email == User.Email);
            if (existed != null)
            {
                return null;
            }
            var dbUser = Context.Users.Add(User).Entity;
            Context.SaveChanges();
            return dbUser;
        }

        public User UpdateUser(User user, EditProfile profile)
        {
            user.FirstName = profile.FirstName ?? user.FirstName;
            user.LastName = profile.LastName ?? user.LastName;
            Context.SaveChanges();
            return user;
        }

        public User GetUser(string ID)
        {
            return Context.Users.SingleOrDefault(x => x.Id == ID);
        }

        public IEnumerable<User> GetUsers()
        {
            return Context.Users;
        }

        public User Login(LoginData loginData)
        {
            var user = Context.Users.SingleOrDefault(x => x.Email == loginData.Email);
            if (user is null)
            {
                return null;
            }
            if (user.Password == loginData.Password)
            {
                return user;
            }
            return null;
        }

        public bool RemoveUser(string Id)
        {
            if (Validate(Id))
            {
                return false;
            }
            var User = Context.Users.SingleOrDefault(x => x.Id == Id);
            Context.Users.Remove(User);
            Context.SaveChanges();
            return true;
        }

        bool Validate(string Controll)
        {
            return string.IsNullOrEmpty(Controll);
        }

    }
}
