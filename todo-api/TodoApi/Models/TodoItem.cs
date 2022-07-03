using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class TodoItem
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string Description { get; set; }
    public bool IsComplete { get; set; }

    [NotMapped]
    public string Secret { get; set; }
}
