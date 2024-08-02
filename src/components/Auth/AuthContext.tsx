//@ts-nocheck
import {createContext, useContext, useState} from 'react';

// Define the type for the context value
type AuthContextType = {
    login: boolean;
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
    loginBack: boolean;
    setLoginBack: React.Dispatch<React.SetStateAction<boolean>>;
    oneLogin: boolean;
    setOneLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

// Create the context with the defined type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the AuthProvider component with children prop
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [login, setLogin] = useState(false);
    // const [loginOneLogin, setLoginOneLogin] = useState(true);
    const [loginBack, setLoginBack] = useState(false);
    const [oneLogin, setOneLogin] = useState(true);

    /*
        const validateToken =async  (token:string)=>
        {
            try {
                const response = await fetch(`http://10.15.90.87:8000/mykeycloak/userValid`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({token})
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("responsss",response)
                    return data.valid;
                }
                throw  new Error('Network response was not ok');
            }
            catch (error)
            {
             console.log("Error validating token",error);
             return false;
            }
        };

    useEffect(()=>{

        const checkToken = async ()=>{
            const cookies =document.cookie.split(';').reduce((acc,cookie)=>{
                const [name,value]=cookie.trim().split('=');
                acc[name]=value
                return acc;
            },{})

            if(cookies.token)
            {
                const isVaild=await validateToken(cookies.token)
                if(isVaild)
                {
                    setLogin(true)
                    window.location.href="http://localhost:5173/Dashboard"

                }
                else {
                    document.cookie='token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
                    document.cookie='tusername=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
                    setLogin(false)
                    window.location.href="http://localhost:5173/Dashboard"
                }
                console.log("tototototookl",cookies.token)

            }
            else
            {
                setLogin(false)
                window.location.href = "http://localhost:5173/login";
            }
        }
        checkToken()
    },[location])
    */

    return (
        <AuthContext.Provider value={{ login, setLogin,loginBack,setLoginBack,oneLogin, setOneLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

// Define the useAuth hook with the defined type
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
