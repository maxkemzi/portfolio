import {revalidateTag} from 'next/cache';

export async function POST(req: Request) {
	const {searchParams} = new URL(req.url);

	if (searchParams.get('secret') !== process.env.REVALIDATE_SECRET) {
		return new Response('Unauthorized', {status: 401});
	}

	revalidateTag('projects');
	revalidateTag('projectCategories');
	return Response.json({revalidated: true});
}
