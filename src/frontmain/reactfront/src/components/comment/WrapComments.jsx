import {useState} from "react";

export default function WrapComments() {
  const [input, setInput] = useState('')
  const [commentList, setCommentList] = useState([])

  const addComment = () => {
    if (input !== '') {
      const lastCmtIndex = commentLists.length - 1;
      const addedCmtId = commentLists[lastCmtIndex].id + 1;
      const newComment = {
        id: addedCmtId,
        username: 'bibigo',
        content: input,
      };
      setCommentLists([...commentLists, newComment]);
      setInput('');
    }
  };

  return (
    <>
      <ul className="list-cmt">
        {commentLists.map(comment => {
          const commentId = comment.id;
          return (
            <Comment
              key={commentId}
              comment={comment}
            />
          );
        })}
      </ul>

      <div className="box-inp-cmt">
        <input
          type="text"
          placeholder="댓글 달기..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => (e.key === 'Enter' ? addComment() : null)}
          />
        <button className="btn-submit" disabled="" onClick={addComment}>
            게시
        </button>
      </div>
	</>
  )
}