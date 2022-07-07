import Link from 'next/link';
import { Post } from '../../types';

const Slug = ({ post }: { post: Post }) => {
	console.log(post);

	return (
		<div>
			<div>
				<Link href={'/'}>Back</Link>
			</div>
			<div>
				<h1>{post.title}</h1>
			</div>
			<div>{post.body}</div>
		</div>
	);
};

export default Slug;

export async function getStaticPaths() {
	const response = await fetch(
		'https://jsonplaceholder.typicode.com/posts?_page=1'
	);

	const postList: Post[] = await response.json();

	const params = postList.map((post) => {
		return {
			params: {
				id: `${post.id}`,
			},
		} as StaticPathParam;
	});

	console.log(params);

	return {
		paths: [...params],
		fallback: false,
	};
}

export async function getStaticProps({ params }: StaticPathParam) {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${params.id}`
	);

	const post: Post = await response.json();
	console.log(post);
	return {
		props: { post },
	};
}

type StaticPathParam = {
	params: {
		id: string;
	};
};
