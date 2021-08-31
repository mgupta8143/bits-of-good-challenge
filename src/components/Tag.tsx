import React, { useState } from 'react'
import "./Tag.css";

export default function Tag(props: any) {

  const index = props.index;
  const removeTag = props.removeTag;
  const xIncluded = props.x;

  return (
    <div className="tag">
        {props.tagName}
        {!xIncluded && 
        <button className="tag-x" onClick={() => removeTag(index)}>X</button>
        }

    </div>
  );
}
