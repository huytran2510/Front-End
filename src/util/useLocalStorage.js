import {useEffect, useState} from "react";

function useLocalStorage(defaultValue, key) {

    const [value, setValue] = useState(() => {
        const localStorageValue = localStorage.getItem(key)
        return localStorageValue !== null ? JSON.parse(localStorageValue) : defaultValue
    })
    console.log(`localStorageValue ${key} is : ${value}`)

    useEffect(() => {
        localStorage.setItem(key,JSON.stringify(value))
        console.log(`using local Storage ${key} is : ${value}`)
    }, [key,value]);

    return [value,setValue]
}

export {useLocalStorage}