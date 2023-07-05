import { useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

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