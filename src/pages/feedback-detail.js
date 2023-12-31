import Head from "next/head";
import Image from "next/image";
import { Jost, Linden_Hill } from "next/font/google";
import styles from "@/styles/feedback-detail.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { SuggestionsCtx } from "@/context";
import React, { useEffect, useState } from "react";

const inter = Jost({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { suggestions, setSuggestions } = React.useContext(SuggestionsCtx);
  const { id } = router?.query;
  
  const [comment, setComment] = React.useState("");
  const [item, setItem] = React.useState({});

  function search(nameKey, myArray) {
    console.log(nameKey, myArray);
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i].id == nameKey) {
        setItem(myArray[i]);
        console.log(myArray[i]);

        break;
      }
    }
  }

  useEffect(() => {
    search(id, suggestions);
  }, []);

  function addComment(idd, comments, array) {
    console.log(idd, comment, array);
    for (var i in array) {
      if (array[i].id == idd) {
        array[i].comments = comments;
        search(id, suggestions);
        break; //Stop this loop, we found it!
      }
    }
  }

  function addCommentReply(idd, replyId, replies, array) {
    for (var i in array) {
      if (array[i].id == idd) {
        let currComments = array[i].comments
        for (var i in currComments) {
          if (currComments[i].id == replyId) {
            currComments[i].replies = replies;
            search(id, suggestions);
            break; //Stop this loop, we found it!
          }
        }

      }
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.cont}>
          <nav className={styles.nav}>
            <div onClick={() => router.back()} className={styles.back}>
              <span></span>Go Back
            </div>
            <Link href={"/edit-feedback/?id=" + item?.id}>
              <button className={styles.btn1}>Edit Feedback</button>
            </Link>
          </nav>
          <div className={styles.topic}>
            <button className={styles.btn2}>
              <span></span>
              {item?.upvoates}
            </button>
            <div className={styles.txt}>
              <text>{item?.title} </text>
              <div className={styles.pcont}>
                <p>{item?.details}</p>
              </div>
              <button className={styles.btn3}>{item?.category}</button>
            </div>
            <div className={styles.chat}>
              <span></span>
              {item?.comments?.length}
            </div>
            <div className={styles.chat2}>
              <button className={styles.btn10}>
                <span></span>
                {item?.upvoates}
              </button>
              <div className={styles.chat1}>
                <span></span>
                {item?.comments?.length}
              </div>
            </div>
          </div>
          {item?.comments?.length > 0 ? (
            <div className={styles.commentsCont}>
              <h3>{item?.comments?.length} Comments</h3>
              {item?.comments?.map((item, index) => {
                return (
                  <CommentItem item={item} index={index} onReply={(reply, rid) => {
                    let prevComs = item?.replies;
                    addCommentReply(id, rid, [...prevComs, {
                      text: reply,
                      upvotes: 0,
                      replies: [],
                      id: prevComs?.length + 1
                    }], suggestions)

                    setComment("");
                  }} />
                );
              })}
            </div>
          ) : null}
          <div className={styles.addcomment}>
            <h3>Add Comment</h3>
            <input
              value={comment}
              onChange={(val) => {
                if (comment?.length == 250) return;
                setComment(val?.target?.value);
              }}
              type="text"
              placeholder="Type your comment here"
            ></input>
            <div className={styles.characters}>
              <text>{250 - comment?.length} characters left</text>
              <button
                onClick={() => {
                  let prevComs = item?.comments;
                  addComment(
                    id,
                    [
                      ...prevComs,
                      {
                        text: comment,
                        upvotes: 0,
                        replies: [],
                        id: prevComs?.length + 1
                      },
                    ],
                    suggestions
                  );

                  setComment("");
                }}
                className={styles.btn4}
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


const CommentItem = ({ item, index, onReply = () => { } }) => {
  const [openReply, setOpenReply] = useState(false)
  const [replyText, setReplyText] = useState("")

  return (
    <div className={styles.comment1}>
      <div className={styles.comment2}>
        <div className={styles.comment1}>
          <div className={styles.profileCont}>
            <div className={styles.profilepic}><img></img></div>
            <div className={styles.username}>
              <div className={styles.name}>
                <text>User {index + 1}</text>
                <p>@username</p>
              </div>
              <text onClick={() => setOpenReply(!openReply)}>Reply</text>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.message}>
              {item?.text}</div>
            {openReply && <div className={styles.replyCont}>
              <input value={replyText} onChange={(v) => setReplyText(v.target.value)} type="text"></input>
              <button onClick={() => {
                onReply(replyText, item?.id)
                setReplyText("")
                setOpenReply(false)
              }}>Post Reply</button>
            </div>}
          </div>
        </div>
        {item?.replies?.length > 0 ?
          item?.replies?.map((item, index) => {
            return (
              <ReplyItem item={item} index={index} onReply={(it, id) => {
                onReply(it, id)
                setReplyText("")
                setOpenReply(false)
              }} />
            )
          })
          : <></>}
      </div>
    </div>
  )
}

const ReplyItem = ({ item, index, onReply = () => { } }) => {
  const [openReply, setOpenReply] = useState(false)
  const [replyText, setReplyText] = useState("")

  return (
    <div className={styles.replies}>
      <div className={styles.comment1}>
        <div className={styles.profileCont}>
          <div className={styles.profilepic}><img></img></div>
          <div className={styles.username}>
            <div className={styles.name}>
              <text>Reply User {index + 1} </text>
              <p>@replyUsername</p>
            </div>
            <text onClick={() => setOpenReply(!openReply)} className={styles.txt2}>Reply</text>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.message}>{item?.text}</div>
          {openReply && <div className={styles.replyCont}>
            <input value={replyText} onChange={(v) => setReplyText(v.target.value)} type='text'></input>
            <button onClick={() => {
              onReply("@replyUsername " + replyText, item?.id)
              setReplyText("")
              setOpenReply(false)
            }}>Post Reply</button>
          </div>}
        </div>
      </div>
    </div>
  )
}