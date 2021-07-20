using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using NeutrackAPI.DTOs;
using NeutrackAPI.Helpers;
using NeutrackAPI.Models;

namespace NeutrackAPI.Data
{
    public class UserRepository: IUserRepository
    {
        private readonly NeutrackContext _context;
        private readonly AppSettings _appSettings;

        /// <summary>
        /// Sets the DB Context
        /// </summary>
        /// <param name="context"></param>
        /// <param name="appSettings"></param>
        public UserRepository(NeutrackContext context, IOptions<AppSettings> appSettings)
        {
            _context = context;
            _appSettings = appSettings.Value;

        }

        /// <summary>
        /// Authenticates the User and generates a token for accessing the API
        /// </summary>
        /// <param name="userAuthDTO"></param>
        /// <returns></returns>
        public AuthResponseDTO AuthenticateUser(AuthRequestDTO userAuthDTO)
        {
            userAuthDTO.Password = PasswordHelper.GenerateSHA256tring(_appSettings.Secret + userAuthDTO.Password);
            var _user = _context.Users
                .Include(x => x.Nutritionist)
                .Include(x => x.Patient)
                .Include(x => x.UserRoles)
                .ThenInclude(xr => xr.Role)
                .FirstOrDefault(x => x.Email == userAuthDTO.Email && x.Password == userAuthDTO.Password);

            // return null if user not found
            if (_user == null) return null;

            // authentication successful so generate jwt token
            var token = GenerateJwtToken(_user);
            return new AuthResponseDTO(_user, token);
        }

        private string GenerateJwtToken(User user)
        {
            var claims = user.UserRoles.Select(x => new Claim(ClaimTypes.Role, x.Role.Name)).ToList();
            claims.Add(new Claim(ClaimTypes.Name, user.Id.ToString()));
            claims.Add(new Claim(ClaimTypes.Email, user.Email));
            claims.Add(new Claim(ClaimTypes.GivenName, user.FirstName));
            claims.Add(new Claim(ClaimTypes.Surname, user.LastName));
            
            if (user.Patient != null)
            {
                claims.Add(new Claim(ClaimTypes.Upn, user.Patient.Id.ToString()));
            }
            if (user.Nutritionist != null)
            {
                claims.Add(new Claim(ClaimTypes.Actor, user.Nutritionist.Id.ToString()));
                claims.Add(new Claim(ClaimTypes.Spn, user.Nutritionist.Id.ToString()));
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                //Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        /// <summary>
        /// Creates a new User
        /// </summary>
        /// <param name="user"></param>
        public void CreateUser(User user)
        {
            if(user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            if (!String.IsNullOrEmpty(user.Password))
            {
                user.Password = PasswordHelper.GenerateSHA256tring(_appSettings.Secret + user.Password);
            }
            _context.Add(user);
        }

        /// <summary>
        /// Gets a list of all users
        /// </summary>
        /// <returns></returns>
        public IEnumerable<User> GetAllUsers()
        {
            return _context.Users
                .Include(x => x.Nutritionist)
                .Include(x => x.Patient)
                .Include(u => u.UserRoles).ThenInclude(ur => ur.Role).ToList();
        }

        /// <summary>
        /// Gets a user by email
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public User GetUserByEmail(string email)
        {
            return _context.Users.Include(x => x.Nutritionist)
                .Include(x => x.Patient).Include(x => x.UserRoles).ThenInclude(xr => xr.Role).FirstOrDefault(x => x.Email.Equals(email));
        }

        /// <summary>
        /// Gets a user by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<User> GetUserById(int id)
        {
            return await _context.Users.Include(x => x.Nutritionist)
                .Include(x => x.Patient).Include(x => x.UserRoles).ThenInclude(xr => xr.Role).FirstOrDefaultAsync(x => x.Id.Equals(id));
        }

        /// <summary>
        /// Method to save changes to the DB
        /// </summary>
        /// <returns></returns>
        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

        public void UpdateUser(User user)
        {
            // do nothing
        }

        public void DeactivateUser(User user)
        {
            _context.UserRoles.RemoveRange(user.UserRoles);
        }

        public IEnumerable<User> SearchUser(string searchQuery, Role role)
        {
            return null;
        }

        public async Task<bool> DeleteUser(int userId)
        {
            var user = await _context.Users
                .Include(x => x.UserRoles)
                .Include(x => x.Nutritionist)
                .Include(x => x.Patient)
                .FirstOrDefaultAsync(x => x.Id == userId);
            if(user.UserRoles != null)
            {
                _context.RemoveRange(user.UserRoles);
            }
            if (user.Nutritionist != null)
            {
                _context.Remove(user.Nutritionist);
            }
            if (user.Patient != null)
            {
                _context.Remove(user.Patient);
            }
            _context.Remove(user);
            return SaveChanges();
        }



        public async Task<Patient> GetPatient(int userId)
        {
            return  await _context.Patients
                .Include(u => u.User)
                .Include(u => u.PatientActivityHistories)
                .FirstOrDefaultAsync(x => x.UserId == userId);
        }

        public async Task<bool> DeletePatient(int userId)
        {
            var patient = await _context.Patients
                .Include(x => x.NutritionistPatientHistories)
                .Include(x => x.Nutritionist)
                .Include(x => x.PatientActivityHistories)
                .Include(x => x.PatientRecipes)
                .Include(x => x.Feedbacks)
                .FirstOrDefaultAsync(x => x.UserId == userId);

            if (patient.Feedbacks != null)
            {
                _context.RemoveRange(patient.Feedbacks);
            }
            if (patient.NutritionistPatientHistories != null)
            {
                _context.RemoveRange(patient.NutritionistPatientHistories);
            }
            if (patient.PatientActivityHistories != null)
            {
                _context.RemoveRange(patient.PatientActivityHistories);
            }
            if (patient.PatientRecipes != null)
            {
                _context.RemoveRange(patient.PatientRecipes);
            }
            _context.Remove(patient);
            return SaveChanges();

        }
    }
}
