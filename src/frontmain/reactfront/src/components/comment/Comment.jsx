import React, { useState} from 'react';
import "./Comment.css"

export default function Comment({
    comment: {userId, commentId,username,content,createdAt},
    isEditing,
    setSelectedCommentIndex,
    editComment,
}){
    const [editValue, setEditValue] = useState(content);

    //const handleEditInput
}
