﻿using Kosarkasi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kosarkasi.Interfaces
{
    public interface IKlubRepository
    {
        IEnumerable<Klub> GetAll();
        Klub GetById(int id);
        IEnumerable<Klub> Ekstremi();
    }
}
