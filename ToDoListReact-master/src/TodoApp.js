
import React, { useState, useEffect } from 'react';
import service from './service'; // ייבוא של השירות שמבצע את הקריאות API

function TodoApp() {
  const [tasks, setTasks] = useState([]);  // מצב המשימות
  const [newTodo, setNewTodo] = useState(""); // מצב המשימה החדשה

  // קריאת משימות מה-API בעת הטעינה של הקומפוננטה
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await service.getTasks();  // קריאה לשירות
        setTasks(tasksData);  // שמירת המשימות ב-state
      } catch (error) {
        console.error('❌ Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []); // קריאה זו תתבצע פעם אחת בזמן הטעינה (componentDidMount)

  // טיפול בהשלמת משימה
  const handleTaskCompletion = async (taskId, isComplete) => {
    try {
      // מציאת המשימה הרלוונטית לפי ID
      const taskToUpdate = tasks.find(task => task.idItems === taskId);
      if (!taskToUpdate) {
        console.error("❌ Task not found for update");
        return;
      }
  
      // שליחה ל-API רק עם הסטטוס החדש
      const updatedTask = await service.setCompleted(taskId, isComplete);
      
      // עדכון המערך עם המשימה המעודכנת
      setTasks(tasks.map(task => task.idItems === taskId ? updatedTask : task));
    } catch (error) {
      console.error("❌ Error updating task:", error);
    }
  };
  

  // טיפול בהסרת משימה
  const handleDeleteTask = async (taskId) => {
    try {
      await service.deleteTask(taskId);
      setTasks(tasks.filter(task => task.idItems !== taskId));  // עדכון המשימות לאחר המחיקה
    } catch (error) {
      console.error("❌ Error deleting task:", error);
    }
  };

  // טיפול בהוספת משימה חדשה
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (newTodo) {
      try {
        await service.addTask(newTodo); // הוספת המשימה לשרת
        setNewTodo("");  // ניקוי השדה
        const updatedTasks = await service.getTasks();  // רענון הרשימה לאחר הוספה
        setTasks(updatedTasks);
      } catch (error) {
        console.error("❌ Error adding task:", error);
      }
    } else {
      console.error("❌ Task name is empty");
    }
  };

  return (
    <div>
      <h1>My Todo List</h1>
      
      {/* טופס להוספת משימה חדשה */}
      <form onSubmit={handleAddTask}>
        <input 
          type="text" 
          placeholder="Enter new task" 
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)} 
        />
        <button type="submit">Add Task</button>
      </form>
      
      {/* הצגת רשימת המשימות */}
      <ul>
        {tasks.map(task => (
          <li key={task.idItems}>
            {task.name} - {task.isComplete ? '✔️' : '❌'}
            <button onClick={() => handleTaskCompletion(task.idItems, !task.isComplete)}>
              {task.isComplete ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
            <button onClick={() => handleDeleteTask(task.idItems)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
