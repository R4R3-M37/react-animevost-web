import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import AnimePage from './pages/animepage/AnimePage'
import AnimeList from './pages/animelist/AnimeList'
import useFetch from './hooks/useFetch'

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
				<Route path='/anime/:id' element={<AnimePage />} />
			</Routes>
		</div>
	)
}

export default App
