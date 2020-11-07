using System.Collections.Generic;

namespace AppModels{
        public class NHTSResult{
                public string Value { get; set; }
                public string ValueId { get; set; }
                public string Variable { get; set; }
                public int VariableId { get; set; }
        }

        public class NHTSResponse{

                public int Count { get; set; } 
                public string Message { get; set; } 
                public string SearchCriteria { get; set; } 
                public IList<NHTSResult> Results {get;set;}

        }

}