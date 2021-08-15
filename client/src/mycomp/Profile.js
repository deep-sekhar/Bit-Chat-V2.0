import React, { useEffect, useState} from 'react'
import profilelogo from '../images/profilelogo.png'
import '../css/profile2.css'
import { useHistory } from 'react-router-dom'

export const Profile = ()=> {

    const history = useHistory();
    const abortCtrl = new AbortController();

    const [userData, setuserData] = useState({});
    const callAbout = async()=>{
        try {
            let params = {
                method: "GET",
                headers: {
                     Accept:"application/json",
                    'Content-Type': 'application/json'
                },
                credentials:"include"
            }
            const res =  await fetch('/profiledata',params,{signal:abortCtrl.signal});
            
            if (res.status!==200) {
                // const error = new Error(res.error)
                // throw error;
                changeHis();
            }else{
                const data = await res.json();
                setuserData(data)
            }
            
        } catch (error) {
            console.log(error);  
        }
    }
    
    const changeHis=  ()=>{
        history.push('/userSignin')
    }
    
    useEffect(() => {
        callAbout();
        return ()=>{
            console.log("Req ABORTED!");
            abortCtrl.abort();
        }
        }, [])

        return (
            <>
            <div className="container probox">
                <div className="container probox2">
                    <div>
                        <img src={profilelogo} id="prologo" alt="" />
                    </div>
                    <div>
                    <h5 className="prodis">Username:</h5>
                    <span className="prodis">{userData.username}</span>
                    </div >
                    <div>
                    <h5 className="prodis">Email:</h5>
                    <span className="prodis">{userData.email}</span>
                    </div>
                    <div>
                    <h5 className="prodis">Phone Number:</h5>
                    <span className="prodis">{userData.phno}</span>
                    </div>
                </div>
            </div>
            </>
        )
}

