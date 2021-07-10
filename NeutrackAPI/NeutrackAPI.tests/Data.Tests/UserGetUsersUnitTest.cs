using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using NeutrackAPI.Data;
using NeutrackAPI.Models;
using NeutrackAPI.tests.Fixtures;

namespace NeutrackAPI.tests.Data.Tests
{
    [TestClass]
    public class UserGetUsersUnitTest
    {
        private Mock<IUserRepository> mockUserRepository;
        private IQueryable<User> mockUsersData;
        private User mockUserData;

        /// <summary>
        /// Initializes and sets up mock before each tests run
        /// </summary>
        [TestInitialize]
        public void SetUp()
        {
            mockUsersData = GenerateUser.GenerateListData(3).AsQueryable();
            mockUserData = GenerateUser.GeneratData();
            mockUserData.Email = "testuser@test.com";
            mockUserRepository = new Mock<IUserRepository>();
            
        }

        /// <summary>
        /// Test should get a list of all users and confirm total is 3
        /// </summary>
        [TestMethod]
        [TestCategory("Repository Test")]
        public void GetAllUsersShouldHaveTotalOf3Users()
        {
            mockUserRepository.Setup(x => x.GetAllUsers()).Returns(mockUsersData);
            var allUsers = mockUserRepository.Object.GetAllUsers().ToList();
            Assert.AreEqual(3, allUsers.Count());
            Assert.AreEqual(1, allUsers[0].Id);
            Assert.AreEqual(2, allUsers[1].Id);
            Assert.AreEqual(3, allUsers[2].Id);
        }

        /// <summary>
        /// Test should get a user by Id
        /// </summary>
        [TestMethod]
        [TestCategory("Repository Test")]
        public void GetAUserByIdShouldReturnAUser()
        {
            mockUserRepository.Setup(x => x.GetUserById(1)).Returns(mockUserData);
            var user = mockUserRepository.Object.GetUserById(1);
            Assert.AreEqual(1, user.Id);
            Assert.IsNotNull(user);
        }

        /// <summary>
        /// Test should get a user by Email
        /// </summary>
        [TestMethod]
        [TestCategory("Repository Test")]
        public void GetAUserByEmailShouldReturnAUser()
        {
            var testEmail = "testuser@test.com";
            mockUserRepository.Setup(x => x.GetUserByEmail(testEmail)).Returns(mockUserData);
            var user = mockUserRepository.Object.GetUserByEmail("testuser@test.com");
            Assert.AreEqual(testEmail, user.Email);
            Assert.IsNotNull(user);
        }
    }
}
