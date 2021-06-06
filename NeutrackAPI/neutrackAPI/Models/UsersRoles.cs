using System;
using System.ComponentModel.DataAnnotations;

namespace NeutrackAPI.Models
{
    public class UsersRoles
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }
        [Required]
        public User User {get; set;}
        
        [Required]
        public int RoleId { get; set; }
        [Required]
        public Role Role {get; set;}
    }
}