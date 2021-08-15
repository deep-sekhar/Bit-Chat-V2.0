import React,{ useEffect} from 'react'
import '../css/profile.css'
import '../css/profile2.css'
import { Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'

export const Aboutus = ()=> {

    const history = useHistory();
    const abortCtrl = new AbortController();
    const callAbout = async()=>{
        try {
            let params = {
                method: "GET",
                headers: {
                    //  Accept:"application/json",
                    'Content-Type': 'application/json'
                },
                // credentials:"include"
            }
            const res =  await fetch('/profiledata',params,{signal:abortCtrl.signal});
            const data = await res.json();
            console.log("STATUS-->"+res.status)
            if (res.status!==200) {
                const error = new Error(res.error)
                throw error;
            }
            // console.log("DADADA",data);
            
        } catch (error) {
            console.log(error);  
            changeHis();
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
            <div className=" text-center" id="dpback" style={{fontFamily: "'Ubuntu', sans-serif"}}>
                <div className="container d-flex justify-content-around moving-glow rounded dp-bgm">
                    <Image src="https://github.com/deep-sekhar/Web-Dev-Projects/blob/master/pro2.png?raw=true" roundedCircle id="dp" />
                </div>
                <div className="container profile-text probox3">
                    <h5 className="my-2">
                        Hi, it's Deep here. Hope you liked this fullstack MERN project.<br />
                        The Client Side source code is available in my git repository.
                    </h5><br /><br />
                    <h6 className="my-2">
                        Don't forget to share your reviews.
                    </h6>
                </div>
                <div className="probox3 mb-6">
                <h5 className="my-1">Follow me on:</h5>
                <span className="footlogo  mx-2">
                    <a href="https://www.instagram.com/sekhharr/" rel="noopener noreferrer" target="_blank">
                        <i className="fab fa-instagram-square fa-3x footerlogo"></i>
                    </a>
                </span>
                <span className="footlogo mx-2">
                    <a href="https://www.facebook.com/Sekhharr/" rel="noopener noreferrer" target="_blank">
                        <i className="fab fa-facebook-square fa-3x footerlogo"></i>
                    </a>
                </span>
                <span className="footlogo mx-2">
                    <a rel="noopener noreferrer" href="https://discord.com/channels/787387160101650452/787387162441678890" target="_blank"></a>
                    <i className="fab fa-discord fa-3x footerlogo"></i>
                </span>
                <span className="footlogo mx-2">
                    <a rel="noopener noreferrer" href="https://github.com/deep-sekhar" target="_blank">
                        <i className="fab fa-github fa-3x footerlogo"></i>
                    </a>
                </span>
                <span className="footlogo mx-2">
                    <a rel="noopener noreferrer" href="https://in.linkedin.com/in/deep-sekhar-ghosh-23478b208" target="_blank">
                        <i className="fab fa-linkedin fa-3x footerlogo"></i>
                    </a>
                </span>
                </div>
            </div>
        )
    
}

export default Aboutus
