import React, { useState } from 'react'
import Input from './Input';
import Tag from './Tag';
import "./TodoList.css";

/**
 * Thank you for applying to Bits of Good. You are free to add/delete/modify any 
 * parts of this project. That includes changing the types.ts, creating css files, 
 * modifying import statements, using contexts, etc. We do recommend to keep it simple. 
 * You will not be judged based on complexity. We also recommend using 
 * multiple components instead of coding everything on this file :)
 * 
 * Have fun! Please reach out to hello@bitsofgood.org or wkim330@gatech.edu if you
 * have any questions!
 * 
 * Bits of Good Engineering Team
 * 
 */
// TODO: Start coding from here

// Here's a baseline todo item type. 
// Feel free to extend or create your own interface!
export type TodoItem = {
  title: string,
  dueDate: Date,
  tagList: string[],
  completed: boolean,
}


export default function TodoList() {

  let [todoItems, setTodoItems] = useState<TodoItem[]>([]);

  let [dateSort, setDateSort] = useState<boolean>();
  let [completionSort, setCompletionSort] = useState<boolean>();

  const addToDoItem = (item: TodoItem) => {
    setTodoItems(val => {
      const newList = [...todoItems];
      newList.push(item);
      return newList;
    })
    console.log(todoItems);

  };

  const handleCompeletion = async (event: any) => {
    await setTodoItems(val => {
      let clone = JSON.parse(JSON.stringify(val));
      clone[parseInt(event.target.name)].completed = event.target.checked;
      return clone;
    })
    console.log(todoItems);
  };

  const toggleDateSort = async () => {
    await setDateSort(val => !val);
    sort();
  }

  const toggleCompletionSort = async () => {
    await setCompletionSort(val => !val);
    sortByCompletion();

  }

  const sortByDate = () => {
    setTodoItems(val => {
      let clone = JSON.parse(JSON.stringify(val));
      clone.sort((a: TodoItem, b: TodoItem) => {
        if (a.dueDate > b.dueDate) return 1;
        if (a.dueDate < b.dueDate) return -1;
        return 0;
      });
      return clone;
    })
  }

  const sortByCompletion = () => {
    console.log("YES");
    setTodoItems(val => {
      let clone = JSON.parse(JSON.stringify(val));
      clone.sort((a: TodoItem, b: TodoItem) => {
        if (a.completed) return 1;
        if (b.completed) return -1;
        return 0;
      });
      return clone;
    })
  }

  const sortByCompletionThenDate = () => {
    console.log("YES");
    setTodoItems(val => {
      let clone = JSON.parse(JSON.stringify(val));
      clone.sort((a: TodoItem, b: TodoItem) => {
        if (a.completed && !b.completed) {
          return 1;
        } else if (!a.completed && b.completed) {
          return -1;
        } else {
          if (a.dueDate > b.dueDate) return 1;
          if (a.dueDate < b.dueDate) return -1;
          return 0;
        }
      });
      return clone;
    })
  }


  const sort = () => {
    if (!dateSort) {
      console.log("No");
      sortByDate();
    } else if (completionSort) {
      console.log("Yes");
      sortByCompletion();
    } else {
      
    }
  }
 
  return (
    <div className="todo-wrapper">
      <div className="shadow-wrapper">
        <h1 className="title"style={{backgroundColor: 'white'}}>Todo List</h1>
        <Input
            addItem = {addToDoItem}
          />
      </div>

      <div className="list-wrapper">
        <button style={{backgroundColor: dateSort ? "green" : "red"}} onClick={toggleDateSort}>Sort by Date</button>
        <button style={{backgroundColor: completionSort ? "green" : "red"}} onClick={toggleCompletionSort}>Sort by Completion</button>
        {
          todoItems.map((val, idx) => {
            return (
              <div key={idx} className="todo-item">
                <input type="checkbox" 
                       id={idx.toString()}
                       name={idx.toString()}
                       className="check-box"
                       onChange={handleCompeletion}
                       checked={val.completed}
                />

                <div className="title-and-tags">
                  <h2 className="item-title">{val.title}</h2>
                  <div className="tag-item-wrapper">
                  {
                    todoItems[idx].tagList.map((val2, idx2) => {
                      return <Tag 
                            key={idx2} 
                            index = {idx2}
                            tagName={val2}
                            x={true}
                         />
                    })
                  }
                  </div>

                </div>

                <div className="date">
                   By {val.dueDate}
                </div>


              </div>
            )
          })
        }
      </div>
    </div>
  );
}
