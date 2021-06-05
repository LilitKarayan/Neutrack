using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NeutrackAPI.Data;
using NeutrackAPI.DTOs;
using NeutrackAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NeutrackAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }
        /// <summary>
        /// GET api/users
        /// </summary>
        /// <returns>A list of Users</returns>
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
        [HttpGet("{id}")]
        public ActionResult<UserReadDTO> GetUserById(int id)
        {
            try
            {
                var userItem = _userRepository.GetUserById(id);
                if(userItem != null)
                {
                    return Ok(_mapper.Map< UserReadDTO>(userItem));
                }
                return NotFound();
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
            
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
