import React    from 'react';
import { Link } from 'react-router-dom';

const MangaList = props => {
	if (!props.mangaArray) {
		console.log('Nothing found!');
		return <div>Loading manga...</div>;
	} else {

		// const formatTitle = title => {
		// 	let letters = [...title];
		// 	if (letters.length > 18) {
		// 		return title.slice(0, 18) + "...";
		// 	} else {
		// 		return title;
		// 	}
		// };

		const replaceBrokenImg = img => {
			const imgAdd = "https://cdn.mangaeden.com/mangasimg/";
			if (!img) {
				return "https://cdn.mangaeden.com/images/no_image.svg";
			} else {
				return imgAdd + img;
			}
		};


		const arrayFromObj = props.mangaArray;
		// const imgAdd = "https://cdn.mangaeden.com/mangasimg/";
		const list = arrayFromObj.map(mangaObj => (
			<div key={mangaObj.i}>
				<Link to={`/manga/${mangaObj.i}`}><img src={replaceBrokenImg(mangaObj.im)} alt = "Manga" /></Link>
				{/* <h5>{formatTitle(mangaObj.a)}</h5> */}
			</div>
		));
		// console.log(props.mangaArray === null);
		return <div className="manga-list">{list}</div>;
	}
};

export default MangaList;
