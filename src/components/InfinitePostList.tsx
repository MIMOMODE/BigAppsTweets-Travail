import InfiniteScroll from "react-infinite-scroll-component";
import { ProfileImage } from "./ProfileImage";
import Link from "next/link";
type Posts ={
    id: string;
    content: string;
    createdAt: Date;
    likeCount: number;
    likedByMe: boolean;
    user: { id: string; image: string | null; name: string | null}
}

type InfinitePostListProps = {
    isLoading: boolean;
    isError: boolean;
    hasMore: boolean;
    fetchNewPosts: ()=> Promise<unknown>;
    posts?: Posts[];
}

export function InfinitePostList({ posts, isError, isLoading, fetchNewPosts, hasMore }: InfinitePostListProps){
    if (isLoading) return <h1>Un petit moment ...</h1>
    if (isError) return <h1>Error ...</h1>
    if (posts == null) return null

    if (posts == null || posts.length === 0){
        return <h1 className="my-4 text-center text-2xl text-gray-500">Pas de posts pour le moment</h1>
    }
    return <ul>
        <InfiniteScroll
        dataLength={posts.length}
        next={fetchNewPosts}
        hasMore={hasMore}
        loader={"Chargement..."}>
            {posts.map(post =>{
                return <PostsCard key={post.id} {...post} />;
            } )}

        </InfiniteScroll>
    </ul>
}
const dateTimeFormatter = new Intl.DateTimeFormat(undefined, { dateStyle: "short", timeStyle: "short" })
function PostsCard({id, user, content, likeCount, likedByMe, createdAt} : Posts){
    return <li className="flex gap-4 border-b px-4 py-4">
    <Link href={`/profiles/${user.id}`}>
        <ProfileImage src={user.image}/>
    </Link>
    <div className="flex flex-grow flex-col">
        <div>
            <Link href={`/profiles/${user.id}`} className="font-bold hover:underline focus-visible:underline">
            {user.name}
            </Link>
            <span className="text-gray-500"> - </span>
            <span className="text-gray-500">{dateTimeFormatter.format(createdAt)}</span>
            <p className="whitespace-pre-wrap">{content}</p>
        </div>
    </div>
    </li>
}