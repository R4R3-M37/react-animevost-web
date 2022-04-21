import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import Spoiler from './components/Spoiler'
import MediaPlayer from './components/MediaPlayer'

const AnimePage = () => {
	const { id } = useParams()

	const apiUrl = '/v1/info'
	const apiUrlMedia = '/v1/playlist'

	const [{ response }, doFetch] = useFetch(apiUrl)
	const [{ response: responseMedia }, doFetchMedia] = useFetch(apiUrlMedia)

	const [videoActive, setVideoActive] = useState(null)

	const anime = response && response.data[0]
	const animeMedia = response && responseMedia
	const genre =
		anime &&
		anime.genre.split(',').map((a, index) => (
			<span className='me-2 mb-1 mt-1 badge bg-secondary' key={index}>
				{a}
			</span>
		))
	animeMedia &&
		animeMedia.sort((a, b) => {
			const matchA = a.name.match(/\d+/)
			const matchB = b.name.match(/\d+/)
			return matchA && matchB ? Number(matchA[0]) - Number(matchB[0]) : 1
		})

	useEffect(() => {
		if (!animeMedia) {
			return
		}
		setVideoActive(animeMedia && animeMedia[0].hd)
	}, [animeMedia])

	useEffect(() => {
		doFetch({
			method: 'post',
			data: `id=${id}`,
		})

		doFetchMedia({
			method: 'post',
			data: `id=${id}`,
		})
	}, [doFetch, doFetchMedia])

	if (!response) {
		return null
	}

	return (
		<div className='container'>
			<h4 className='text-center my-3'>{anime.title.split('/')[0]}</h4>
			<MediaPlayer scr={videoActive} id={videoActive} />
			<Spoiler title={'Серии'}>
				{animeMedia ? (
					animeMedia &&
					animeMedia.map((anime, index) => (
						<button
							onClick={() => setVideoActive(anime.hd)}
							className={
								anime.hd === videoActive
									? 'me-2 mb-1 mt-1 btn btn-secondary'
									: 'me-2 mb-1 mt-1 btn btn-outline-secondary'
							}
							key={index}
						>
							{anime.name}
						</button>
					))
				) : (
					<code>Нет серий, Анонс?!</code>
				)}
			</Spoiler>
			<Spoiler title={'Описание'}>{anime.description}</Spoiler>
			<Spoiler title={'Жанр'}>{genre}</Spoiler>
			<Spoiler title={'Создатель'}>{anime.director}</Spoiler>
			<Spoiler title={'Год выхода'}>{anime.year}</Spoiler>
		</div>
	)
}

export default AnimePage
