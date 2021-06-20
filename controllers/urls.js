const { nanoid } = require("nanoid");
const { default: validator } = require("validator");
const Url = require("../model/url");

const validateInput = (url, custom = "") => {
	// Missing URL field
	let status = "",
		message = "";
	if (!url) {
		status = 400;
		message = "Please add url";
	}
	if (!custom) {
		status = 400;
		message = "Please add custom short url";
	}

	// Invalid URL
	if (!validator.isURL(url)) {
		status = 400;
		message = "Invalid URL";
	}
	return { status, message };
};

// Add url
exports.addUrl = async (req, res, next) => {
	try {
		const { raw } = req.body;
		const nothing = "nothing";

		const st = validateInput(raw, nothing).status;
		const msg = validateInput(raw, nothing).message;
		if (st !== "" || msg !== "") {
			return res.status(st).json({
				success: false,
				message: msg,
			});
		}

		//  check if URL to be shortened is already in the database
		let check = await Url.findOne({ rawUrl: raw });
		const dom = process.env.DOMAIN;

		if (check) {
			return res.status(200).json({
				// data: check,
				url: `${dom}/${check.genLink}`,
			});
		}
		//  create new shortid
		else if (!check) {
			let unique = false;
			let id;

			//   ensure the generated id is unique
			while (unique === false) {
				id = nanoid(5);
				check = await Url.findOne({ genLink: id });
				if (!check && id !== "all") {
					unique = true;
				}
			}

			req.body.rawUrl = raw;
			req.body.genLink = id;
			//  console.log(req.body);

			//  const rawUrl = raw;
			const url = await Url.create(req.body);
			res.status(201).json({
				link: `${dom}/${url.genLink}`,
			});
		}
	} catch (error) {
		console.error(error);
	}
};


// Custom short url
exports.customAdd = async (req, res, next) => {
	const { raw, custom } = req.body;
	validateInput(raw, custom);

	const st = validateInput(raw, custom).status;
	const msg = validateInput(raw, custom).message;
	if (st !== "" || msg !== "") {
		return res.status(st).json({
			success: false,
			message: msg,
		});
	}

	//  check if URL to be shortened is already in the database
	let check = await Url.findOne({ rawUrl: raw });
	const dom = process.env.DOMAIN;

	if (check) {
		return res.status(200).json({
			// data: check,
			url: `${dom}/${check.genLink}`,
		});
	} else if (!check) {
		//   ensure the entered short id is unique
		check = await Url.findOne({ genLink: custom });
		if (check || custom === "all") {
			return res.status(400).json({
				success: false,
				message: "Custom URL already in use",
			});
		} else {
			req.body.rawUrl = raw;
			req.body.genLink = custom;
			//  console.log(req.body);

			//  const rawUrl = raw;
			const url = await Url.create(req.body);
			res.status(201).json({
				link: `${dom}/${url.genLink}`,
			});
		}
	}
};


// Go to specific url
exports.goTo = async (req, res, next) => {
	try {
		//   let url = req.path.substring(1);
		let url = req.params.code;
		//   console.log(url);
		const check = await Url.findOne({ genLink: url });
		if (!check) {
			return res.status(404).json({
				error: "Link not found",
			});
		}

		if (check) {
			url = check.rawUrl;
			//   console.log(check.rawUrl);
			res.redirect(url);
			res.end();
		}
	} catch (error) {
		console.error(error);
	}
};


// See all urls in database
exports.all = async (req, res, next) => {
	try {
		const all = await Url.find();
		res.status(200).json({ count: all.length, all });
	} catch (error) {
		console.error(error);
	}
};
