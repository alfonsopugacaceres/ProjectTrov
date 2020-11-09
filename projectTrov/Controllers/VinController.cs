
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AppModels;
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
    public class VinController : ControllerBase
    {
        

        private readonly DefaultContext _context; 
        private enum Fields {
            Model = 28,
            Make = 26,
            ModelYear = 29
        }

        public VinController(DefaultContext context)
        {
            _context = context;
        }

        
        [HttpGet()]
        public async Task<IList<VIN>> GetAll()
        {
            return await _context.Vins.ToListAsync();
        }

        [HttpGet("{vin}")]
        public async Task<VIN> GetTarget(string vin)
        {
            return await _context.Vins.FindAsync(vin);
        }

        [HttpPost("{vin}")]
        public async Task<VIN> GetInsertVin(string vin)
        {
            VIN targetVin = await _context.Vins.FindAsync(vin);

            if(targetVin == null)
            {
                targetVin = await RetrieveVinData(vin);
                if(targetVin == null){
                    return null;
                }
                _context.Vins.Add(targetVin);
                    
                try
                {
                    await _context.SaveChangesAsync();
                    return targetVin;
                }
                catch (Exception ex){
                    Console.WriteLine(ex);
                    return null;
                }
            }
            else{
                return targetVin;
            }
        }


        private async Task<VIN> RetrieveVinData(string vin){
            string url = "https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/" + vin + "?format=json";
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


            return CreateVin(vin, parsedResponse);

        }
        private VIN CreateVin(string vin, NHTSResponse nhtsResponse){
            VIN newVIn = new VIN();
            newVIn.VinNumber = vin;
            IDictionary<int,NHTSResult> data = new Dictionary<int,NHTSResult>();
            data = nhtsResponse.Results.ToDictionary(x => x.VariableId, x => x);
            var fields = Enum.GetValues(typeof(Fields));
            foreach(Fields target in fields){
                int targetInt = (int)target;
                switch(target){
                    case Fields.Model:
                        if(data.ContainsKey(targetInt))
                            newVIn.Model = data[targetInt].Value;
                        else
                            newVIn.Model = string.Empty;
                    break;
                    case Fields.Make:
                        if(data.ContainsKey(targetInt))
                            newVIn.Make = data[targetInt].Value;
                        else
                            newVIn.Make = string.Empty;
                    break;
                    case Fields.ModelYear:
                        if(data.ContainsKey(targetInt))
                            newVIn.VinYear = data[targetInt].Value;
                        else
                            newVIn.VinYear = string.Empty;
                    break;
                }
            }
            if(newVIn.Make == null || newVIn.Model == null || newVIn.VinYear == null){
                return null;
            }
            return newVIn;
        }
    }
}
