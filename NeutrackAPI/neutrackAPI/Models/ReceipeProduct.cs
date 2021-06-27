using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NeutrackAPI.Models
{
    public class ReceipeProduct 
    {
        public int ReceipeID { get; set; }

        public Receipe Receipe { get; set; }

        public int ProductID { get; set; }

        public Product Product { get; set; }

        [Required]
        public double WeightInGrams { get; set; }


    }
}