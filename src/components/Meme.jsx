import React, { useState, useEffect } from "react";

export default function Meme() {
	const [meme, setMeme] = useState({
		topText: "",
		bottomText: "",
		randomImg: "http://i.imgflip.com/1bij.jpg"
	});

	const [allMemeImgs, setAllMemeImgs] = useState([]);

	useEffect(() => {
		const fetchImg = async () => {
			const response = await fetch("https://api.imgflip.com/get_memes");
			const data = await response.json();
			setAllMemeImgs(data.data.memes);
		};
		fetchImg();
	}, []);

	function getMemeImage() {
		const randomImage = Math.floor(Math.random() * allMemeImgs.length);
		const url = allMemeImgs[randomImage].url;
		setMeme((prevState) => {
			return {
				...prevState,
				randomImg: url
			};
		});
	}

	function handleChange(event) {
		const { name, value } = event.target;
		setMeme((prevState) => {
			return {
				...prevState,
				[name]: value
			};
		});
	}

	return (
		<main>
			<div className="form">
				<input
					type="text"
					className="form--input"
					placeholder="Top Text"
					name="topText"
					value={meme.topText}
					onChange={handleChange}
				/>
				<input
					type="text"
					className="form--input"
					placeholder="Bottom Text"
					name="bottomText"
					value={meme.bottomText}
					onChange={handleChange}
				/>
				<button className="form--button" onClick={getMemeImage}>
					Get a new meme image 🖼
				</button>
			</div>
            <div className="meme">
				<img src={meme.randomImg} alt="Meme Image" className="meme--image" />
				<h2 className="meme--text top">{meme.topText}</h2>
				<h2 className="meme--text bottom">{meme.bottomText}</h2>
			</div>
		</main>
	);
}
