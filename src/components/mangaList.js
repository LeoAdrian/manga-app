import React    from 'react';
import { Link } from 'react-router-dom';

const MangaList = props => {
	// console.log(props);
	// let mangaAr = [...props.mangaArray];
	if (!props.mangaArray && !props.searched) {
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


		const arrayFromObj = props.mangaArray || props.searched;
		// const imgAdd = "https://cdn.mangaeden.com/mangasimg/";
		const list = arrayFromObj.map(mangaObj => (
			<div key={mangaObj.i || mangaObj.manga_id}>
				<Link to={`/manga/${mangaObj.i || mangaObj.manga_id}`}><img src={replaceBrokenImg(mangaObj.im || mangaObj.image_url)} alt = "Manga" /></Link>
			</div>
		));
		// console.log(props.mangaArray === null);
		return <div className="manga-list">{list}</div>;
	}
};

export default MangaList;
