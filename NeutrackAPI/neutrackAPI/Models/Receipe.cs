using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NeutrackAPI.Models
{
    public class Receipe 
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Instruction { get; set; }

        // Navigation Properties
        public List<ReceipeProduct> ReceipeProducts { get; set; }

    }
}
