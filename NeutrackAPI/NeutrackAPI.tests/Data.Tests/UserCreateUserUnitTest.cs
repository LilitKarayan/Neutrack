using System;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using NeutrackAPI.Data;
using NeutrackAPI.Models;
using NeutrackAPI.tests.Fixtures;

namespace NeutrackAPI.tests.Data.Tests
{
    [TestClass]
    public class UserCreateUserUnitTest
    {
        private Mock<IUserRepository> mockUserRepository;
        private User mockUserData;

        /// <summary>
        /// Initializes and sets up mock before each tests run
        /// </summary>
        [TestInitialize]
        public void SetUp()
        {
            mockUserData = GenerateUser.GeneratData();
            mockUserRepository = new Mock<IUserRepository>();

        }

        /// <summary>
        /// Test should call create user method
        /// </summary>
        [TestMethod]
        [TestCategory("Repository Test")]
        public void CreateValidUserShouldNotThrowAnError()
        {
            mockUserRepository.Setup(x => x.CreateUser(mockUserData)).Verifiable();
            mockUserRepository.Object.CreateUser(mockUserData);
            mockUserRepository.Verify(x => x.CreateUser(mockUserData));
        }

        /// <summary>
        /// Test should throw an erro when user is created with null data
        /// </summary>
        [TestMethod]
        [TestCategory("Repository Test")]
        public void CreateUserWithNullDataShouldThrowException()
        {
            mockUserRepository.Setup(x => x.CreateUser(null)).Throws<ArgumentNullException>();
            Assert.ThrowsException<ArgumentNullException>(() => mockUserRepository.Object.CreateUser(null));
        }
    }
}
