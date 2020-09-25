using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace PrjUcbWeb.Utils
{
    public class Criptografia
    {
        public static String doEncryptAES(String plainText)
        {
            var plainBytes = Encoding.UTF8.GetBytes(plainText);
            return Convert.ToBase64String(Encrypt(plainBytes, getRijndaelManaged("M4tr1x1ndy@n4")));
        }

        public static String doDecryptAES(String encryptedText)
        {
            string converted = encryptedText.Replace('-', '+');
            converted = converted.Replace('_', '/');
            var encryptedBytes = Convert.FromBase64String(converted);
            return Encoding.UTF8.GetString(Decrypt(encryptedBytes, getRijndaelManaged("M4tr1x1ndy@n4")));
        }

        private static RijndaelManaged getRijndaelManaged(String secretKey)
        {
            var keyBytes = new byte[16];
            var secretKeyBytes = Encoding.UTF8.GetBytes(secretKey);
            Array.Copy(secretKeyBytes, keyBytes, Math.Min(keyBytes.Length, secretKeyBytes.Length));
            return new RijndaelManaged
            {
                Mode = CipherMode.CBC,
                Padding = PaddingMode.PKCS7,
                KeySize = 128,
                BlockSize = 128,
                Key = keyBytes,
                IV = keyBytes
            };
        }

        private static byte[] Encrypt(byte[] plainBytes, RijndaelManaged rijndaelManaged)
        {
            return rijndaelManaged.CreateEncryptor()
                .TransformFinalBlock(plainBytes, 0, plainBytes.Length);
        }

        private static byte[] Decrypt(byte[] encryptedData, RijndaelManaged rijndaelManaged)
        {
            return rijndaelManaged.CreateDecryptor()
                .TransformFinalBlock(encryptedData, 0, encryptedData.Length);
        }
        public static byte[] toByte(string hexString)
        {
            int len = hexString.Length / 2;
            byte[] result = new byte[len];
            for (int i = 0; i < len; i++)
                result[i] = Convert.ToByte(hexString.Substring(2 * i, 2 * i + 2),
                        16);
            return result;
        }
    }
}