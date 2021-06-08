using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NeutrackAPI.Models
{
    public class Feedback
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Subject { get; set; }

        [Required]
        [MaxLength(250)]
        public string Message { get; set; }

        public DateTime SubmittedDate { get; set; }

        [Required]
        public double Rating { get; set; }

        
        public int FeedbackFromId { get; set; }

        public User FeedbackFrom { get; set; }

        
        public int FeedbackToId { get; set; }

        public User FeedbackTo { get; set; }


    }
}
