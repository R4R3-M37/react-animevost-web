import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import Spoiler from './components/Spoiler'
import Video from './components/Video'

const AnimePage = ({ response }) => {
	const apiUrl = 'api.animetop.info/v1/playlist'
	const { id } = useParams()

	const [{ response: responseVideo }, doFetch] = useFetch(apiUrl)

	const [isSpoilerSeriesActive, setIsSpoilerSeriesActive] = useState(false)
	const [isSpoilerDescriptionActive, setIsSpoilerDescriptionActive] = useState(false)
	const [isSpoilerYearActive, setIsSpoilerYearActive] = useState(false)
	const [isSpoilerGenreActive, setIsSpoilerGenreActive] = useState(false)
	const [isSpoilerDirectorActive, setIsSpoilerDirectorActive] = useState(false)

	const firstSeriaArray = []
	const [videoScr, setVideoSrc] = useState(null)
	const firstSeriaFinder = (anime) => anime.name === '1 серия' && firstSeriaArray.push(anime)
	const firstSeriaIndex = responseVideo && responseVideo.map((a) => firstSeriaFinder(a))

	const currentAnime = response && response.data.find((anime) => anime.id === Number(id))

	const gen = currentAnime.genre.split(',').map((a, index) => (
		<span className='me-2 mb-1 mt-1 badge bg-secondary' key={index}>
			{a}
		</span>
	))

	const series =
		responseVideo &&
		responseVideo.map((anime, index) => (
			<button
				className={
					anime.hd === videoScr
						? 'me-2 mb-1 mt-1 btn btn-secondary'
						: 'me-2 mb-1 mt-1 btn btn-outline-secondary'
				}
				key={index}
				onClick={() => {
					setVideoSrc(anime.hd)
				}}>
				{anime.name}
			</button>
		))

	useEffect(() => {
		doFetch({
			method: 'post',
			data: `id=${Number(id)}`,
		})
	}, [doFetch])

	useEffect(() => {
		if (!responseVideo) {
			return
		}
		setVideoSrc(firstSeriaArray[0].hd)
	}, [responseVideo])

	return (
		<div className='anime-page container'>
			<h3 className='anime-title text-center my-3'>{currentAnime.title.split('/')[0]}</h3>
			<div className='anime-video'>
				<Video videoScr={videoScr} />
			</div>
			<div className='anime-meta'>
				<Spoiler
					title={'Серии'}
					isActive={isSpoilerSeriesActive}
					setIsActive={setIsSpoilerSeriesActive}
					currentAnime={series ? series : 'Нет серий, Анонс?'}
				/>
				<Spoiler
					title={'Описание'}
					isActive={isSpoilerDescriptionActive}
					setIsActive={setIsSpoilerDescriptionActive}
					currentAnime={currentAnime.description}
				/>
				<Spoiler
					title={'Жанр'}
					isActive={isSpoilerGenreActive}
					setIsActive={setIsSpoilerGenreActive}
					genre={gen}
				/>
				<Spoiler
					title={'Создатель'}
					isActive={isSpoilerDirectorActive}
					setIsActive={setIsSpoilerDirectorActive}
					currentAnime={currentAnime.director}
				/>
				<Spoiler
					title={'Год выхода'}
					isActive={isSpoilerYearActive}
					setIsActive={setIsSpoilerYearActive}
					currentAnime={currentAnime.year}
				/>
			</div>
		</div>
	)
}

export default AnimePage
