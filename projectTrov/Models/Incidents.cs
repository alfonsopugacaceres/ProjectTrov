namespace AppModels{
    public class Incident
    {
        public int Id {get;set;}
        public string VinNumber {get;set;}

        public virtual VIN Vin {get;set;}

        public string IncidentDate {get;set;}
        public string Note {get;set;}

        public Incident(){
            Vin = new VIN();
        }
        public Incident(VIN vin, string incidentDate, string note){
            Vin = vin;
            IncidentDate = incidentDate;
            Note = note;
        }
    }

}