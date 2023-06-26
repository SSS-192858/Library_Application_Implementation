import React, { useState, useEffect } from "react";
import { getUserBoard } from "../api/user_services";
import BoxContainer from "../reusables/Container";

const BoardStudent = () => {

    const [content, setContent] = useState("")

    useEffect(() => {
        getUserBoard().then(
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

export default BoardStudent;