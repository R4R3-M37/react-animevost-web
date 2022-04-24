import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import Spoiler from '../AnimePage/components/Spoiler'
import { Link } from 'react-router-dom'

const AnimeSchedule = () => {
	const apiUrlSchedule = '/v1/rasp'
	const apiUrl = '/v1/info'
	const [{ response: responseSchedule }, doFetchSchedule] = useFetch(apiUrlSchedule)
	const [{ response: responseAnime }, doFetch] = useFetch(apiUrl)

	const getAnimeByDay = (day) => {
		return responseSchedule && responseSchedule.filter((anime) => anime.day === day)
	}

	const id = responseSchedule && responseSchedule.map((a) => a.id).join(',')

	const getAnimeInfoById = (id) => {
		return responseAnime && responseAnime.data.filter((anime) => anime.id === id)[0]
	}

	const days = [0, 1, 2, 3, 4, 5, 6]
	const dayChecker = (day) => {
		if (day === 0) {
			return 'Понедельник'
		} else if (day === 1) {
			return 'Вторник'
		} else if (day === 2) {
			return 'Среда'
		} else if (day === 3) {
			return 'Четверг'
		} else if (day === 4) {
			return 'Пятница'
		} else if (day === 5) {
			return 'Суббота'
		} else if (day === 6) {
			return 'Воскресенье'
		}
	}
	useEffect(() => {
		doFetchSchedule({
			method: 'get',
		})
	}, [doFetchSchedule])

	useEffect(() => {
		doFetch({
			method: 'post',
			data: `id=${id && id}`,
		})
	}, [doFetch, id])

	return (
		<div className='container'>
			{days.map((day) => (
				<Spoiler title={dayChecker(day)} key={day}>
					<div className='row'>
						{responseSchedule &&
							responseAnime &&
							getAnimeByDay(day).map((anime) => (
								<div className='col col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6' key={anime.id}>
									<Link to={`/anime/${anime.id}`} className='text-decoration-none'>
										<div className='d-flex justify-content-center' style={{ width: '140px' }}>
											<img
												alt='logo'
												src={getAnimeInfoById(anime.id).urlImagePreview}
												style={{ height: '200px', width: '140px', borderRadius: '0.25rem' }}
											/>
										</div>
										<h6 className='my-3'>{getAnimeInfoById(anime.id).title.split('/')[0]}</h6>
									</Link>
								</div>
							))}
					</div>
				</Spoiler>
			))}
		</div>
	)
}

export default AnimeSchedule
