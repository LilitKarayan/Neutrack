/**
 * Reference:
 * Source: https://stackoverflow.com/questions/57110603/verify-sha512-hashed-password-in-c-sharp
 * Author: Prochu1991
 * Date: 07/19/2019
 * Accessed: 06/21/2021
 */
using System.Security.Cryptography;
using System.Text;
using System;
namespace NeutrackAPI.Helpers
{
    public static class PasswordHelper
    {
        public static string GenerateSHA256tring(string stringToHash)
        {
            SHA256 sha256 = SHA256Managed.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(stringToHash);
            byte[] hash = sha256.ComputeHash(bytes);
            return GetStringFromHash(hash);
        }

        private static string GetStringFromHash(byte[] hash)
        {
            StringBuilder result = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                result.Append(hash[i].ToString("X2"));
            }
            return result.ToString();
        }
    }
}
