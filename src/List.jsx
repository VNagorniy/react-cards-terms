import React from 'react';

const names = [
	{
		name: 'John',
		age: 30,
		isGeneral: true
	},
	{
		name: 'Igor',
		age: 20,
		isGeneral: true
	},
	{
		name: 'Ira',
		age: 10,
		isGeneral: false
	}
];

const List = () => {
	return (
		<div>
			{names.map((item, index) => {
				return (
					<div key={index} className={item.isGeneral ? 'general' : ''}>
						<span>{item.name}</span>
						<h4>{item.age}</h4>
					</div>
				);
			})}
		</div>
	);
};

export default List;
