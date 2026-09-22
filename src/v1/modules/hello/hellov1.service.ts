import { z } from "@hono/zod-openapi";

const url = "https://dummyjson.com/quotes/random";

const msgs = [
	"The quick brown fox jumps over the lazy dog",
	"Find a needle in a haystack",
	"Find yourself a job you love and you will never have to work a day in your life",
	"The only thing we have to fear is fear itself",
	"To be or not to be, that is the question",
	"All that glitters is not gold",
	"A journey of a thousand miles begins with a single step",
	"The pen is mightier than the sword",
	"Actions speak louder than words",
	"Beauty is in the eye of the beholder",
	"The early bird catches the worm",
	"A picture is worth a thousand words",
	"When in Rome, do as the Romans do",
];

export const dummyQuoteSchema = z.object({
	id: z.int(),
	quote: z.string(),
	author: z.string(),
});

export async function getMessage() {
	const randId = Math.floor(Math.random() * msgs.length);
	const quote = await fetch(url)
		.then((res) => res.json())
		.then(dummyQuoteSchema.parse)
		.catch(() =>
			dummyQuoteSchema.parse({
				id: randId,
				quote: msgs[randId],
				author: "Rom Vales Villanueva",
			}),
		);

	return {
		time: new Date().toJSON(),
		message: msgs[Math.floor(Math.random() * msgs.length)],
		quote,
	};
}
