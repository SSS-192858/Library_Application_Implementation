import React, { useState, useEffect } from "react";
import { getAdminBoard } from "../api/user_services";
import BoxContainer from "../reusables/Container";

const BoardAdmin = () => {

    const [content, setContent] = useState("")

    useEffect(() => {
        getAdminBoard().then(
            response => {
                setContent(response.data);
            },
            error => {
                const msg = (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();

                setContent(msg);
            }
        )
        
    }, [])

    return (
      <BoxContainer>
          <h3>{content}</h3>
      </BoxContainer>
    );  
}

export default BoardAdmin;