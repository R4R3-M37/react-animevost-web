import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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
				<Link to={`/anime/genre/${a}`} className='text-decoration-none link-light'>
					{a}
				</Link>
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
		setVideoActive(animeMedia[0].std)
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
			<Spoiler title={'Серии'} show>
				{animeMedia ? (
					animeMedia &&
					animeMedia.map((anime, index) => (
						<button
							onClick={() => setVideoActive(anime.std)}
							className={
								anime.std === videoActive
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
			<Spoiler title={'Жанр'}>
				<h5>{genre}</h5>
			</Spoiler>
			<Spoiler title={'Описание'}>{anime.description}</Spoiler>
			<Spoiler title={'Тип аниме'}>
				<Link to={`/anime/type/${anime.type.toLowerCase()}`} className='text-decoration-none link-dark'>
					{anime.type}
				</Link>
			</Spoiler>
			<Spoiler title={'Год выхода'}>
				<Link to={`/anime/year/${anime.year}`} className='text-decoration-none link-dark'>
					{anime.year}
				</Link>
			</Spoiler>
			<Spoiler title={'Создатель'}>{anime.director}</Spoiler>
		</div>
	)
}

export default AnimePage
