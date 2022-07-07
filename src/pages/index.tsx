import type { NextPage } from 'next';
import Link from 'next/link';
import { Post } from '../types';

type PropTypes = {
	postList: Post[];
};

const Home: NextPage<PropTypes> = ({ postList }) => {
	return (
		<div>
			<div className="posts-container">
				{postList.map((post) => (
					<div key={post.id}>
						<Link href={`/post/${post.id}`}>{post.title}</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;

export async function getStaticProps() {
	const response = await fetch(
		'https://jsonplaceholder.typicode.com/posts?_page=1'
	);

	const postList = await response.json();

	return {
		props: {
			postList,
		},
	};
}
