    
using System.Collections.Generic;

    namespace AppModels{

        public class VIN
        {
            public string VinNumber {get;set;}
            public string Make {get;set;}
            public string Model {get;set;}
            public string VinYear{get;set;}
            public virtual ICollection<Incident> Incidents {get;set;}

            public VIN(){
            }

            public VIN(string vin, string make, string model, string vinyear){
                VinNumber = vin;
                Make = make;
                Model = model;
                VinYear = vinyear;
            }
        }
    }