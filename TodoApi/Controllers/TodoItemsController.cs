using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;
using TodoApi.Models.DataManager;
using TodoApi.Models.Repository;

namespace TodoApi.Controllers
{
    [Route("api/TodoItems")]
    [ApiController]
    public class TodoItemsController : ControllerBase
    {
        private readonly IDataRepository<TodoItem> _dataRepository;

        public TodoItemsController(IDataRepository<TodoItem> dataRepository)
        {
            _dataRepository = dataRepository;
        }

        // GET: api/TodoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
        {
            Task<IEnumerable<TodoItem>> task = _dataRepository.GetAll();
            return Ok(await task);
        }

        // GET: api/TodoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodoItem(long id)
        {
            var todoItem = _dataRepository.Get(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return Ok(await todoItem);
        }

        // PUT: api/TodoItems/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodoItem(long id, TodoItem todoItem)
        {
            if (id != todoItem.Id)
            {
                return BadRequest();
            }

            var todoItemToUpdate = await _dataRepository.Get(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            todoItemToUpdate.Description = todoItem.Description;
            todoItemToUpdate.IsComplete = todoItem.IsComplete;

            try
            {
                _dataRepository.Update(todoItemToUpdate,todoItem);
            }
            catch (DbUpdateConcurrencyException) when (!TodoItemExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/TodoItems
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TodoItem>> CreateTodoItem(TodoItem todoItem)
        {
            /*var todoItem = new TodoItem
            {
                IsComplete = todoItem.IsComplete,
                Description = todoItem.Description
            };

            _context.TodoItems.Add(todoItem);
            await _context.SaveChangesAsync();*/

            if(todoItem == null)
            {
                return BadRequest("Item is Null");
            }

           _dataRepository.Add(todoItem);

            return CreatedAtAction(
                nameof(GetTodoItem),
                new { id = todoItem.Id },
                todoItem);
        }

        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(long id)
        {
            var todoItem= await _dataRepository.Get(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            _dataRepository.Delete(todoItem);

            return NoContent();
        }

        private bool TodoItemExists(long id) =>
         _dataRepository.GetAll().Result.Any(i => i.Id == id);
    }
}
