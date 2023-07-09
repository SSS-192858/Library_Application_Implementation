import { useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

// first page that shows up, in case user is logged in takes them to the books page, if not then to the login page
const Home = ({currentUser}) => {

    const navigate = useNavigate();

    useEffect(() => {
        const func = () => {
            if (currentUser){
                navigate("/books")
            }else{
                navigate("/login")
            }
        }
        func();
    }, [])

    return (
        <> 
        </>
    );
  
}

export default Home;