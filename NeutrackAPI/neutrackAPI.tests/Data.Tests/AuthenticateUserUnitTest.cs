using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using NeutrackAPI.Data;
using NeutrackAPI.DTOs;
using NeutrackAPI.Models;
using NeutrackAPI.tests.Fixtures;

namespace NeutrackAPI.tests.Data.Tests
{
    [TestClass]
    public class AuthenticateUserUnitTest
    {
        private Mock<IUserRepository> mockUserRepository;
        private User mockUser;
        private AuthRequestDTO mockAuthRequestDTO;

        /// <summary>
        /// Initializes and sets up mock before each tests run
        /// </summary>
        [TestInitialize]
        public void SetUp()
        {
            mockUser = GenerateUser.GeneratData();
            mockUser.Email = "testuser@test.com";
            mockUser.Password = "12!@UYhera";
            mockUserRepository = new Mock<IUserRepository>();
            mockAuthRequestDTO = new AuthRequestDTO()
            {
                Email = mockUser.Email,
                Password = mockUser.Password
            };
            List<UserRole> testUserRoles = new List<UserRole>()
            {
                new UserRole()
                {
                   Role = new Role(){Id = 1, Name = "User"}
                },
                new UserRole()
                {
                   Role = new Role(){Id = 2, Name = "Nutritionist"}
                }
            };
            mockUser.UserRoles = testUserRoles;

        }

        // <summary>
        /// Test should get a user by Id
        /// </summary>
        [TestMethod]
        [TestCategory("Repository Test")]
        public void AuthenticateUserShouldReturnAUserWithToken()
        {
            var token = GenerateUser.GenerateToken(mockUser, new string[] { "User", "Nutritionist" });
            var authResponse = new AuthResponseDTO(mockUser, token);
            mockUserRepository.Setup(x => x.AuthenticateUser(mockAuthRequestDTO)).Returns(authResponse);
            var user = mockUserRepository.Object.AuthenticateUser(mockAuthRequestDTO);
            Assert.AreEqual(token, authResponse.Token);
            Assert.AreEqual("testuser@test.com", authResponse.Email);
            Assert.IsNotNull(authResponse);
        }
    }
}
