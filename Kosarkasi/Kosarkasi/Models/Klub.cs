using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Kosarkasi.Models
{
    public class Klub
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Naziv { get; set; }
        [StringLength(3)]
        public string Liga { get; set; }
        [Required]
        [Range(1945, 1999)]
        public int Godina { get; set; }
        [Required]
        [Range(0,20)]
        public int Trofeji { get; set; }
    }
}