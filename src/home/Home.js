import axios from "axios";
import React, { useEffect, useState } from 'react'

const URI = 'https://42.194.215.137/api'

export default () => {
    const [title, setTitle] = useState("Real Me")

    useEffect(() => {
        let didCancel = false;
        (async () => {
            const result = await axios(
                URI + "/hello",
            );

            if (didCancel) return
            setTitle(result.data)
        })();

        return () => {
            didCancel = true
        }

    }, []);

    return <h1>{title}</h1>
}