import React, { useEffect } from 'react'
import AnimeList from '../AnimeList/AnimeList'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'

const AnimeByGenre = () => {
	const { genre } = useParams()

	const apiUrl = `/v1/search`
	const [{ response }, doFetch] = useFetch(apiUrl)

	useEffect(() => {
		doFetch({
			method: 'post',
			data: `gen=${genre}`,
		})
	}, [doFetch, genre])

	return <AnimeList otherResponse={response} />
}

export default AnimeByGenre
