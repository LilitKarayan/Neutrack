using System;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NeutrackAPI.Data;
using NeutrackAPI.DTOs;
using NeutrackAPI.Models;
using NeutrackAPI.Helpers;
using NeutrackAPI.Data.IRepositories;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.JsonPatch;
using System.Threading.Tasks;

namespace NeutrackAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class NutritionistsController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;
        private readonly INutritionistRepository _nutritionistRepository;
        private readonly IMapper _mapper;

        public NutritionistsController(IUserRepository userRepository,
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
        /// Adds a new patient to the nutritionist list
        /// </summary>
        /// <param name="userCreateDTO"></param>
        /// <returns></returns>
        [Authorize(Roles = Roles.Nutritionist)]
        [HttpPost, Route("addpatient")]
        public ActionResult<UserReadDTO> AddPatient(PatientCreateDTO userCreateDTO)
        {
            try
            {
                var currentUserId = int.Parse(User.Identity.Name);
                var currentNutritionistId = int.Parse(User.FindFirstValue(ClaimTypes.Spn));
                if (!User.IsInRole(Roles.Nutritionist))
                {
                    return Forbid();
                }

                var patientModel = _mapper.Map<Patient>(userCreateDTO);
                var userModel = _mapper.Map<User>(userCreateDTO);
                var roleModel = _roleRepository.GetRoleByName(Roles.User);
                var existingUser = _userRepository.GetUserByEmail(userModel.Email);
                if (existingUser != null)
                {
                    return UnprocessableEntity("Email has been taken");
                }
                patientModel.User = userModel;
                patientModel.NutritionistId = currentNutritionistId;
                patientModel.NutritionistPatientHistories = new List<NutritionistPatientHistory>
                {
                    new NutritionistPatientHistory
                    {
                        NutritionistId = currentNutritionistId,
                        Patient = patientModel
                    }
                };
                if (userCreateDTO.Weight > 0)
                {
                    patientModel.PatientActivityHistories = new List<PatientActivityHistory>
                    {
                        new PatientActivityHistory
                        {
                            Patient = patientModel,
                            Weight = userCreateDTO.Weight,
                            CreatedDate = DateTime.UtcNow
                        }
                    };
                }
                userModel.UserRoles = new List<UserRole>
                {
                    new UserRole
                    {
                        User = userModel,
                        Role = roleModel,
                    },
                };
                userModel.Patient = patientModel;
                _userRepository.CreateUser(userModel);
                _userRepository.SaveChanges();
                var userReadDTO = _mapper.Map<UserReadDTO>(userModel);
                return CreatedAtRoute(nameof(UsersController.GetUserById), new { userReadDTO.Id }, userReadDTO);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        /// <summary>
        /// Get all the patients of the nutritionist
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize(Roles = Roles.Nutritionist)]
        [HttpGet]
        [Route("{id}/patients")]
        public ActionResult<IEnumerable<AllPatientReadDTO>> GetPatients(int id)
        {
            try
            {
                var currentUserId = int.Parse(User.Identity.Name);
                var currentNutritionistId = int.Parse(User.FindFirstValue(ClaimTypes.Spn));
                if (!User.IsInRole(Roles.Nutritionist))
                {
                    return Forbid();
                }
                if (currentNutritionistId != id)
                {
                    return Forbid();
                }
                var patients = _nutritionistRepository.GetAllNutritionistPatients(currentNutritionistId);
                return Ok(_mapper.Map<IEnumerable<AllPatientReadDTO>>(patients));

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Server error" + Environment.NewLine + "Unable to proccess request." }); 
            }
        }


        /// <summary>
        /// search patients by firstname, last name or email
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize(Roles = Roles.Nutritionist)]
        [HttpGet]
        [Route("search/patients")]
        public  async Task<ActionResult> SearchPatient([FromQuery]string q)
        {
            try
            {
                var currentUserId = int.Parse(User.Identity.Name);
                var currentNutritionistId = int.Parse(User.FindFirstValue(ClaimTypes.Spn));
                if (!User.IsInRole(Roles.Nutritionist))
                {
                    return Forbid();
                }
               
                var patients = await _nutritionistRepository.SearchPatient(q, currentUserId);
                return Ok(_mapper.Map<IEnumerable<AllPatientReadDTO>>(patients));

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Server error" + Environment.NewLine + "Unable to proccess request." }); 
            }
        }

        /// <summary>
        /// GET a patient by ID
        /// </summary>
        /// <param name="id"></param>
        /// <param name="patientId"></param>
        /// <returns></returns>
        [Authorize(Roles = Roles.Nutritionist)]
        [HttpGet]
        [Route("{id}/patients/{patientId}")]
        public ActionResult<PatientReadDTO> GetPatientById(int id, int patientId)
        {
            try
            {
                var currentUserId = int.Parse(User.Identity.Name);
                var currentNutritionistId = int.Parse(User.FindFirstValue(ClaimTypes.Spn));
                if (!User.IsInRole(Roles.Nutritionist))
                {
                    return Forbid();
                }
                if (currentNutritionistId != id)
                {
                    return Forbid();
                }
                var patient = _nutritionistRepository.GetNutritionistPatientById(patientId, currentNutritionistId);
                if(patient == null)
                {
                    return NotFound(new { message = "Patient was not found in your list." });
                }
                return Ok(_mapper.Map<PatientReadDTO>(patient));

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Server error" + Environment.NewLine + "Unable to proccess request." });
            }
        }

        /// <summary>
        /// Get data to display on dashboard
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}/dashboard")]
        public ActionResult<DashboardViewModel> GetNutritionistDashboardData(int id)
        {
            try
            {
                var currentUserId = int.Parse(User.Identity.Name);
                var currentNutritionistId = int.Parse(User.FindFirstValue(ClaimTypes.Spn));
                if (!User.IsInRole(Roles.Nutritionist))
                {
                    return Forbid();
                }
                if (currentNutritionistId != id)
                {
                    return Forbid();
                }
                var dashboardData = _nutritionistRepository.GetNutritionistDashboardData(id);
                return Ok(dashboardData);
            } catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        /// <summary>
        /// GET api/users/{id}
        /// </summary>
        /// <param name="id"></param>
        /// <returns>A user matching the id parameter</returns>
        [HttpGet("{id}", Name = "GetNutritionistById")]
        public ActionResult<NutritionistReadDTO> GetNutritionistById(int id)
        {
            try
            {
                var nutritionistItem = _nutritionistRepository.GetNutritionistById(id);
                if (nutritionistItem == null)
                {
                    return NotFound();
                }
                return Ok(_mapper.Map<NutritionistReadDTO>(nutritionistItem));

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }


        /// <summary>
        /// Remove a patient from 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="patientId"></param>
        /// <returns></returns>
        [Authorize(Roles = Roles.Nutritionist)]
        [HttpDelete]
        [Route("{id}/patients/{patientId}")]
        public ActionResult<IEnumerable<PatientReadDTO>> DeletePatient(int id, int patientId)
        {
            try
            {
                var currentUserId = int.Parse(User.Identity.Name);
                var currentNutritionistId = int.Parse(User.FindFirstValue(ClaimTypes.Spn));
                if (!User.IsInRole(Roles.Nutritionist))
                {
                    return Forbid();
                }
                if (currentNutritionistId != id)
                {
                    return Forbid();
                }
                var patient = _nutritionistRepository.GetNutritionistPatientById(patientId, currentNutritionistId);
                if(patient == null)
                {
                    return NotFound(new { message = "Patient not found" });
                }
                patient.NutritionistId = null;
                var result = _nutritionistRepository.SaveChanges();
                if (result)
                {
                    var patients = _nutritionistRepository.GetAllNutritionistPatients(currentNutritionistId);
                    return Ok(_mapper.Map<IEnumerable<PatientReadDTO>>(patients));
                }
                
                return StatusCode(412, new { message = "Unable to delete patient. Try again later"});
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Server error" + Environment.NewLine + "Unable to proccess request." }); 
            }
        }

        /// <summary>
        /// Remove a patient from 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="patientId"></param>
        /// <returns></returns>
        [Authorize(Roles = Roles.Nutritionist)]
        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> DeleteAccount(int id)
        {
            try
            {
                var currentUserId = int.Parse(User.Identity.Name);
                var currentNutritionistId = int.Parse(User.FindFirstValue(ClaimTypes.Spn));
                if (!User.IsInRole(Roles.Nutritionist))
                {
                    return Forbid();
                }
                if (currentNutritionistId != id)
                {
                    return Forbid();
                }
                var nutritionist = _nutritionistRepository.GetNutritionistById(currentNutritionistId);
                if (nutritionist == null)
                {
                    return NotFound(new { message = "Nutritionist not found" });
                }
                if (!nutritionist.IsActive)
                {
                    return UnprocessableEntity(new { message = "This account does not exist" });
                }
                var result = await _nutritionistRepository.DeleteNutritionist(currentNutritionistId);
                if (result)
                {
                    var isUserDeleted = await _userRepository.DeleteUser(currentUserId);
                    if (isUserDeleted)
                    {
                        return Accepted(new { message = "Your account has been deleted successfully" });
                    }
                    else
                    {
                        return UnprocessableEntity(new { message = "Your cannot be deleted." });
                    }
                }

                return StatusCode(412, new { message = "Unable to delete account. Try again later" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Server error" + Environment.NewLine + "Unable to proccess request." }); 
            }
        }


        /// <summary>
        /// Updating a patient
        /// </summary>
        /// <param name="id"></param>
        /// <param name="patientId"></param>
        /// <returns></returns>
        [Authorize(Roles = Roles.Nutritionist)]
        [HttpPut]
        [Route("{id}/patients/{patientId}/update")]
        public ActionResult<PatientReadDTO> UpdatePatient(int id, int patientId, PatientCreateDTO patientDto)
        {
            try
            {
                PatientActivityHistory patientActivityHistory = null;
                var currentUserId = int.Parse(User.Identity.Name);
                var currentNutritionistId = int.Parse(User.FindFirstValue(ClaimTypes.Spn));
                if (!User.IsInRole(Roles.Nutritionist))
                {
                    return Forbid();
                }
                if (currentNutritionistId != id)
                {
                    return Forbid();
                }
                var patient = _nutritionistRepository.GetNutritionistPatientById(patientId, currentNutritionistId);
                if (patient == null)
                {
                    return NotFound(new { message = "Patient not found" });
                }
                if(patientDto.Weight != patient.Weight)
                {
                    patientActivityHistory = new PatientActivityHistory();
                    patientActivityHistory.Weight = patientDto.Weight;
                    patientActivityHistory.PatientId = patient.Id;
                    patientActivityHistory.CreatedDate = DateTime.UtcNow;
                    _nutritionistRepository.AddNewPatientActivityHistory(patientActivityHistory);
                }
                patient.User.FirstName = patientDto.FirstName;
                patient.User.LastName = patientDto.LastName;
                patient.User.Gender = patientDto.Gender;
                patient.User.PhoneNumber = patientDto.PhoneNumber;
                patient.User.DateOfBirth = patientDto.DateOfBirth;
                _mapper.Map(patientDto, patient);
                _nutritionistRepository.SaveChanges();
                return Ok(_mapper.Map<PatientReadDTO>(patient));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Server error" + Environment.NewLine + "Unable to proccess request." }); 
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="userUpdate"></param>
        /// <returns></returns>
        [Authorize(Roles = Roles.Admin + "," + Roles.Nutritionist)]
        [HttpPut("{id}")]
        public ActionResult<UserReadDTO> UpdateNutritionist(int id, NutritionistCreateDTO nutritionistUpdate)
        {
            try
            {
                var currentUserId = int.Parse(User.Identity.Name);
                var currentNutritionistId = int.Parse(User.FindFirstValue(ClaimTypes.Spn));
                if (id != currentNutritionistId && !User.IsInRole(Roles.Admin))
                {
                    return Forbid();
                }
                var nutritionist = _nutritionistRepository.GetNutritionistById(id);
                if (nutritionist == null)
                {
                    return NotFound();
                }
                nutritionist.User.FirstName = nutritionistUpdate.FirstName;
                nutritionist.User.LastName = nutritionistUpdate.LastName;
                nutritionist.User.Gender = nutritionistUpdate.Gender;
                nutritionist.User.PhoneNumber = nutritionistUpdate.PhoneNumber;
                nutritionist.User.DateOfBirth = nutritionistUpdate.DateOfBirth;
              
                _mapper.Map(nutritionistUpdate, nutritionist);
                _nutritionistRepository.SaveChanges();
                return Ok(_mapper.Map<NutritionistReadDTO>(nutritionist));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        /// <summary>
        /// Patch patient
        /// </summary>
        /// <param name="id"></param>
        /// <param name="patientId"></param>
        /// <param name="patientPatchDocument"></param>
        /// <returns></returns>
        [Authorize(Roles = Roles.Nutritionist)]
        [HttpPatch]
        [Route("{id}/patients/{patientId}/update")]
        public ActionResult<PatientReadDTO> PatchPatient(int id, int patientId, [FromBody] JsonPatchDocument<UserPatchDTO> patientPatchDocument )
        {
            try
            {
                PatientActivityHistory patientActivityHistory = null;
                var currentUserId = int.Parse(User.Identity.Name);
                var currentNutritionistId = int.Parse(User.FindFirstValue(ClaimTypes.Spn));
                if (!User.IsInRole(Roles.Nutritionist))
                {
                    return Forbid();
                }
                if (currentNutritionistId != id)
                {
                    return Forbid();
                }
                var patient = _nutritionistRepository.GetNutritionistPatientById(patientId, currentNutritionistId);
                if (patient == null)
                {
                    return NotFound(new { message = "Patient not found" });
                }
                var currentWeight = patient.Weight;
                var patientToPatch = _mapper.Map<UserPatchDTO>(patient);
                patientPatchDocument.ApplyTo(patientToPatch, ModelState);
                if (!TryValidateModel(patientToPatch))
                {
                    return ValidationProblem(ModelState);
                }
                if(currentWeight != patientToPatch.Weight)
                {
                    patientActivityHistory = new PatientActivityHistory();
                    patientActivityHistory.Weight = patientToPatch.Weight;
                    patientActivityHistory.PatientId = patient.Id;
                    patientActivityHistory.CreatedDate = DateTime.UtcNow;
                    _nutritionistRepository.AddNewPatientActivityHistory(patientActivityHistory);
                }
                _mapper.Map(patientToPatch, patient);
                _nutritionistRepository.SaveChanges();
                return NoContent();
            }
            catch(Exception ex)
            {
                return StatusCode(500, new { message = "Server error" + Environment.NewLine + "Unable to proccess request." }); 
            }
        }


        /// <summary>
        /// Adds an existing patient to the nutritionist list
        /// </summary>
        /// <param name="patientId"></param>
        /// <returns></returns>
        [Authorize(Roles = Roles.Nutritionist)]
        [HttpPost, Route("addpatient/{patientId}")]
        public async Task<ActionResult> AddExistingPatient(int patientId)
        {
            try
            {
                var currentUserId = int.Parse(User.Identity.Name);
                var currentNutritionistId = int.Parse(User.FindFirstValue(ClaimTypes.Spn));
                if (!User.IsInRole(Roles.Nutritionist))
                {
                    return Forbid();
                }

                var user = await _userRepository.GetUserById(patientId);
                if(user.Patient.NutritionistId != null )
                {
                    return Forbid();
                }
                user.Patient.NutritionistId = currentNutritionistId;
                if(user.Patient.PatientActivityHistories == null || user.Patient.PatientActivityHistories.Count < 1)
                {
                    user.Patient.PatientActivityHistories = new List<PatientActivityHistory>
                    {
                        new PatientActivityHistory
                        {
                            Patient = user.Patient,
                            Weight = (double)user.Patient.Weight,
                            CreatedDate = DateTime.UtcNow
                        }
                    };
                }
                user.Patient.NutritionistPatientHistories = new List<NutritionistPatientHistory>
                {
                    new NutritionistPatientHistory
                    {
                        NutritionistId = currentNutritionistId,
                        Patient = user.Patient
                    }
                };
                _nutritionistRepository.SaveChanges();
                return Ok();

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Server error" + Environment.NewLine + "Unable to proccess request." });
            }
        }


    }


}
