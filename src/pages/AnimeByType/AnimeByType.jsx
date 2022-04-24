import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import AnimeList from '../AnimeList/AnimeList'

const AnimeByType = () => {
	const apiUrl = '/v1/search'
	const [{ response }, doFetch] = useFetch(apiUrl)

	const { type } = useParams()
	const animeType = {
		тв: 31,
		'тв-спэшл': 32,
		ova: 33,
		ona: 34,
		'полнометражный фильм': 35,
		'короткометражный фильм': 36,
	}

	useEffect(() => {
		doFetch({
			method: 'post',
			data: `cat=${animeType[type]}`,
		})
	}, [doFetch, type])

	return <AnimeList otherResponse={response} />
}

export default AnimeByType
