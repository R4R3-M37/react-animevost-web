import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Navbar from './components/navbar/Navbar'
import AnimePage from './pages/animepage/AnimePage'
import useFetch from './hooks/useFetch'

const App = () => {
	const apiUrl = 'api.animetop.info/v1/last?page=1&quantity=10'
	const [{ response }, doFetch] = useFetch(apiUrl)
	const [search, setSearch] = useState('')
	const apiSearchUrl = 'api.animetop.info/v1/search'
	const [{ response: searchResponse }, doSearch] = useFetch(apiSearchUrl)

	useEffect(() => {
		if (search !== '') {
			doSearch({
				method: 'post',
				data: `name=${search}`,
			})
		}
	}, [doSearch, doFetch, search])

	useEffect(() => {
		doFetch()
	}, [doFetch])

	if (!response) {
		return null
	}

	return (
		<div>
			<Navbar search={search} setSearch={setSearch} />
			<Routes>
				<Route path='/' element={<Home response={searchResponse ? searchResponse : response} />} />
				<Route
					path='/anime/:id'
					element={<AnimePage response={searchResponse ? searchResponse : response} />}
				/>
			</Routes>
		</div>
	)
}

export default App
