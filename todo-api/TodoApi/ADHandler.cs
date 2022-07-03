using System;
using System.Collections.Generic;
using System.DirectoryServices;

namespace TodoApi
{
    public class ADHandler
    {
        public enum SearchType
        {
            ByUpn = 0,
            BySamAccount = 1
        }

        public static string GetDisplayName(string upnOrSam, SearchType type)
        {
            string ldapPath = "LDAP://gws-muenster";
            using (DirectoryEntry entry = new DirectoryEntry(ldapPath))
            {

                DirectorySearcher mySearcher = GetDirectorySearcher(entry, upnOrSam, type);
                SearchResultCollection results = mySearcher.FindAll();

                if (results.Count == 0)
                {
                    throw new Exception("no user for upn or samaaccount " + upnOrSam + " found.");
                }

                ResultPropertyValueCollection ValueCollection = results[0].Properties["displayName"];

                mySearcher.Dispose();
                mySearcher = null;

                results.Dispose();
                results = null;
                return ValueCollection[0].ToString();

            }
        }

        public static List<string> GetGroups(string upnOrSam, SearchType type)
        {
            List<string> retList = new List<string>();
            string ldapPath = "LDAP://gws-muenster";
            using (DirectoryEntry entry = new DirectoryEntry(ldapPath))
            {
                DirectorySearcher mySearcher = GetDirectorySearcher(entry, upnOrSam, type);
                SearchResultCollection results = mySearcher.FindAll();

                if (results.Count == 0)
                {
                    throw new Exception("no user for upn " + upnOrSam + " found.");
                }

                ResultPropertyValueCollection ValueCollection = results[0].Properties["memberOf"];

                foreach (var value in ValueCollection)
                {
                    string tmp = value.ToString().Split(',')[0];
                    retList.Add(tmp.Split('=')[1].Trim().ToUpper());
                }

                mySearcher.Dispose();
                mySearcher = null;
                results.Dispose();
                results = null;
                ValueCollection = null;


                return retList;

            }
        }


        private static DirectorySearcher GetDirectorySearcher(DirectoryEntry entry, string upnOrSam, SearchType type)
        {
            DirectorySearcher mySearcher = new DirectorySearcher(entry);

            switch (type)
            {
                case SearchType.BySamAccount:
                    mySearcher.Filter = "(&(objectClass=user)(sAMAccountName=" + upnOrSam + "))";
                    break;
                case SearchType.ByUpn:
                    mySearcher.Filter = "(&(objectClass=user)(userPrincipalName=" + upnOrSam + "))";
                    break;
                default:
                    throw new Exception("SearchType not implemented.");
            }

            return mySearcher;
        }

    }
}
