namespace AppModels{
    public class IncidentPayload
    {
        public int Id {get;set;}
        public string VinNumber {get;set;}

        public string IncidentDate {get;set;}
        public string Note {get;set;}

        public IncidentPayload(){
        }
    }

}