import { configureStore} from "@reduxjs/toolkit";
import { CryptoApi } from "../api/CryptoApi";

export default configureStore({
    reducer: {
        [CryptoApi.reducerPath]: CryptoApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(CryptoApi.middleware)
})