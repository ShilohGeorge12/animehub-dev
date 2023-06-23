import { AnimeModel } from "../model/anime/index.js";
import { UserModel } from "../model/user/index.js";

export const MutateUser = async () => {
  const user = await UserModel.findOne();
  const anime = await AnimeModel.findOne();
  user?.animes?.push(anime?._id);
  await user?.save();
};