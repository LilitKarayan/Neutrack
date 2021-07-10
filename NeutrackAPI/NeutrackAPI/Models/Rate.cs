using System;
using System.Collections.Generic;

namespace NeutrackAPI.Models
{
    public class Rate
    {
        public int Id { get; set; }

        public int RateTypeId { get; set; }

        public RateType RateType { get; set; }

        public double Charge { get; set; }

        public double ServiceChargePercentage { get; set; }

        public List<NutritionistRate> NutritionistRates { get; set; }
    }
}
