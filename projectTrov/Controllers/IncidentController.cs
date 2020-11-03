
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Context;
using System;
using System.Threading.Tasks;
using System.Net;
using System.Text.Json;

namespace projectTrov.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IncidentController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<IncidentController> _logger;
        private readonly DefaultContext _context;

        public IncidentController(ILogger<IncidentController> logger, DefaultContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet("{id}")]
        public Incident Get(string id)
        {
            return null;
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
                    Incident foundIncident = await _context.Incidents.FindAsync(incident.Vin);
                    if(foundIncident != null)
                        return null;//cannot insert same vin
                }
                else{
                    string url = "https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/{" + incident.Vin + "}?format=json";
                    string method = "GET";
                    NHTSResponse parsedResponse = new NHTSResponse();
                    
                    using (var client = new WebClient()){
                        client.Headers[HttpRequestHeader.ContentType] = "application/json";
                        var response = await client.UploadStringTaskAsync(url, method);
                        parsedResponse = JsonSerializer.Deserialize<NHTSResponse>(response);
                    }
                    
                    return incident;
                }
            }
            return null;
        }
        
    }
}
