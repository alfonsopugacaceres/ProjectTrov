
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AppModels;
using Context;
using System;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
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
            return await _context.Incidents.Join(_context.Vins, I=>I.VinNumber, V => V.VinNumber,
            (I,V) =>
            new Incident{
                Id = I.Id,
                VinNumber = I.VinNumber,
                IncidentDate = I.IncidentDate,
                Note = I.Note,
                Vin = V
            }).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<Incident> Get(string id)
        {
            return await _context.Incidents.Include(f => f.Vin).FirstOrDefaultAsync(f => f.Id == Convert.ToInt32(id));
        }

        [HttpPost("Seed")]
        public async Task<int> SeedInitialData(IList<Incident> incidents)
        {
            IList<Incident> seeded = await _context.Incidents.Select(f=>f).ToListAsync();

            if(seeded.Count > 0){
                return 1;
            }

            for(int i = 0; i < incidents.Count; i++){
                Incident incident = incidents.ElementAt(i);
                VIN targetVin = await _vinController.GetInsertVin(incident.VinNumber);
                incident.Vin = _context.Vins.Find(incident.VinNumber);
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
