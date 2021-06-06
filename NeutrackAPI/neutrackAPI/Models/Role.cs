using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NeutrackAPI.Models
{
    public class Role
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Name { get; set; }

        public List<User> Users {get; set;}
    }
}