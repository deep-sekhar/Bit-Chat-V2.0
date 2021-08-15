import Logo1 from '../images/newlogo1.png'
import '../css/SignIn.css'
import React, { useState } from 'react'
import { NewUser } from './NewUser'
import { ExistingUserSignIn } from './ExistingUserSignIn'

export const SigninForm = (props) => {

    const MyStyle1 = {
        width: "45%",
        marginTop: "18px"
    }

    // USER SIGN IN STATE 
    const [ExistingUser, setExistingUser] = useState(true);

    const UserStateChanger = (bool) => {
        setExistingUser(bool);
    }

    return (
        <div className="container" id="MyInputForm">
            <div className="row row-fluid " style={{ height: 'calc(("min-content")+10px)' }} id="MyInputFormItems">
                <div className="col-xs-3 col-sm-6">
                    <div>
                        <img src={Logo1} alt="Bit-Chat logo" className="img img-fluid my-5 rounded-pill mx-3 " style={MyStyle1} />
                    </div>
                    <div>
                        <h2 className="text-dark">
                            Be simple, Be social
                        </h2>
                        <p>All your messages are secure with us</p>
                    </div>
                </div>
                <div className="col-xs-7 col-sm-4">
                    {ExistingUser ? <ExistingUserSignIn UserStateChanger={UserStateChanger} ExistingUser={ExistingUser} /> : <NewUser UserStateChanger={UserStateChanger} ExistingUser={ExistingUser} />}
                </div>
            </div>
        </div>
    )
}
