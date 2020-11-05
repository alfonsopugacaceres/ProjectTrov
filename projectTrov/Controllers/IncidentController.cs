
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Context;
using System;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Text.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Collections.Generic;
using System.Linq;

namespace projectTrov.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IncidentController : ControllerBase
    {
        

        private readonly ILogger<IncidentController> _logger;
        private readonly DefaultContext _context; 
        private enum Fields {
            Model = 28,
            ModelYear = 29
        }

        public IncidentController(ILogger<IncidentController> logger, DefaultContext context)
        {
            _logger = logger;
            _context = context;
            }

        
        [HttpGet()]
        public async Task<IList<Incident>> GetAll()
        {
            return await _context.Incidents.ToListAsync();
        }

        [HttpGet("{vin}")]
        public async Task<Incident> Get(string vin)
        {
            return await _context.Incidents.FindAsync(vin);
        }

        [HttpPost()]
        public async Task<int> InsertIncident(Incident incident)
        {
            Incident decodedIncident = await ValidateDecodeNewIncident(incident);
            if(decodedIncident != null){
                _context.Incidents.Add(incident);
                try
                {
                    return await _context.SaveChangesAsync();
                }
                catch (Exception ex){
                    Console.WriteLine(ex);
                    return -1;
                }
            }
            else{
                return 0;
            }
            
        }


        private async Task<Incident> ValidateDecodeNewIncident(Incident incident){
            if(incident == null)
                return null;
            else{
                if(incident.Vin != null || incident.Vin != string.Empty){
                    // Incident foundIncident = await _context.Incidents.FindAsync(incident.Vin);
                    // if(foundIncident != null)
                    //     return null;//cannot insert same vin
                    // else{
                    string url = "https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/" + incident.Vin + "?format=json";
                    NHTSResponse parsedResponse = null;
                    HttpResponseMessage httpResponse = null;
                    string parsedHttpMessage = string.Empty;
                    try{
                        using (var client = new HttpClient()){
                            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                            httpResponse = await client.GetAsync(url);
                            parsedHttpMessage = await httpResponse.Content.ReadAsStringAsync(); 
                        }
                    }
                    catch(Exception ex){
                        Console.WriteLine(ex);
                    }

                    try{
                            parsedResponse = JsonSerializer.Deserialize<NHTSResponse>(parsedHttpMessage);
                    }
                    catch(Exception ex){
                        Console.WriteLine(ex);
                    }

                    RetriveWantedFields(incident, parsedResponse);

                    return incident;
                }
            }
            return null;
        }

        /* 
        <summary>
         The purpose of this function is to provide an easy way to expand Incident information in the future.
         The service used to decode VIN numbers retrieves a large payload of data.
         </summary>   
        */      
        private void RetriveWantedFields(Incident incident, NHTSResponse nhtsResponse){
            IDictionary<int,NHTSResult> data = new Dictionary<int,NHTSResult>();
            data = nhtsResponse.Results.ToDictionary(x => x.VariableId, x => x);
            var fields = Enum.GetValues(typeof(Fields));
            foreach(Fields target in fields){
                int targetInt = (int)target;
                switch(target){
                    case Fields.Model:
                        if(data.ContainsKey(targetInt))
                            incident.MakeModel = data[targetInt].Value;
                        else
                            incident.MakeModel = string.Empty;
                    break;
                    case Fields.ModelYear:
                        if(data.ContainsKey(targetInt))
                            incident.VinYear = data[targetInt].Value;
                        else
                            incident.VinYear = string.Empty;
                    break;
                }
            }
        }
    }
}
