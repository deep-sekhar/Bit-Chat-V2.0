import { useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { Showpostitems } from './Showpostitems';
import { Dashboard } from './Dashboard2'
// import { NewDashboard } from './NewDashboard2'

export const ShowPosts = (props) => {
    const [EditTitle, setEditTitle] = useState("");
    const [EditDesc, setEditDesc] = useState("");

    const SetEditedItems = (IncomingTitle, IncomingDesc) => {
        setEditTitle(IncomingTitle);
        setEditDesc(IncomingDesc);
    }

    const history = useHistory();
    const abortCtrl = new AbortController();
    const [userData, setuserData] = useState({username:"",email:"",phno:"",messages:[]});

    const callAbout = async () => {
        try {
            let params = {
                method: "GET",
                headers: {
                    // Accept: "application/json",
                    'Content-Type': 'application/json'
                },
                // credentials: "include"
            }
            const res = await fetch('/profiledata', params, { signal: abortCtrl.signal });
            const data = await res.json();

            if (res.status !== 200) {
                // const error = new Error(res.error)
                // throw error;
                console.log("POST RETRIEVED");
                changeHis();
            } else {
                console.log("post page-->", data);
                setuserData(data)
            }

        } catch (error) {
            console.log(error);
        }
    }

    const changeHis = () => {
        history.push('/userSignin')
    }

    useEffect(() => {
        callAbout();
        return () => {
            console.log("Req ABORTED!");
            abortCtrl.abort();
        }
    }, [])

    // DASHBOARD CALLS 

    function WhatstheTime() {
    let date = new Date();
    let Month = date.getMonth() + 1;
    let Year = date.getFullYear();
    let Hours = date.getHours();
    let Mins = date.getMinutes();
    let Ampm = 'AM';
    if (Hours > 12) {
      Ampm = 'PM';
      Hours %= 12;
    }
    if (Mins < 10) {
      Mins = "0" + Mins;
    }
    let Time = Hours + ":" + Mins + Ampm + '\xa0\xa0\xa0\xa0\xa0' + Month + "/" + Year;
    return Time;
  }

    const AddToPost = async(title,con)=>{
        const postdata = async()=>{
            let data = JSON.stringify({
                post_time:WhatstheTime(),
                title:title,
                con:con
                })
            let params = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            }
            const res =  await fetch('/addMsg',params);
            const json = await res.json();
            console.log(json);
            if(res.status!==201)
            {
                console.log("Notdone!");
                // handleShow3();
            }
            else{
                console.log("done MAN!");
                // setuserData(json)
                // callAbout();
            }
        }
    }
    const EditThePost = () => {
        SetEditedItems();
        
    }

    const DeleteThePost = () => {
    
    }
    


    const ShowAllPosts = userData.messages.map(data =>
        <Showpostitems message={data} key={data._id} username={userData.username}/>);

    return (
            <div>
                <Dashboard AddToPost={AddToPost} EditTitle={EditTitle} EditDesc={EditDesc} />
                {ShowAllPosts}
            </div>
    )
}
