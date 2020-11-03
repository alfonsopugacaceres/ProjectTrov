using System.Collections.Generic;
public class NHTSResponse{
    public class NHTSResult{
            public string Value { get; set; }
            public string ValueId { get; set; }
            public string Variable { get; set; }
            public string VariableId { get; set; }
    }

    public int Count { get; set; }
    public string Message { get; set; }
    public IList<NHTSResult> Results {get;set;}

}