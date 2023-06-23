import { AnimeModel } from "../model/anime/index.js";
import { UserModel } from "../model/user/index.js";
export const MutateUser = async () => {
    var _a;
    const user = await UserModel.findOne();
    const anime = await AnimeModel.findOne();
    (_a = user === null || user === void 0 ? void 0 : user.animes) === null || _a === void 0 ? void 0 : _a.push(anime === null || anime === void 0 ? void 0 : anime._id);
    await (user === null || user === void 0 ? void 0 : user.save());
};
