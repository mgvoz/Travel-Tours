import React, { useState, useEffect } from 'react';
import './index.css';

const url = 'https://course-api.com/react-tours-project';

const Tour = () => {
	const [tourItem, setTourItem] = useState('');

	const removeItem = (id) => {
		let newList = tourItems.filter((item) => item.id !== id);
		setTourItem(newList);
	};
	const [fetchingData, setFetchingData] = useState(true);

	useEffect(() => {
		const abortController = new AbortController();
		const fetchUrl = async () => {
			try {
				const response = await fetch(url, {
					signal: abortController.signal,
				});
				if (fetchingData) {
					const data = await response.json();
					setTourItem(data);
				}
				setFetchingData(false);
			} catch (e) {
				console.log(e);
			}
		};
		fetchUrl();
		return () => {
			//cleanup!
			abortController.abort();
		};
	});

	const tourItems = Object.values(tourItem);

	const SpecificTourItems = ({ item, removeItem }) => {
		const [readMore, setReadMore] = useState(false);
		return (
			<div key={item.id}>
				<article className='single-tour'>
					<img src={item.image} alt={item.name} />
					<footer>
						<div className='tour-info'>
							<h4>{item.name}</h4>
							<h4 className='tour-price'>${item.price}</h4>
						</div>
						{readMore ? (
							<p>
								{item.info}
								<button onClick={() => setReadMore(false)}>
									Show Less
								</button>
							</p>
						) : (
							<p>
								{item.info.slice(0, 450) + '...'}
								<button onClick={() => setReadMore(true)}>
									Read More
								</button>
							</p>
						)}
						<button
							className='delete-btn'
							onClick={() => removeItem(item.id)}
						>
							Not Interested
						</button>
					</footer>
				</article>
			</div>
		);
	};

	//GET READ MORE BUTTON TO WORK ON JUST ONE TOUR AT A TIME

	return (
		<>
			{tourItems.map((item, key) => {
				return (
					<SpecificTourItems
						item={item}
						removeItem={removeItem}
						key={key}
					/>
				);
			})}
		</>
	);
};

export default Tour;
