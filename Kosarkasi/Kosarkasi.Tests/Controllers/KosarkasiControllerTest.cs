using Kosarkasi.Controllers;
using Kosarkasi.Interfaces;
using Kosarkasi.Models;
using Kosarkasi.Repository;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;
using static Kosarkasi.Controllers.KosarkasiController;

namespace Kosarkasi.Tests.Controllers
{   
    [TestClass]
    public class KosarkasiControllerTest
    {
        [TestMethod]
        public void GetReturnsKosarkasiWithSameId()
        {
            var mockRepository = new Mock<IKosarkasRepository>();
            mockRepository.Setup(x => x.GetById(1)).Returns(new Kosarkas { Id = 1, ImeIPrezime = "Neko", Godina = 1995, BrojUtakmica = 15, BrojPoena = 16.2m });

            var controller = new KosarkasiController(mockRepository.Object);

            IHttpActionResult result = controller.GetKosarkas(1);
            var contentResult = result as OkNegotiatedContentResult<Kosarkas>;

            Assert.IsNotNull(contentResult);
            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual(1, contentResult.Content.Id);

        }

        [TestMethod]
        public void GetReturnsNotFound()
        {
            var mockRepository = new Mock<IKosarkasRepository>();
            var controller = new KosarkasiController(mockRepository.Object);

            IHttpActionResult result = controller.GetKosarkas(1);

            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }

        [TestMethod]
        public void PutReturnsBadRequest()
        {
            var mockRepository = new Mock<IKosarkasRepository>();
            var controller = new KosarkasiController(mockRepository.Object);

            IHttpActionResult result = controller.PutKosarkas(12, new Kosarkas { Id = 1, ImeIPrezime = "Neko", Godina = 1995, BrojUtakmica = 15, BrojPoena = 16.2m });

            Assert.IsInstanceOfType(result, typeof(BadRequestResult));
        }

        [TestMethod]
        public void PretragaReturnsMultipleObjects()
        {
            List<Kosarkas> kosarkasi = new List<Kosarkas>();
            kosarkasi.Add(new Kosarkas { Id = 1, ImeIPrezime = "Neko", Godina = 1995, BrojUtakmica = 15, BrojPoena = 16.2m });
            kosarkasi.Add(new Kosarkas { Id = 2, ImeIPrezime = "Neko drugi", Godina = 1991, BrojUtakmica = 25, BrojPoena = 18.2m });

            var mockRepository = new Mock<IKosarkasRepository>();
            mockRepository.Setup(x => x.Pretraga(14, 27)).Returns(kosarkasi.AsEnumerable());
            
            var controller = new KosarkasiController(mockRepository.Object);

            var model = new ApiModel { najmanje = 14, najvise = 27 };
           
            IHttpActionResult result = controller.PostPretraga(model);
            var createdResult = result as OkNegotiatedContentResult<IEnumerable<Kosarkas>>;

            Assert.IsNotNull(createdResult);
            Assert.IsNotNull(createdResult.Content);
            Assert.AreEqual(createdResult.Content.ToList().Count(), kosarkasi.Count());
            Assert.AreEqual(createdResult.Content.ElementAt(0), kosarkasi.ElementAt(0));
            Assert.AreEqual(createdResult.Content.ElementAt(1), kosarkasi.ElementAt(1));
        }

    }
}
