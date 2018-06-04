import React, { Component } from "react";

const MangaList = props => {
	if (!props.mangaArray) {
		return <div>Load manga</div>;
	}

	const formatTitle = title => {
		let letters = [...title];
		if (letters.length > 18) {
			return title.slice(0, 18) + "...";
		} else {
			return title;
		}
	};

	const replaceBrokenImg = img => {
		const imgAdd = "https://cdn.mangaeden.com/mangasimg/";
		if (!img) {
			return "https://cdn.mangaeden.com/images/no_image.svg";
		} else {
			return imgAdd + img;
		}
	};

	const arrayFromObj = props.mangaArray.manga;
	const imgAdd = "https://cdn.mangaeden.com/mangasimg/";
	const list = arrayFromObj.map(mangaObj => (
		<div key={mangaObj.Id}>
			<img src={replaceBrokenImg(mangaObj.im)} />
			<h5>{formatTitle(mangaObj.a)}</h5>
		</div>
	));
	// console.log(props.mangaArray === null);
	return <div className="manga-list">{list}</div>;
};

export default MangaList;
