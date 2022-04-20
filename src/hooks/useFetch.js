import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

const useFetch = (url) => {
	const baseUrl = 'https://'
	const [isLoading, setIsLoading] = useState(false)
	const [response, setResponse] = useState(null)
	const [error, setError] = useState(null)
	const [options, setOptions] = useState({})

	const doFetch = useCallback((options) => {
		setOptions(options)
		setIsLoading(true)
	}, [])

	useEffect(() => {
		let skipGetResponseAfterDie = false
		const requestOptions = {
			...options,
		}
		if (!isLoading) {
			return
		}
		axios(baseUrl + url, requestOptions)
			.then((res) => {
				if (!skipGetResponseAfterDie) {
					setIsLoading(false)
					setResponse(res.data)
				}
			})
			.catch((error) => {
				if (!skipGetResponseAfterDie) {
					setIsLoading(false)
					setError(error.response.data)
				}
			})

		return () => {
			skipGetResponseAfterDie = true
		}
	}, [isLoading, options, url])

	return [{ isLoading, response, error }, doFetch]
}

export default useFetch
