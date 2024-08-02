//@ts-nocheck
import {useAuth} from "./AuthContext.tsx";
import {useEffect, useState} from "react";
import Cookies from 'js-cookie';
// import Loading from "../../Component/Other/Loading/Loading.tsx";




type Auth = {
    login: boolean; // Assuming login is boolean
    setLogin: (value: boolean) => void; // Assuming setLogin is a function that takes a boolean argument and returns void
    loginBack: boolean; // Assuming login is boolean
    setLoginBack: (value: boolean) => void; // Assuming setLogin is a function that takes a boolean argument and returns void
};


const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

const Login = () =>
{

    const { login, setLogin, oneLogin, setOneLogin } = useAuth();
    // const [loginOneLogin, setLoginOneLogin] : Auth = useAuth();
    const [code, setCode] = useState('');


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const oneLoginToken = Cookies.get('oneLoginToken');
    const oneLoginUsername = Cookies.get('oneLoginUserName');
    const onlLoginCondition =Cookies.get('oneLogin');
    // const onlLoginCondition = document.cookie.split(';').find(c => c.trim().startsWith('oneLogin='));
    // const onlLoginConditionValue = onlLoginCondition ? onlLoginCondition.split('=')[1] : '';


    const deleteOnelogin =()=>{
        document.cookie = `oneLogin=false; path=/;domain=10.15.90.87;`;
    };

    useEffect(()=> {
        const  currentUrl=window.location.href;
        const urlParams=new URLSearchParams(window.location.search)
        const codeParam =urlParams.get('code')


        // const oneLoginUsername = document.cookie.split(';').find(c => c.trim().startsWith('oneLoginUsername='));
        //
        // const userNameValue = userName ? userName.split('=')[1] : '';

        console.log("onlLoginCondition",onlLoginCondition)
        console.log("oneLoginUsername",oneLoginUsername)
        console.log("oneLoginToken",oneLoginToken)

        if(codeParam)
        {
            setCode(codeParam)
            alert("cododododododood",codeParam)
        }

        else if(  (oneLoginToken && oneLoginUsername) &&(onlLoginCondition==="true") )
        {
            window.location.href="/dashboard"
            setLogin(true)
        }
        else if(  (oneLoginToken  && oneLoginUsername) && (onlLoginCondition==="false") )
        {
            window.location.href="http://10.15.90.87:8081"
            setLogin(false)
        }

        else
        {
            window.location.href="http://10.15.90.87:8081"
            // window.location.href="http://10.15.90.87:8080/realms/mci/protocol/openid-connect/auth?state=jpGd7FWg&redirect_uri=http://localhost:5173/Dashboard&scope=openid%20profile&response_type=code&client_id=configx"
            // window.location.href="http://10.15.90.87:8080/realms/mci/protocol/openid-connect/auth?state=jpGd7FWg&redirect_uri=http://localhost:5173/Dashboard&scope=openid%20profile&response_type=code&client_id=configx"
        }

    },[])


    useEffect(()=>
    {
        // const  fetchToken=async (code)=>{
        //     try {
        //         const response = await fetch(`http://10.15.90.87:8000/sso/gettoken?key=${code}`);
        //         if (response.ok) {
        //             const result = await response.json();
        //             const token = result.token;
        //             if (token) {
        //                 document.cookie = `token=${token}; path=/`;
        //                 setLogin(true);
        //                 console.log("resusdsdsdsl';flsddsdlt",token)
        //                 window.location.href="localhost:5173/Dashboard"
        //             } else {
        //                 throw new Error('Token not received');
        //             }
        //         } else {
        //             throw new Error('Network response was not ok');
        //         }
        //     } catch (error) {
        //         console.error('Error fetching token:', error);
        //     }
        // };
        //
        // if (code) {
        //     fetchToken(code);
        // }
    }, [code, setLogin])






    // useEffect to run once after the component mounts
    // useEffect(() =>
    // {
    //     // Check if cookies exist
    //     const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    //         const [name, value] = cookie.trim().split('=');
    //         acc[name] = value;
    //         return acc;
    //     }, {});
    //
    //     // If username and token exist in cookies, perform login
    //     if (cookies.username && cookies.token) {
    //         setLogin(true); // Perform login
    //     }
    //
    //     if (cookies.token) {
    //         setLogin(true);
    //     } else {
    //         window.location.href = "http://10.15.90.87:8080/realms/mci/protocol/openid-connect/auth?state=jpGd7FWg&redirect_uri=localhost:5137/Dashboard&scope=openid%20profile&response_type=code&client_id=configx";
    //     }
    //
    //
    // }, [setLogin]); // Empty dependency array ensures this effect runs once after mount

    // const handleSignIn = () => {
    //     if (username === defaultUsername && password === defaultPassword) {
    //         // Set cookies
    //         document.cookie = `username=${username};`;
    //         document.cookie = `token=${Math.random().toString(36).substring(7)};`;
    //
    //
    //         // Toggle the login state using the setLogin function
    //         // setLogin(true);
    //     } else {
    //         // Provide feedback to the user that the credentials are incorrect
    //         alert('Incorrect username or password');
    //     }
    // };

    // const handleSignIn = () => {
    //     if (username === defaultUsername && password === defaultPassword) {
    //         // Toggle the login state using the setLogin function
    //         setLogin(!login);
    //
    //     }
    //     else {
    //         // Provide feedback to the user that the credentials are incorrect
    //         alert('Incorrect username or password');
    //     }
    // };

    // const handleUsernameChange = (event) => {
    //     setUsername(event.target.value);
    // };
    //
    // const handlePasswordChange = (event) => {
    //     setPassword(event.target.value);
    // };

    const Loading =()=>{
        return (<div>
            loading...
        </div>)
    }

    return(
        <div className="loadBeforeLogin">
            <Loading/>
        </div>
    )


// return(
//     <div className="Login">
//
//         <section className="image_Login_container">
//             <img className="logo_container" src={configXBackground} alt=""/>
//
//         </section>
//         <div className="logo_middle">
//             <img src={configXLogo} alt=""/>
//         </div>
//         <div className="Configx-form-container">
//             <section className="form_Login_container">
//                 <div className="input_container">
//                     <div className="username_container">
//                         <label htmlFor="">Username</label>
//
//                         <input
//                             type="text"
//                             placeholder="Type your username here"
//                             value={username}
//                             onChange={handleUsernameChange}
//                         />
//                         <img src="/UserCircle%20(1).svg" alt=""/>
//
//                     </div>
//                     <div className="password_container">
//                         <label htmlFor="">Password</label>
//
//                         <input
//                             type="password"
//                             placeholder="Type your password here"
//                             value={password}
//                             onChange={handlePasswordChange}
//                         />
//                         <img src="/images/Lock.svg" alt=""/>
//
//                     </div>
//                     {/*<button onClick={handleSignIn}>Sign in</button>*/}
//                     <button >Sign in</button>
//
//
//                 </div>
//                 <div className="line"></div>
//                 <div className="loremipsun_container">
//
//                     <div className="loremipsun_container_logo">
//                         <img src={configXLogo} alt=""/>
//                     </div>
//
//                     <div className="loremipsun_container_part1">
//                         <p>Welcome in</p>
//                         <p>Mv Oss Config-X Product</p>
//                     </div>
//
//                     <div className="loremipsun_container_part2">
//                         <img src="/images/Info.svg" alt=""/>
//                         <p>Please Enter your username and password to login</p>
//                     </div>
//
//                 </div>
//
//             </section>
//         </div>
//
//     </div>
//
// )


};

export default Login;