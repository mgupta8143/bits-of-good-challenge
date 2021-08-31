import React, { useState } from 'react';
import { TodoItem } from './TodoList';
import Tag from './Tag';
import "./Input.css";

export default function Input(props: any) {

    const [info, setInfo] = useState<TodoItem>({
        title: "",
        dueDate: new Date(),
        tagList: [],
        completed: false
    });

    const [dateChanged, setDateChanged] = useState<boolean>(false);

    const [currentTag, setCurrentTag] = useState<string>("");

    const addItem = props.addItem;

    const handleChange = (event: any) => {
      if (event.target.name === "dueDate") {
        setDateChanged(true);
      }
       


      setInfo(val => ({
        ...val,
        [event.target.name]: event.target.value
      }));
    };

   

    const handleCurrentTagChange = (event: any) => {
      setCurrentTag(event.target.value);
    };

    const addTag = () => {
      setInfo(val => ({
        ...val,
        tagList: [...val.tagList, currentTag]
      }))
      return false;
  
    };

    const removeTag = (idx: number) => {
      const newTagList = [...info.tagList];
      newTagList.splice(idx, 1);
      setInfo(val => ({
        ...val,
        tagList: newTagList
      }));
    };

  

    const submitForm = (event: any) => {
      const errorElement = document.getElementById('error');

      if(errorElement) {
        if (info.title === "" || !dateChanged) {
          errorElement.style.display = "inline";
          return;
        }

        errorElement.style.display = "none";
     }

      addItem(info);
      setInfo({
        title: "",
        dueDate: new Date(),
        tagList: [],
        completed: false
      });
      setCurrentTag("");
      setDateChanged(false);

      
    }
  
    return (
      <div className="input-wrapper">
        <p className="error" id="error">Title and date required</p>
        <form id="form-wrap" className="form-wrapper">
            <div className="row-wrapper">
              <label>Title</label>
              <input 
                className="styled-input"
                type="text" 
                name="title"
                value={info.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row-wrapper">
              <label>Tags</label>
              <input 
                className="styled-input"
                type="text"
                value={currentTag}
                onChange={handleCurrentTagChange}
              />
              <button type="button" className = "tag-button" onClick={addTag}>Add</button>
            </div>

            <div className="tag-wrapper">
              {
                info.tagList.map((val, idx) => {
                  return <Tag 
                            key={idx} 
                            index = {idx}
                            tagName={val}
                            removeTag = {removeTag}
                         />
                })
              }
            </div>

            <div className="row-wrapper">
              <label>Date</label>
              <input 
                  className="styled-input"
                  name="dueDate"
                  id="dateinput"
                  type="date"
                  onChange={handleChange}
                  required
              />
            </div>

            <div className="row-wrapper">
              <button type="button" onClick={submitForm}>Create</button>
            </div>
        </form>
      </div>
    );
  }
  