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
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository,
            IRoleRepository roleRepository,
            IMapper mapper)
        {
            _userRepository = userRepository;
            _roleRepository = roleRepository;
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
        /// GET api/users/{id}
        /// </summary>
        /// <param name="id"></param>
        /// <returns>A user matching the id parameter</returns>
        [HttpGet("{id}", Name = "GetUserById")]
        public ActionResult<UserReadDTO> GetUserById(int id)
        {
            try
            {
                var currentUserId = int.Parse(User.Identity.Name);
                if (id != currentUserId && !User.IsInRole(Roles.Admin))
                {
                    return Forbid();
                }
                    
                var userItem = _userRepository.GetUserById(id);
                if(userItem == null)
                {
                    return NotFound();
                }
                return Ok(_mapper.Map<UserReadDTO>(userItem));

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
        public ActionResult<UserReadDTO> RegisterUser(UserCreateDTO userCreateDTO)
        {
            try
            {

                var userModel = _mapper.Map<User>(userCreateDTO);
                var roleModel = _roleRepository.GetRoleByName(Roles.User);
                var existingUser = _userRepository.GetUserByEmail(userModel.Email);
                if (existingUser != null && existingUser.UserRoles.Any(x => x.RoleId == roleModel.Id))
                {
                    throw new Exception("Email has already been taken");
                }else if(existingUser != null && !existingUser.UserRoles.Any(x => x.RoleId == roleModel.Id))
                {
                    return StatusCode(403, new { message = "User exists but has a different role" });
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
        /// Register a new User with user role
        /// </summary>
        /// <param name="userCreateDTO"></param>
        /// <returns>The new created User</returns>
        [AllowAnonymous]
        [HttpPost, Route("newnutritionist")]
        public ActionResult<UserReadDTO> RegisterNutritionist(UserCreateDTO userCreateDTO)
        {
            try
            {
                var userModel = _mapper.Map<User>(userCreateDTO);
                var roleModel = _roleRepository.GetRoleByName(Roles.Nutritionist);
                var existingUser = _userRepository.GetUserByEmail(userModel.Email);
                if (existingUser != null && existingUser.UserRoles.Any(x => x.RoleId == roleModel.Id))
                {
                    throw new Exception("Email has already been taken");
                }
                else if (existingUser != null && !existingUser.UserRoles.Any(x => x.RoleId == roleModel.Id))
                {
                    return StatusCode(403, new { message = "User exists but has a different role" });
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
                if (existingUser != null && existingUser.UserRoles.Any(x => x.RoleId == roleModel.Id))
                {
                    throw new Exception("Email has already been taken");
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
        public ActionResult<UserReadDTO> UpdateUser(int id, UserCreateDTO userUpdate)
        {
            try
            {
                var currentUserId = int.Parse(User.Identity.Name);
                if (id != currentUserId)
                {
                    return Forbid();
                }
                var userItem = _userRepository.GetUserById(id);
                if (userItem == null)
                {
                    return NotFound();
                }
                _mapper.Map(userUpdate, userItem);
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
        public ActionResult Delete(int id)
        {
            try
            {
                var currentUserId = int.Parse(User.Identity.Name);
                if(id != currentUserId && !User.IsInRole(Roles.Admin))
                {
                    return Forbid();
                }
                var userItem = _userRepository.GetUserById(id);
                if (userItem == null)
                {
                    return NotFound();
                }
                _userRepository.DeactivateUser(userItem);
                userItem.IsActive = false;
                _userRepository.SaveChanges();
                return NoContent();

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
                return Ok(user);
            }
            catch(Exception ex){
                return StatusCode(500, new { Error = ex.Message });
            }
        }
    }
}
