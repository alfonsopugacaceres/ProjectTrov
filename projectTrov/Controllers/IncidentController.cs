
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AppModels;
using Context;
using System;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace projectTrov.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IncidentController : ControllerBase
    {
        

        private readonly ILogger<IncidentController> _logger;
        private readonly DefaultContext _context; 
        private VinController _vinController;
        public IncidentController(ILogger<IncidentController> logger, DefaultContext context)
        {
            _logger = logger;
            _context = context;
            _vinController = new VinController(_context);
            
        }

        
        [HttpGet()]
        public async Task<IList<Incident>> GetAll()
        {
            return await _context.Incidents.Include(v => v.Vin).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<Incident> Get(string id)
        {
            return await _context.Incidents.Include(f => f.Vin).FirstOrDefaultAsync(f => f.Id == Convert.ToInt32(id));
        }

        [HttpPost("Seed")]
        public async Task<int> SeedInitialData(IList<Incident> incidents)
        {
            foreach(Incident incident in incidents){
                VIN targetVin = await _vinController.GetInsertVin(incident.VinNumber);
                incident.Vin = targetVin;
                _context.Incidents.Add(incident);
            }

            try
            {
                return await _context.SaveChangesAsync();
            }
            catch (Exception ex){
                Console.WriteLine(ex);
                return -1;
            }
            
        }

        [HttpPost()]
        public async Task<int> InsertIncident(Incident incident)
        {
            if(incident.Id > 0){
                return -1;
            }
            else{
                VIN targetVin = await _vinController.GetInsertVin(incident.VinNumber);
                incident.Vin = targetVin;
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
        }
    }
}
