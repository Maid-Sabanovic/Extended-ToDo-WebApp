using System;
using System.Collections.Generic;
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

        [HttpGet("GetFullName/{upnOrSam}")]
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

        [HttpGet("GetUserGroups/{upnOrSam}")]

        public List<string> GetUserGroups(string upnOrSam)
        {
            var response = new HttpResponseMessage();
            List<string> usergroups = new List<string>();
            try
            {
                

                if (upnOrSam.ToLower().StartsWith("xgws") && upnOrSam.Length == 7)
                {
                    usergroups = ADHandler.GetGroups(upnOrSam, ADHandler.SearchType.BySamAccount);
                }
                else
                {
                    usergroups = ADHandler.GetGroups(upnOrSam, ADHandler.SearchType.ByUpn);
                }


                //response.Content = new ObjectContent<List<string>>(res, new System.Net.Http.Formatting.JsonMediaTypeFormatter(), "application/json");
            }
            catch (Exception ex)
            {
                /*response.Content = new ObjectContent<Exception>(
                ex, new System.Net.Http.Formatting.JsonMediaTypeFormatter(), "application/json");*/
            }
            return usergroups;

        }
    }
}
