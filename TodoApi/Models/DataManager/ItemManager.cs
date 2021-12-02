using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.Models.Repository;

namespace TodoApi.Models.DataManager
{
    public class ItemManager : IDataRepository<TodoItem>
    {
        readonly TodoContext _todoContext;

        public ItemManager(TodoContext context)
        {
            _todoContext = context;
        }

        public async Task<IEnumerable<TodoItem>> GetAll()
        {

            return await _todoContext.TodoItems.ToListAsync();
        }

        public async Task<IEnumerable<TodoItem>> Search(string desc)
        {
            IQueryable<TodoItem> query = _todoContext.TodoItems;

            if (!string.IsNullOrEmpty(desc))
            {
                query = query.Where(item => item.Description.Contains(desc));
            }

            return await query.ToListAsync();
        }

        public async Task<TodoItem> Get(long id)
        {
            return await _todoContext.TodoItems.FirstOrDefaultAsync(item => item.Id == id);
        }

        public void Add(TodoItem entity)
        {
            _todoContext.TodoItems.Add(entity);
            _todoContext.SaveChanges();
        }

        public void Update(TodoItem dbEntity, TodoItem entity)
        {
            dbEntity.Id = entity.Id;
            dbEntity.Description = entity.Description;
            dbEntity.IsComplete = entity.IsComplete;

            _todoContext.SaveChanges();
        }

        public void Delete(TodoItem entity)
        {
            _todoContext.TodoItems.Remove(entity);
            _todoContext.SaveChanges();
        }

        
    }
}
