import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import AnimePage from './pages/AnimePage/AnimePage'
import AnimeList from './pages/AnimeList/AnimeList'
import useFetch from './hooks/useFetch'
import AnimeByGenre from './pages/AnimeByGenre/AnimeByGenre'
import AnimeByYear from './pages/AnimeByYear/AnimeByYear'
import AnimeByType from './pages/AnimeByType/AnimeByType'
import AnimeSchedule from './pages/AnimeSchedule/AnimeSchedule'

const App = () => {
	const [search, setSearch] = useState('')
	const apiSearchUrl = '/v1/search'
	const [{ response: searchResponse }, doSearch] = useFetch(apiSearchUrl)

	useEffect(() => {
		if (search !== '') {
			doSearch({
				method: 'post',
				data: `name=${search}`,
			})
		}
	}, [doSearch, search])

	return (
		<div>
			<Navbar search={search} setSearch={setSearch} />
			<Routes>
				<Route path='/' element={<AnimeList searchResponse={searchResponse} />} />
				{/*<Route path='*' element={<AnimeList searchResponse={searchResponse} />} />*/}
				<Route path='/schedule' element={<AnimeSchedule />} />
				<Route path='/anime/:id' element={<AnimePage />} />
				<Route path='/anime/genre/:genre' element={<AnimeByGenre />} />
				<Route path='/anime/year/:year' element={<AnimeByYear />} />
				<Route path='/anime/type/:type' element={<AnimeByType />} />
			</Routes>
		</div>
	)
}

export default App
