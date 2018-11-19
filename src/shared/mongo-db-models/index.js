import { CurrencyModel } from "./Currency";
import { SessionModel } from "./Session";
import { UserModel } from "./User";
import { UserCredentialsModel } from "./UserCredentials";

var modelsMap = {
    Currency: CurrencyModel,
    User: UserModel,
    Session: SessionModel,
    UserCredentials: UserCredentialsModel
}

export {
    modelsMap,
    CurrencyModel,
    UserModel,
    SessionModel,
    UserCredentialsModel
}