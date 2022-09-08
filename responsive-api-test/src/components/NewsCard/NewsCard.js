import React from 'react'
import './NewsCard.css'
import moment from 'moment';

const NewsCard = (props) => {
	let now = moment()
	return (
		<div className='Rectangle'>

			<a href={props.url}>
				<span className='-hours-ago-by-autho'>{now.diff(props.created_at, "days") } days ago by {props.author}</span>
				<br/>
				<div className='From-chaos-to-free-w'>{props.title}</div>
				<div>
					
				</div>
			</a>

		</div>

	);

};

export default NewsCard;