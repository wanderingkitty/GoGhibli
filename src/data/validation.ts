import { Movie } from "./interfaces";
import Joi from 'joi'

type ValidationResult = ValidationSuccess | ValidationFailure

interface ValidationSuccess {
	success: true;
	value: Movie[]
}

interface ValidationFailure {
	success: false;
	error: string;
}

const schema = Joi.array<Movie>().items(
	Joi.object<Movie>({
		id: Joi.string().required(),
		title: Joi.string().required(),
		image: Joi.string().uri().required(),
		director: Joi.string().required(),
	}));

export function validateMovies(movs: Movie[]): ValidationResult {
	const result = schema.validate(movs.map(m => ({
		title: m.title,
		image: m.image,
		director: m.director,
		id: m.id
	})));

	if (result.error) {
		return { success: false, error: result.error.message };
	} else {
		return { success: true, value: movs };
	}
}
