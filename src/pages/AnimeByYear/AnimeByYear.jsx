import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import AnimeList from '../AnimeList/AnimeList'

const AnimeByYear = () => {
	const { year } = useParams()

	const apiUrl = '/v1/search'
	const [{ response }, doFetch] = useFetch(apiUrl)

	useEffect(() => {
		doFetch({
			method: 'post',
			data: `year=${year}`,
		})
	}, [doFetch, year])

	return <AnimeList otherResponse={response} />
}

export default AnimeByYear
