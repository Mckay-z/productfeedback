import Head from "next/head";
import Image from "next/image";
import { Jost } from "next/font/google";
import styles from "@/styles/feedback-new.module.scss";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SuggestionsCtx } from "@/context";

const inter = Jost({ subsets: ["latin"] });

export default function Home() {
  const { suggestions, setSuggestions } = React.useContext(SuggestionsCtx);

  const router = useRouter();
  const [payload, setpayload] = React.useState({
    id: suggestions?.length + 1,
    title: "",
    category: "Feature",
    details: "",
    upvoates: 0,
    comments: [],
    status: "Suggestion",
  });
  const [error, setError] = React.useState(false);
  const [error2, setError2] = React.useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.feedbackCont}>
          <div onClick={() => router.back()} className={styles.back}>
            <span></span> Go Back
          </div>
          <div className={styles.feedback}>
            <span></span>
            <h4>Create New Feedback</h4>
            <div className={styles.input}>
              <div className={styles.input1}>
                <text>Feedback Title</text>
                <p>Add a short, descriptive headline</p>
                <input
                  style={{
                    borderColor: error ? "#d73737" : "#eee",
                  }}
                  required
                  onChange={(value) => {
                    setpayload({
                      ...payload,
                      title: value?.target?.value,
                    });
                  }}
                  value={payload?.title}
                  type="text"
                  placeholder=""
                >
                </input>
                {error ? <div className={styles.err}>Can't be empty</div> : null}
              </div>
              <div className={styles.input2}>
                <text>Category</text>
                <p>Choose a category for your feedback</p>
                <select
                  required
                  onChange={(value) => {
                    setpayload({
                      ...payload,
                      category: value?.target?.value,
                    });
                  }}
                  value={payload?.category}
                >
                  <option value="Feature">Feature</option>
                  <option value="UI">UI</option>
                  <option value="UX">UX</option>
                  <option value="Enhancement">Enhancement</option>
                  <option value="Bug">Bug</option>
                </select>
              </div>

              <div className={styles.input3}>
                <text>Feedback Detail</text>
                <p>
                  Include any specific comments on what should be improved,
                  added, etc..
                </p>
                <textarea
                  style={{
                    borderColor: error2 ? "#d73737" : "#eee",
                  }}
                  required
                  onChange={(value) => {
                    setpayload({
                      ...payload,
                      details: value?.target?.value,
                    });
                  }}
                  value={payload?.details}
                />
                {error2 ? <div className={styles.err}>Can't be empty</div> : null}
              </div>
              <div className={styles.btns}>
                <button onClick={() => router.back()} className={styles.btn1}>
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (payload?.title == "") {
                      setError(true);
                    } else if (payload?.details == "") {
                      setError(false);
                      setError2(true);
                    } else {
                      setError2(false);
                      setError(false);
                      setSuggestions([...suggestions, payload]);
                      router.push("/");
                    }
                  }}
                  className={styles.btn2}
                >
                  Add Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
