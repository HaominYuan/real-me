import axios from "axios";
import React, { useEffect, useState } from 'react'


// const URI = 'https://42.194.215.137/api/'
// const URI = 'https://tstxxy.icu/api/',
const URI = 'http://localhost/'

const Home = () => {
    const [title, setTitle] = useState("Real Me")

    useEffect(() => {
        (async () => {
          const result = await axios(
            URI + "hello",
          );
          setTitle(result.data)
        })();
      }, []);
    return <h1>{title}</h1>
}

export default Home