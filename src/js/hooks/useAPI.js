import { useState } from "react";

export function useAPI(queryFn) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const call = (...params) => new Promise(async (res, rej) => {
        try {
            setIsLoading(true)
            setError(false)
            const response = await queryFn(...params)
            res(response)
        } catch(err) {
            setError(err)
            rej(err)
        } finally {
            setIsLoading(false)
        }
    })

    return [call, {isLoading, error}]
}
