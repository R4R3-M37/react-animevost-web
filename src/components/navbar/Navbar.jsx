import React, { useTransition } from 'react'
import { Link } from 'react-router-dom'
import Modal from './components/Modal'

const Navbar = ({ search, setSearch }) => {
	const [, startTransition] = useTransition({
		timeoutMs: 6000,
	})
	const onChangeSearch = (e) => {
		startTransition(() => {
			setSearch(e.target.value)
		})
	}

	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<div className='container'>
				<Link className='navbar-brand' to={'/'}>
					React | Animevost
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon' />
				</button>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
						<li className='nav-item' style={{ cursor: 'pointer' }}>
							<div className='nav-link' data-bs-toggle='modal' data-bs-target='#modal'>
								О сайте
							</div>
						</li>
						<li className='nav-item'>
							<Link to={'/schedule'} className='nav-link'>
								Расписание
							</Link>
						</li>
						<input
							value={search}
							onChange={onChangeSearch}
							className='form-control'
							type='search'
							name='search'
							placeholder='Найти аниме'
							style={{ width: '15em' }}
						/>
					</ul>
				</div>
				<Modal title={'О сайте'}>
					Автор:{' '}
					<a href='https://github.com/r3t4k3r'>
						<b>r3t4k3r</b>
					</a>
					<br />
					Реализация автора:{' '}
					<a href='https://github.com/r3t4k3r/animevost-web'>
						<b>github.com/animevost-web</b>
					</a>
					<br />
					Исходный код:{' '}
					<a href='https://github.com/R4R3-M37/react-animevost-web'>
						<b>github.com/react-animevost-web</b>
					</a>
				</Modal>
			</div>
		</nav>
	)
}

export default Navbar
