using System;
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;

namespace TodoApi
{
    [Route("api/ADInfo")]
    [ApiController]
    public class ADDataController : ControllerBase
    {
        public static string LastAccess { get; set; }
        public static string LastActionRequest { get; set; }
        public static string LastActionParams { get; set; }

        [HttpGet("{upnOrSam}")]
        public string GetFullName(string upnOrSam)
        {

            var response = new HttpResponseMessage();
            string result = "";
            try
            {
                if (upnOrSam.ToLower().StartsWith("xgws") && upnOrSam.Length == 7)
                {
                    result = ADHandler.GetDisplayName(upnOrSam, ADHandler.SearchType.BySamAccount);
                }
                else
                {
                    result = ADHandler.GetDisplayName(upnOrSam, ADHandler.SearchType.ByUpn);
                }
            }
            catch (Exception ex)
            {
                response.Content = new StringContent(ex.Message);
                response.StatusCode = HttpStatusCode.NotFound;
                response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("text/html");
                return response.ToString();

            }
            return result;
        }
    }
}
