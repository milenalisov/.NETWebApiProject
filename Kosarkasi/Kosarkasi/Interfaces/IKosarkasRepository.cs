using Kosarkasi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kosarkasi.Interfaces
{
    public interface IKosarkasRepository
    {
        IEnumerable<Kosarkas> GetAll();
        Kosarkas GetById(int id);
        IEnumerable<Kosarkas> GetGodine(int godine);
        void Add(Kosarkas kosarkas);
        void Update(Kosarkas kosarkas);
        void Delete(Kosarkas kosarkas);
        IEnumerable<Kosarkas> Pretraga(int najmanje, int najvise);
    }
}
