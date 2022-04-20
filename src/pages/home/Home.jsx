import React from 'react'
import { Link } from 'react-router-dom'

const Home = ({ response }) => {
	return (
		<div className='container'>
			<div className='d-grid gap-5 mb-5 mt-5'>
				<div className='row'>
					{response &&
						response.data.map((anime) => (
							<div className='col col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12' key={anime.id}>
								<div className='mb-5 row'>
									<div className='col col-xxl-4 col-xl-4 col-lg-5 col-md-4 col-sm-5 col-12 d-flex justify-content-center'>
										<Link to={`/anime/${anime.id}`}>
											<div>
												<img
													alt='logo'
													src={anime.urlImagePreview}
													style={{ height: '300px', width: '200px', borderRadius: '0.25rem' }}
												/>
											</div>
											<div>
												<div className='progress'>
													<div
														className='progress-bar progress-bar-animated bg-success progress-bar-striped'
														role='progressbar'
														aria-valuenow={(anime.rating / anime.votes) * 20}
														aria-valuemin='0'
														aria-valuemax='100'
														style={{ width: (anime.rating / anime.votes) * 20 + '%' }}>
														{(anime.rating / anime.votes).toFixed(2)}
													</div>
													<div
														className='progress-bar bg-danger progress-bar-striped'
														role='progressbar'
														aria-valuenow={101 - (anime.rating / anime.votes) * 20}
														aria-valuemin='0'
														aria-valuemax='100'
														style={{ width: 101 - (anime.rating / anime.votes) * 20 + '%' }}
													/>
												</div>
											</div>
										</Link>
									</div>
									<div className='col col-xxl-8 col-xl-8 col-lg-7 col-md-8 col-sm-7 col-12'>
										<Link to={`/anime/${anime.id}`}>
											<h4>{anime.title.split('/')[0]}</h4>
										</Link>
										<div>
											<h5>
												{anime.type} / {anime.year} /{' '}
												{anime.genre.split(',').map((a, index) => (
													<span className='me-2 mb-1 mt-1 badge bg-secondary' key={index}>
														{a}
													</span>
												))}
											</h5>
											<h5>{anime.title.split('[')[1].split(']')[0]}</h5>
										</div>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	)
}

export default Home
