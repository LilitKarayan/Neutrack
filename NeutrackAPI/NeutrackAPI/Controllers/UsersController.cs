using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NeutrackAPI.Data;
using NeutrackAPI.DTOs;
using NeutrackAPI.Models;
using NeutrackAPI.Helpers;
using NeutrackAPI.Data.IRepositories;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NeutrackAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;
        private readonly INutritionistRepository _nutritionistRepository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository,
            IRoleRepository roleRepository,
            INutritionistRepository nutritionistRepository,
            IMapper mapper)
        {
            _userRepository = userRepository;
            _roleRepository = roleRepository;
            _nutritionistRepository = nutritionistRepository;
            _mapper = mapper;
        }
        /// <summary>
        /// GET api/users
        /// </summary>
        /// <returns>A list of Users</returns>
        [Authorize(Roles = Roles.Admin + "," + Roles.Nutritionist)]
        [HttpGet]
        public ActionResult<IEnumerable<UserReadDTO>> GetUsers()
        {
            var userItems = _userRepository.GetAllUsers();
            return Ok(_mapper.Map<IEnumerable<UserReadDTO>>(userItems));
        }

        /// <summary>
        /// Gets all the nutritionists in the DB
        /// </summary>
        /// <returns></returns>
        [HttpGet, Route("nutritionists")]
        public ActionResult<IEnumerable<NutritionistReadDTO>> GetAllNutritionists()
        {
            var nutritionistItems = _nutritionistRepository.GetAllNutritionist();
            return Ok(_mapper.Map<IEnumerable<NutritionistReadDTO>>(nutritionistItems));
        }

        /// <summary>
        /// GET api/users/{id}
        /// </summary>
        /// <param name="id"></param>
        /// <returns>A user matching the id parameter</returns>
        [HttpGet("{id}", Name = "GetUserById")]
        public async Task<ActionResult> GetUserById(int id)
        {
            try
            {
                var currentUserId = int.Parse(User.Identity.Name);
                if (id != currentUserId && !User.IsInRole(Roles.Admin))
                {
                    return Forbid();
                }
                if (User.IsInRole(Roles.User))
                {
                    var patient = await _userRepository.GetPatient(id);
                    if (patient == null)
                    {
                        return NotFound();
                    }
                    return Ok(_mapper.Map<PatientReadDTO>(patient));
                }
                else
                {
                    var userItem = await _userRepository.GetUserById(id);
                    if (userItem == null)
                    {
                        return NotFound();
                    }
                    return Ok(_mapper.Map<UserReadDTO>(userItem));
                }
                
                

            }
            catch (Exception)
            {
                return StatusCode(500);
            }

        }

        /// <summary>
        /// Register a new User with user role
        /// </summary>
        /// <param name="userCreateDTO"></param>
        /// <returns>The new created User</returns>
        [AllowAnonymous]
        [HttpPost, Route("newuser")]
        public ActionResult<UserReadDTO> RegisterUser(PatientCreateDTO userCreateDTO)
        {
            try
            {
                var patientModel = _mapper.Map<Patient>(userCreateDTO);
                var userModel = _mapper.Map<User>(userCreateDTO);
                var roleModel = _roleRepository.GetRoleByName(Roles.User);
                var existingUser = _userRepository.GetUserByEmail(userModel.Email);
                patientModel.User = userModel;
                if (existingUser != null)
                {
                    return BadRequest(new {message = "Email has already been taken" });
                }
                userModel.UserRoles = new List<UserRole>
                {
                    new UserRole
                    {
                        User = userModel,
                        Role = roleModel,
                    },
                };
                patientModel.PatientActivityHistories = new List<PatientActivityHistory>
                {
                   new PatientActivityHistory
                   {
                     Patient = patientModel,
                     Weight = userCreateDTO.Weight,
                     CreatedDate = DateTime.UtcNow
                   }
                };
                userModel.Patient = patientModel;
                _userRepository.CreateUser(userModel);
                _userRepository.SaveChanges();
                var userReadDTO = _mapper.Map<UserReadDTO>(userModel);
                return CreatedAtRoute(nameof(GetUserById), new { userReadDTO.Id }, userReadDTO);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        /// <summary>
        /// Register a new User with user role
        /// </summary>
        /// <param name="userCreateDTO"></param>
        /// <returns>The new created User</returns>
        [AllowAnonymous]
        [HttpPost, Route("newnutritionist")]
        public ActionResult<UserReadDTO> RegisterNutritionist(NutritionistCreateDTO nutritionistCreateDTO)
        {
            try
            {
                var nutritionistModel = _mapper.Map<Nutritionist>(nutritionistCreateDTO);
                var userModel = _mapper.Map<User>(nutritionistCreateDTO);
                var roleModel = _roleRepository.GetRoleByName(Roles.Nutritionist);
                var existingUser = _userRepository.GetUserByEmail(userModel.Email);
                nutritionistModel.User = userModel;
                
                if (existingUser != null)
                {
                    return BadRequest(new { message = "Email has already been taken" });
                }
                userModel.UserRoles = new List<UserRole>
                {
                    new UserRole
                    {
                        User = userModel,
                        Role = roleModel,
                    },
                };
                userModel.Nutritionist = nutritionistModel;
                _userRepository.CreateUser(userModel);
                _userRepository.SaveChanges();
                var userReadDTO = _mapper.Map<UserReadDTO>(userModel);
                return CreatedAtRoute(nameof(GetUserById), new { userReadDTO.Id }, userReadDTO);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        /// <summary>
        /// Register a new User with user role
        /// </summary>
        /// <param name="userCreateDTO"></param>
        /// <returns>The new created User</returns>
        [AllowAnonymous]
        [HttpPost, Route("newadmin")]
        public ActionResult<UserReadDTO> RegisterAdmin(UserCreateDTO userCreateDTO)
        {
            try
            {
                var userModel = _mapper.Map<User>(userCreateDTO);
                var roleModel = _roleRepository.GetRoleByName(Roles.Admin);
                var existingUser = _userRepository.GetUserByEmail(userModel.Email);
                if (existingUser != null)
                {
                    return BadRequest(new { message = "Email has already been taken" });
                }
                userModel.UserRoles = new List<UserRole>
                {
                    new UserRole
                    {
                        User = userModel,
                        Role = roleModel,
                    },
                };
                _userRepository.CreateUser(userModel);
                _userRepository.SaveChanges();
                var userReadDTO = _mapper.Map<UserReadDTO>(userModel);
                return CreatedAtRoute(nameof(GetUserById), new { userReadDTO.Id }, userReadDTO);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Allows a user to update their information
        /// </summary>
        /// <param name="userUpdate"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<ActionResult<UserReadDTO>> UpdateUserAsync(int id, PatientCreateDTO userUpdate)
        {
            try
            {

                var currentUserId = int.Parse(User.Identity.Name);
                if (id != currentUserId)
                {
                    return Forbid();
                }
                if (!User.IsInRole(Roles.User))
                {
                   return Forbid();
                }
                var userItem = await _userRepository.GetUserById(id);
                if (userItem == null)
                {
                    return NotFound();
                }
                PatientActivityHistory patientActivityHistory = null;
                if (userUpdate.Weight != userItem.Patient.Weight)
                {
                    patientActivityHistory = new PatientActivityHistory();
                    patientActivityHistory.Weight = userUpdate.Weight;
                    patientActivityHistory.PatientId = userItem.Patient.Id;
                    patientActivityHistory.CreatedDate = DateTime.UtcNow;
                    _nutritionistRepository.AddNewPatientActivityHistory(patientActivityHistory);
                }
                userItem.FirstName = userUpdate.FirstName;
                userItem.LastName = userUpdate.LastName;
                userItem.Email = userUpdate.Email;
                userItem.Gender = userUpdate.Gender;
                userItem.PhoneNumber = userUpdate.PhoneNumber;
                userItem.DateOfBirth = userUpdate.DateOfBirth;
                _mapper.Map(userUpdate, userItem.Patient);
                _userRepository.UpdateUser(userItem);
                _userRepository.SaveChanges();
                return Ok(_mapper.Map<UserReadDTO>(userItem));
            }
            catch(Exception ex)
            {
                return StatusCode(500, new { message = ex.Message});
            }
        }

        /// <summary>
        /// This will deactivate a user by setting IsActive to false
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var currentUserId = int.Parse(User.Identity.Name);
                //var patientId = int.Parse(User.FindFirstValue(ClaimTypes.Upn));
                if (id != currentUserId && !User.IsInRole(Roles.Admin))
                {
                    return Forbid();
                }
                var userItem = await _userRepository.GetUserById(id);
                if (userItem == null)
                {
                    return NotFound();
                }
                var result = await _userRepository.DeleteUser(currentUserId);
                if (result) 
                {
                    return Accepted(new { message = "Your account has been deleted successfully" });
                }
                else
                {
                    return UnprocessableEntity(new { message = "Your account has been deleted successfully" });
                }


            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        /// <summary>
        /// Authenticates User
        /// </summary>
        /// <param name="userAuth"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost, Route("login")]
        public ActionResult<AuthResponseDTO> Login(AuthRequestDTO userAuth)
        {
            try
            {
                var user = _userRepository.AuthenticateUser(userAuth);
                if(user == null)
                {
                    return BadRequest(new { message = "Username or password is incorrect" });
                }
                if (user.Roles.Contains("Nutritionist") && !user.IsActiveNutritionist)
                {
                    return Forbid();
                }
                if (user.Roles.Contains("User") && !user.IsActiveUser)
                {
                    return Forbid();
                }
                return Ok(user);
            }
            catch(Exception ex){
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet, Route("signedinuser")]
        public ActionResult<UserReadDTO> GetAuthenticatedUser()
        {
            try
            {
                var currentUserId = int.Parse(User.Identity.Name);
                var userItem = _userRepository.GetUserById(currentUserId);
                if (userItem == null)
                {
                    return NotFound();
                }
                return Ok(_mapper.Map<UserReadDTO>(userItem));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }
    }
}
