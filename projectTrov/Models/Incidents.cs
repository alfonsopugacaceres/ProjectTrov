using System;
using Microsoft.EntityFrameworkCore;
namespace Models{
    public class Incident
    {
        public int Id {get;set;}
        public string Vin {get;set;}
        public string IncidentDate {get;set;}
        public string Note {get;set;}
        public string MakeModel {get;set;}
        public string VinYear{get;set;}
    }

}