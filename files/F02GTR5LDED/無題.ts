// prismaに送るクエリの定義、prismaが型安全か守ってくれる
const currentUserArgs = Prisma.validator<Prisma.UserArgs>()({
  include: {
    posts: true,
});

// Prismaのクエリから取得する型の生成
export type CurrentUserGetPayload = Prisma.UserGetPayload<
  typeof currentUserArgs
>;

// クライアントが使うQueryを元にCodegenしたものからResolverが返す必要がある型を生成
export type CurrentUser = CurrentUserQuery["currentUser"];

// prisma to resolverの変換関数
export const dataToCurrentUser = (data: CurrentUserGetPayload): CurrentUser => {
  return data;
};

@Resolver("User")
export class UserResolver {
  constructor(private prisma: PrismaService) {}

  @Query()
  @UseGuards(JwtAuthGuard)
  async currentUser(
    @CurrentUserContext() currentUser: JwtPayload,
  ): Promise<CurrentUserType> {
    const data = await this.prisma.client.user.findUnique({
      where: {
        email: currentUser.email,
      },
      ...currentUserArgs,
    });

    if (data == null) {
      throw new Error("current user not found");
    }

    const user = dataToCurrentUser(data);

    // ここでfilterをし忘れると取って欲しくないプロパティがGraphQLから取れちゃう
    return filter(CurrentUserFragmentDoc, user);
  }
}
