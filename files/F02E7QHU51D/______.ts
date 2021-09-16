// Prismaが生成するやつ
type User = {
  firstName: string;
  lastName: string;
  posts: Array<Post>;
};

type Post = {
  title: string;
  content: string;
};

// (多分)codegenが作ってくれるやつ
type UserModel = {
  firstName: string;
  lastName: string;
  fullName: string;
  posts: Array<PostModel>;
};

type PostModel = {
  title: string;
  content: string;
  captions: Array<CaptionModel>;
};

type CaptionModel = {
  level: number;
  text: string;
};

// 手書きで愚直にモデル変換書くしかない・・・？
// 再利用性がどうなのか分からんやつ
const userToModel = (user: User): UserModel => {
  const fullName = `${user.firstName} ${user.lastName}`;
  const posts = user.posts.map((post) => postToModel(post));

  return {
    ...user,
    fullName,
    posts,
  };
};

const postToModel = (post: Post): PostModel => {
  const captions = extractCaptions(post.content);

  return {
    ...post,
    captions,
  };
};

const extractCaptions = (_content: string): Array<CaptionModel> => {
  return [];
};

let user: User;
console.log(userToModel(user))
