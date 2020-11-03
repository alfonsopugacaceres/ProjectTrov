using System;

namespace Models{
    public class Incident
    {
        public string Vin {get;set;}
        public DateTime? IncidentDate {get;set;}
        public string Note {get;set;}
        public string MakeModel {get;set;}
        public DateTime? VinYear{get;set;}
    }

}